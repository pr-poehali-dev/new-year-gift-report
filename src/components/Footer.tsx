const links = [
  { label: 'Подарки', id: 'catalog' },
  { label: 'Состав', id: 'composition' },
  { label: 'Организациям', id: 'corporate' },
  { label: 'Контакты', id: 'contacts' },
];

export default function Footer() {
  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[hsl(163_62%_10%)] text-forest-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-8 lg:grid-cols-3 items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-extrabold">
            Ч
          </div>
          <div className="leading-tight">
            <div className="font-extrabold text-lg">
              <span className="text-primary">ЧЕБ</span>подарки
            </div>
            <div className="text-[9px] tracking-[0.18em] uppercase text-forest-foreground/50">
              Сладкий Новый год
            </div>
          </div>
        </div>

        <p className="text-xs text-forest-foreground/60 lg:text-center">
          Новогодние сладкие подарки оптом и в розницу с доставкой по России.
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
          <span>© 2026 «ЧЕБподарки». Все права защищены.</span>
          <span>ИП Ефимова Е.Н. · ИНН 212345678901 · ОГРНИП 312345678901234</span>
        </div>
      </div>
    </footer>
  );
}
