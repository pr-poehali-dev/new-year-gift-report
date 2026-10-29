import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import func2url from '../../backend/func2url.json';
import EditableText from '@/components/EditableText';
import { loadWithFallback } from '@/lib/resilientFetch';
import { TEXT_STYLES_KEY, loadStyleFonts, parseTextStyles, styleToCss } from '@/lib/textStyles';

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

const CACHE_KEY = 'site_texts_cache_v1';

function readCache(): { values: Values; settings: Values } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw);
    return d && d.values && d.settings ? d : null;
  } catch {
    return null;
  }
}

interface Ctx {
  values: Values;
  settings: Values;
  loaded: boolean;
  editMode: boolean;
  setValue: (key: string, value: string) => void;
  reload: () => void;
}

const SiteTextsContext = createContext<Ctx>({
  values: {},
  settings: {},
  loaded: false,
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

export async function fetchSiteTexts(): Promise<{ values: Values; settings: Values } | null> {
  try {
    const d = await loadWithFallback<{ values?: Values; settings?: Values }>(
      TEXTS_URL,
      'texts',
      d => !!d?.values && Object.keys(d.values).length > 0,
    );
    return { values: d.values || {}, settings: d.settings || {} };
  } catch {
    return null;
  }
}

export function SiteTextsProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial?: { values: Values; settings: Values } | null;
}) {
  const [cached, setCached] = useState<{ values: Values; settings: Values } | null>(null);
  const [values, setValues] = useState<Values>(initial?.values || {});
  const [settings, setSettings] = useState<Values>(initial?.settings || {});
  const [loaded, setLoaded] = useState(!!initial);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (initial) {
      setCached(initial);
      return;
    }
    const c = readCache();
    if (c) {
      setValues(c.values);
      setSettings(c.settings);
      setLoaded(true);
      setCached(c);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reload = useCallback(() => {
    loadWithFallback<{ values?: Values; settings?: Values }>(
      TEXTS_URL,
      'texts',
      d => !!d?.values && Object.keys(d.values).length > 0,
    )
      .then(d => {
        setValues(d.values || {});
        setSettings(d.settings || {});
        setLoaded(true);
        applyTheme(d.settings || {});
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ values: d.values || {}, settings: d.settings || {} }));
        } catch {
          /* хранилище недоступно */
        }
        loadStyleFonts(parseTextStyles((d.settings || {})[TEXT_STYLES_KEY]));
      })
      .catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (cached) {
      applyTheme(cached.settings);
      loadStyleFonts(parseTextStyles(cached.settings[TEXT_STYLES_KEY]));
    }
  }, [cached]);

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
    <SiteTextsContext.Provider value={{ values, settings, loaded, editMode, setValue, reload }}>
      {children}
    </SiteTextsContext.Provider>
  );
}

export function useSiteContext() {
  return useContext(SiteTextsContext);
}

export const HIDDEN_KEYS = 'hidden.keys';

export function parseHidden(raw: string | undefined): string[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.filter(x => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function useVisible() {
  const { settings } = useContext(SiteTextsContext);
  const hidden = new Set(parseHidden(settings[HIDDEN_KEYS]));
  return (key: string) => !hidden.has(key);
}

export function useTextRaw() {
  const { values, settings } = useContext(SiteTextsContext);
  const hidden = new Set(parseHidden(settings[HIDDEN_KEYS]));
  return (key: string, fallback: string) => (hidden.has(key) ? '' : values[key] ?? fallback);
}

export function useTextStyle() {
  const { settings } = useContext(SiteTextsContext);
  const styles = parseTextStyles(settings[TEXT_STYLES_KEY]);
  return (key: string, withSize = true) => styleToCss(styles[key], withSize);
}

export function useText() {
  const { values, settings, editMode } = useContext(SiteTextsContext);
  const styles = parseTextStyles(settings[TEXT_STYLES_KEY]);
  const hidden = new Set(parseHidden(settings[HIDDEN_KEYS]));
  return (key: string, fallback: string): ReactNode => {
    if (hidden.has(key)) return null;
    const value = values[key] ?? fallback;
    const css = styleToCss(styles[key]);
    if (editMode) return <EditableText textKey={key} value={value} style={css} />;
    if (!css) return value;
    return (
      <span data-text-key={key} style={css}>
        {value}
      </span>
    );
  };
}

export function useSetting() {
  const { settings, loaded } = useContext(SiteTextsContext);
  return (key: string, fallback: string) => {
    if (!loaded && key.startsWith('img.') && !key.startsWith('img.logo')) return '';
    return settings[key] || fallback;
  };
}