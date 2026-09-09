import Icon from '@/components/ui/icon';
import { corporateImage } from '@/data/products';
import { useText } from '@/hooks/useSiteTexts';

interface CorporateSectionProps {
  onRequest: () => void;
}

export default function CorporateSection({ onRequest }: CorporateSectionProps) {
  const t = useText();

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
            <div className="bg-primary text-white p-6 sm:p-12 order-2 lg:order-1">
              <div className="inline-block rounded-full bg-secondary text-secondary-foreground px-4 py-1.5 text-[10px] font-extrabold tracking-[0.16em] uppercase">
                {t('corp.badge', 'Для компаний и организаций')}
              </div>
              <h2 className="mt-6 text-2xl sm:text-4xl font-extrabold leading-tight">
                {t('corp.title', 'Подарки сотрудникам, клиентам и детям')}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed max-w-md">
                {t('corp.text', 'Соберём заказ под ваш бюджет, нанесём фирменный логотип и организуем доставку в нужный день.')}
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-2.5">
                {benefits.map(b => (
                  <div key={b} className="flex items-center gap-2 text-xs sm:text-sm">
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

            <div className="relative bg-[hsl(10_60%_94%)] order-1 lg:order-2 min-h-[240px]">
              <img src={corporateImage} alt="Корпоративные подарки" className="w-full h-full object-cover" />
              <div className="absolute top-6 right-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-secondary text-secondary-foreground flex flex-col items-center justify-center text-center shadow-xl">
                <span className="font-extrabold text-sm">{t('corp.circle', 'от 50 шт.')}</span>
                <span className="text-[8px] opacity-80">{t('corp.circleSub', 'особые условия')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-14 sm:pb-20 text-center">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-3">
            {t('steps.eyebrow', 'Всё просто')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-forest mb-10">
            {t('steps.title', 'Четыре шага до праздника')}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                <div
                  className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm text-white ${
                    i % 2 === 0 ? 'bg-forest' : 'bg-primary'
                  }`}
                >
                  {step.num}
                </div>
                <h3 className="mt-5 font-extrabold text-forest">{step.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed max-w-[220px] mx-auto">
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
