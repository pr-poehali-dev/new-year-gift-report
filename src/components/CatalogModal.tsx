import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { packagingTypes, compositions } from '@/data/products';
import { useProducts } from '@/hooks/useProducts';

interface CatalogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'catalog' | 'composition';
}

export default function CatalogModal({ open, onOpenChange, type }: CatalogModalProps) {
  const isCatalog = type === 'catalog';
  const { products } = useProducts();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-3xl font-extrabold text-forest">
            {isCatalog ? 'Каталог подарков' : 'Полный состав наборов'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {isCatalog
            ? packagingTypes.map(pack => {
                const items = products.filter(p => p.category === pack.name);
                if (!items.length) return null;
                return (
                  <div key={pack.name} className={`${pack.bg} rounded-2xl p-5`}>
                    <h3 className="flex items-center gap-2 text-lg font-extrabold text-forest mb-3">
                      <Icon name={pack.icon} size={20} />
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
            : Object.entries(compositions).map(([weight, items]) => (
                <div key={weight} className="rounded-2xl border border-border p-5">
                  <h3 className="text-lg font-extrabold text-forest mb-3">Набор {weight}</h3>
                  <ul className="space-y-2">
                    {items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={15} className="text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}