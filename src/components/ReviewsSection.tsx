import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useText } from '@/hooks/useSiteTexts';

interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: 'Анна М.',
    role: 'Заказ для детского сада',
    text: 'Заказывали 120 наборов «Снежная сказка» — привезли точно в срок, дети в восторге, состав отличный.',
    rating: 5,
  },
  {
    name: 'Дмитрий К.',
    role: 'Заказ для семьи',
    text: 'Брали жестяную упаковку в подарок родителям. Выглядит дорого, конфеты свежие. Будем заказывать ещё.',
    rating: 5,
  },
  {
    name: 'Елена В.',
    role: 'HR, производственная компания',
    text: 'Сделали брендирование с нашим логотипом и закрывающие документы. Всё оперативно и без нервов.',
    rating: 5,
  },
];

export default function ReviewsSection() {
  const t = useText();

  return (
    <section id="reviews" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="eyebrow-script text-primary mb-2">
          {t('rev.eyebrow', 'Нам доверяют')}
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h2 className="text-3xl sm:text-5xl font-black text-forest">
            {t('rev.title', 'Отзывы наших клиентов')}
          </h2>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-6 py-3 font-bold hover:brightness-110 transition"
            >
              <Icon name="PenLine" size={17} />
              {t('rev.btn', 'Оставить отзыв')}
            </Link>
            <Link
              to="/all-reviews"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-border text-forest px-6 py-3 font-bold hover:border-forest/40 transition"
            >
              {t('rev.btnAll', 'Все отзывы')}
              <Icon name="ArrowRight" size={17} />
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map(review => (
            <article key={review.name} className="bg-white rounded-3xl border border-border p-6 flex flex-col">
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