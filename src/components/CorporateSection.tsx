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
  );
}
