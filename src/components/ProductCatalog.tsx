import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { packagingTypes } from '@/data/products';
import { useSiteContext, useText } from '@/hooks/useSiteTexts';
import { parseFilters, SortKey } from '@/lib/siteConfig';

const ALL = '__all__';
import { ApiProduct, useProducts } from '@/hooks/useProducts';
import ProductGallery from '@/components/ProductGallery';

interface ProductCatalogProps {
  onRequest: () => void;
}

export default function ProductCatalog({ onRequest }: ProductCatalogProps) {
  const t = useText();
  const { settings } = useSiteContext();
  const filters = parseFilters(settings['catalog.filters']);
  const enabledSorts = filters.sorts.filter(s => s.enabled);
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [sort, setSort] = useState<SortKey>('default');
  const [galleryId, setGalleryId] = useState<number | null>(null);

  const photosOf = (p: ApiProduct) =>
    [p.image, ...(p.images || [])].filter((u, i, arr) => u && arr.indexOf(u) === i);

  const openGallery = (id: number) => setGalleryId(id);
  const galleryProduct = products.find(p => p.id === galleryId) || null;

  const activeCategory = filters.categories.includes(selectedCategory) ? selectedCategory : ALL;

  const activeSort: SortKey = filters.showSort && enabledSorts.some(s => s.key === sort) ? sort : 'default';

  const byCategory = activeCategory === ALL
    ? products
    : products.filter(p => p.category === activeCategory);

  const filtered = activeSort === 'default'
    ? byCategory
    : [...byCategory].sort((a, b) => (activeSort === 'asc' ? a.price - b.price : b.price - a.price));

  const chips = [
    ...(filters.showAll ? [{ value: ALL, label: filters.allLabel || 'Все подарки' }] : []),
    ...filters.categories.map(c => ({ value: c, label: c })),
  ];
  const showSortSelect = filters.showSort && enabledSorts.length > 1;

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

          {(chips.length > 1 || showSortSelect) && (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div className="flex flex-wrap gap-2">
              {chips.length > 1 && chips.map(chip => (
                <button
                  key={chip.value}
                  onClick={() => setSelectedCategory(chip.value)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    activeCategory === chip.value
                      ? 'bg-forest text-forest-foreground'
                      : 'bg-white text-forest border border-border hover:border-forest/40'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {showSortSelect && (
            <div className="flex items-center gap-2 text-sm">
              <Icon name="ArrowDownUp" size={16} className="text-muted-foreground" />
              <select
                value={activeSort}
                onChange={e => setSort(e.target.value as SortKey)}
                className="rounded-full bg-white border border-border px-4 py-2.5 font-semibold text-forest outline-none cursor-pointer hover:border-forest/40 transition"
              >
                {enabledSorts.map(s => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </div>
            )}
          </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(product => (
              <article
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="relative bg-background">
                  <button
                    onClick={() => openGallery(product.id)}
                    className="block w-full"
                    aria-label={`Посмотреть фото: ${product.name}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-40 sm:h-44 object-contain p-3 cursor-zoom-in"
                    />
                  </button>
                  {photosOf(product).length > 1 && (
                    <button
                      onClick={() => openGallery(product.id)}
                      className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-forest/85 text-white text-[10px] font-bold px-2.5 py-1 hover:bg-forest transition"
                    >
                      <Icon name="Images" size={12} />
                      {photosOf(product).length} фото
                    </button>
                  )}
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

          <div className={`grid gap-4 sm:grid-cols-2 ${packagingTypes.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
            {packagingTypes.map(type => (
              <div
                key={type.name}
                className={`${type.bg} rounded-3xl p-6 flex flex-col items-center text-center`}
              >
                <Icon name={type.icon} size={28} className="text-forest" />
                <h3 className="mt-4 text-lg font-extrabold text-forest">{type.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {galleryProduct && (
        <ProductGallery
          photos={photosOf(galleryProduct)}
          name={galleryProduct.name}
          onClose={() => setGalleryId(null)}
        />
      )}
    </>
  );
}