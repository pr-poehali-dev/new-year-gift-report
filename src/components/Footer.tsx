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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12 grid gap-8 sm:gap-x-8 sm:gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center text-center sm:flex-row sm:text-left lg:flex-col lg:items-start gap-4 sm:gap-6 lg:gap-4 pb-8 sm:pb-10 lg:pb-0 border-b border-white/10 lg:border-0">
          <a href="/" className="shrink-0" aria-label="ЧЕБподарки">
            <img src={s('img.logoLight', '/logo-footer.png')} alt="ЧЕБподарки" width={482} height={600} className="h-24 sm:h-28 lg:h-24 w-auto object-contain" />
          </a>
          <p className="text-sm lg:text-xs leading-relaxed text-forest-foreground/60 max-w-[320px] sm:max-w-md lg:max-w-[260px]">
            {t('foot.tagline', 'Сладкие новогодние подарки в Чебоксарах: оптом и в розницу, корпоративные заказы с доставкой по России.')}
          </p>
        </div>

        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-secondary mb-4">{t('foot.navTitle', 'Разделы')}</div>
          <nav className="grid grid-cols-2 lg:grid-rows-4 lg:grid-flow-col gap-2 lg:gap-x-6 lg:gap-y-2.5 text-sm font-semibold lg:max-w-xs">
            {links.map(l => (
              <a
                key={l.id}
                href={`/#${l.id}`}
                onClick={e => scrollTo(e, l.id)}
                className="rounded-xl bg-white/[0.06] border border-white/10 px-3.5 py-2.5 lg:p-0 lg:bg-transparent lg:border-0 lg:rounded-none text-forest-foreground/85 hover:text-secondary transition-colors"
              >
                {tr(l.key, l.label)}
              </a>
            ))}
          </nav>
        </div>

        <div id="contacts" className="scroll-mt-28">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-secondary mb-4">{t('foot.contactsTitle', 'Контакты')}</div>
          <ul className="space-y-3 lg:space-y-2.5 text-sm rounded-2xl lg:rounded-none bg-white/[0.06] lg:bg-transparent border border-white/10 lg:border-0 p-4 lg:p-0">
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row gap-1.5 sm:gap-2 items-center sm:justify-between text-center sm:text-left text-[10px] text-forest-foreground/45">
          <span>{t('foot.copyright', '© 2026 «ЧЕБподарки». Все права защищены.')}</span>
          <span>{t('foot.requisites', 'ИП Ефимова Е.Н. · ИНН 212345678901 · ОГРНИП 312345678901234')}</span>
        </div>
      </div>
    </footer>
  );
}
