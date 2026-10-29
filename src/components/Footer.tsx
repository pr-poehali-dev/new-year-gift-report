import { useSetting, useText } from '@/hooks/useSiteTexts';

const links = [
  { label: 'Подарки', id: 'catalog' },
  { label: 'Состав', id: 'composition' },
  { label: 'Организациям', id: 'corporate' },
  { label: 'Контакты', id: 'contacts' },
];

export default function Footer() {
  const t = useText();
  const s = useSetting();
  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[hsl(226_70%_14%)] text-forest-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-8 lg:grid-cols-3 items-center">
        <a href="/" className="shrink-0" aria-label="ЧЕБподарки">
          <img src={s('img.logoLight', '/logo-footer.png')} alt="ЧЕБподарки" width={482} height={600} className="h-20 w-auto object-contain" />
        </a>

        <p className="text-xs text-forest-foreground/60 lg:text-center">
          {t('foot.tagline', 'Сладкие новогодние подарки в Чебоксарах: оптом и в розницу, корпоративные заказы с доставкой по России.')}
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