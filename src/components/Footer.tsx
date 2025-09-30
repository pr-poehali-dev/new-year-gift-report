import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary to-red-700 text-white py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative w-12 h-12 animate-bounce" style={{animationDuration: '2s'}}>
            <img 
              src="https://cdn.poehali.dev/files/14d570ca-89a2-4c95-b32a-9cde0aff7ba9.png" 
              alt="Чеб Подарки"
              className="w-full h-full object-contain animate-pulse"
              style={{animationDuration: '3s'}}
            />
          </div>
          <span className="text-2xl font-bold">Чеб Подарки</span>
        </div>
        <p className="text-white/80">© 2025 Все права защищены. Дарим радость с 2010 года!</p>
      </div>
    </footer>
  );
}