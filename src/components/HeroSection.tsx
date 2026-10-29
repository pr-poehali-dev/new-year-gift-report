import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { heroBgImage } from '@/data/products';
import FestiveBackground from '@/components/festive/FestiveBackground';
import { useText, useTextRaw, useTextStyle, useSetting } from '@/hooks/useSiteTexts';

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

  const advantages = [
    { icon: 'Candy', title: t('adv.1t', 'Проверенный состав'), text: t('adv.1x', 'Сертифицированные сладости от ведущих фабрик') },
    { icon: 'Gift', title: t('adv.2t', 'Яркая упаковка'), text: t('adv.2x', 'Авторский дизайн и качественные материалы') },
    { icon: 'Truck', title: t('adv.3t', 'Доставка по всей России'), text: t('adv.3x', 'Аккуратно, бережно и точно в срок') },
    { icon: 'Star', title: t('adv.4t', 'Индивидуальные решения'), text: t('adv.4x', 'Подарки под ваш бюджет, бренд и задачи') },
  ];

  return (
    <section id="home">
      <div className="relative bg-[#0b1840] text-white overflow-hidden">
        <FestiveBackground
          image={s('img.heroBg', heroBgImage)}
          flakes={35}
          garland={false}
          imageClassName="object-[58%_center] sm:object-center"
          overlay="linear-gradient(90deg, rgba(8,18,52,0.95) 0%, rgba(8,18,52,0.8) 40%, rgba(8,18,52,0.25) 66%, rgba(8,18,52,0) 100%)"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-8 pb-8 sm:pt-16 sm:pb-16 lg:pt-24 lg:pb-24 min-h-[380px] sm:min-h-[460px] lg:min-h-[600px] flex items-center">
          <div className="w-[58%] sm:w-[56%] lg:w-[50%] max-w-2xl [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
            <div className="text-[10px] sm:text-xs lg:text-sm font-semibold uppercase tracking-[0.22em] max-w-[200px] sm:max-w-none text-white/90 leading-relaxed" style={ts('hero.badge')}>
              {tr('hero.badge', 'Новогодние подарки в Чебоксарах').replace(/^[★☆✦\s]+/, '').replace(/\s*·.*$/, '')}
            </div>

            <h1 className="mt-3 sm:mt-5 text-[30px] leading-[1.05] sm:text-5xl lg:text-7xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="block" style={ts('hero.title1')}>
                {tr('hero.title1', 'Подарки, от которых').split(/(?<=,)\s+/).map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </span>
              <span
                className="block italic mt-1 bg-gradient-to-r from-[#f7e3a6] via-[#e2b75a] to-[#c8923a] bg-clip-text text-transparent pb-1"
                style={ts('hero.title2')}
              >
                {tr('hero.title2', 'глаза горят')}
              </span>
            </h1>

            <p className="mt-3 sm:mt-6 max-w-md text-[13px] sm:text-base lg:text-lg text-white/95 leading-snug sm:leading-relaxed" style={ts('hero.text')}>
              {tr('hero.text', 'Сладкие новогодние подарки для детей, близких, коллег и партнёров.')}
            </p>

            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => scrollTo('catalog')}
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#f3dc9a] to-[#d9ab52] px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-[#14204a] shadow-lg shadow-black/30 hover:brightness-105 transition whitespace-nowrap"
              >
                {t('hero.btn1', 'Выбрать подарок')}
                <Icon name="ArrowRight" size={18} />
              </button>
              {catalogFile && (
                <button
                  onClick={handleCatalog}
                  className="group inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-white/10 backdrop-blur-md border border-white/30 pl-1.5 pr-4 sm:pl-2 sm:pr-6 py-1.5 sm:py-2 font-bold hover:bg-white/20 hover:border-white/50 transition whitespace-nowrap"
                >
                  <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-[#14204a] flex items-center justify-center shrink-0 group-hover:translate-y-0.5 transition-transform">
                    <Icon name="Download" size={17} />
                  </span>
                  <span className="text-left leading-tight [text-shadow:none]">
                    <span className="block text-sm sm:text-base">{t('hero.btn2', 'Скачать каталог')}</span>
                    <span className="block text-[10px] sm:text-[11px] font-semibold text-white/65 uppercase tracking-wider">PDF · все подарки и цены</span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-2 sm:pt-12 sm:pb-4">
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="shrink-0 flex items-end gap-2 sm:gap-3">
              <h2 className="text-forest text-[26px] sm:text-5xl lg:text-6xl leading-[1.05] font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="block">{t('adv.big1', '12+ лет')}</span>
                <span className="block">{t('adv.big2', 'радуем детей')}</span>
              </h2>
              <Icon name="Heart" size={24} className="text-secondary mb-1.5 sm:mb-3 shrink-0" />
            </div>
            <div className="self-stretch w-px bg-forest/15" />
            <p className="text-[13px] sm:text-base lg:text-lg text-muted-foreground leading-snug max-w-md min-w-0">
              {t('adv.lead', 'Создаем новогодние подарки, которые дарят радость, объединяют и остаются в памяти надолго.')}
            </p>
          </div>

          <div id="advantages" className="scroll-mt-28 mt-6 sm:mt-8 rounded-3xl bg-[#f6ece0] px-4 py-5 sm:p-6 lg:p-8">
            <div className="flex items-center gap-4 mb-3 sm:mb-5">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.3em] text-forest">
                {t('adv.eyebrow', 'Наши преимущества')}
              </span>
              <span className="h-px w-16 sm:w-24 bg-secondary" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 divide-y divide-forest/10 sm:divide-y-0">
              {advantages.map((a, i) => (
                <div key={i} className="flex items-center gap-4 py-3.5 first:pt-1 last:pb-1 sm:flex-col sm:justify-center sm:text-center sm:rounded-2xl sm:bg-white sm:px-5 sm:py-6 sm:first:pt-6 sm:last:pb-6 lg:p-6 sm:shadow-sm">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 ${ADV_COLORS[i % ADV_COLORS.length]}`}>
                    <Icon name={a.icon} size={24} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[15px] sm:text-base lg:text-lg text-forest leading-tight">{a.title}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1 lg:mt-1.5 leading-snug">{a.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}