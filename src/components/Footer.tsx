import { useSetting, useText, useTextRaw } from '@/hooks/useSiteTexts';
import Icon from '@/components/ui/icon';
import { navLinks as links } from '@/components/Header';

export default function Footer() {
  const t = useText();
  const s = useSetting();
  const tr = useTextRaw();
  const scrollTo = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (window.location.pathname !== '/' || !el) return;
    e.preventDefault();
    if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  const phone = tr('cont.phone', '+7 909 302-00-77');
  const email = tr('cont.email', 'chebpodarki@yandex.ru');
  const address = tr('cont.address', 'г. Чебоксары, ул. Петрова, 6/3');

  return (
    <footer className="bg-[hsl(226_70%_14%)] text-forest-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-4">
          <a href="/" className="shrink-0" aria-label="ЧЕБподарки">
            <img src={s('img.logoLight', '/logo-footer.png')} alt="ЧЕБподарки" width={482} height={600} className="h-24 w-auto object-contain" />
          </a>
          <p className="text-xs leading-relaxed text-forest-foreground/60 max-w-[260px]">
            {t('foot.tagline', 'Сладкие новогодние подарки в Чебоксарах: оптом и в розницу, корпоративные заказы с доставкой по России.')}
          </p>
        </div>

        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-secondary mb-4">Разделы</div>
          <nav className="grid grid-cols-2 grid-rows-4 grid-flow-col gap-x-6 gap-y-2.5 text-sm font-semibold max-w-xs">
            {links.map(l => (
              <a
                key={l.id}
                href={`/#${l.id}`}
                onClick={e => scrollTo(e, l.id)}
                className="text-forest-foreground/85 hover:text-secondary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div id="contacts" className="scroll-mt-28 sm:col-span-2 lg:col-span-1">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-secondary mb-4">Контакты</div>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <Icon name="Phone" size={15} className="text-secondary shrink-0" />
              <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="font-bold hover:text-secondary transition-colors">{phone}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="Mail" size={15} className="text-secondary shrink-0" />
              <a href={`mailto:${email}`} className="text-forest-foreground/85 hover:text-secondary transition-colors">{email}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="MapPin" size={15} className="text-secondary shrink-0" />
              <span className="text-forest-foreground/85">{address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="Clock" size={15} className="text-secondary shrink-0" />
              <span className="text-forest-foreground/85">{t('head.hours', 'Ежедневно 9:00–19:00')}</span>
            </li>
          </ul>
        </div>
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
