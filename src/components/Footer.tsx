import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-700 via-primary to-red-700 text-white py-6 sm:py-8 mt-8 sm:mt-16">
      <div className="px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
          <div className="relative w-8 h-8 sm:w-12 sm:h-12 animate-bounce" style={{animationDuration: '2s'}}>
            <img 
              src="https://cdn.poehali.dev/files/14d570ca-89a2-4c95-b32a-9cde0aff7ba9.png" 
              alt="Чеб Подарки"
              className="w-full h-full object-contain animate-pulse brightness-0 invert"
              style={{animationDuration: '3s'}}
            />
          </div>
          <span className="text-lg sm:text-2xl font-bold">Чеб Подарки</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-4 text-sm sm:text-base">
          <a href="tel:+79123456789" className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity">
            <Icon name="Phone" size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="font-semibold">+7 (912) 345-67-89</span>
          </a>
          <a href="https://wa.me/79123456789" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity">
            <Icon name="MessageCircle" size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="font-semibold">WhatsApp</span>
          </a>
          <a href="https://t.me/chebpodarki" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity">
            <Icon name="Send" size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="font-semibold">Telegram</span>
          </a>
          <a href="https://vk.com/chebpodarki" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity">
            <Icon name="Share2" size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="font-semibold">VK</span>
          </a>
        </div>
        <p className="text-white/80 text-xs sm:text-base px-2">© 2025 Все права защищены. Дарим радость с 2010 года!</p>
      </div>
    </footer>
  );
}