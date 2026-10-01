import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useEffect, useState } from 'react';
import { useSiteContext } from '@/hooks/useSiteTexts';
import { parsePackaging, parseComposition, PACKAGING_COLORS } from '@/lib/siteConfig';
import { useProducts } from '@/hooks/useProducts';

interface CatalogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'catalog' | 'composition';
  weight?: string;
}

export default function CatalogModal({ open, onOpenChange, type, weight }: CatalogModalProps) {
  const isCatalog = type === 'catalog';
  const { settings } = useSiteContext();
  const sets = parseComposition(settings['composition.sets']);
  const [selected, setActive] = useState('');
  useEffect(() => {
    if (open && weight) setActive(weight);
  }, [open, weight]);
  const current = sets.find(c => c.weight === selected) || sets[0];
  const { products } = useProducts();
  const packagingTypes = parsePackaging(settings['catalog.packaging']);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-3xl font-black text-forest">
            {isCatalog ? 'Каталог подарков' : 'Конфеты в подарке'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {isCatalog
            ? packagingTypes.map(pack => {
                const items = products.filter(p => p.category === pack.name);
                if (!items.length) return null;
                return (
                  <div key={pack.name} className={`${(PACKAGING_COLORS[pack.color] || PACKAGING_COLORS.rose).bg} rounded-2xl p-5`}>
                    <h3 className="flex items-center gap-2 text-lg font-black text-forest mb-3">
                      <Icon name={pack.icon} fallback="Gift" size={20} />
                      {pack.name}
                    </h3>
                    <ul className="space-y-2.5">
                      {items.map(item => (
                        <li key={item.id} className="flex justify-between gap-3 text-sm">
                          <span className="flex-1">
                            {item.name}
                            <span className="text-muted-foreground"> · {item.weight}</span>
                          </span>
                          <span className="font-bold text-primary whitespace-nowrap">
                            от {item.price.toLocaleString('ru-RU')} ₽
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })
            : (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {sets.map(c => (
                      <button
                        key={c.weight}
                        onClick={() => setActive(c.weight)}
                        className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                          current?.weight === c.weight ? 'bg-primary text-white' : 'bg-muted text-forest hover:bg-muted/70'
                        }`}
                      >
                        {c.weight}
                      </button>
                    ))}
                    <span className="ml-auto self-center text-xs font-semibold text-muted-foreground">
                      {current?.candies}
                    </span>
                  </div>
                  <div className="mt-4 rounded-2xl overflow-hidden bg-sky-50">
                    <img
                      key={current?.weight}
                      src={current?.image}
                      alt={`Состав подарка ${current?.weight}`}
                      className="w-full h-auto animate-in fade-in duration-300"
                    />
                  </div>
                </div>
              )}
        </div>
      </DialogContent>
    </Dialog>
  );
}