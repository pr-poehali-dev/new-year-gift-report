import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  return (
    <section id="contacts" className="container mx-auto px-4 py-12 max-w-7xl">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-8">Контакты</h2>
      
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Store" size={24} className="text-primary" />
              Наши магазины
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex gap-3 p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border-l-4 border-primary">
                <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">1</div>
                <div>
                  <h4 className="font-bold">Москва (Центр)</h4>
                  <p className="text-sm text-muted-foreground">ул. Тверская, д. 12</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Icon name="Clock" size={12} /> Пн-Вс: 10:00-22:00
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border-l-4 border-primary">
                <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">2</div>
                <div>
                  <h4 className="font-bold">Москва (ТЦ Авиапарк)</h4>
                  <p className="text-sm text-muted-foreground">Ходынский бульвар, д. 4</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Icon name="Clock" size={12} /> Пн-Вс: 10:00-23:00
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border-l-4 border-primary">
                <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">3</div>
                <div>
                  <h4 className="font-bold">Санкт-Петербург</h4>
                  <p className="text-sm text-muted-foreground">Невский проспект, д. 28</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Icon name="Clock" size={12} /> Пн-Вс: 10:00-22:00
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border-l-4 border-primary">
                <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">4</div>
                <div>
                  <h4 className="font-bold">Казань</h4>
                  <p className="text-sm text-muted-foreground">ул. Баумана, д. 15</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Icon name="Clock" size={12} /> Пн-Вс: 10:00-21:00
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Map" size={24} className="text-primary" />
              Мы на карте
            </h3>
            <div className="relative bg-muted rounded-lg h-[350px] overflow-hidden border-2 border-primary/20">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A64c0a8f8c8c3e8e9a8c3e8e9a8c3e8e9&amp;source=constructor" 
                width="100%" 
                height="100%" 
                frameBorder="0"
                className="rounded-lg"
                title="Карта главного офиса"
              ></iframe>
            </div>
            <div className="mt-3 p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
              <div className="flex items-start gap-2">
                <Icon name="MapPin" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold mb-1">Главный офис</h4>
                  <p className="text-sm text-muted-foreground mb-1">г. Москва, ул. Тверская, д. 12, офис 301</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center">Свяжитесь с нами</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a href="tel:+74951234567" className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0 p-3 sm:p-4 rounded-lg hover:bg-primary/5 transition-colors border border-primary/10 hover:border-primary/20">
              <div className="bg-primary rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center sm:mb-2 flex-shrink-0">
                <Icon name="Phone" size={24} className="text-white sm:w-7 sm:h-7" />
              </div>
              <div className="flex-1 sm:text-center">
                <h4 className="font-bold mb-0.5 sm:mb-1">Телефон</h4>
                <p className="text-muted-foreground text-sm">+7 (495) 123-45-67</p>
                <p className="text-xs text-muted-foreground hidden sm:block">Ежедневно 9:00-21:00</p>
              </div>
            </a>
            <a href="mailto:info@newyeargifts.ru" className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0 p-3 sm:p-4 rounded-lg hover:bg-primary/5 transition-colors border border-primary/10 hover:border-primary/20">
              <div className="bg-primary rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center sm:mb-2 flex-shrink-0">
                <Icon name="Mail" size={24} className="text-white sm:w-7 sm:h-7" />
              </div>
              <div className="flex-1 sm:text-center">
                <h4 className="font-bold mb-0.5 sm:mb-1">Email</h4>
                <p className="text-muted-foreground text-sm break-all">info@newyeargifts.ru</p>
                <p className="text-xs text-muted-foreground hidden sm:block">Ответим в течение 1 часа</p>
              </div>
            </a>
            <a href="https://wa.me/74951234567" target="_blank" rel="noopener noreferrer" className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0 p-3 sm:p-4 rounded-lg hover:bg-primary/5 transition-colors border border-primary/10 hover:border-primary/20">
              <div className="bg-primary rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center sm:mb-2 flex-shrink-0">
                <Icon name="MessageCircle" size={24} className="text-white sm:w-7 sm:h-7" />
              </div>
              <div className="flex-1 sm:text-center">
                <h4 className="font-bold mb-0.5 sm:mb-1">WhatsApp</h4>
                <p className="text-muted-foreground text-sm">+7 (495) 123-45-67</p>
                <p className="text-xs text-muted-foreground hidden sm:block">Быстрая связь онлайн</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}