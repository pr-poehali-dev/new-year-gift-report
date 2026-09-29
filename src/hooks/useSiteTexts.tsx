import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import func2url from '../../backend/func2url.json';
import EditableText from '@/components/EditableText';

export interface TextField {
  key: string;
  section: string;
  title: string;
  value: string;
  multiline: boolean;
  order: number;
}

export interface SettingField {
  key: string;
  kind: string;
  title: string;
  hint: string;
  value: string;
}

export const TEXTS_URL = func2url.texts;

type Values = Record<string, string>;

interface Ctx {
  values: Values;
  settings: Values;
  editMode: boolean;
  setValue: (key: string, value: string) => void;
  reload: () => void;
}

const SiteTextsContext = createContext<Ctx>({
  values: {},
  settings: {},
  editMode: false,
  setValue: () => {},
  reload: () => {},
});

function hexToHsl(hex: string): string | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!m) return null;
  const r = parseInt(m[1], 16) / 255;
  const g = parseInt(m[2], 16) / 255;
  const b = parseInt(m[3], 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

const COLOR_VARS: Record<string, string[]> = {
  'color.primary': ['--primary', '--ring'],
  'color.secondary': ['--secondary', '--accent'],
  'color.forest': ['--forest'],
  'color.background': ['--background', '--cream'],
};

export function applyTheme(settings: Values) {
  const root = document.documentElement;
  Object.entries(COLOR_VARS).forEach(([key, vars]) => {
    const hsl = settings[key] ? hexToHsl(settings[key]) : null;
    if (hsl) vars.forEach(v => root.style.setProperty(v, hsl));
  });

  const family = settings['font.family'];
  if (family) {
    const id = 'site-font-link';
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@400;500;600;700;800&display=swap`;
    document.body.style.fontFamily = `'${family}', sans-serif`;
    root.style.setProperty('--site-font', `'${family}', sans-serif`);
  }

  const scale = Number(settings['font.scale'] || 100);
  root.style.fontSize = scale && scale !== 100 ? `${(16 * scale) / 100}px` : '';
}

export function SiteTextsProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<Values>({});
  const [settings, setSettings] = useState<Values>({});
  const [editMode, setEditMode] = useState(false);

  const reload = useCallback(() => {
    fetch(TEXTS_URL)
      .then(r => r.json())
      .then(d => {
        setValues(d.values || {});
        setSettings(d.settings || {});
        applyTheme(d.settings || {});
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    reload();
    const check = () =>
      setEditMode(
        new URLSearchParams(window.location.search).get('edit') === '1' &&
          !!sessionStorage.getItem('admin_pw'),
      );
    check();
    window.addEventListener('popstate', check);
    return () => window.removeEventListener('popstate', check);
  }, [reload]);

  const setValue = useCallback((key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <SiteTextsContext.Provider value={{ values, settings, editMode, setValue, reload }}>
      {children}
    </SiteTextsContext.Provider>
  );
}

export function useSiteContext() {
  return useContext(SiteTextsContext);
}

export function useTextRaw() {
  const { values } = useContext(SiteTextsContext);
  return (key: string, fallback: string) => values[key] ?? fallback;
}

export function useText() {
  const { values, editMode } = useContext(SiteTextsContext);
  return (key: string, fallback: string): ReactNode => {
    const value = values[key] ?? fallback;
    if (!editMode) return value;
    return <EditableText textKey={key} value={value} />;
  };
}

export function useSetting() {
  const { settings } = useContext(SiteTextsContext);
  return (key: string, fallback: string) => settings[key] || fallback;
}