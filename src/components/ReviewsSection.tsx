import { Link } from "@/lib/router-compat";
import Icon from '@/components/ui/icon';
import { useText, useTextRaw, useVisible } from '@/hooks/useSiteTexts';
import { useReviews } from '@/hooks/useReviews';

interface Review {
  key?: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

const SAMPLES = [
  { n: 'Анна М.', r: 'Заказ для детского сада', x: 'Заказывали 120 наборов «Снежная сказка» — привезли точно в срок, дети в восторге, состав отличный.' },
  { n: 'Дмитрий К.', r: 'Заказ для семьи', x: 'Брали жестяную упаковку в подарок родителям. Выглядит дорого, конфеты свежие. Будем заказывать ещё.' },
  { n: 'Елена В.', r: 'HR, производственная компания', x: 'Сделали брендирование с нашим логотипом и закрывающие документы. Всё оперативно и без нервов.' },
];

export default function ReviewsSection() {
  const t = useText();
  const tr = useTextRaw();
  const v = useVisible();
  const sampleReviews: Review[] = SAMPLES.map((r, i) => ({
    key: `rev.s${i + 1}x`,
    name: tr(`rev.s${i + 1}n`, r.n),
    role: tr(`rev.s${i + 1}r`, r.r),
    text: tr(`rev.s${i + 1}x`, r.x),
    rating: 5,
  })).filter(r => v(r.key) && r.text);
  const { reviews: userReviews } = useReviews();
  const reviews: Review[] = [
    ...userReviews.map((r) => ({ name: r.name, role: 'Покупатель', text: r.text, rating: r.rating })),
    ...sampleReviews,
  ].slice(0, 3);

  return (
    <section id="reviews" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-10 sm:pb-14 lg:pb-20">
        <div className="eyebrow-script text-primary mb-2">
          {t('rev.eyebrow', 'Нам доверяют')}
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl title-festive">
            {t('rev.title', 'Отзывы о наших новогодних подарках')}
          </h2>

          <div className="flex flex-wrap gap-3">
            {v('rev.btn') && <Link
              to="/reviews"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-6 py-3 font-bold hover:brightness-110 transition"
            >
              <Icon name="PenLine" size={17} />
              {t('rev.btn', 'Оставить отзыв')}
            </Link>}
            {v('rev.btnAll') && <Link
              to="/all-reviews"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-border text-forest px-6 py-3 font-bold hover:border-forest/40 transition"
            >
              {t('rev.btnAll', 'Все отзывы')}
              <Icon name="ArrowRight" size={17} />
            </Link>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {reviews.map((review, idx) => (
            <article key={`${review.name}-${idx}`} className={`bg-white rounded-3xl border border-border p-5 sm:p-6 flex-col ${idx === 2 ? 'flex sm:hidden lg:flex' : 'flex'}`}>
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-secondary fill-secondary" />
                ))}
              </div>
              <p className="mt-4 text-sm text-foreground/80 leading-relaxed flex-1">{review.text}</p>
              <div className="mt-5 pt-4 border-t border-border">
                <div className="font-display font-bold text-forest">{review.name}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{review.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}