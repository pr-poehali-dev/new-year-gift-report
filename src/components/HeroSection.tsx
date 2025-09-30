import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface HeroSectionProps {
  countdown: Countdown;
}

export default function HeroSection({ countdown }: HeroSectionProps) {
  return (
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
  );
}