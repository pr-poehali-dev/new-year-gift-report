export type Group =
  | { type: 'pill'; key: string }
  | { type: 'eyebrow'; key: string }
  | { type: 'title'; keys: string[]; accentKeys?: string[] }
  | { type: 'text'; key: string }
  | { type: 'buttons'; keys: string[] }
  | { type: 'stats'; title?: string; pairs: [string, string][] }
  | { type: 'cards'; title?: string; pairs: [string, string][] }
  | { type: 'list'; title?: string; keys: string[] }
  | { type: 'contacts'; items: { key: string; icon: string }[] }
  | { type: 'circle'; value: string; sub: string }
  | { type: 'note'; title: string; keys: string[] }
  | { type: 'image'; key: string; label: string; tall?: boolean }
  | { type: 'file'; key: string; label: string }
  | { type: 'bignum'; key: string };

export interface SectionLayout {
  icon: string;
  dark?: boolean;
  bgImage?: string;
  links?: { tab: string; label: string; icon: string }[];
  left: Group[];
  right?: Group[];
}

export const SECTION_LAYOUTS: Record<string, SectionLayout> = {
  'Шапка сайта': {
    icon: 'PanelTop',
    left: [
      { type: 'note', title: 'Бегущая строка', keys: ['head.slogan'] },
      { type: 'image', key: 'img.logo', label: 'Логотип в шапке' },
      { type: 'text', key: 'head.sub' },
    ],
    right: [
      { type: 'contacts', items: [{ key: 'head.hours', icon: 'Clock' }] },
      { type: 'buttons', keys: ['head.btn'] },
    ],
  },
  'Первый экран': {
    icon: 'Sparkles',
    dark: true,
    bgImage: 'img.heroBg',
    left: [
      { type: 'pill', key: 'hero.badge' },
      { type: 'title', keys: ['hero.title1'], accentKeys: ['hero.title2'] },
      { type: 'text', key: 'hero.text' },
      { type: 'buttons', keys: ['hero.btn1', 'hero.btn2'] },
      {
        type: 'stats',
        pairs: [
          ['hero.stat1v', 'hero.stat1l'],
          ['hero.stat2v', 'hero.stat2l'],
          ['hero.stat3v', 'hero.stat3l'],
        ],
      },
    ],
    right: [
      { type: 'image', key: 'img.hero', label: 'Главное фото', tall: true },
      { type: 'circle', value: 'hero.price', sub: 'hero.priceSub' },
      { type: 'note', title: 'Плашка на фото', keys: ['hero.cardTitle', 'hero.cardText'] },
      { type: 'image', key: 'img.heroBg', label: 'Праздничный фон блока' },
      { type: 'file', key: 'file.catalog', label: 'Каталог для скачивания' },
    ],
  },
  'Преимущества': {
    icon: 'BadgeCheck',
    left: [
      {
        type: 'cards',
        pairs: [
          ['adv.1t', 'adv.1x'],
          ['adv.2t', 'adv.2x'],
          ['adv.3t', 'adv.3x'],
          ['adv.4t', 'adv.4x'],
        ],
      },
    ],
  },
  'Каталог подарков': {
    icon: 'Gift',
    links: [
      { tab: 'Подарки в каталоге', label: 'Подарки в каталоге', icon: 'Gift' },
      { tab: 'Кнопки фильтра', label: 'Кнопки фильтра', icon: 'SlidersHorizontal' },
    ],
    left: [
      { type: 'eyebrow', key: 'catalog.eyebrow' },
      { type: 'title', keys: ['catalog.title'] },
    ],
    right: [{ type: 'text', key: 'catalog.text' }, { type: 'buttons', keys: ['catalog.btn'] }, { type: 'text', key: 'catalog.btnNote' }],
  },
  'Упаковка': {
    icon: 'Package',
    links: [{ tab: 'Виды упаковки', label: 'Виды упаковки', icon: 'Package' }],
    left: [
      { type: 'eyebrow', key: 'pack.eyebrow' },
      { type: 'title', keys: ['pack.title'] },
    ],
  },
  'Состав': {
    icon: 'Candy',
    bgImage: 'img.compositionBg',
    links: [{ tab: 'Состав подарков', label: 'Наборы конфет', icon: 'Candy' }],
    left: [
      { type: 'eyebrow', key: 'comp.eyebrow' },
      { type: 'title', keys: ['comp.title'] },
      { type: 'text', key: 'comp.text' },
      { type: 'buttons', keys: ['comp.btn'] },
    ],
    right: [
      { type: 'image', key: 'img.composition', label: 'Фото в блоке', tall: true },
      { type: 'circle', value: 'comp.badge', sub: 'comp.badgeSub' },
      { type: 'image', key: 'img.compositionBg', label: 'Праздничный фон блока' },
    ],
  },
  'О компании': {
    icon: 'Info',
    dark: true,
    left: [
      { type: 'bignum', key: 'about.bignum' },
      { type: 'eyebrow', key: 'about.eyebrow' },
      { type: 'title', keys: ['about.title'] },
      { type: 'text', key: 'about.text' },
    ],
    right: [
      {
        type: 'stats',
        pairs: [
          ['about.s1v', 'about.s1l'],
          ['about.s2v', 'about.s2l'],
          ['about.s3v', 'about.s3l'],
          ['about.s4v', 'about.s4l'],
        ],
      },
    ],
  },
  'Организациям': {
    icon: 'Building2',
    left: [
      { type: 'pill', key: 'corp.badge' },
      { type: 'title', keys: ['corp.title'] },
      { type: 'text', key: 'corp.text' },
      { type: 'list', keys: ['corp.b1', 'corp.b2', 'corp.b3', 'corp.b4'] },
      { type: 'buttons', keys: ['corp.btn'] },
    ],
    right: [
      { type: 'image', key: 'img.corporate', label: 'Картинка блока', tall: true },
      { type: 'circle', value: 'corp.circle', sub: 'corp.circleSub' },
    ],
  },
  'Как заказать': {
    icon: 'ListOrdered',
    left: [
      { type: 'eyebrow', key: 'steps.eyebrow' },
      { type: 'title', keys: ['steps.title'] },
      {
        type: 'cards',
        pairs: [
          ['steps.1t', 'steps.1x'],
          ['steps.2t', 'steps.2x'],
          ['steps.3t', 'steps.3x'],
          ['steps.4t', 'steps.4x'],
        ],
      },
    ],
  },
  'Отзывы': {
    icon: 'MessageSquareQuote',
    left: [
      { type: 'eyebrow', key: 'rev.eyebrow' },
      { type: 'title', keys: ['rev.title'] },
    ],
    right: [{ type: 'buttons', keys: ['rev.btn', 'rev.btnAll'] }],
  },
  'Контакты': {
    icon: 'Phone',
    bgImage: 'img.contactsBg',
    left: [
      { type: 'eyebrow', key: 'cont.eyebrow' },
      { type: 'title', keys: ['cont.title'] },
      { type: 'text', key: 'cont.text' },
      {
        type: 'contacts',
        items: [
          { key: 'cont.phone', icon: 'Phone' },
          { key: 'cont.email', icon: 'Mail' },
          { key: 'cont.address', icon: 'MapPin' },
        ],
      },
    ],
    right: [
      { type: 'note', title: 'Форма заявки', keys: ['cont.formTitle', 'cont.formText'] },
      { type: 'buttons', keys: ['cont.formBtn'] },
      { type: 'image', key: 'img.contactsBg', label: 'Праздничный фон блока' },
    ],
  },
  'Подвал': {
    icon: 'PanelBottom',
    dark: true,
    left: [
      { type: 'image', key: 'img.logoLight', label: 'Логотип в подвале' },
      { type: 'text', key: 'foot.tagline' },
    ],
    right: [
      { type: 'note', title: 'Реквизиты', keys: ['foot.requisites'] },
      { type: 'text', key: 'foot.copyright' },
    ],
  },
};

export function groupKeys(g: Group): string[] {
  switch (g.type) {
    case 'pill':
    case 'eyebrow':
    case 'text':
    case 'bignum':
      return [g.key];
    case 'title':
      return [...g.keys, ...(g.accentKeys || [])];
    case 'buttons':
    case 'list':
    case 'note':
      return g.keys;
    case 'stats':
    case 'cards':
      return g.pairs.flat();
    case 'contacts':
      return g.items.map(i => i.key);
    case 'circle':
      return [g.value, g.sub];
    default:
      return [];
  }
}
