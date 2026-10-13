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
    { value: t('about.s1v', '15+'), label: t('about.s1l', 'лет опыта') },
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-[hsl(40_45%_90%)]">
          <span className="pointer-events-none absolute top-2 left-[45%] text-[120px] sm:text-[200px] font-extrabold text-white/50 leading-none select-none">
            {t('about.bignum', '15')}
          </span>

          <div className="relative grid lg:grid-cols-12 gap-6 lg:gap-10 p-4 sm:p-8 lg:p-10">
            <div className="lg:col-span-7 flex flex-col gap-8 order-2 lg:order-1">
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

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {stats.map((st, i) => (
                    <div key={i} className="rounded-2xl bg-white border border-border p-4">
                      <div className="text-2xl sm:text-3xl font-extrabold text-primary">{st.value}</div>
                      <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-wide text-muted-foreground">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="corporate" className="scroll-mt-24 rounded-3xl bg-primary text-white p-6 sm:p-8 shadow-xl">
                <div className="inline-block rounded-full bg-secondary text-secondary-foreground px-4 py-1.5 text-[10px] font-extrabold tracking-[0.16em] uppercase">
                  {t('corp.badge', 'Корпоративные новогодние подарки')}
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
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-7 py-3.5 font-bold hover:brightness-105 transition"
                >
                  {t('corp.btn', 'Получить оптовое предложение')}
                  <Icon name="ArrowRight" size={18} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative lg:sticky lg:top-24 rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] bg-primary">
                <img
                  src={s('img.corporate', ABOUT_IMAGE)}
                  alt="О компании ЧЕБподарки"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-4 right-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-secondary text-secondary-foreground flex flex-col items-center justify-center text-center shadow-xl">
                  <span className="font-extrabold text-sm">{t('corp.circle', 'от 50 шт.')}</span>
                  <span className="text-[8px] opacity-80">{t('corp.circleSub', 'особые условия')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
