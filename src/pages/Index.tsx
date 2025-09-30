import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
}

const categories = ['Все', 'Для детей', 'Для женщин', 'Для мужчин', 'Для дома', 'Сладости'];

const products: Product[] = [
  { id: 1, name: 'Набор ёлочных игрушек "Золотая сказка"', price: 2500, category: 'Для дома', image: '/img/d7903f82-c5e2-48d6-b51c-b00f1d01832f.jpg', rating: 5, description: 'Премиальный набор из 12 стеклянных шаров' },
  { id: 2, name: 'Плюшевый медведь в новогоднем костюме', price: 1800, category: 'Для детей', image: '/img/dccd281c-fdab-454e-90f4-b15b0a011140.jpg', rating: 5, description: 'Мягкая игрушка ручной работы' },
  { id: 3, name: 'Подарочный набор косметики "Зимняя свежесть"', price: 3200, category: 'Для женщин', image: '/img/0b123a86-a3b3-4483-9f94-3d1fa2aa802d.jpg', rating: 4, description: 'Крем, маска и аромат в праздничной упаковке' },
  { id: 4, name: 'Кожаный кошелек в подарочной коробке', price: 4500, category: 'Для мужчин', image: '/placeholder.svg', rating: 5, description: 'Итальянская кожа, 8 отделений для карт' },
  { id: 5, name: 'Бельгийский шоколад "Новогодняя коллекция"', price: 1500, category: 'Сладости', image: '/placeholder.svg', rating: 5, description: '500г ассорти в подарочной упаковке' },
  { id: 6, name: 'Свеча ароматическая "Корица и апельсин"', price: 890, category: 'Для дома', image: '/placeholder.svg', rating: 4, description: 'Соевый воск, время горения 40 часов' },
  { id: 7, name: 'Конструктор LEGO "Новогодний поезд"', price: 5900, category: 'Для детей', image: '/placeholder.svg', rating: 5, description: '734 детали, с подсветкой и звуком' },
  { id: 8, name: 'Шелковый платок Hermès', price: 12000, category: 'Для женщин', image: '/placeholder.svg', rating: 5, description: 'Дизайнерский принт с новогодними мотивами' },
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const newYear = new Date('2026-01-01T00:00:00');
      const now = new Date();
      const difference = newYear.getTime() - now.getTime();

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Все' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-green-200 shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Gift" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                NEW YEAR GIFTS STORE
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">Главная</a>
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors font-medium">Ассортимент</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">О нас</a>
              <a href="#reviews" className="text-foreground hover:text-primary transition-colors font-medium">Отзывы</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors font-medium">Контакты</a>
            </div>
            <Button className="bg-gradient-to-r from-primary to-red-700 hover:opacity-90 transition-opacity">
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Корзина
            </Button>
          </div>
        </nav>
      </header>

      <section id="home" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Волшебные подарки к Новому Году
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Создайте незабываемое настроение праздника с нашей эксклюзивной коллекцией подарков
          </p>
        </div>

        <div className="bg-gradient-to-r from-primary to-red-700 rounded-2xl p-8 text-white shadow-2xl mb-16 animate-scale-in">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Icon name="Clock" size={32} />
              <h3 className="text-2xl font-bold">До Нового Года осталось</h3>
            </div>
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="text-center">
                <div className="text-5xl font-black mb-2">{countdown.days}</div>
                <div className="text-sm uppercase tracking-wide">дней</div>
              </div>
              <div className="text-5xl font-black">:</div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2">{countdown.hours}</div>
                <div className="text-sm uppercase tracking-wide">часов</div>
              </div>
              <div className="text-5xl font-black">:</div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2">{countdown.minutes}</div>
                <div className="text-sm uppercase tracking-wide">минут</div>
              </div>
              <div className="text-5xl font-black">:</div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2">{countdown.seconds}</div>
                <div className="text-sm uppercase tracking-wide">секунд</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Icon name="Gift" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-2">Более 1000 подарков</h3>
              <p className="text-sm text-muted-foreground">Огромный выбор для всей семьи</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Icon name="Truck" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-2">Быстрая доставка</h3>
              <p className="text-sm text-muted-foreground">До 31 декабря гарантированно</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Icon name="Package" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-2">Подарочная упаковка</h3>
              <p className="text-sm text-muted-foreground">Красиво упакуем бесплатно</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Icon name="Shield" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-2">Гарантия качества</h3>
              <p className="text-sm text-muted-foreground">Только проверенные бренды</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="catalog" className="container mx-auto px-4 py-16 bg-white/50 rounded-3xl">
        <h2 className="text-4xl font-black text-center mb-12 flex items-center justify-center gap-3">
          <Icon name="Sparkles" size={36} className="text-secondary" />
          Наш Ассортимент
          <Icon name="Sparkles" size={36} className="text-secondary" />
        </h2>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Filter" size={20} />
                  Фильтры
                </h3>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Категории</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Цена: {priceRange[0]} - {priceRange[1]} ₽</h4>
                  <Slider
                    min={0}
                    max={15000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-4"
                  />
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg bg-muted h-48">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                        <Icon name="Star" size={14} className="mr-1" />
                        {product.rating}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <Badge variant="outline" className="mb-2">{product.category}</Badge>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-primary">{product.price} ₽</span>
                        <Button size="sm" className="bg-gradient-to-r from-primary to-red-700">
                          <Icon name="ShoppingCart" size={16} className="mr-1" />
                          Купить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6">О нас</h2>
          <p className="text-lg text-muted-foreground mb-6">
            NEW YEAR GIFTS STORE — это семейный бизнес, который уже 15 лет помогает создавать новогоднее настроение. 
            Мы тщательно отбираем каждый товар, чтобы ваши подарки приносили искреннюю радость.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div>
              <div className="text-4xl font-black text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">лет на рынке</div>
            </div>
            <div>
              <div className="text-4xl font-black text-primary mb-2">50k+</div>
              <div className="text-sm text-muted-foreground">счастливых клиентов</div>
            </div>
            <div>
              <div className="text-4xl font-black text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">товаров в каталоге</div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="container mx-auto px-4 py-16 bg-white/50 rounded-3xl">
        <h2 className="text-4xl font-black text-center mb-12">Отзывы наших клиентов</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Анна М.', text: 'Заказывала набор ёлочных игрушек — пришли идеально упакованными! Очень довольна качеством.', rating: 5 },
            { name: 'Дмитрий К.', text: 'Отличный магазин! Быстрая доставка, подарки понравились всей семье. Буду заказывать ещё!', rating: 5 },
            { name: 'Елена В.', text: 'Шоколад просто божественный! Коллеги были в восторге. Спасибо за качество и сервис!', rating: 5 },
          ].map((review, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-secondary fill-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{review.text}"</p>
                <p className="font-bold">{review.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="contacts" className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6">Контакты</h2>
          <div className="space-y-4 text-lg">
            <div className="flex items-center justify-center gap-3">
              <Icon name="Phone" size={24} className="text-primary" />
              <span>+7 (495) 123-45-67</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Icon name="Mail" size={24} className="text-primary" />
              <span>info@newyeargifts.ru</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Icon name="MapPin" size={24} className="text-primary" />
              <span>Москва, ул. Новогодняя, д. 25</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-primary to-red-700 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Gift" size={32} />
            <span className="text-2xl font-bold">NEW YEAR GIFTS STORE</span>
          </div>
          <p className="text-white/80">© 2025 Все права защищены. Дарим радость с 2010 года!</p>
        </div>
      </footer>
    </div>
  );
}