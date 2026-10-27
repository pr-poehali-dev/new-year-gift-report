import { toast } from 'sonner';
import SnowText, { SnowDefs } from '@/components/SnowText';
import Icon from '@/components/ui/icon';
import { heroBgImage } from '@/data/products';
import FestiveBackground from '@/components/festive/FestiveBackground';
import { useText, useTextRaw, useTextStyle, useSetting } from '@/hooks/useSiteTexts';

const ACCENTS: [RegExp, string][] = [
  [/(сладост\S*|конфет\S*)/i, 'lead-gold'],
  [/(волшебн\S* упаковк\S*)/i, 'lead-red'],
  [/(оптом и в розницу)/i, 'lead-mint'],
  [/(по всей России)/i, 'lead-gold'],
];

function highlight(text: string) {
  const re = new RegExp(ACCENTS.map(([r]) => r.source).join('|'), 'gi');
  return text.split(re).filter(p => p !== undefined && p !== '').map((part, i) => {
    const hit = ACCENTS.find(([r]) => new RegExp(`^${r.source}$`, 'i').test(part));
    return hit ? <span key={i} className={hit[1]}>{part}</span> : <span key={i}>{part}</span>;
  });
}

const ADV_COLORS = [
  'bg-primary/10 text-primary',
  'bg-secondary/20 text-[#b07d1f]',
  'bg-forest/10 text-forest',
  'bg-emerald-600/10 text-emerald-700',
];

export default function HeroSection() {
  const t = useText();
  const tr = useTextRaw();
  const ts = useTextStyle();
  const s = useSetting();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const catalogFile = s('file.catalog', '');
  const handleCatalog = async () => {
    if (!catalogFile) {
      toast.info('Каталог скоро появится — позвоните нам, вышлем подборку');
      return;
    }

    const fileName = catalogFile.split('/').pop()?.split('?')[0] || 'katalog.pdf';
    const saveAs = (href: string, revoke?: string) => {
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      if (revoke) setTimeout(() => URL.revokeObjectURL(revoke), 4000);
    };

    try {
      const res = await fetch(catalogFile);
      if (!res.ok) throw new Error('fetch failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      saveAs(url, url);
    } catch {
      saveAs(catalogFile);
    }
  };

  const stats = [
    { value: t('hero.stat1v', '12+'), label: t('hero.stat1l', 'лет радуем детей') },
    { value: t('hero.stat2v', '700–1500 г'), label: t('hero.stat2l', 'на любой бюджет') },
    { value: t('hero.stat3v', 'По России'), label: t('hero.stat3l', 'бережная доставка') },
  ];

  const advantages = [
    { icon: 'Candy', title: t('adv.1t', 'Проверенный состав'), text: t('adv.1x', 'Сертифицированные сладости от ведущих фабрик') },
    { icon: 'Gift', title: t('adv.2t', 'Яркая упаковка'), text: t('adv.2x', 'Авторский дизайн и качественные материалы') },
    { icon: 'Truck', title: t('adv.3t', 'Доставка по всей России'), text: t('adv.3x', 'Аккуратно, бережно и точно в срок') },
    { icon: 'Star', title: t('adv.4t', 'Индивидуальные решения'), text: t('adv.4x', 'Подарки под ваш бюджет, бренд и задачи') },
  ];

  return (
    <section id="home">
      <div className="relative bg-[#141238] text-forest-foreground">
        <FestiveBackground image={s('img.heroBg', heroBgImage)} overlay="linear-gradient(90deg, rgba(10,22,70,0.85) 0%, rgba(14,30,90,0.55) 45%, rgba(14,30,90,0.15) 100%)" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-8 sm:pt-16 sm:pb-14 lg:pt-24 lg:pb-20 grid gap-6 items-center">
          <div className="max-w-2xl">
            <div className="hero-badge inline-flex items-center gap-2 rounded-full px-4 py-2 sm:px-5 text-xs sm:text-sm md:text-[11px] lg:text-sm font-extrabold tracking-widest md:tracking-wide lg:tracking-widest uppercase md:px-4 lg:px-5">
              <span className="hero-badge-star">❄</span>
              <span className="hero-badge-text" style={ts('hero.badge')}>{tr('hero.badge', '★ Новогодние подарки в Чебоксарах · коллекция 2027').replace(/^[★☆✦\s]+/, '')}</span>
              <span className="hero-badge-star">❄</span>
            </div>

            <h1 className="mt-5 sm:mt-6 text-4xl sm:text-5xl md:text-[44px] lg:text-6xl font-normal leading-[1.2] tracking-[0.01em]" style={{ fontFamily: "'Lobster', cursive" }}>
              <SnowDefs />
              <span style={ts('hero.title1')}>
                <SnowText text={tr('hero.title1', 'Подарки, от которых')} className="snow-fill-bright" />
              </span>
              <span className="block mt-1 text-5xl sm:text-6xl md:text-[54px] lg:text-7xl">
                <span style={ts('hero.title2')}>
                  <SnowText text={tr('hero.title2', 'глаза горят')} className="snow-fill-red" />
                </span>
              </span>
            </h1>

            <p className="hero-lead mt-5 max-w-lg rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-[15px] sm:text-base lg:text-lg font-semibold leading-relaxed">
              <span style={ts('hero.text')}>{highlight(tr('hero.text', 'Сладкие новогодние подарки в Чебоксарах — детям, близким, коллегам и партнёрам. Любимые конфеты в волшебной упаковке, сладкие подарки оптом и в розницу с доставкой по всей России.'))}</span>
            </p>

            <div className="mt-6 lg:mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('catalog')}
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 sm:px-7 py-3.5 font-bold text-secondary-foreground hover:brightness-105 transition"
              >
                {t('hero.btn1', 'Выбрать подарок')}
                <Icon name="ArrowRight" size={18} />
              </button>
              <button
                onClick={handleCatalog}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-6 sm:px-7 py-3.5 font-bold hover:bg-white/20 transition"
              >
                <Icon name="Download" size={18} />
                {t('hero.btn2', 'Скачать каталог')}
              </button>
            </div>

            <div className="mt-7 lg:mt-10 grid grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4 max-w-lg">
              {stats.map((s, i) => (
                <div key={i} className={`hero-stat ${['hero-stat-0', 'hero-stat-1', 'hero-stat-2'][i % 3]}`}>
                  <div className="hero-stat-value font-display font-black text-sm sm:text-lg lg:text-xl leading-tight whitespace-nowrap">{s.value}</div>
                  <div className="text-[10px] sm:text-xs font-semibold text-white/90 mt-1.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-2 sm:pt-12 sm:pb-4">
          <div className="flex items-center gap-5 sm:gap-8">
            <div className="shrink-0 flex items-end gap-2 sm:gap-3">
              <h2 className="text-forest text-[32px] sm:text-5xl lg:text-6xl leading-[1.05] font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="block">{t('adv.big1', '12+ лет')}</span>
                <span className="block">{t('adv.big2', 'радуем детей')}</span>
              </h2>
              <Icon name="Heart" size={30} className="text-secondary mb-2 sm:mb-3 shrink-0" />
            </div>
            <div className="self-stretch w-px bg-forest/15" />
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-snug max-w-md">
              {t('adv.lead', 'Создаем новогодние подарки, которые дарят радость, объединяют и остаются в памяти надолго.')}
            </p>
          </div>

          <div className="mt-6 sm:mt-8 rounded-3xl bg-[#f6ece0] p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-4 mb-3 sm:mb-5">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.3em] text-forest">
                {t('adv.eyebrow', 'Наши преимущества')}
              </span>
              <span className="h-px w-16 sm:w-24 bg-secondary" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {advantages.map((a, i) => (
                <div key={i} className="group flex items-center gap-4 rounded-2xl bg-white/70 px-4 py-4 sm:px-5 sm:py-5 transition hover:bg-white hover:shadow-md">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 ${ADV_COLORS[i % ADV_COLORS.length]}`}>
                    <Icon name={a.icon} size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[15px] sm:text-base text-forest leading-tight">{a.title}</div>
                    <div className="text-xs sm:text-[13px] text-muted-foreground mt-1 leading-snug">{a.text}</div>
                  </div>
                  <Icon name="ChevronRight" size={18} className="text-forest/40 shrink-0 transition group-hover:translate-x-0.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}