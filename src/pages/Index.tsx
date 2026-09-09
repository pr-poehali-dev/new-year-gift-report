import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductCatalog from '@/components/ProductCatalog';
import CompositionSection from '@/components/CompositionSection';
import AboutSection from '@/components/AboutSection';
import CorporateSection from '@/components/CorporateSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';
import CatalogModal from '@/components/CatalogModal';
import ScrollToTop from '@/components/ScrollToTop';

export default function Index() {
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);
  const [compositionModalOpen, setCompositionModalOpen] = useState(false);

  const scrollToContacts = () => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection onOpenCatalog={() => setCatalogModalOpen(true)} />
      <ProductCatalog onRequest={scrollToContacts} />
      <CompositionSection onOpenComposition={() => setCompositionModalOpen(true)} />
      <AboutSection />
      <CorporateSection onRequest={scrollToContacts} />
      <ReviewsSection />
      <ContactsSection />
      <Footer />

      <CatalogModal open={catalogModalOpen} onOpenChange={setCatalogModalOpen} type="catalog" />
      <CatalogModal open={compositionModalOpen} onOpenChange={setCompositionModalOpen} type="composition" />
      <ScrollToTop />
    </div>
  );
}
