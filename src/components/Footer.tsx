import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary to-red-700 text-white py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Icon name="Gift" size={32} />
          <span className="text-2xl font-bold">Чеб Подарки</span>
        </div>
        <p className="text-white/80">© 2025 Все права защищены. Дарим радость с 2010 года!</p>
      </div>
    </footer>
  );
}