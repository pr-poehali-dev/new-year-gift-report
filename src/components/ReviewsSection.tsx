import Icon from '@/components/ui/icon';

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
  return (
    <section id="reviews" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-3">
          Нам доверяют
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-forest mb-8">
          Отзывы наших клиентов
        </h2>

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
                <div className="font-bold text-forest">{review.name}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{review.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
