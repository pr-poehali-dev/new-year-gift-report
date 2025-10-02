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
    <section id="reviews" className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="bg-gradient-to-br from-yellow-100 via-green-50 to-red-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-primary/20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-3 sm:mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <Icon name="MessageCircle" size={32} className="text-primary hidden sm:block sm:w-10 sm:h-10 md:w-12 md:h-12" />
          <span className="text-red-600">Отзывы наших клиентов</span>
          <Icon name="MessageCircle" size={32} className="text-primary hidden sm:block sm:w-10 sm:h-10 md:w-12 md:h-12" />
        </h2>
        <p className="text-center text-sm sm:text-base md:text-xl text-muted-foreground mb-4 sm:mb-6 md:mb-8">⭐ Более 10,000 довольных покупателей ⭐</p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
          <a href="/all-reviews" className="w-full sm:w-auto">
            <Button size="default" variant="outline" className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-4 md:py-6 border-2">
              <Icon name="Eye" size={18} className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Все отзывы
            </Button>
          </a>
          <a href="/reviews" className="w-full sm:w-auto">
            <Button size="default" className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-4 md:py-6">
              <Icon name="Plus" size={18} className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Добавить отзыв
            </Button>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="hover:shadow-2xl transition-all hover:-translate-y-1 sm:hover:-translate-y-2 border-2 border-secondary/20 bg-white">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-secondary fill-secondary sm:w-5 sm:h-5" />
                  ))}
                </div>
                <p className="text-foreground mb-3 sm:mb-4 font-medium italic text-sm sm:text-base">"{review.text}"</p>
                <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
                  <div className="text-3xl sm:text-4xl">{review.avatar}</div>
                  <div>
                    <p className="font-black text-base sm:text-lg">{review.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Проверенный покупатель</p>
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