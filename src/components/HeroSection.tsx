import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { heroBgImage } from '@/data/products';
import FestiveBackground from '@/components/festive/FestiveBackground';
import { useText, useTextRaw, useTextStyle, useSetting } from '@/hooks/useSiteTexts';

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
    { icon: 'ShieldCheck', title: t('adv.1t', 'Проверенный состав'), text: t('adv.1x', 'Сертифицированные сладости') },
    { icon: 'Tag', title: t('adv.2t', 'Цены от производителя'), text: t('adv.2x', 'Скидки на объём заказа') },
    { icon: 'Palette', title: t('adv.3t', 'Брендирование'), text: t('adv.3x', 'Ваш логотип и открытка') },
    { icon: 'Truck', title: t('adv.4t', 'Доставка по России'), text: t('adv.4x', 'Аккуратно и точно в срок') },
  ];

  return (
    <section id="home">
      <div className="relative bg-[#0b1840] text-white overflow-hidden">
        <FestiveBackground
          image={s('img.heroBg', heroBgImage)}
          flakes={40}
          overlay="linear-gradient(90deg, rgba(8,18,52,0.92) 0%, rgba(8,18,52,0.7) 32%, rgba(8,18,52,0.15) 60%, rgba(8,18,52,0) 100%)"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-14 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-24 min-h-[340px] sm:min-h-[440px] lg:min-h-[600px] flex items-center">
          <div className="w-[62%] sm:w-[55%] lg:w-[48%] max-w-xl">
            <div className="text-[10px] sm:text-xs lg:text-sm font-semibold uppercase tracking-[0.28em] text-white/90 leading-relaxed" style={ts('hero.badge')}>
              {tr('hero.badge', 'Новогодние подарки в Чебоксарах').replace(/^[★☆✦\s]+/, '').replace(/\s*·.*$/, '')}
            </div>

            <h1 className="mt-4 sm:mt-5 text-[34px] leading-[1.05] sm:text-5xl lg:text-7xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="block" style={ts('hero.title1')}>{tr('hero.title1', 'Подарки, от которых')}</span>
              <span
                className="block italic mt-1 bg-gradient-to-r from-[#f7e3a6] via-[#e2b75a] to-[#c8923a] bg-clip-text text-transparent"
                style={ts('hero.title2')}
              >
                {tr('hero.title2', 'глаза горят')}
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 max-w-md text-[13px] sm:text-base lg:text-lg text-white/90 leading-relaxed" style={ts('hero.text')}>
              {tr('hero.text', 'Сладкие новогодние подарки для детей, близких, коллег и партнёров.')}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('catalog')}
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#f3dc9a] to-[#d9ab52] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-[#14204a] shadow-lg shadow-black/30 hover:brightness-105 transition"
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