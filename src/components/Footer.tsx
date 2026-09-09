import { useText } from '@/hooks/useSiteTexts';

const links = [
  { label: 'Подарки', id: 'catalog' },
  { label: 'Состав', id: 'composition' },
  { label: 'Организациям', id: 'corporate' },
  { label: 'Контакты', id: 'contacts' },
];

export default function Footer() {
  const t = useText();
  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[hsl(163_62%_10%)] text-forest-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-8 lg:grid-cols-3 items-center">
        <div className="flex items-center gap-2.5">
          <img src="/logo-light.png" alt="ЧЕБподарки" className="h-14 w-auto" />
          <div className="leading-tight">
            <div className="font-extrabold text-lg">
              <span className="text-primary">ЧЕБ</span>подарки
            </div>
            <div className="text-[9px] tracking-[0.18em] uppercase text-forest-foreground/50">
              {t('head.sub', 'Сладкий Новый год')}
            </div>
          </div>
        </div>

        <p className="text-xs text-forest-foreground/60 lg:text-center">
          {t('foot.tagline', 'Новогодние сладкие подарки оптом и в розницу с доставкой по России.')}
        </p>

        <nav className="flex flex-wrap gap-5 text-sm font-semibold lg:justify-end">
          {links.map(l => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={e => scrollTo(e, l.id)}
              className="hover:text-secondary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row gap-2 justify-between text-[10px] text-forest-foreground/45">
          <span>{t('foot.copyright', '© 2026 «ЧЕБподарки». Все права защищены.')}</span>
          <span>{t('foot.requisites', 'ИП Ефимова Е.Н. · ИНН 212345678901 · ОГРНИП 312345678901234')}</span>
        </div>
      </div>
    </footer>
  );
}