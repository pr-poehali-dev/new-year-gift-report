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
  const [visibleCount, setVisibleCount] = useState(6);

  const handleRatingChange = (rating: number | null) => {
    setSelectedRating(rating);
    setVisibleCount(6);
  };

  const handleSortChange = (order: 'newest' | 'oldest') => {
    setSortOrder(order);
    setVisibleCount(6);
  };

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

  const visibleReviews = sortedReviews.slice(0, visibleCount);
  const hasMore = visibleCount < sortedReviews.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, sortedReviews.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-50 to-red-100 relative overflow-hidden">
      <Snowfall />
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-2 text-red-600">Все отзывы</h1>
          <p className="text-base text-muted-foreground mb-4">⭐ Более 10,000 довольных покупателей</p>
          
          <Card className="max-w-2xl mx-auto mb-4 border border-primary/20 bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="text-center">
                  <div className="text-4xl font-black text-primary">{averageRating.toFixed(1)}</div>
                  <div className="flex items-center gap-0.5 justify-center my-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="Star" size={16} className={i < Math.round(averageRating) ? 'text-secondary fill-secondary' : 'text-gray-300'} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{ratingPercentage.toFixed(0)}%</p>
                </div>
                <div className="flex-1">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold w-8">{rating} ⭐</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-secondary h-full rounded-full transition-all" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-12">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <a href="/reviews">
            <Button size="sm" className="text-sm px-6">
              <Icon name="Plus" size={16} className="mr-1" />
              Добавить отзыв
            </Button>
          </a>
        </div>

        <div className="flex justify-center gap-2 mb-3 flex-wrap text-sm">
          <Button
            variant={selectedRating === null ? 'default' : 'outline'}
            onClick={() => handleRatingChange(null)}
            size="sm"
          >
            Все ({allReviews.length})
          </Button>
          {[5, 4, 3, 2, 1].map(rating => (
            <Button
              key={rating}
              variant={selectedRating === rating ? 'default' : 'outline'}
              onClick={() => handleRatingChange(rating)}
              size="sm"
              className="flex items-center gap-1"
            >
              {rating} <Icon name="Star" size={14} className="text-secondary fill-secondary" />
              ({allReviews.filter(r => r.rating === rating).length})
            </Button>
          ))}
        </div>

        <div className="flex justify-center gap-2 mb-4">
          <Button
            variant={sortOrder === 'newest' ? 'default' : 'outline'}
            onClick={() => handleSortChange('newest')}
            size="sm"
          >
            <Icon name="ArrowDown" size={14} className="mr-1" />
            Новые
          </Button>
          <Button
            variant={sortOrder === 'oldest' ? 'default' : 'outline'}
            onClick={() => handleSortChange('oldest')}
            size="sm"
          >
            <Icon name="ArrowUp" size={14} className="mr-1" />
            Старые
          </Button>
        </div>

        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            Показано: <span className="text-primary font-semibold">{visibleReviews.length}</span> из {sortedReviews.length}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {visibleReviews.map((review, index) => (
            <Card key={index} className="hover:shadow-lg transition-all border border-secondary/20 bg-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-0.5 mb-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-secondary fill-secondary" />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-3 italic">"{review.text}"</p>
                <div className="flex items-center gap-2 pt-2 border-t">
                  <div className="text-2xl">{review.avatar}</div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {hasMore && (
          <div className="text-center">
            <Button onClick={loadMore} size="lg" variant="outline" className="px-8">
              <Icon name="ChevronDown" size={20} className="mr-2" />
              Показать ещё
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}