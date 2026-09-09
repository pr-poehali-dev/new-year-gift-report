import Icon from '@/components/ui/icon';
import { heroImage } from '@/data/products';
import { useText } from '@/hooks/useSiteTexts';

interface HeroSectionProps {
  onOpenCatalog: () => void;
}

export default function HeroSection({ onOpenCatalog }: HeroSectionProps) {
  const t = useText();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const stats = [
    { value: t('hero.stat1v', '15+'), label: t('hero.stat1l', 'лет радуем детей') },
    { value: t('hero.stat2v', '300–1500 г'), label: t('hero.stat2l', 'на любой бюджет') },
    { value: t('hero.stat3v', 'По России'), label: t('hero.stat3l', 'бережная доставка') },
  ];

  const advantages = [
    { icon: 'ShieldCheck', title: t('adv.1t', 'Проверенный состав'), text: t('adv.1x', 'Сертифицированные сладости') },
    { icon: 'Tag', title: t('adv.2t', 'Цены от производителя'), text: t('adv.2x', 'Скидки на объём заказа') },
    { icon: 'Palette', title: t('adv.3t', 'Брендирование'), text: t('adv.3x', 'Ваш логотип и открытка') },
    { icon: 'Truck', title: t('adv.4t', 'Доставка по России'), text: t('adv.4x', 'Аккуратно и точно в срок') },
  ];

  return (
    <section id="home">
      <div className="bg-forest text-forest-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/50 px-4 py-1.5 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-secondary">
              {t('hero.badge', '★ Новогодняя коллекция 2026/27')}
            </div>

            <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold leading-[1.05]">
              {t('hero.title1', 'Подарки, от которых')}
              <span className="block text-secondary">{t('hero.title2', 'глаза горят')}</span>
            </h1>

            <p className="mt-5 text-sm sm:text-base text-forest-foreground/75 max-w-lg leading-relaxed">
              {t('hero.text', 'Любимые сладости в волшебной упаковке — детям, близким, коллегам и партнёрам. Оптом и в розницу с доставкой по всей России.')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('catalog')}
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 sm:px-7 py-3.5 font-bold text-secondary-foreground hover:brightness-105 transition"
              >
                {t('hero.btn1', 'Выбрать подарок')}
                <Icon name="ArrowRight" size={18} />
              </button>
              <button
                onClick={onOpenCatalog}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-6 sm:px-7 py-3.5 font-bold hover:bg-white/20 transition"
              >
                {t('hero.btn2', 'Скачать каталог')}
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="font-extrabold text-base sm:text-xl">{s.value}</div>
                  <div className="text-[10px] sm:text-xs text-forest-foreground/60 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img src={heroImage} alt="Новогодние подарочные наборы" className="w-full h-[280px] sm:h-[420px] object-cover" />
            </div>

            <div className="absolute -top-4 right-4 sm:right-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-secondary text-secondary-foreground flex flex-col items-center justify-center text-center shadow-xl">
              <span className="font-extrabold text-xs sm:text-sm">{t('hero.price', 'от 590 ₽')}</span>
              <span className="text-[8px] sm:text-[9px] opacity-80">{t('hero.priceSub', 'за подарок')}</span>
            </div>

            <div className="absolute -bottom-5 left-4 sm:left-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-forest text-white flex items-center justify-center shrink-0">
                <Icon name="Check" size={18} />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-sm text-forest">{t('hero.cardTitle', 'Свежие сладости')}</div>
                <div className="text-[10px] text-muted-foreground">{t('hero.cardText', 'Прямые контракты с фабриками')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {advantages.map(a => (
            <div key={a.title} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center shrink-0">
                <Icon name={a.icon} size={18} className="text-primary" />
              </div>
              <div>
                <div className="font-bold text-sm text-forest">{a.title}</div>
                <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">{a.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}