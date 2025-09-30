import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-primary/20 shadow-lg">
      <div className="bg-gradient-to-r from-primary to-red-700 text-white py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+79123456789" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Icon name="Phone" size={16} />
              <span className="font-semibold">+7 (912) 345-67-89</span>
            </a>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/79123456789" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Icon name="MessageCircle" size={18} />
              </a>
              <a href="https://t.me/chebpodarki" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Icon name="Send" size={18} />
              </a>
              <a href="https://vk.com/chebpodarki" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Icon name="Share2" size={18} />
              </a>
            </div>
          </div>
          <a href="/catalog.pdf" download="Каталог_Чеб_Подарки.pdf">
            <Button size="sm" variant="secondary" className="font-semibold">
              <Icon name="Download" size={16} className="mr-2" />
              Скачать каталог
            </Button>
          </a>
        </div>
      </div>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 animate-bounce" style={{animationDuration: '2s'}}>
              <img 
                src="https://cdn.poehali.dev/files/14d570ca-89a2-4c95-b32a-9cde0aff7ba9.png" 
                alt="Чеб Подарки"
                className="w-full h-full object-contain animate-pulse"
                style={{animationDuration: '3s'}}
              />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Чеб Подарки
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">Главная</a>
            <a href="#catalog" className="text-foreground hover:text-primary transition-colors font-medium">Ассортимент</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">О нас</a>
            <a href="#reviews" className="text-foreground hover:text-primary transition-colors font-medium">Отзывы</a>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors font-medium">Контакты</a>
          </div>
        </div>
      </nav>
    </header>
  );
}