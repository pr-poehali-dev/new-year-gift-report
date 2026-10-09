import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useSiteContext, useText } from '@/hooks/useSiteTexts';
import { parseFilters, parsePackaging, PACKAGING_COLORS, SortKey } from '@/lib/siteConfig';

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
  const packagingTypes = parsePackaging(settings['catalog.packaging']);
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

  const sorted = activeSort === 'default'
    ? byCategory
    : [...byCategory].sort((a, b) => (activeSort === 'asc' ? a.price - b.price : b.price - a.price));

  const filtered = [...sorted.filter(p => !p.is_sold_out), ...sorted.filter(p => p.is_sold_out)];

  const chips = [
    ...(filters.showAll ? [{ value: ALL, label: filters.allLabel || 'Все подарки' }] : []),
    ...filters.categories.map(c => ({ value: c, label: c })),
  ];
  const showSortSelect = filters.showSort && enabledSorts.length > 1;

  return (
    <>
      <section id="catalog" className="bg-background">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 py-10 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-2 sm:gap-6 lg:items-end mb-5 sm:mb-8">
            <div>
              <div className="eyebrow-script text-primary mb-1 sm:mb-2">
                {t('catalog.eyebrow', 'Найдите свой подарок')}
              </div>
              <h2 className="text-3xl sm:text-6xl title-festive">
                {t('catalog.title', 'Новогодние подарки на любой вкус')}
              </h2>
            </div>
            <p className="text-xs sm:text-base text-muted-foreground lg:pb-2">
              {t('catalog.text', 'Каталог сладких новогодних подарков в Чебоксарах: от ярких детских коробок до премиальных наборов. Выбирайте упаковку, вес и бюджет — для семьи или для всего коллектива.')}
            </p>
          </div>

          {(chips.length > 1 || showSortSelect) && (
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-2.5 sm:gap-3 mb-5 sm:mb-8">
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto sm:flex-wrap -mx-3 px-3 sm:mx-0 sm:px-0 pb-1 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {chips.length > 1 && chips.map(chip => (
                <button
                  key={chip.value}
                  onClick={() => setSelectedCategory(chip.value)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold transition ${
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
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Icon name="ArrowDownUp" size={16} className="text-muted-foreground" />
              <select
                value={activeSort}
                onChange={e => setSort(e.target.value as SortKey)}
                className="rounded-full bg-white border border-border px-3 py-1.5 sm:px-4 sm:py-2.5 font-semibold text-forest outline-none cursor-pointer hover:border-forest/40 transition"
              >
                {enabledSorts.map(s => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </div>
            )}
          </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
            {filtered.map(product => (
              <article
                key={product.id}
                className={`group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-border transition-shadow flex flex-col ${
                  product.is_sold_out ? 'opacity-80' : 'hover:shadow-xl'
                }`}
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
                      className={`w-full h-28 sm:h-44 object-contain p-2 sm:p-3 cursor-zoom-in ${product.is_sold_out ? 'grayscale opacity-50' : ''}`}
                    />
                  </button>
                  {product.is_sold_out && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="-rotate-6 rounded-lg bg-forest/90 text-white text-[10px] sm:text-sm font-black uppercase tracking-wider px-3 py-1.5 sm:px-5 sm:py-2 shadow-lg">
                        Закончились
                      </span>
                    </div>
                  )}
                  {photosOf(product).length > 1 && (
                    <button
                      onClick={() => openGallery(product.id)}
                      className="absolute bottom-1.5 left-1.5 sm:bottom-3 sm:left-3 inline-flex items-center gap-1 rounded-full bg-forest/85 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 hover:bg-forest transition"
                    >
                      <Icon name="Images" size={12} />
                      {photosOf(product).length} фото
                    </button>
                  )}
                  {product.badge && !product.is_sold_out && (
                    <span className="absolute top-2 left-2 sm:top-4 sm:left-4 rounded-full bg-primary text-white text-[9px] sm:text-[10px] font-extrabold tracking-wider px-2 py-1 sm:px-3 sm:py-1.5">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="p-3 sm:p-5 flex flex-col flex-1">
                  <div className="text-[9px] sm:text-[10px] font-bold tracking-wider sm:tracking-[0.16em] uppercase text-muted-foreground">
                    {product.category} • {product.weight}
                  </div>
                  <h3 className="mt-1 sm:mt-2 text-sm sm:text-lg font-black text-forest leading-tight">{product.name}</h3>
                  <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-sm text-muted-foreground leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-2.5 sm:pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-0 sm:mt-5">
                    <span className="text-sm sm:text-base font-black text-forest">от {product.price.toLocaleString('ru-RU')} ₽</span>
                    {product.is_sold_out ? (
                      <span className="inline-flex items-center justify-center gap-1 rounded-full bg-muted text-muted-foreground py-1.5 sm:px-3 text-xs sm:text-sm font-bold">
                        <Icon name="PackageX" size={15} />
                        Нет в продаже
                      </span>
                    ) : (
                      <button
                        onClick={onRequest}
                        className="inline-flex items-center justify-center sm:justify-start gap-1 rounded-full sm:rounded-none bg-primary sm:bg-transparent text-white sm:text-primary py-1.5 sm:py-0 text-xs sm:text-sm font-bold hover:gap-2 transition-all"
                        aria-label={`Заказать ${product.name}`}
                      >
                        Заказать
                        <Icon name="ArrowRight" size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <button
              onClick={onRequest}
              className="rounded-full bg-primary text-white px-6 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base font-bold hover:brightness-110 transition"
            >
              {t('catalog.btn', 'Получить подборку подарков')}
            </button>
            <span className="text-xs text-muted-foreground text-center sm:text-left max-w-[220px]">
              {t('catalog.btnNote', 'Подберём 3–5 вариантов под ваш бюджет за 15 минут')}
            </span>
          </div>
        </div>
      </section>

      {packagingTypes.length > 0 && (
      <section id="packaging" className="bg-background">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 pb-10 sm:pb-20">
          <div className="eyebrow-script text-primary mb-1 sm:mb-2">
            {t('pack.eyebrow', 'Упаковка — часть чуда')}
          </div>
          <h2 className="text-3xl sm:text-6xl title-festive mb-5 sm:mb-8">
            {t('pack.title', 'Какой будет ваш подарок?')}
          </h2>

          <div className={`grid grid-cols-2 gap-2.5 sm:gap-4 ${packagingTypes.length % 3 === 0 ? 'lg:grid-cols-3' : packagingTypes.length === 1 ? '' : 'lg:grid-cols-4'}`}>
            {packagingTypes.map((type, i) => (
              <div
                key={type.name + i}
                className={`${(PACKAGING_COLORS[type.color] || PACKAGING_COLORS.rose).bg} rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 flex flex-col items-center text-center`}
              >
                <Icon name={type.icon} fallback="Gift" size={22} className="text-forest sm:w-7 sm:h-7" />
                <h3 className="mt-2 sm:mt-4 text-sm sm:text-lg font-black text-forest">{type.name}</h3>
                <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs text-muted-foreground leading-snug sm:leading-relaxed">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

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