export type SortKey = 'default' | 'asc' | 'desc';

export interface SortOption {
  key: SortKey;
  label: string;
  enabled: boolean;
}

export interface CatalogFilters {
  showAll: boolean;
  allLabel: string;
  categories: string[];
  showSort: boolean;
  sorts: SortOption[];
}

export interface PageBlock {
  id: string;
  enabled: boolean;
}

export const DEFAULT_FILTERS: CatalogFilters = {
  showAll: true,
  allLabel: 'Все подарки',
  categories: ['Картон', 'Текстиль', 'Мешочек', 'Дерево'],
  showSort: true,
  sorts: [
    { key: 'default', label: 'Сначала популярные', enabled: true },
    { key: 'asc', label: 'Сначала дешевле', enabled: true },
    { key: 'desc', label: 'Сначала дороже', enabled: true },
  ],
};

export const BLOCKS_META: Record<string, { title: string; icon: string; section: string }> = {
  hero: { title: 'Первый экран', icon: 'Sparkles', section: 'Первый экран' },
  catalog: { title: 'Каталог подарков', icon: 'Gift', section: 'Каталог подарков' },
  composition: { title: 'Состав', icon: 'Candy', section: 'Состав' },
  about: { title: 'О компании', icon: 'Info', section: 'О компании' },
  corporate: { title: 'Организациям', icon: 'Building2', section: 'Организациям' },
  reviews: { title: 'Отзывы', icon: 'MessageSquareQuote', section: 'Отзывы' },
  contacts: { title: 'Контакты', icon: 'Phone', section: 'Контакты' },
};

export const DEFAULT_BLOCKS: PageBlock[] = Object.keys(BLOCKS_META).map(id => ({ id, enabled: true }));

function parse<T>(raw: string | undefined): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function parseFilters(raw: string | undefined): CatalogFilters {
  const p = parse<Partial<CatalogFilters>>(raw);
  if (!p) return DEFAULT_FILTERS;
  return {
    ...DEFAULT_FILTERS,
    ...p,
    categories: Array.isArray(p.categories) ? p.categories : DEFAULT_FILTERS.categories,
    sorts: Array.isArray(p.sorts) ? p.sorts : DEFAULT_FILTERS.sorts,
  };
}

export function parseBlocks(raw: string | undefined): PageBlock[] {
  const p = parse<PageBlock[]>(raw);
  if (!Array.isArray(p)) return DEFAULT_BLOCKS;
  const known = p.filter(b => BLOCKS_META[b.id]);
  const missing = DEFAULT_BLOCKS.filter(d => !known.some(b => b.id === d.id));
  return [...known, ...missing];
}

export interface PackagingType {
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const PACKAGING_COLORS: Record<string, { bg: string; label: string }> = {
  rose: { bg: 'bg-rose-50', label: 'Розовый' },
  amber: { bg: 'bg-amber-50', label: 'Жёлтый' },
  indigo: { bg: 'bg-indigo-50', label: 'Синий' },
  emerald: { bg: 'bg-emerald-50', label: 'Зелёный' },
  sky: { bg: 'bg-sky-50', label: 'Голубой' },
  violet: { bg: 'bg-violet-50', label: 'Фиолетовый' },
};

export const PACKAGING_ICONS = ['Gift', 'ShoppingBag', 'Package', 'Gem', 'Box', 'Backpack', 'TreePine', 'Candy', 'Star', 'Snowflake', 'Crown', 'Heart'];

export const DEFAULT_PACKAGING: PackagingType[] = [
  { name: 'Картон', icon: 'Gift', description: 'Лёгкие яркие коробки для детских праздников', color: 'rose' },
  { name: 'Текстиль', icon: 'ShoppingBag', description: 'Мягкие рюкзачки и игрушки', color: 'amber' },
  { name: 'Футляр', icon: 'Package', description: 'Тубы и футляры с золотым тиснением', color: 'indigo' },
  { name: 'Мешочки', icon: 'Gem', description: 'Нарядные мешочки со сладостями', color: 'emerald' },
];

export function parsePackaging(raw: string | undefined): PackagingType[] {
  const p = parse<PackagingType[]>(raw);
  return Array.isArray(p) ? p : DEFAULT_PACKAGING;
}

export interface CompositionSet {
  weight: string;
  candies: string;
  image: string;
}

export const DEFAULT_COMPOSITION: CompositionSet[] = [
  { weight: '700 г', candies: '25–30 конфет', image: '/sostav/700.jpg' },
  { weight: '1000 г', candies: '35–40 конфет', image: '/sostav/1000.jpg' },
  { weight: '1500 г', candies: '50–55 конфет', image: '/sostav/1500.jpg' },
];

export function parseComposition(raw: string | undefined): CompositionSet[] {
  const p = parse<CompositionSet[]>(raw);
  return Array.isArray(p) && p.length ? p : DEFAULT_COMPOSITION;
}
