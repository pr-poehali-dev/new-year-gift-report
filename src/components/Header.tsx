import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Подарки', id: 'catalog' },
  { label: 'Состав', id: 'composition' },
  { label: 'Организациям', id: 'corporate' },
  { label: 'О нас', id: 'about' },
  { label: 'Контакты', id: 'contacts' },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-white text-[11px] sm:text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2 text-center font-semibold tracking-wide">
          ★ Коллекция к Новому 2027 году уже открыта — раннее бронирование для организаций
        </div>
      </div>

      <div className="bg-cream/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/logo.png" alt="ЧЕБподарки" className="h-11 sm:h-14 w-auto" />
            <div className="leading-tight hidden sm:block">
              <div className="font-extrabold text-base sm:text-lg text-forest">
                <span className="text-primary">ЧЕБ</span>подарки
              </div>
              <div className="text-[9px] sm:text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                Сладкий Новый год
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-forest">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                onClick={e => handleAnchorClick(e, link.id)}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden xl:block text-right leading-tight">
              <div className="text-[10px] text-muted-foreground">Ежедневно 9:00–19:00</div>
              <a href="tel:+79093020077" className="font-bold text-forest text-sm">+7 909 302-00-77</a>
            </div>
            <a href="/#contacts" onClick={e => handleAnchorClick(e, 'contacts')} className="hidden sm:block">
              <Button className="rounded-full font-bold px-5">Заказать звонок</Button>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center"
              aria-label="Меню"
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-cream px-4 py-3 flex flex-col gap-1">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                onClick={e => handleAnchorClick(e, link.id)}
                className="py-2.5 font-semibold text-forest border-b border-border/60 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a href="tel:+79093020077" className="py-2.5 font-bold text-primary">+7 909 302-00-77</a>
          </div>
        )}
      </div>
    </header>
  );
}