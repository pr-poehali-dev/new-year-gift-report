export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
}

export const categories = ['Все', 'Для детей', 'Для женщин', 'Для мужчин', 'Для дома', 'Сладости'];

export const categoryStyles: Record<string, { icon: string; wrapper: string; price: string }> = {
  'Для детей': { icon: 'Gift', wrapper: 'from-primary/10 to-red-100', price: 'text-primary' },
  'Для женщин': { icon: 'Sparkles', wrapper: 'from-pink-100 to-purple-100', price: 'text-pink-600' },
  'Для мужчин': { icon: 'Briefcase', wrapper: 'from-blue-100 to-indigo-100', price: 'text-blue-600' },
  'Для дома': { icon: 'Home', wrapper: 'from-yellow-100 to-orange-100', price: 'text-orange-600' },
  'Сладости': { icon: 'Candy', wrapper: 'from-green-100 to-emerald-100', price: 'text-green-600' },
};

export const products: Product[] = [
  { id: 1, name: 'Набор ёлочных игрушек "Золотая сказка"', price: 2500, category: 'Для дома', image: '/img/d7903f82-c5e2-48d6-b51c-b00f1d01832f.jpg', rating: 5, description: 'Премиальный набор из 12 стеклянных шаров' },
  { id: 2, name: 'Плюшевый медведь в новогоднем костюме', price: 1800, category: 'Для детей', image: '/img/dccd281c-fdab-454e-90f4-b15b0a011140.jpg', rating: 5, description: 'Мягкая игрушка ручной работы' },
  { id: 3, name: 'Подарочный набор косметики "Зимняя свежесть"', price: 3200, category: 'Для женщин', image: '/img/0b123a86-a3b3-4483-9f94-3d1fa2aa802d.jpg', rating: 4, description: 'Крем, маска и аромат в праздничной упаковке' },
  { id: 4, name: 'Кожаный кошелек в подарочной коробке', price: 4500, category: 'Для мужчин', image: '/placeholder.svg', rating: 5, description: 'Итальянская кожа, 8 отделений для карт' },
  { id: 5, name: 'Бельгийский шоколад "Новогодняя коллекция"', price: 1500, category: 'Сладости', image: '/placeholder.svg', rating: 5, description: '500г ассорти в подарочной упаковке' },
  { id: 6, name: 'Свеча ароматическая "Корица и апельсин"', price: 890, category: 'Для дома', image: '/placeholder.svg', rating: 4, description: 'Соевый воск, время горения 40 часов' },
  { id: 7, name: 'Конструктор LEGO "Новогодний поезд"', price: 5900, category: 'Для детей', image: '/placeholder.svg', rating: 5, description: '734 детали, с подсветкой и звуком' },
  { id: 8, name: 'Шелковый платок Hermès', price: 12000, category: 'Для женщин', image: '/placeholder.svg', rating: 5, description: 'Дизайнерский принт с новогодними мотивами' },
];
