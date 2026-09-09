export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
  weight: string;
  badge?: string;
}

export const categories = ['Все подарки', 'Картон', 'Жесть', 'Текстиль', 'Дерево'];

export const products: Product[] = [
  {
    id: 1,
    name: 'Снежная сказка',
    price: 590,
    category: 'Картон',
    weight: '700 г',
    image: 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/8abe0ce8-5af4-4be9-a3ff-150aa85191ff.jpg',
    rating: 5,
    badge: 'ХИТ',
    description: 'Яркая коробка и любимые конфеты российских фабрик',
  },
  {
    id: 2,
    name: 'Зимний экспресс',
    price: 790,
    category: 'Картон',
    weight: '1000 г',
    image: 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/8abe0ce8-5af4-4be9-a3ff-150aa85191ff.jpg',
    rating: 5,
    badge: 'ДЕТЯМ',
    description: 'Большой праздничный набор с ассорти сладостей',
  },
  {
    id: 3,
    name: 'Изумрудный праздник',
    price: 1190,
    category: 'Жесть',
    weight: '1000 г',
    image: 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/09b7b378-4e3b-4292-af98-6788e823b49c.jpg',
    rating: 5,
    badge: 'ПРЕМИУМ',
    description: 'Подарочная жестяная упаковка, которую хочется сохранить',
  },
  {
    id: 4,
    name: 'Северное сияние',
    price: 1690,
    category: 'Дерево',
    weight: '1500 г',
    image: 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/fc6902a7-42ba-4867-a845-63f7a8cb4e1d.jpg',
    rating: 5,
    badge: 'НОВИНКА',
    description: 'Солидный подарок для семьи, коллег и партнёров',
  },
  {
    id: 5,
    name: 'Мешок чудес',
    price: 690,
    category: 'Текстиль',
    weight: '700 г',
    image: 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/d367959e-76e4-4618-be72-b36b9524de2e.jpg',
    rating: 5,
    badge: 'ЛЮБИМЫЙ',
    description: 'Мягкий праздничный рюкзачок со сладким наполнением',
  },
  {
    id: 6,
    name: 'Золотая ночь',
    price: 1490,
    category: 'Жесть',
    weight: '1000 г',
    image: 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/8e04a134-6c5d-46c9-a838-d5113f6a7ab4.jpg',
    rating: 5,
    badge: 'ВЫГОДНО',
    description: 'Много сладостей в эффектной новогодней упаковке',
  },
];

export const packagingTypes = [
  { name: 'Картон', icon: 'Gift', description: 'Лёгкие яркие коробки для детских праздников', bg: 'bg-rose-50' },
  { name: 'Жесть', icon: 'Sparkles', description: 'Нарядная упаковка, которая останется на память', bg: 'bg-emerald-50' },
  { name: 'Текстиль', icon: 'ShoppingBag', description: 'Мягкие рюкзачки, мешочки и игрушки', bg: 'bg-amber-50' },
  { name: 'Дерево', icon: 'TreePine', description: 'Премиальные подарки для близких и партнёров', bg: 'bg-indigo-50' },
];

export const compositions: Record<string, string[]> = {
  '700 г': ['25–30 конфет', 'Карамель и мини-батончики', 'Шоколадные и вафельные конфеты', 'Сертификат качества'],
  '1000 г': ['35–40 конфет', 'Шоколадные батончики премиум', 'Печенье и вафли', 'Сертификат качества'],
  '1500 г': ['50–55 конфет', 'Шоколад плиточный 2 шт', 'Мармелад и зефир', 'Сертификат качества'],
};

export const heroImage = 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/95ad02e2-604a-4bc7-b8e9-daf29f4a36d5.jpg';
export const compositionImage = 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/95ad02e2-604a-4bc7-b8e9-daf29f4a36d5.jpg';
export const corporateImage = 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/8e04a134-6c5d-46c9-a838-d5113f6a7ab4.jpg';
