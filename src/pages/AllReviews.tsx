import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Snowfall from '@/components/Snowfall';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Review {
  name: string;
  text: string;
  rating: number;
  avatar: string;
  date: string;
}

const allReviews: Review[] = [
  { name: 'Анна М.', text: 'Заказывала набор ёлочных игрушек — пришли идеально упакованными! Очень довольна качеством.', rating: 5, avatar: '👩', date: '15 декабря 2024' },
  { name: 'Дмитрий К.', text: 'Отличный магазин! Быстрая доставка, подарки понравились всей семье. Буду заказывать ещё!', rating: 5, avatar: '👨', date: '12 декабря 2024' },
  { name: 'Елена В.', text: 'Шоколад просто божественный! Коллеги были в восторге. Спасибо за качество и сервис!', rating: 5, avatar: '👩‍💼', date: '10 декабря 2024' },
  { name: 'Сергей Л.', text: 'Заказал новогодний набор для всей семьи. Упаковка праздничная, всё на высшем уровне!', rating: 5, avatar: '👨‍💼', date: '8 декабря 2024' },
  { name: 'Мария П.', text: 'Прекрасные подарки для друзей! Качество отменное, доставка быстрая. Рекомендую!', rating: 4, avatar: '👩‍🦰', date: '5 декабря 2024' },
  { name: 'Алексей Н.', text: 'Купил несколько подарков для коллег. Все остались довольны, особенно понравился шоколад!', rating: 5, avatar: '🧑', date: '3 декабря 2024' },
  { name: 'Ольга С.', text: 'Замечательный магазин! Большой выбор, доступные цены, отличное качество. Спасибо!', rating: 4, avatar: '👩‍🦳', date: '1 декабря 2024' },
  { name: 'Иван Р.', text: 'Заказывал подарки для партнёров. Всё пришло в срок, упаковка супер! Буду заказывать ещё.', rating: 5, avatar: '👨‍🦱', date: '28 ноября 2024' },
  { name: 'Наталья Б.', text: 'Очень понравился сервис! Быстро, качественно, красиво. Подарки получились отличные!', rating: 4, avatar: '👩‍🦱', date: '25 ноября 2024' },
  { name: 'Павел Т.', text: 'Хороший магазин, но доставка задержалась на пару дней. В остальном всё нормально.', rating: 3, avatar: '👨‍🦲', date: '20 ноября 2024' },
];

export default function AllReviews() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const filteredReviews = selectedRating 
    ? allReviews.filter(review => review.rating === selectedRating)
    : allReviews;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-50 to-red-100 relative overflow-hidden">
      <Snowfall />
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4 flex items-center justify-center gap-3">
            <Icon name="MessageCircle" size={48} className="text-primary" />
            <span className="text-red-600">Все отзывы</span>
            <Icon name="MessageCircle" size={48} className="text-primary" />
          </h1>
          <p className="text-xl text-muted-foreground mb-6">⭐ Более 10,000 довольных покупателей ⭐</p>
          <a href="/reviews">
            <Button size="lg" className="text-lg px-8 py-6">
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить свой отзыв
            </Button>
          </a>
        </div>

        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          <Button
            variant={selectedRating === null ? 'default' : 'outline'}
            onClick={() => setSelectedRating(null)}
            className="text-base"
          >
            Все ({allReviews.length})
          </Button>
          {[5, 4, 3, 2, 1].map(rating => (
            <Button
              key={rating}
              variant={selectedRating === rating ? 'default' : 'outline'}
              onClick={() => setSelectedRating(rating)}
              className="text-base flex items-center gap-1"
            >
              {rating} <Icon name="Star" size={16} className="text-secondary fill-secondary" />
              ({allReviews.filter(r => r.rating === rating).length})
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, index) => (
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
                  <div className="flex-1">
                    <p className="font-black text-lg">{review.name}</p>
                    <p className="text-sm text-muted-foreground">Проверенный покупатель</p>
                    <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}