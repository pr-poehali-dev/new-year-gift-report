import Icon from '@/components/ui/icon';
import { corporateImage } from '@/data/products';
import { useText, useSetting } from '@/hooks/useSiteTexts';

interface CorporateSectionProps {
  onRequest: () => void;
}

export default function CorporateSection({ onRequest }: CorporateSectionProps) {
  const t = useText();
  const s = useSetting();

  const benefits = [
    t('corp.b1', 'Персональная цена от объёма'),
    t('corp.b2', 'Брендирование упаковки'),
    t('corp.b3', 'Закрывающие документы'),
    t('corp.b4', 'Доставка в нужный день'),
  ];

  const steps = [
    { num: '01', title: t('steps.1t', 'Оставьте заявку'), text: t('steps.1x', 'Укажите количество и примерный бюджет') },
    { num: '02', title: t('steps.2t', 'Получите подборку'), text: t('steps.2x', 'Менеджер предложит лучшие варианты') },
    { num: '03', title: t('steps.3t', 'Подтвердите заказ'), text: t('steps.3x', 'Согласуем состав, упаковку и доставку') },
    { num: '04', title: t('steps.4t', 'Встречайте подарки'), text: t('steps.4x', 'Привезём аккуратно и в оговорённый срок') },
  ];
  return (
    <>
      <section id="corporate" className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-14 sm:pb-20">
          <div className="grid lg:grid-cols-2 rounded-3xl overflow-hidden">
            <div className="bg-primary text-white p-6 sm:p-12 order-2 lg:order-1 flex flex-col justify-center items-start">
              <div className="inline-block rounded-full bg-secondary text-secondary-foreground px-4 py-1.5 text-[10px] font-extrabold tracking-[0.16em] uppercase">
                {t('corp.badge', 'Корпоративные новогодние подарки')}
              </div>
              <h2 className="mt-6 text-2xl sm:text-4xl font-black leading-tight">
                {t('corp.title', 'Подарки сотрудникам, клиентам и детям')}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed max-w-md">
                {t('corp.text', 'Соберём корпоративные новогодние подарки под ваш бюджет: сладкие подарки оптом от 50 штук, фирменный логотип на упаковке и доставка по Чебоксарам и всей России в нужный день.')}
              </p>

              <div className="mt-6 w-full grid sm:grid-cols-2 gap-2.5">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                    <Icon name="Check" size={15} className="text-secondary shrink-0" />
                    {b}
                  </div>
                ))}
              </div>

              <button
                onClick={onRequest}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-7 py-3.5 font-bold hover:brightness-105 transition"
              >
                {t('corp.btn', 'Получить оптовое предложение')}
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>

            <div className="relative bg-primary order-1 lg:order-2 aspect-square overflow-hidden">
              <img src={s('img.corporate', corporateImage)} alt="Корпоративные подарки" className="absolute inset-0 w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent via-[8%] to-transparent lg:bg-gradient-to-r lg:from-primary/60 lg:via-transparent lg:via-[6%] lg:to-transparent" />
              <div className="absolute top-6 right-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-secondary text-secondary-foreground flex flex-col items-center justify-center text-center shadow-xl">
                <span className="font-extrabold text-sm">{t('corp.circle', 'от 50 шт.')}</span>
                <span className="text-[8px] opacity-80">{t('corp.circleSub', 'особые условия')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 pb-10 sm:pb-20 text-center">
          <div className="eyebrow-script text-primary mb-1 sm:mb-2">
            {t('steps.eyebrow', 'Всё просто')}
          </div>
          <h2 className="text-2xl sm:text-5xl font-black text-forest mb-5 sm:mb-10">
            {t('steps.title', 'Четыре шага до праздника')}
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative rounded-2xl bg-white border border-border p-3 sm:p-0 sm:bg-transparent sm:border-0">
                <div
                  className={`mx-auto w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-extrabold text-xs sm:text-sm text-white ${
                    i % 2 === 0 ? 'bg-forest' : 'bg-primary'
                  }`}
                >
                  {step.num}
                </div>
                <h3 className="mt-2 sm:mt-5 text-sm sm:text-base font-black text-forest leading-tight">{step.title}</h3>
                <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs text-muted-foreground leading-snug sm:leading-relaxed max-w-[220px] mx-auto">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
