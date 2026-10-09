import type { CSSProperties } from 'react';

export interface TextStyle {
  font?: string;
  size?: number;
  color?: string;
  weight?: string;
  italic?: boolean;
  upper?: boolean;
}

export type TextStyles = Record<string, TextStyle>;

export const TEXT_STYLES_KEY = 'text.styles';

export const STYLE_FONTS = [
  'Manrope',
  'Montserrat',
  'Rubik',
  'Golos Text',
  'Inter',
  'Nunito',
  'PT Sans',
  'Roboto',
  'Comfortaa',
  'Play',
  'Lobster',
  'Marck Script',
  'Pacifico',
  'Caveat',
  'Bad Script',
  'Amatic SC',
  'Oswald',
  'Playfair Display',
  'Russo One',
  'Neucha',
];

export const WEIGHTS = [
  { value: '', label: 'Как в дизайне' },
  { value: '400', label: 'Обычный' },
  { value: '600', label: 'Полужирный' },
  { value: '800', label: 'Жирный' },
  { value: '900', label: 'Очень жирный' },
];

export function parseTextStyles(raw: string | undefined): TextStyles {
  if (!raw) return {};
  try {
    const v = JSON.parse(raw);
    return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
  } catch {
    return {};
  }
}

export function isEmptyStyle(s?: TextStyle): boolean {
  if (!s) return true;
  return !s.font && !s.color && !s.weight && !s.italic && !s.upper && (!s.size || s.size === 100);
}

export function styleToCss(s?: TextStyle, withSize = true): CSSProperties | undefined {
  if (isEmptyStyle(s) || !s) return undefined;
  const css: CSSProperties = {};
  if (s.font) css.fontFamily = `'${s.font}', sans-serif`;
  if (s.color) {
    css.color = s.color;
    css.WebkitTextFillColor = s.color;
  }
  if (s.weight) css.fontWeight = Number(s.weight);
  if (s.italic) css.fontStyle = 'italic';
  if (s.upper) css.textTransform = 'uppercase';
  if (withSize && s.size && s.size !== 100) css.fontSize = `${s.size}%`;
  return css;
}

export function loadStyleFonts(styles: TextStyles) {
  const families = Array.from(new Set(Object.values(styles).map(s => s.font).filter(Boolean))) as string[];
  const id = 'text-style-fonts';
  let link = document.getElementById(id) as HTMLLinkElement | null;
  if (!families.length) {
    link?.remove();
    return;
  }
  if (!link) {
    link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  const query = families.map(f => `family=${f.replace(/ /g, '+')}`).join('&');
  const href = `https://fonts.googleapis.com/css2?${query}&display=swap`;
  if (link.href !== href) link.href = href;
}

export function loadFontPreview(families: string[]) {
  const id = 'text-style-fonts-preview';
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?${families
    .map(f => `family=${f.replace(/ /g, '+')}`)
    .join('&')}&display=swap`;
  document.head.appendChild(link);
}
