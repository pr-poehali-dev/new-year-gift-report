import { ReactNode, useState } from 'react';
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
import { useSiteContext } from '@/hooks/useSiteTexts';
import { parseBlocks } from '@/lib/siteConfig';

export default function Index() {
  const [compositionModalOpen, setCompositionModalOpen] = useState(false);
  const [compositionWeight, setCompositionWeight] = useState<string>();
  const { settings } = useSiteContext();
  const blocks = parseBlocks(settings['page.blocks']);

  const scrollToContacts = () => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });

  const render: Record<string, ReactNode> = {
    hero: <HeroSection />,
    catalog: <ProductCatalog onRequest={scrollToContacts} />,
    composition: <CompositionSection onOpenComposition={w => { setCompositionWeight(w); setCompositionModalOpen(true); }} />,
    about: <AboutSection />,
    corporate: <CorporateSection onRequest={scrollToContacts} />,
    reviews: <ReviewsSection />,
    contacts: <ContactsSection />,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {blocks.filter(b => b.enabled).map(b => (
        <div key={b.id}>{render[b.id]}</div>
      ))}
      <Footer />

      <CatalogModal open={compositionModalOpen} onOpenChange={setCompositionModalOpen} type="composition" weight={compositionWeight} />
      <ScrollToTop />
    </div>
  );
}
