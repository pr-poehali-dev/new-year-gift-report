import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  return (
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
  );
}