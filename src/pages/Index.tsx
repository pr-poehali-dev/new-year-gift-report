import { useState, useEffect } from 'react';
import Snowfall from '@/components/Snowfall';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductCatalog from '@/components/ProductCatalog';
import ReviewsSection from '@/components/ReviewsSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';
import CatalogModal from '@/components/CatalogModal';
import ScrollToTop from '@/components/ScrollToTop';
import { products, categories } from '@/data/products';

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);
  const [compositionModalOpen, setCompositionModalOpen] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-50 to-red-100 relative">
      <Snowfall />
      <Header />
      <HeroSection 
        countdown={countdown} 
        onOpenCatalog={() => setCatalogModalOpen(true)}
        onOpenComposition={() => setCompositionModalOpen(true)}
      />
      <ProductCatalog
        products={products}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        filteredProducts={filteredProducts}
      />
      <ReviewsSection />
      <ContactsSection />
      <Footer />
      
      <CatalogModal 
        open={catalogModalOpen} 
        onOpenChange={setCatalogModalOpen}
        type="catalog"
      />
      <CatalogModal 
        open={compositionModalOpen} 
        onOpenChange={setCompositionModalOpen}
        type="composition"
      />
      <ScrollToTop />
    </div>
  );
}