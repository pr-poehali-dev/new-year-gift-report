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
          overlay="linear-gradient(90deg, rgba(8,18,52,0.92) 0%, rgba(8,18,52,0.72) 35%, rgba(8,18,52,0.2) 62%, rgba(8,18,52,0) 100%)"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-8 pb-8 sm:pt-16 sm:pb-16 lg:pt-24 lg:pb-24 min-h-[380px] sm:min-h-[460px] lg:min-h-[600px] flex items-center">
          <div className="w-[62%] sm:w-[56%] lg:w-[50%] max-w-2xl">
            <div className="text-[10px] sm:text-xs lg:text-sm font-semibold uppercase tracking-[0.25em] text-white/90 leading-relaxed" style={ts('hero.badge')}>
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

            <p className="mt-3 sm:mt-6 max-w-md text-[13px] sm:text-base lg:text-lg text-white/90 leading-snug sm:leading-relaxed" style={ts('hero.text')}>
              {tr('hero.text', 'Сладкие новогодние подарки для детей, близких, коллег и партнёров.')}
            </p>

            <div className="mt-5 sm:mt-8 flex flex-wrap gap-3">
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
                  className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/25 px-6 py-4 font-bold hover:bg-white/20 transition"
                >
                  <Icon name="Download" size={18} />
                  {t('hero.btn2', 'Скачать каталог')}
                </button>
              )}
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