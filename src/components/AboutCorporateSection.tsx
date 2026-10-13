import Icon from '@/components/ui/icon';
import { useText, useSetting } from '@/hooks/useSiteTexts';

const ABOUT_IMAGE = 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/bucket/e9823c55-6762-4509-b4de-c7ee62a8ebf9.jpg';

interface AboutCorporateSectionProps {
  onRequest: () => void;
}

export default function AboutCorporateSection({ onRequest }: AboutCorporateSectionProps) {
  const t = useText();
  const s = useSetting();

  const stats = [
    { value: t('about.s1v', '12+'), label: t('about.s1l', 'лет опыта') },
    { value: t('about.s2v', '4'), label: t('about.s2l', 'вида упаковки') },
    { value: t('about.s3v', '3'), label: t('about.s3l', 'варианта веса') },
    { value: t('about.s4v', 'РФ'), label: t('about.s4l', 'география доставки') },
  ];

  const benefits = [
    t('corp.b1', 'Персональная цена от объёма'),
    t('corp.b2', 'Брендирование упаковки'),
    t('corp.b3', 'Закрывающие документы'),
    t('corp.b4', 'Доставка в нужный день'),
  ];

  return (
    <section id="about" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-[hsl(40_45%_90%)]">
          <span className="pointer-events-none absolute top-2 left-[45%] text-[120px] sm:text-[200px] font-extrabold text-white/50 leading-none select-none">
            {t('about.bignum', '12')}
          </span>

          <div className="relative grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-stretch gap-6 lg:gap-8 p-4 sm:p-8 lg:p-10">
            <div className="min-w-0 flex flex-col gap-6 order-2 lg:order-1">
              <div className="px-2 sm:px-2 pt-2">
                <div className="eyebrow-script text-primary mb-2">
                  {t('about.eyebrow', 'С 2010 года')}
                </div>
                <h2 className="text-3xl sm:text-5xl title-festive">
                  {t('about.title', 'Мы знаем, из чего складывается настоящий праздник')}
                </h2>
                <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                  {t('about.text', '«ЧЕБподарки» с 2010 года собирает новогодние подарки в Чебоксарах и напрямую работает с крупнейшими кондитерскими фабриками. Поэтому наши сладкие подарки оптом и в розницу — это свежие конфеты, честная цена и праздничное настроение.')}
                </p>
              </div>

              <div id="corporate" className="scroll-mt-24 lg:flex-1 flex flex-col justify-center rounded-3xl bg-primary text-white p-6 sm:p-8 shadow-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-block rounded-full bg-secondary text-secondary-foreground px-4 py-1.5 text-[10px] font-extrabold tracking-[0.16em] uppercase">
                    {t('corp.badge', 'Корпоративные новогодние подарки')}
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/10 px-3.5 py-1.5 text-xs">
                    <span className="font-extrabold">{t('corp.circle', 'от 50 шт.')}</span>
                    <span className="text-white/80">{t('corp.circleSub', 'особые условия')}</span>
                  </div>
                </div>
                <h3 className="mt-5 text-2xl sm:text-3xl font-black leading-tight">
                  {t('corp.title', 'Подарки сотрудникам, клиентам и детям')}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed">
                  {t('corp.text', 'Соберём корпоративные новогодние подарки под ваш бюджет: сладкие подарки оптом от 50 штук, фирменный логотип на упаковке и доставка по Чебоксарам и всей России в нужный день.')}
                </p>

                <div className="mt-5 grid sm:grid-cols-2 gap-2.5">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                      <Icon name="Check" size={15} className="text-secondary shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>

                <button
                  onClick={onRequest}
                  className="mt-7 self-start inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-7 py-3.5 font-bold hover:brightness-105 transition"
                >
                  {t('corp.btn', 'Получить оптовое предложение')}
                  <Icon name="ArrowRight" size={18} />
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex flex-col md:flex-row lg:flex-col items-center md:items-stretch lg:items-center gap-4">
              <div className="relative w-full max-w-[460px] md:max-w-[330px] lg:max-w-none shrink-0 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={s('img.corporate', ABOUT_IMAGE)}
                  alt="О компании ЧЕБподарки"
                  className="block w-full h-auto"
                  loading="lazy"
                />
              </div>
              <div className="w-full max-w-[460px] md:max-w-none md:flex-1 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 md:auto-rows-fr gap-2.5">
                {stats.map((st, i) => (
                  <div key={i} className="rounded-2xl bg-white border border-border px-3 py-3 flex flex-col justify-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-extrabold text-primary">{st.value}</div>
                    <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-wide text-muted-foreground">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
