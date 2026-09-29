import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { categories, packagingTypes } from '@/data/products';
import { useText } from '@/hooks/useSiteTexts';
import { useProducts } from '@/hooks/useProducts';

interface ProductCatalogProps {
  onRequest: () => void;
}

export default function ProductCatalog({ onRequest }: ProductCatalogProps) {
  const t = useText();
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('Все подарки');

  const filtered = selectedCategory === 'Все подарки'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <>
      <section id="catalog" className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-6 lg:items-end mb-8">
            <div>
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-3">
                {t('catalog.eyebrow', 'Найдите свой подарок')}
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-forest leading-tight">
                {t('catalog.title', 'Праздник на любой вкус')}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground lg:pb-2">
              {t('catalog.text', 'От небольших ярких коробок до солидных премиальных наборов — выбирайте упаковку, вес и бюджет')}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-forest text-forest-foreground'
                    : 'bg-white text-forest border border-border hover:border-forest/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(product => (
              <article
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 sm:h-56 object-cover"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 rounded-full bg-primary text-white text-[10px] font-extrabold tracking-wider px-3 py-1.5">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={onRequest}
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
                    aria-label={`Заказать ${product.name}`}
                  >
                    <Icon name="Plus" size={20} />
                  </button>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-muted-foreground">
                    {product.category} • {product.weight}
                  </div>
                  <h3 className="mt-2 text-lg font-extrabold text-forest">{product.name}</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                    <span className="font-extrabold text-forest">от {product.price.toLocaleString('ru-RU')} ₽</span>
                    <button
                      onClick={onRequest}
                      className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:gap-2 transition-all"
                    >
                      Подробнее
                      <Icon name="ArrowRight" size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onRequest}
              className="rounded-full bg-primary text-white px-7 py-3.5 font-bold hover:brightness-110 transition"
            >
              {t('catalog.btn', 'Получить подборку подарков')}
            </button>
            <span className="text-xs text-muted-foreground text-center sm:text-left max-w-[220px]">
              {t('catalog.btnNote', 'Подберём 3–5 вариантов под ваш бюджет за 15 минут')}
            </span>
          </div>
        </div>
      </section>

      <section id="packaging" className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-14 sm:pb-20">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-3">
            {t('pack.eyebrow', 'Упаковка — часть чуда')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-forest mb-8">
            {t('pack.title', 'Какой будет ваш подарок?')}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {packagingTypes.map(type => (
              <button
                key={type.name}
                onClick={() => setSelectedCategory(type.name)}
                className={`${type.bg} text-left rounded-3xl p-5 relative overflow-hidden hover:-translate-y-1 transition-transform`}
              >
                <Icon name={type.icon} size={26} className="text-forest" />
                <h3 className="mt-4 text-lg font-extrabold text-forest">{type.name}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed pr-8">
                  {type.description}
                </p>
                <span className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center">
                  <Icon name="ArrowUpRight" size={16} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}