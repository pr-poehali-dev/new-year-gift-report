import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { products, categories, categoryStyles } from '@/data/products';

interface CatalogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'catalog' | 'composition';
}

export default function CatalogModal({ open, onOpenChange, type }: CatalogModalProps) {
  const isCatalog = type === 'catalog';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-3xl font-black text-center mb-3 sm:mb-4">
            {isCatalog ? '📖 Каталог подарков' : '📋 Состав подарков'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 sm:space-y-6">
          {isCatalog ? (
            <>
              {categories.filter(c => c !== 'Все').map(category => {
                const items = products.filter(p => p.category === category);
                if (!items.length) return null;
                const style = categoryStyles[category];
                return (
                  <div key={category} className={`bg-gradient-to-r ${style.wrapper} p-3 sm:p-6 rounded-xl`}>
                    <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 flex items-center gap-2">
                      <Icon name={style.icon} size={20} className={`sm:w-7 sm:h-7 ${style.price}`} />
                      {category}
                    </h3>
                    <ul className="space-y-2 sm:space-y-3 text-sm sm:text-lg">
                      {items.map(item => (
                        <li key={item.id} className="flex justify-between items-start sm:items-center gap-2">
                          <span className="flex-1">{item.name}</span>
                          <span className={`font-bold whitespace-nowrap ${style.price}`}>{item.price.toLocaleString('ru-RU')} ₽</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="bg-gradient-to-r from-primary/10 to-red-100 p-3 sm:p-6 rounded-xl">
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">Детский подарок "Зимняя радость"</h3>
                <p className="text-sm sm:text-lg mb-2 sm:mb-3 font-semibold">В состав входит:</p>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-base">
                  <li>• Плюшевая игрушка (мишка/зайчик)</li>
                  <li>• Конфеты шоколадные "Мишка на Севере" - 200г</li>
                  <li>• Печенье сахарное фигурное - 150г</li>
                  <li>• Зефир в шоколаде - 100г</li>
                  <li>• Мармелад жевательный - 80г</li>
                  <li>• Сок яблочный 0.2л</li>
                  <li>• Раскраска новогодняя + карандаши</li>
                </ul>
                <p className="mt-2 sm:mt-4 font-bold text-base sm:text-xl text-primary">Цена: 1 800 ₽</p>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 sm:p-6 rounded-xl">
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">Сладкий подарок "Новогоднее чудо"</h3>
                <p className="text-sm sm:text-lg mb-2 sm:mb-3 font-semibold">В состав входит:</p>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-base">
                  <li>• Шоколад молочный "Алёнка" - 100г</li>
                  <li>• Конфеты "Красная Шапочка" - 250г</li>
                  <li>• Вафли "Артек" - 200г</li>
                  <li>• Пряники медовые расписные - 150г</li>
                  <li>• Карамель леденцовая - 100г</li>
                  <li>• Мармелад ассорти - 120г</li>
                  <li>• Печенье "Юбилейное" - 180г</li>
                </ul>
                <p className="mt-2 sm:mt-4 font-bold text-base sm:text-xl text-green-600">Цена: 1 200 ₽</p>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 sm:p-6 rounded-xl">
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">Премиум подарок "Золотая коллекция"</h3>
                <p className="text-sm sm:text-lg mb-2 sm:mb-3 font-semibold">В состав входит:</p>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-base">
                  <li>• Шоколад Swiss Premium - 200г</li>
                  <li>• Конфеты Raffaello - 150г</li>
                  <li>• Конфеты Ferrero Rocher - 200г</li>
                  <li>• Печенье датское в жестяной банке - 250г</li>
                  <li>• Чай элитный листовой - 100г</li>
                  <li>• Кофе зерновой Lavazza - 250г</li>
                  <li>• Игристое вино "Советское шампанское" 0.75л</li>
                </ul>
                <p className="mt-2 sm:mt-4 font-bold text-base sm:text-xl text-blue-600">Цена: 4 500 ₽</p>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 sm:p-6 rounded-xl">
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">Корпоративный подарок "Деловой стиль"</h3>
                <p className="text-sm sm:text-lg mb-2 sm:mb-3 font-semibold">В состав входит:</p>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-base">
                  <li>• Ежедневник кожаный датированный</li>
                  <li>• Ручка Parker в подарочной коробке</li>
                  <li>• Набор чая в деревянной шкатулке - 6 сортов</li>
                  <li>• Шоколад швейцарский - 100г</li>
                  <li>• Конфеты "Коркунов" - 192г</li>
                  <li>• Кофе молотый в жестяной банке - 250г</li>
                  <li>• Открытка с индивидуальным текстом</li>
                </ul>
                <p className="mt-2 sm:mt-4 font-bold text-base sm:text-xl text-purple-600">Цена: 3 800 ₽</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}