import { useRef, useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { PRODUCTS_URL, ApiProduct, useProducts } from '@/hooks/useProducts';
import { categories } from '@/data/products';

const packOptions = categories.filter(c => c !== 'Все подарки');

export default function ProductsEditor() {
  const { products, reload } = useProducts(false);
  const [draft, setDraft] = useState<ApiProduct[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const list = draft ?? products;

  const update = (id: number, patch: Partial<ApiProduct>) => {
    setDraft((draft ?? products).map(p => (p.id === id ? { ...p, ...patch } : p)));
  };

  const addProduct = () => {
    const base = draft ?? products;
    const newItem: ApiProduct = {
      id: -Date.now(),
      name: 'Новый подарок',
      price: 590,
      category: 'Картон',
      weight: '700 г',
      image: '',
      description: '',
      badge: '',
      sort_order: base.length + 1,
      is_active: true,
    };
    setDraft([...base, newItem]);
  };

  const removeProduct = async (id: number) => {
    if (!confirm('Удалить этот подарок из каталога?')) return;
    if (id < 0) {
      setDraft((draft ?? products).filter(p => p.id !== id));
      return;
    }
    const res = await fetch(PRODUCTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Password': sessionStorage.getItem('admin_pw') || '',
      },
      body: JSON.stringify({ action: 'delete', id }),
    });
    if (res.ok) {
      setDraft(null);
      reload();
      toast.success('Подарок удалён');
    } else {
      toast.error('Не удалось удалить');
    }
  };

  const uploadPhoto = (id: number, file: File) => {
    setUploadingId(id);
    const reader = new FileReader();
    reader.onload = async () => {
      const res = await fetch(PRODUCTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': sessionStorage.getItem('admin_pw') || '',
        },
        body: JSON.stringify({ action: 'upload', image: reader.result }),
      });
      setUploadingId(null);
      if (res.ok) {
        const data = await res.json();
        update(id, { image: data.url });
        toast.success('Фото загружено — не забудьте сохранить');
      } else {
        toast.error('Не удалось загрузить фото');
      }
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    const res = await fetch(PRODUCTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Password': sessionStorage.getItem('admin_pw') || '',
      },
      body: JSON.stringify({ action: 'save', products: draft }),
    });
    setSaving(false);
    if (res.ok) {
      setDraft(null);
      reload();
      toast.success('Каталог сохранён');
    } else {
      toast.error('Не удалось сохранить');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl border border-border p-4">
        <div className="text-sm text-muted-foreground">
          Подарков в каталоге: <b className="text-forest">{list.filter(p => p.is_active).length}</b>
        </div>
        <div className="flex gap-2">
          <Button onClick={addProduct} variant="outline" className="rounded-full font-bold">
            <Icon name="Plus" size={16} className="mr-1.5" />
            Добавить подарок
          </Button>
          <Button
            onClick={save}
            disabled={!draft || saving}
            className="rounded-full font-bold bg-secondary text-secondary-foreground hover:brightness-105"
          >
            {saving ? 'Сохраняем...' : draft ? 'Сохранить каталог' : 'Сохранено'}
          </Button>
        </div>
      </div>

      {list.map(p => (
        <div key={p.id} className="bg-white rounded-2xl border border-border p-4 sm:p-5">
          <div className="grid sm:grid-cols-[160px_1fr] gap-5">
            <div>
              <div className="aspect-square rounded-xl overflow-hidden bg-background border border-border flex items-center justify-center">
                {p.image ? (
                  <img src={p.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <Icon name="Image" size={28} className="text-muted-foreground" />
                )}
              </div>
              <input
                ref={el => (fileRefs.current[p.id] = el)}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => e.target.files?.[0] && uploadPhoto(p.id, e.target.files[0])}
              />
              <button
                onClick={() => fileRefs.current[p.id]?.click()}
                disabled={uploadingId === p.id}
                className="mt-2 w-full rounded-xl border border-border py-2 text-xs font-bold text-forest hover:border-forest/50 transition"
              >
                {uploadingId === p.id ? 'Загружаем...' : 'Загрузить фото'}
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-forest mb-1.5">Название</label>
                <input
                  value={p.name}
                  onChange={e => update(p.id, { name: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-forest transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-forest mb-1.5">Описание</label>
                <textarea
                  value={p.description}
                  onChange={e => update(p.id, { description: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-forest transition resize-y"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-forest mb-1.5">Цена, ₽</label>
                  <input
                    type="number"
                    value={p.price}
                    onChange={e => update(p.id, { price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-forest transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-forest mb-1.5">Вес</label>
                  <input
                    value={p.weight}
                    onChange={e => update(p.id, { weight: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-forest transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-forest mb-1.5">Упаковка</label>
                  <select
                    value={p.category}
                    onChange={e => update(p.id, { category: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-forest transition"
                  >
                    {packOptions.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-forest mb-1.5">Плашка</label>
                  <input
                    value={p.badge || ''}
                    onChange={e => update(p.id, { badge: e.target.value })}
                    placeholder="ХИТ"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-forest transition"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold text-forest cursor-pointer">
                  <input
                    type="checkbox"
                    checked={p.is_active}
                    onChange={e => update(p.id, { is_active: e.target.checked })}
                    className="w-4 h-4 accent-[hsl(var(--primary))]"
                  />
                  Показывать на сайте
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  Порядок
                  <input
                    type="number"
                    value={p.sort_order}
                    onChange={e => update(p.id, { sort_order: Number(e.target.value) })}
                    className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-sm outline-none focus:border-forest"
                  />
                </label>
                <button
                  onClick={() => removeProduct(p.id)}
                  className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <Icon name="Trash2" size={14} />
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
