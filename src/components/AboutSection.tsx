const stats = [
  { value: '15+', label: 'лет опыта' },
  { value: '4', label: 'вида упаковки' },
  { value: '3', label: 'варианта веса' },
  { value: 'РФ', label: 'география доставки' },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-[hsl(40_45%_90%)] p-6 sm:p-12">
          <span className="pointer-events-none absolute top-2 right-6 text-[120px] sm:text-[200px] font-extrabold text-white/50 leading-none select-none">
            15
          </span>

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-3">
                С 2010 года
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-forest leading-tight">
                Мы знаем, из чего складывается настоящий праздник
              </h2>
              <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                «ЧЕБподарки» напрямую работает с крупнейшими кондитерскими фабриками и производителями
                упаковки. Поэтому в каждом наборе — свежие сладости, честная цена и праздничное настроение.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map(s => (
                <div key={s.label} className="rounded-2xl bg-white border border-border p-4 sm:p-5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-primary">{s.value}</div>
                  <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-wide text-muted-foreground">
                    {s.label}
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
