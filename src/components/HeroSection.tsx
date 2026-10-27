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
    { icon: 'ShieldCheck', title: t('adv.1t', 'Проверенный состав'), text: t('adv.1x', 'Сертифицированные сладости') },
    { icon: 'Tag', title: t('adv.2t', 'Цены от производителя'), text: t('adv.2x', 'Скидки на объём заказа') },
    { icon: 'Palette', title: t('adv.3t', 'Брендирование'), text: t('adv.3x', 'Ваш логотип и открытка') },
    { icon: 'Truck', title: t('adv.4t', 'Доставка по России'), text: t('adv.4x', 'Аккуратно и точно в срок') },
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-2 sm:pt-8 sm:pb-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl sm:rounded-3xl bg-border border border-border shadow-sm overflow-hidden">
            {advantages.map((a, i) => (
              <div key={i} className="bg-white flex items-center gap-3 px-3 py-3.5 sm:px-5 sm:py-5">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${i % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-forest/10 text-forest'}`}>
                  <Icon name={a.icon} size={20} />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[13px] sm:text-[15px] text-forest leading-tight">{a.title}</div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-snug">{a.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}