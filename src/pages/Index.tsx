import { useState, useEffect } from 'react';
import Snowfall from '@/components/Snowfall';
import Header from '@/components/Header';
import DecorativeElements from '@/components/DecorativeElements';
import HeroSection from '@/components/HeroSection';
import ProductCatalog, { Product } from '@/components/ProductCatalog';
import AboutSection from '@/components/AboutSection';
import CallbackForm from '@/components/CallbackForm';
import ReviewsSection from '@/components/ReviewsSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';

const categories = ['Все', 'Для детей', 'Для женщин', 'Для мужчин', 'Для дома', 'Сладости'];

const products: Product[] = [
  { id: 1, name: 'Набор ёлочных игрушек "Золотая сказка"', price: 2500, category: 'Для дома', image: '/img/d7903f82-c5e2-48d6-b51c-b00f1d01832f.jpg', rating: 5, description: 'Премиальный набор из 12 стеклянных шаров' },
  { id: 2, name: 'Плюшевый медведь в новогоднем костюме', price: 1800, category: 'Для детей', image: '/img/dccd281c-fdab-454e-90f4-b15b0a011140.jpg', rating: 5, description: 'Мягкая игрушка ручной работы' },
  { id: 3, name: 'Подарочный набор косметики "Зимняя свежесть"', price: 3200, category: 'Для женщин', image: '/img/0b123a86-a3b3-4483-9f94-3d1fa2aa802d.jpg', rating: 4, description: 'Крем, маска и аромат в праздничной упаковке' },
  { id: 4, name: 'Кожаный кошелек в подарочной коробке', price: 4500, category: 'Для мужчин', image: '/placeholder.svg', rating: 5, description: 'Итальянская кожа, 8 отделений для карт' },
  { id: 5, name: 'Бельгийский шоколад "Новогодняя коллекция"', price: 1500, category: 'Сладости', image: '/placeholder.svg', rating: 5, description: '500г ассорти в подарочной упаковке' },
  { id: 6, name: 'Свеча ароматическая "Корица и апельсин"', price: 890, category: 'Для дома', image: '/placeholder.svg', rating: 4, description: 'Соевый воск, время горения 40 часов' },
  { id: 7, name: 'Конструктор LEGO "Новогодний поезд"', price: 5900, category: 'Для детей', image: '/placeholder.svg', rating: 5, description: '734 детали, с подсветкой и звуком' },
  { id: 8, name: 'Шелковый платок Hermès', price: 12000, category: 'Для женщин', image: '/placeholder.svg', rating: 5, description: 'Дизайнерский принт с новогодними мотивами' },
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', phone: '' });
    }, 3000);
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const newYear = new Date('2026-01-01T00:00:00');
      const now = new Date();
      const difference = newYear.getTime() - now.getTime();

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Все' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-yellow-50 relative overflow-hidden">
      <Snowfall />
      <DecorativeElements />
      <Header />
      <HeroSection countdown={countdown} />
      <ProductCatalog
        products={products}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        filteredProducts={filteredProducts}
      />
      <AboutSection />
      <CallbackForm
        formData={formData}
        setFormData={setFormData}
        formSubmitted={formSubmitted}
        handleSubmit={handleSubmit}
      />
      <ReviewsSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}