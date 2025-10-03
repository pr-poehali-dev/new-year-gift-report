import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-primary/20 shadow-lg">
      <div className="bg-gradient-to-r from-red-700 via-primary to-red-700 text-white py-2 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 sm:gap-6">
            <a href="tel:+79123456789" className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity">
              <Icon name="Phone" size={14} className="sm:w-4 sm:h-4" />
              <span className="font-semibold hidden sm:inline">+7 (912) 345-67-89</span>
              <span className="font-semibold sm:hidden">Позвонить</span>
            </a>
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="https://wa.me/79123456789" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity flex items-center gap-1">
                <Icon name="MessageCircle" size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="font-semibold hidden md:inline">WhatsApp</span>
              </a>
              <a href="https://t.me/chebpodarki" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Icon name="Send" size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="https://vk.com/chebpodarki" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Icon name="Share2" size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
            </div>
          </div>
          <a href="/catalog.pdf" download="Каталог_Чеб_Подарки.pdf" className="hidden sm:block">
            <Button size="sm" variant="secondary" className="font-semibold text-xs">
              <Icon name="Download" size={14} className="mr-1 sm:mr-2" />
              <span className="hidden md:inline">Скачать каталог</span>
              <span className="md:hidden">Каталог</span>
            </Button>
          </a>
        </div>
      </div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative w-8 h-8 sm:w-12 sm:h-12 animate-bounce" style={{animationDuration: '2s'}}>
              <img 
                src="https://cdn.poehali.dev/files/14d570ca-89a2-4c95-b32a-9cde0aff7ba9.png" 
                alt="Чеб Подарки"
                className="w-full h-full object-contain animate-pulse"
                style={{animationDuration: '3s'}}
              />
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-red-600">
              Чеб Подарки
            </h1>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <a href="/" className="text-foreground hover:text-primary transition-colors font-medium">Главная</a>
            <a href="/#catalog" onClick={(e) => handleAnchorClick(e, 'catalog')} className="text-foreground hover:text-primary transition-colors font-medium">Ассортимент</a>
            <a href="/about" className="text-foreground hover:text-primary transition-colors font-medium">О нас</a>
            <a href="/#reviews" onClick={(e) => handleAnchorClick(e, 'reviews')} className="text-foreground hover:text-primary transition-colors font-medium">Отзывы</a>
            <a href="/#contacts" onClick={(e) => handleAnchorClick(e, 'contacts')} className="text-foreground hover:text-primary transition-colors font-medium">Контакты</a>
            <a href="/callback">
              <Button className="ml-4">
                <Icon name="Phone" size={16} className="mr-2" />
                Заказать звонок
              </Button>
            </a>
          </div>
          <a href="/callback" className="lg:hidden">
            <Button size="sm" className="text-xs px-3 py-2">
              Заказать звонок
            </Button>
          </a>
        </div>
      </nav>
    </header>
  );
}