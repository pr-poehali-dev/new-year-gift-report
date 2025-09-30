import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface CatalogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'catalog' | 'composition';
}

export default function CatalogModal({ open, onOpenChange, type }: CatalogModalProps) {
  const isCatalog = type === 'catalog';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-center mb-4">
            {isCatalog ? '📖 Каталог подарков' : '📋 Состав подарков'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {isCatalog ? (
            <>
              <div className="bg-gradient-to-r from-primary/10 to-red-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Gift" size={28} className="text-primary" />
                  Для детей
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex justify-between items-center">
                    <span>🧸 Плюшевый медведь в новогоднем костюме</span>
                    <span className="font-bold text-primary">1 800 ₽</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>🎮 Конструктор LEGO "Новогодний поезд"</span>
                    <span className="font-bold text-primary">5 900 ₽</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>🎨 Набор для творчества "Зимняя сказка"</span>
                    <span className="font-bold text-primary">1 200 ₽</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Sparkles" size={28} className="text-pink-600" />
                  Для женщин
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex justify-between items-center">
                    <span>💄 Набор косметики "Зимняя свежесть"</span>
                    <span className="font-bold text-pink-600">3 200 ₽</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>👜 Шелковый платок Hermès</span>
                    <span className="font-bold text-pink-600">12 000 ₽</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>💍 Ювелирный набор с кристаллами</span>
                    <span className="font-bold text-pink-600">4 500 ₽</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Briefcase" size={28} className="text-blue-600" />
                  Для мужчин
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex justify-between items-center">
                    <span>👔 Кожаный кошелек в подарочной коробке</span>
                    <span className="font-bold text-blue-600">4 500 ₽</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>⌚ Часы Swiss Military</span>
                    <span className="font-bold text-blue-600">8 900 ₽</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>🎧 Наушники премиум-класса</span>
                    <span className="font-bold text-blue-600">6 700 ₽</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Home" size={28} className="text-orange-600" />
                  Для дома
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex justify-between items-center">
                    <span>🎄 Набор ёлочных игрушек "Золотая сказка"</span>
                    <span className="font-bold text-orange-600">2 500 ₽</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>🕯️ Свеча ароматическая "Корица и апельсин"</span>
                    <span className="font-bold text-orange-600">890 ₽</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>🖼️ Панно декоративное "Зимний лес"</span>
                    <span className="font-bold text-orange-600">3 400 ₽</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Candy" size={28} className="text-green-600" />
                  Сладости
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex justify-between items-center">
                    <span>🍫 Бельгийский шоколад "Новогодняя коллекция"</span>
                    <span className="font-bold text-green-600">1 500 ₽</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>🍬 Набор конфет ручной работы</span>
                    <span className="font-bold text-green-600">2 200 ₽</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>🎂 Новогодний торт "Снежинка"</span>
                    <span className="font-bold text-green-600">3 800 ₽</span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gradient-to-r from-primary/10 to-red-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">Детский подарок "Зимняя радость"</h3>
                <p className="text-lg mb-3 font-semibold">В состав входит:</p>
                <ul className="space-y-2 text-base">
                  <li>• Плюшевая игрушка (мишка/зайчик)</li>
                  <li>• Конфеты шоколадные "Мишка на Севере" - 200г</li>
                  <li>• Печенье сахарное фигурное - 150г</li>
                  <li>• Зефир в шоколаде - 100г</li>
                  <li>• Мармелад жевательный - 80г</li>
                  <li>• Сок яблочный 0.2л</li>
                  <li>• Раскраска новогодняя + карандаши</li>
                </ul>
                <p className="mt-4 font-bold text-xl text-primary">Цена: 1 800 ₽</p>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">Сладкий подарок "Новогоднее чудо"</h3>
                <p className="text-lg mb-3 font-semibold">В состав входит:</p>
                <ul className="space-y-2 text-base">
                  <li>• Шоколад молочный "Алёнка" - 100г</li>
                  <li>• Конфеты "Красная Шапочка" - 250г</li>
                  <li>• Вафли "Артек" - 200г</li>
                  <li>• Пряники медовые расписные - 150г</li>
                  <li>• Карамель леденцовая - 100г</li>
                  <li>• Мармелад ассорти - 120г</li>
                  <li>• Печенье "Юбилейное" - 180г</li>
                </ul>
                <p className="mt-4 font-bold text-xl text-green-600">Цена: 1 200 ₽</p>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">Премиум подарок "Золотая коллекция"</h3>
                <p className="text-lg mb-3 font-semibold">В состав входит:</p>
                <ul className="space-y-2 text-base">
                  <li>• Шоколад Swiss Premium - 200г</li>
                  <li>• Конфеты Raffaello - 150г</li>
                  <li>• Конфеты Ferrero Rocher - 200г</li>
                  <li>• Печенье датское в жестяной банке - 250г</li>
                  <li>• Чай элитный листовой - 100г</li>
                  <li>• Кофе зерновой Lavazza - 250г</li>
                  <li>• Игристое вино "Советское шампанское" 0.75л</li>
                </ul>
                <p className="mt-4 font-bold text-xl text-blue-600">Цена: 4 500 ₽</p>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">Корпоративный подарок "Деловой стиль"</h3>
                <p className="text-lg mb-3 font-semibold">В состав входит:</p>
                <ul className="space-y-2 text-base">
                  <li>• Ежедневник кожаный датированный</li>
                  <li>• Ручка Parker в подарочной коробке</li>
                  <li>• Набор чая в деревянной шкатулке - 6 сортов</li>
                  <li>• Шоколад швейцарский - 100г</li>
                  <li>• Конфеты "Коркунов" - 192г</li>
                  <li>• Кофе молотый в жестяной банке - 250г</li>
                  <li>• Открытка с индивидуальным текстом</li>
                </ul>
                <p className="mt-4 font-bold text-xl text-purple-600">Цена: 3 800 ₽</p>
              </div>
            </>
          )}

          <div className="bg-yellow-100 border-2 border-yellow-400 p-4 rounded-xl text-center">
            <p className="text-lg font-bold">
              🎁 При заказе от 10 подарков - скидка 10%!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}