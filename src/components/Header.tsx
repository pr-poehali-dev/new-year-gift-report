import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate, useLocation } from "@/lib/router-compat";
import { useEffect, useState } from 'react';
import { useSetting, useText, useTextRaw } from '@/hooks/useSiteTexts';

const navLinks = [
  { label: 'Подарки', id: 'catalog' },
  { label: 'Состав', id: 'composition' },
  { label: 'Организациям', id: 'corporate' },
  { label: 'О нас', id: 'about' },
  { label: 'Контакты', id: 'contacts' },
];

export default function Header() {
  const t = useText();
  const s = useSetting();
  const tr = useTextRaw();
  const phone = tr('cont.phone', '+7 909 302-00-77');
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, '')}`;
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
      <div className="bg-cream/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <a href="/" className="shrink-0" aria-label="ЧЕБподарки">
            <img src={s('img.logo', '/logo-header.png')} alt="ЧЕБподарки" width={482} height={600} className="h-16 sm:h-[72px] w-auto object-contain" />
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
              <div className="text-[10px] text-muted-foreground">{t('head.hours', 'Ежедневно 9:00–19:00')}</div>
              <a href={phoneHref} className="font-bold text-forest text-sm">{phone}</a>
            </div>
            <a href="/#contacts" onClick={e => handleAnchorClick(e, 'contacts')} className="hidden sm:block">
              <Button className="rounded-full font-bold px-5">{t('head.btn', 'Заказать звонок')}</Button>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-12 h-12 rounded-full bg-forest text-white flex items-center justify-center shadow-md"
              aria-label="Меню"
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
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
            <a href={phoneHref} className="py-2.5 font-bold text-primary">{phone}</a>
          </div>
        )}
      </div>
    </header>
  );
}