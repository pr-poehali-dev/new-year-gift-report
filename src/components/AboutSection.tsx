import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <Card className="bg-gradient-to-br from-red-100 via-yellow-50 to-green-100 border-2 border-primary/30 shadow-2xl">
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <h2 className="text-5xl font-black mb-6 flex items-center justify-center gap-3">
                <Icon name="Heart" size={48} className="text-primary" />
                <span className="text-red-600">О нас</span>
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
  );
}