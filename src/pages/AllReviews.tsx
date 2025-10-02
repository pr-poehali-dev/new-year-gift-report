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
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const parseDate = (dateStr: string) => {
    const months: { [key: string]: number } = {
      'января': 0, 'февраля': 1, 'марта': 2, 'апреля': 3, 'мая': 4, 'июня': 5,
      'июля': 6, 'августа': 7, 'сентября': 8, 'октября': 9, 'ноября': 10, 'декабря': 11
    };
    const parts = dateStr.split(' ');
    const day = parseInt(parts[0]);
    const month = months[parts[1]];
    const year = parseInt(parts[2]);
    return new Date(year, month, day);
  };

  const filteredReviews = selectedRating 
    ? allReviews.filter(review => review.rating === selectedRating)
    : allReviews;

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    const dateA = parseDate(a.date).getTime();
    const dateB = parseDate(b.date).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const averageRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
  const ratingPercentage = (averageRating / 5) * 100;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = allReviews.filter(r => r.rating === rating).length;
    const percentage = (count / allReviews.length) * 100;
    return { rating, count, percentage };
  });

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
          
          <Card className="max-w-3xl mx-auto mb-8 border-2 border-primary/20 bg-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-6xl font-black text-primary mb-2">{averageRating.toFixed(1)}</div>
                  <div className="flex items-center gap-1 justify-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="Star" size={24} className={i < Math.round(averageRating) ? 'text-secondary fill-secondary' : 'text-gray-300'} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Общий рейтинг: {ratingPercentage.toFixed(0)}%</p>
                </div>
                <div className="flex-1 max-w-md">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold w-12">{rating} <Icon name="Star" size={12} className="inline text-secondary fill-secondary" /></span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-secondary h-full rounded-full transition-all" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-16">{percentage.toFixed(0)}% ({count})</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <a href="/reviews">
            <Button size="lg" className="text-lg px-8 py-6">
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить свой отзыв
            </Button>
          </a>
        </div>

        <div className="flex justify-center gap-3 mb-4 flex-wrap">
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

        <div className="flex justify-center gap-3 mb-6">
          <Button
            variant={sortOrder === 'newest' ? 'default' : 'outline'}
            onClick={() => setSortOrder('newest')}
            className="text-base"
          >
            <Icon name="ArrowDown" size={16} className="mr-1" />
            Сначала новые
          </Button>
          <Button
            variant={sortOrder === 'oldest' ? 'default' : 'outline'}
            onClick={() => setSortOrder('oldest')}
            className="text-base"
          >
            <Icon name="ArrowUp" size={16} className="mr-1" />
            Сначала старые
          </Button>
        </div>

        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-muted-foreground">
            Показано отзывов: <span className="text-primary text-xl">{sortedReviews.length}</span> из {allReviews.length}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedReviews.map((review, index) => (
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