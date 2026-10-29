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
  | { type: 'bignum'; key: string }
  | { type: 'form'; items: [string, string][] }
  | { type: 'reviews'; items: [string, string, string][] };

export interface SectionLayout {
  icon: string;
  dark?: boolean;
  bgImage?: string;
  links?: { tab: string; label: string; icon: string }[];
  left: Group[];
  right?: Group[];
  bottom?: Group[];
}

export const SECTION_LAYOUTS: Record<string, SectionLayout> = {
  'Шапка сайта': {
    icon: 'PanelTop',
    left: [
      { type: 'image', key: 'img.logo', label: 'Логотип в шапке' },
    ],
    right: [
      { type: 'contacts', items: [{ key: 'head.hours', icon: 'Clock' }] },
      { type: 'buttons', keys: ['head.btn', 'head.btnShort'] },
      { type: 'list', title: 'Пункты меню (шапка и подвал)', keys: ['nav.home', 'nav.advantages', 'nav.catalog', 'nav.composition', 'nav.corporate', 'nav.reviews', 'nav.contacts'] },
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
      { type: 'note', title: 'Подпись под кнопкой каталога', keys: ['hero.btn2Sub'] },
    ],
    right: [
      { type: 'image', key: 'img.heroBg', label: 'Праздничный фон блока', tall: true },
      { type: 'file', key: 'file.catalog', label: 'Каталог для скачивания' },
    ],
  },
  'Преимущества': {
    icon: 'BadgeCheck',
    left: [
      { type: 'title', keys: ['adv.big1', 'adv.big2'] },
      { type: 'text', key: 'adv.lead' },
      { type: 'eyebrow', key: 'adv.eyebrow' },
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
    left: [{ type: 'title', keys: ['catalog.title'] }],
    right: [
      { type: 'buttons', keys: ['catalog.btn'] },
      { type: 'text', key: 'catalog.btnNote' },
      { type: 'note', title: 'Метка на распроданном подарке', keys: ['catalog.soldOut'] },
    ],
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
      { type: 'list', title: 'Пункт под весом', keys: ['comp.cert'] },
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
    right: [{ type: 'image', key: 'img.corporate', label: 'Картинка блока (общая с «Организациям»)', tall: true }],
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
    right: [{ type: 'note', title: 'Плашка рядом с заголовком', keys: ['corp.circle', 'corp.circleSub'] }],
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
    links: [{ tab: 'Отзывы покупателей', label: 'Отзывы покупателей', icon: 'MessageSquareHeart' }],
    left: [
      { type: 'eyebrow', key: 'rev.eyebrow' },
      { type: 'title', keys: ['rev.title'] },
    ],
    right: [{ type: 'buttons', keys: ['rev.btn', 'rev.btnAll'] }],
    bottom: [
      {
        type: 'reviews',
        items: [
          ['rev.s1n', 'rev.s1r', 'rev.s1x'],
          ['rev.s2n', 'rev.s2r', 'rev.s2x'],
          ['rev.s3n', 'rev.s3r', 'rev.s3x'],
        ],
      },
    ],
  },
  'Контакты': {
    icon: 'Phone',
    bgImage: 'img.contactsBg',
    left: [
      { type: 'eyebrow', key: 'cont.eyebrow' },
      { type: 'title', keys: ['cont.title'] },
      { type: 'text', key: 'cont.text' },
      { type: 'list', title: 'Преимущества', keys: ['cont.perk1', 'cont.perk2', 'cont.perk3'] },
      { type: 'note', title: 'Подпись перед телефоном', keys: ['cont.callText'] },
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
      { type: 'form', items: [['cont.fName', 'cont.fNamePh'], ['cont.fPhone', ''], ['cont.fAmount', 'cont.fAmountPh']] },
      { type: 'buttons', keys: ['cont.formBtn'] },
      { type: 'text', key: 'cont.consent' },
      { type: 'image', key: 'img.contactsBg', label: 'Праздничный фон блока' },
    ],
  },
  'Подвал': {
    icon: 'PanelBottom',
    dark: true,
    left: [
      { type: 'image', key: 'img.logoLight', label: 'Логотип в подвале' },
      { type: 'text', key: 'foot.tagline' },
      { type: 'note', title: 'Заголовки колонок', keys: ['foot.navTitle', 'foot.contactsTitle'] },
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
    case 'form':
      return g.items.flat().filter(Boolean);
    case 'reviews':
      return g.items.flat();
    default:
      return [];
  }
}
