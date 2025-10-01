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
  onOpenCatalog: () => void;
  onOpenComposition: () => void;
}

export default function HeroSection({ countdown, onOpenCatalog, onOpenComposition }: HeroSectionProps) {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-red-200/30">
        <img 
          src="/img/fb9dad36-b0a4-4017-8c17-a92a8ae860ba.jpg" 
          alt="Christmas background"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
      </div>
      
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16 relative z-10">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="relative group w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 blur-xl opacity-50 animate-pulse bg-gradient-to-r from-yellow-400 via-red-500 to-green-500 rounded-full"></div>
              
              <img 
                src="https://static.tildacdn.com/tild3934-3361-4465-b763-396463353837/-.gif" 
                alt="ЧеБ подарки" 
                className="relative w-full h-full object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Icon name="Sparkles" size={32} className="text-secondary animate-pulse sm:w-12 sm:h-12" />
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black drop-shadow-lg text-red-600" style={{ fontFamily: 'Merriweather, serif' }}>
                Волшебные подарки к Новому Году
              </h2>
              <Icon name="Sparkles" size={32} className="text-secondary animate-pulse sm:w-12 sm:h-12" />
            </div>
          </div>
          <p className="text-base sm:text-xl md:text-2xl font-semibold text-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
            🎄 Создайте незабываемое настроение праздника с нашей эксклюзивной коллекцией подарков 🎁
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap px-2">
            <button 
              onClick={onOpenCatalog}
              className="bg-gradient-to-r from-primary to-red-700 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Icon name="BookOpen" size={20} className="sm:w-6 sm:h-6" />
              <span className="whitespace-nowrap">Каталог подарков</span>
            </button>
            <button 
              onClick={onOpenComposition}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Icon name="FileText" size={20} className="sm:w-6 sm:h-6" />
              <span className="whitespace-nowrap">Состав подарков</span>
            </button>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-primary via-red-600 to-red-700 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 text-white shadow-2xl mb-8 sm:mb-16 animate-scale-in overflow-hidden border-2 sm:border-4 border-yellow-400">
          <div className="absolute inset-0 opacity-10">
            <img src="/img/1ece02ee-45aa-45eb-80d5-19b4d7d75a4a.jpg" alt="gifts" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 animate-pulse"></div>
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-8">
              <Icon name="Clock" size={32} className="animate-pulse text-yellow-300 sm:w-12 sm:h-12" />
              <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black drop-shadow-2xl">⏰ До Нового Года осталось</h3>
              <Icon name="Clock" size={32} className="animate-pulse text-yellow-300 sm:w-12 sm:h-12" />
            </div>
            <div className="grid grid-cols-2 sm:flex sm:justify-center gap-2 sm:gap-4 md:gap-8 mb-4 sm:mb-8">
              <div className="bg-white/30 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-8 min-w-[100px] sm:min-w-[140px] hover:scale-110 transition-all shadow-2xl border border-yellow-300/50 sm:border-2">
                <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-1 sm:mb-2 text-yellow-300 drop-shadow-lg">{countdown.days}</div>
                <div className="text-xs sm:text-base md:text-lg lg:text-xl uppercase tracking-wide font-bold">дней</div>
              </div>
              <div className="hidden sm:flex items-center text-4xl md:text-7xl font-black text-yellow-300">:</div>
              <div className="bg-white/30 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-8 min-w-[100px] sm:min-w-[140px] hover:scale-110 transition-all shadow-2xl border border-yellow-300/50 sm:border-2">
                <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-1 sm:mb-2 text-yellow-300 drop-shadow-lg">{countdown.hours}</div>
                <div className="text-xs sm:text-base md:text-lg lg:text-xl uppercase tracking-wide font-bold">часов</div>
              </div>
              <div className="hidden sm:flex items-center text-4xl md:text-7xl font-black text-yellow-300">:</div>
              <div className="bg-white/30 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-8 min-w-[100px] sm:min-w-[140px] hover:scale-110 transition-all shadow-2xl border border-yellow-300/50 sm:border-2">
                <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-1 sm:mb-2 text-yellow-300 drop-shadow-lg">{countdown.minutes}</div>
                <div className="text-xs sm:text-base md:text-lg lg:text-xl uppercase tracking-wide font-bold">минут</div>
              </div>
              <div className="hidden sm:flex items-center text-4xl md:text-7xl font-black text-yellow-300">:</div>
              <div className="bg-white/30 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-8 min-w-[100px] sm:min-w-[140px] hover:scale-110 transition-all shadow-2xl border border-yellow-300/50 sm:border-2">
                <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-1 sm:mb-2 text-yellow-300 drop-shadow-lg">{countdown.seconds}</div>
                <div className="text-xs sm:text-base md:text-lg lg:text-xl uppercase tracking-wide font-bold">секунд</div>
              </div>
            </div>
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