import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Review {
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

const reviews: Review[] = [
  { name: 'Анна М.', text: 'Заказывала набор ёлочных игрушек — пришли идеально упакованными! Очень довольна качеством.', rating: 5, avatar: '👩' },
  { name: 'Дмитрий К.', text: 'Отличный магазин! Быстрая доставка, подарки понравились всей семье. Буду заказывать ещё!', rating: 5, avatar: '👨' },
  { name: 'Елена В.', text: 'Шоколад просто божественный! Коллеги были в восторге. Спасибо за качество и сервис!', rating: 5, avatar: '👩‍💼' },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="container mx-auto px-4 py-16">
      <div className="bg-gradient-to-br from-yellow-100 via-green-50 to-red-100 rounded-3xl p-8 shadow-2xl border-2 border-primary/20">
        <h2 className="text-5xl font-black text-center mb-4 flex items-center justify-center gap-3">
          <Icon name="MessageCircle" size={48} className="text-primary" />
          <span className="text-red-600">Отзывы наших клиентов</span>
          <Icon name="MessageCircle" size={48} className="text-primary" />
        </h2>
        <p className="text-center text-xl text-muted-foreground mb-8">⭐ Более 10,000 довольных покупателей ⭐</p>
        <div className="flex justify-center gap-4 mb-12">
          <a href="/all-reviews">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
              <Icon name="Eye" size={20} className="mr-2" />
              Все отзывы
            </Button>
          </a>
          <a href="/reviews">
            <Button size="lg" className="text-lg px-8 py-6">
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить отзыв
            </Button>
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-secondary/20 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-secondary fill-secondary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 font-medium italic">"{review.text}"</p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                  <div className="text-4xl">{review.avatar}</div>
                  <div>
                    <p className="font-black text-lg">{review.name}</p>
                    <p className="text-sm text-muted-foreground">Проверенный покупатель</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}