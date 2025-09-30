import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import Snowfall from '@/components/Snowfall';

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
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', phone: '' });
    }, 3000);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-yellow-50 relative overflow-hidden">
      <Snowfall />
      
      {/* Праздничные декорации */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {/* Ёлочки по углам */}
        <div className="absolute top-20 left-4 text-6xl animate-bounce" style={{animationDuration: '3s'}}>🎄</div>
        <div className="absolute top-20 right-4 text-6xl animate-bounce" style={{animationDuration: '3.5s'}}>🎄</div>
        <div className="absolute bottom-20 left-8 text-5xl animate-bounce" style={{animationDuration: '4s'}}>🎄</div>
        <div className="absolute bottom-20 right-8 text-5xl animate-bounce" style={{animationDuration: '3.2s'}}>🎄</div>
        
        {/* Игрушки */}
        <div className="absolute top-40 left-16 text-4xl animate-spin" style={{animationDuration: '8s'}}>🎁</div>
        <div className="absolute top-60 right-20 text-4xl animate-spin" style={{animationDuration: '10s'}}>🎀</div>
        <div className="absolute top-96 left-24 text-3xl animate-pulse" style={{animationDuration: '2s'}}>⛄</div>
        <div className="absolute top-[500px] right-12 text-3xl animate-pulse" style={{animationDuration: '2.5s'}}>🔔</div>
        <div className="absolute bottom-40 left-32 text-4xl animate-bounce" style={{animationDuration: '3.8s'}}>🎅</div>
        <div className="absolute bottom-32 right-24 text-4xl animate-bounce" style={{animationDuration: '4.2s'}}>⭐</div>
        
        {/* Праздничные ленты */}
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-20"></div>
        <div className="absolute top-8 left-0 w-full h-4 bg-gradient-to-r from-yellow-400 via-red-400 to-green-400 opacity-30"></div>
      </div>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-primary/20 shadow-lg">
        <div className="bg-gradient-to-r from-primary to-red-700 text-white py-2">
          <div className="container mx-auto px-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+79123456789" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Icon name="Phone" size={16} />
                <span className="font-semibold">+7 (912) 345-67-89</span>
              </a>
              <div className="flex items-center gap-3">
                <a href="https://wa.me/79123456789" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <Icon name="MessageCircle" size={18} />
                </a>
                <a href="https://t.me/chebpodarki" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <Icon name="Send" size={18} />
                </a>
                <a href="https://vk.com/chebpodarki" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <Icon name="Share2" size={18} />
                </a>
              </div>
            </div>
            <a href="/catalog.pdf" download="Каталог_Чеб_Подарки.pdf">
              <Button size="sm" variant="secondary" className="font-semibold">
                <Icon name="Download" size={16} className="mr-2" />
                Скачать каталог
              </Button>
            </a>
          </div>
        </div>
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Gift" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Чеб Подарки
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">Главная</a>
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors font-medium">Ассортимент</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">О нас</a>
              <a href="#reviews" className="text-foreground hover:text-primary transition-colors font-medium">Отзывы</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors font-medium">Контакты</a>
            </div>
          </div>
        </nav>
      </header>

      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-red-200/30">
          <img 
            src="/img/fb9dad36-b0a4-4017-8c17-a92a8ae860ba.jpg" 
            alt="Christmas background"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Icon name="Sparkles" size={48} className="text-secondary animate-pulse" />
              <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-primary via-secondary to-red-700 bg-clip-text text-transparent drop-shadow-lg">
                Волшебные подарки к Новому Году
              </h2>
              <Icon name="Sparkles" size={48} className="text-secondary animate-pulse" />
            </div>
            <p className="text-xl md:text-2xl font-semibold text-foreground max-w-3xl mx-auto">
              🎄 Создайте незабываемое настроение праздника с нашей эксклюзивной коллекцией подарков 🎁
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-primary via-red-600 to-red-700 rounded-3xl p-10 text-white shadow-2xl mb-16 animate-scale-in overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img src="/img/1ece02ee-45aa-45eb-80d5-19b4d7d75a4a.jpg" alt="gifts" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Icon name="Clock" size={40} className="animate-pulse" />
                <h3 className="text-3xl md:text-4xl font-black">⏰ До Нового Года осталось</h3>
                <Icon name="Clock" size={40} className="animate-pulse" />
              </div>
              <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
                <div className="bg-white/20 backdrop-blur rounded-2xl p-6 min-w-[120px] hover:scale-110 transition-transform">
                  <div className="text-6xl md:text-7xl font-black mb-2">{countdown.days}</div>
                  <div className="text-base md:text-lg uppercase tracking-wide font-bold">дней</div>
                </div>
                <div className="hidden md:flex items-center text-6xl font-black">:</div>
                <div className="bg-white/20 backdrop-blur rounded-2xl p-6 min-w-[120px] hover:scale-110 transition-transform">
                  <div className="text-6xl md:text-7xl font-black mb-2">{countdown.hours}</div>
                  <div className="text-base md:text-lg uppercase tracking-wide font-bold">часов</div>
                </div>
                <div className="hidden md:flex items-center text-6xl font-black">:</div>
                <div className="bg-white/20 backdrop-blur rounded-2xl p-6 min-w-[120px] hover:scale-110 transition-transform">
                  <div className="text-6xl md:text-7xl font-black mb-2">{countdown.minutes}</div>
                  <div className="text-base md:text-lg uppercase tracking-wide font-bold">минут</div>
                </div>
                <div className="hidden md:flex items-center text-6xl font-black">:</div>
                <div className="bg-white/20 backdrop-blur rounded-2xl p-6 min-w-[120px] hover:scale-110 transition-transform">
                  <div className="text-6xl md:text-7xl font-black mb-2">{countdown.seconds}</div>
                  <div className="text-base md:text-lg uppercase tracking-wide font-bold">секунд</div>
                </div>
              </div>
              <p className="text-xl md:text-2xl font-bold mt-8 animate-pulse">🎅 Успейте оформить заказ и получите подарочную упаковку БЕСПЛАТНО! 🎁</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-secondary/20 bg-gradient-to-br from-white via-yellow-50 to-white">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-primary to-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon name="Gift" size={48} className="text-white" />
                </div>
                <h3 className="font-black text-xl mb-2">🎁 Более 1000 подарков</h3>
                <p className="text-sm text-foreground font-medium">Огромный выбор для всей семьи</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-secondary/20 bg-gradient-to-br from-white via-green-50 to-white">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-primary to-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon name="Truck" size={48} className="text-white" />
                </div>
                <h3 className="font-black text-xl mb-2">🚚 Быстрая доставка</h3>
                <p className="text-sm text-foreground font-medium">До 31 декабря гарантированно</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-secondary/20 bg-gradient-to-br from-white via-red-50 to-white">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-primary to-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon name="Package" size={48} className="text-white" />
                </div>
                <h3 className="font-black text-xl mb-2">📦 Подарочная упаковка</h3>
                <p className="text-sm text-foreground font-medium">Красиво упакуем бесплатно</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-secondary/20 bg-gradient-to-br from-white via-yellow-50 to-white">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-primary to-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon name="Shield" size={48} className="text-white" />
                </div>
                <h3 className="font-black text-xl mb-2">✨ Гарантия качества</h3>
                <p className="text-sm text-foreground font-medium">Только проверенные бренды</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="catalog" className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-red-100 via-yellow-50 to-green-100 rounded-3xl p-8 shadow-2xl border-2 border-primary/20">
          <h2 className="text-5xl font-black text-center mb-4 flex items-center justify-center gap-3">
            <Icon name="Sparkles" size={48} className="text-secondary animate-pulse" />
            <span className="bg-gradient-to-r from-primary via-secondary to-red-600 bg-clip-text text-transparent">Наш Ассортимент</span>
            <Icon name="Sparkles" size={48} className="text-secondary animate-pulse" />
          </h2>
          <p className="text-center text-xl text-muted-foreground mb-8">🎁 Более 1000 уникальных подарков для ваших близких 🎁</p>

          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <Card className="sticky top-24 shadow-2xl border-2 border-primary/20 bg-gradient-to-br from-white to-yellow-50">
                <CardContent className="p-6">
                  <h3 className="font-black text-xl mb-4 flex items-center gap-2">
                    <Icon name="Filter" size={24} className="text-primary" />
                    Фильтры
                  </h3>

                  <div className="mb-6">
                    <h4 className="font-bold mb-3 text-lg">📂 Категории</h4>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          className={`w-full justify-start font-semibold ${selectedCategory === category ? 'bg-gradient-to-r from-primary to-red-600' : ''}`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-3 text-lg">💰 Цена: {priceRange[0]} - {priceRange[1]} ₽</h4>
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
                  <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-primary/20 hover:border-primary/50 bg-gradient-to-br from-white to-red-50">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg bg-muted h-48">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-secondary to-yellow-400 text-secondary-foreground shadow-lg font-bold">
                          <Icon name="Star" size={14} className="mr-1" />
                          {product.rating}
                        </Badge>
                        <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">ХИТ 🔥</div>
                      </div>
                      <div className="p-4">
                        <Badge variant="outline" className="mb-2 border-primary text-primary font-semibold">{product.category}</Badge>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-center">
                          <span className="text-2xl font-black bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">{product.price} ₽</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-red-100 via-yellow-50 to-green-100 border-2 border-primary/30 shadow-2xl">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-black mb-6 flex items-center justify-center gap-3">
                  <Icon name="Heart" size={48} className="text-primary" />
                  <span className="bg-gradient-to-r from-primary via-secondary to-red-600 bg-clip-text text-transparent">О нас</span>
                  <Icon name="Heart" size={48} className="text-primary" />
                </h2>
                <div className="max-w-3xl mx-auto">
                  <p className="text-xl font-semibold text-foreground mb-4">
                    ✨ Чеб Подарки — это семейный бизнес, который уже 15 лет помогает создавать новогоднее настроение.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Мы тщательно отбираем каждый товар, чтобы ваши подарки приносили искреннюю радость близким и друзьям. 
                    Каждый подарок упакован с любовью! 🎁
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-6xl font-black bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent mb-3">15+</div>
                  <div className="text-base font-bold text-foreground">🎄 лет на рынке</div>
                  <p className="text-sm text-muted-foreground mt-2">С 2010 года дарим радость</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-6xl font-black bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent mb-3">50k+</div>
                  <div className="text-base font-bold text-foreground">😊 счастливых клиентов</div>
                  <p className="text-sm text-muted-foreground mt-2">Спасибо за доверие!</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-6xl font-black bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent mb-3">1000+</div>
                  <div className="text-base font-bold text-foreground">🎁 товаров в каталоге</div>
                  <p className="text-sm text-muted-foreground mt-2">Подарки на любой вкус</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="callback" className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-primary via-red-600 to-red-700 text-white border-2 border-white/20 shadow-2xl">
            <CardContent className="p-10">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Icon name="Phone" size={48} className="text-secondary animate-pulse" />
                  <h2 className="text-4xl font-black">Нужна помощь с выбором?</h2>
                </div>
                <p className="text-xl font-semibold mb-2">Оставьте свой номер, и мы перезвоним!</p>
                <p className="text-white/90">Наш менеджер поможет подобрать идеальный подарок 🎁</p>
              </div>

              {formSubmitted ? (
                <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-center">
                  <Icon name="CheckCircle" size={64} className="mx-auto mb-4 text-secondary" />
                  <h3 className="text-2xl font-black mb-2">Спасибо!</h3>
                  <p className="text-lg">Мы свяжемся с вами в ближайшее время!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-lg font-bold mb-2">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-secondary"
                      placeholder="Например, Анна"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold mb-2">Ваш телефон</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-secondary"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-secondary to-yellow-400 text-foreground hover:opacity-90 text-xl py-6 font-black shadow-xl"
                  >
                    <Icon name="Phone" size={24} className="mr-2" />
                    Перезвоните мне!
                  </Button>
                </form>
              )}

              <div className="mt-6 text-center text-sm text-white/80">
                <Icon name="Lock" size={16} className="inline mr-1" />
                Ваши данные в безопасности и не передаются третьим лицам
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="reviews" className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-yellow-100 via-green-50 to-red-100 rounded-3xl p-8 shadow-2xl border-2 border-primary/20">
          <h2 className="text-5xl font-black text-center mb-4 flex items-center justify-center gap-3">
            <Icon name="MessageCircle" size={48} className="text-primary" />
            <span className="bg-gradient-to-r from-primary via-secondary to-red-600 bg-clip-text text-transparent">Отзывы наших клиентов</span>
            <Icon name="MessageCircle" size={48} className="text-primary" />
          </h2>
          <p className="text-center text-xl text-muted-foreground mb-12">⭐ Более 10,000 довольных покупателей ⭐</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Анна М.', text: 'Заказывала набор ёлочных игрушек — пришли идеально упакованными! Очень довольна качеством.', rating: 5, avatar: '👩' },
              { name: 'Дмитрий К.', text: 'Отличный магазин! Быстрая доставка, подарки понравились всей семье. Буду заказывать ещё!', rating: 5, avatar: '👨' },
              { name: 'Елена В.', text: 'Шоколад просто божественный! Коллеги были в восторге. Спасибо за качество и сервис!', rating: 5, avatar: '👩‍💼' },
            ].map((review, index) => (
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

      <section id="contacts" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-black text-center mb-12">Наши магазины</h2>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="MapPin" size={28} className="text-primary" />
                Адреса магазинов
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-lg">Москва (Центр)</h4>
                    <p className="text-muted-foreground">ул. Тверская, д. 12</p>
                    <p className="text-sm text-muted-foreground">Пн-Вс: 10:00-22:00</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-lg">Москва (ТЦ Авиапарк)</h4>
                    <p className="text-muted-foreground">Ходынский бульвар, д. 4</p>
                    <p className="text-sm text-muted-foreground">Пн-Вс: 10:00-23:00</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-lg">Санкт-Петербург</h4>
                    <p className="text-muted-foreground">Невский проспект, д. 28</p>
                    <p className="text-sm text-muted-foreground">Пн-Вс: 10:00-22:00</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-lg">Казань</h4>
                    <p className="text-muted-foreground">ул. Баумана, д. 15</p>
                    <p className="text-sm text-muted-foreground">Пн-Вс: 10:00-21:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Map" size={28} className="text-primary" />
                Главный офис на карте
              </h3>
              <div className="relative bg-muted rounded-lg h-[400px] overflow-hidden border-2 border-primary/20">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A64c0a8f8c8c3e8e9a8c3e8e9a8c3e8e9&amp;source=constructor" 
                  width="100%" 
                  height="400" 
                  frameBorder="0"
                  className="rounded-lg"
                  title="Карта главного офиса"
                ></iframe>
              </div>
              <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Главный офис</h4>
                    <p className="text-muted-foreground mb-1">г. Москва, ул. Тверская, д. 12, офис 301</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Icon name="Clock" size={16} />
                      Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Свяжитесь с нами</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Icon name="Phone" size={32} className="text-white" />
                  </div>
                  <h4 className="font-bold mb-2">Телефон</h4>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  <p className="text-sm text-muted-foreground">Ежедневно 9:00-21:00</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Icon name="Mail" size={32} className="text-white" />
                  </div>
                  <h4 className="font-bold mb-2">Email</h4>
                  <p className="text-muted-foreground">info@newyeargifts.ru</p>
                  <p className="text-sm text-muted-foreground">Ответим в течение 1 часа</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Icon name="MessageCircle" size={32} className="text-white" />
                  </div>
                  <h4 className="font-bold mb-2">WhatsApp</h4>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  <p className="text-sm text-muted-foreground">Быстрая связь онлайн</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-primary to-red-700 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Gift" size={32} />
            <span className="text-2xl font-bold">Чеб Подарки</span>
          </div>
          <p className="text-white/80">© 2025 Все права защищены. Дарим радость с 2010 года!</p>
        </div>
      </footer>
    </div>
  );
}