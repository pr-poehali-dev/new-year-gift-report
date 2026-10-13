import { useText } from '@/hooks/useSiteTexts';

export default function CorporateSection() {
  const t = useText();

  const steps = [
    { num: '01', title: t('steps.1t', 'Оставьте заявку'), text: t('steps.1x', 'Укажите количество и примерный бюджет') },
    { num: '02', title: t('steps.2t', 'Получите подборку'), text: t('steps.2x', 'Менеджер предложит лучшие варианты') },
    { num: '03', title: t('steps.3t', 'Подтвердите заказ'), text: t('steps.3x', 'Согласуем состав, упаковку и доставку') },
    { num: '04', title: t('steps.4t', 'Встречайте подарки'), text: t('steps.4x', 'Привезём аккуратно и в оговорённый срок') },
  ];
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 pb-10 sm:pb-14">
        <div className="text-center">
          <div className="eyebrow-script text-primary mb-1">
            {t('steps.eyebrow', 'Всё просто')}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-forest mb-4 sm:mb-6">
            {t('steps.title', 'Четыре шага до праздника')}
          </h2>
        </div>

        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] border-t-2 border-dashed border-primary/25 -z-0" />
          {steps.map((step, i) => (
            <div key={step.num} className="relative rounded-2xl bg-white border border-border shadow-sm p-3 sm:p-4 flex items-start gap-3">
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-extrabold text-xs sm:text-sm text-white shrink-0 ${
                  i % 2 === 0 ? 'bg-forest' : 'bg-primary'
                }`}
              >
                {step.num}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-black text-forest leading-tight">{step.title}</h3>
                <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground leading-snug">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
