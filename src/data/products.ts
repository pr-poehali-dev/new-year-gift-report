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

export const categories = ['Все подарки', 'Картон', 'Текстиль', 'Мешочек', 'Дерево'];

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


export const heroImage = 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/ffc70d06-2ecc-4118-a570-1e0b6d74e314.jpg';
export const compositionImage = 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/43e6209c-5f53-429d-8e9a-947f7ca4f1df.jpg';
export const corporateImage = 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/ea465069-c16f-4f60-9a77-b455fefdc2c0.jpg';
export const heroBgImage = 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/9f658aa5-3c93-4fe7-adaa-2610566eef2a.jpg';
export const villageBgImage = 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/c83912e3-6c1f-4afe-b3a1-0708562c88c6.jpg';