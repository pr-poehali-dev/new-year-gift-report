import { useRef, useState } from 'react';
import { clearDraft, loadDraft, useLocalDraft } from '@/hooks/useLocalDraft';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { PRODUCTS_URL, ApiProduct, useProducts } from '@/hooks/useProducts';
import { useSiteContext } from '@/hooks/useSiteTexts';
import { parseFilters } from '@/lib/siteConfig';
import { compressImage } from '@/lib/compressImage';

const DRAFT_KEY = 'admin_products_draft';

export default function ProductsEditor() {
  const { products, reload } = useProducts(false);
  const { settings } = useSiteContext();
  const packOptions = parseFilters(settings['catalog.filters']).categories;
  const [draft, setDraft] = useState<ApiProduct[] | null>(() =>
    loadDraft<ApiProduct[]>(DRAFT_KEY),
  );
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const galleryRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const list = draft ?? products;

  useLocalDraft(DRAFT_KEY, draft, !!draft);

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
      images: [],
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
      clearDraft(DRAFT_KEY);
      setDraft(null);
      reload();
      toast.success('Подарок удалён');
    } else {
      toast.error('Не удалось удалить');
    }
  };

  const sendPhoto = async (file: File): Promise<string | null> => {
    if (!file.type.startsWith('image/')) {
      toast.error('Выберите файл изображения: JPG, PNG или WEBP');
      return null;
    }
    if (file.size > 25 * 1024 * 1024) {
      toast.error('Фото больше 25 МБ — слишком тяжёлое даже для сжатия');
      return null;
    }
    try {
      const image = await compressImage(file);
      if (image.length * 0.75 > 5 * 1024 * 1024) {
        toast.error('Фото слишком большое даже после сжатия');
        return null;
      }
      const res = await fetch(PRODUCTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': sessionStorage.getItem('admin_pw') || '',
        },
        body: JSON.stringify({ action: 'upload', image }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) return data.url as string;
      toast.error(data.error || 'Не удалось загрузить фото');
      return null;
    } catch {
      toast.error('Не удалось обработать файл. Попробуйте другое фото');
      return null;
    }
  };

  const uploadPhoto = async (id: number, file: File) => {
    setUploadingId(id);
    const url = await sendPhoto(file);
    setUploadingId(null);
    if (url) {
      update(id, { image: url });
      toast.success('Главное фото загружено — не забудьте сохранить');
    }
  };

  const uploadGallery = async (id: number, files: File[]) => {
    setUploadingId(id);
    const urls: string[] = [];
    for (const f of files) {
      const url = await sendPhoto(f);
      if (url) urls.push(url);
    }
    setUploadingId(null);
    if (!urls.length) return;
    const current = (draft ?? products).find(p => p.id === id);
    const base = current?.images || [];
    update(id, { images: [...base, ...urls] });
    toast.success(`Добавлено фото: ${urls.length} — не забудьте сохранить`);
  };

  const removeGalleryPhoto = (id: number, url: string) => {
    const current = (draft ?? products).find(p => p.id === id);
    update(id, { images: (current?.images || []).filter(u => u !== url) });
  };

  const makeMain = (id: number, url: string) => {
    const current = (draft ?? products).find(p => p.id === id);
    if (!current) return;
    const rest = (current.images || []).filter(u => u !== url);
    update(id, { image: url, images: current.image ? [current.image, ...rest] : rest });
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
      clearDraft(DRAFT_KEY);
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

      {draft && (
        <div className="flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 px-4 py-2.5 text-xs font-semibold text-primary">
          <Icon name="TriangleAlert" size={15} />
          Есть несохранённые правки — они не пропадут при обновлении страницы. Нажмите «Сохранить каталог».
        </div>
      )}

      {list.map(p => (
        <div key={p.id} className="bg-white rounded-2xl border border-border p-4 sm:p-5">
          <div className="grid sm:grid-cols-[112px_1fr] gap-4">
            <div>
              <div className="h-24 rounded-xl overflow-hidden bg-background border border-border flex items-center justify-center">
                {p.image ? (
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="max-w-full max-h-full object-contain p-1.5"
                  />
                ) : (
                  <Icon name="Image" size={22} className="text-muted-foreground" />
                )}
              </div>
              <input
                ref={el => (fileRefs.current[p.id] = el)}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const f = e.target.files?.[0];
                  if (f) uploadPhoto(p.id, f);
                  e.target.value = '';
                }}
              />
              <button
                onClick={() => fileRefs.current[p.id]?.click()}
                disabled={uploadingId === p.id}
                className="mt-1.5 w-full rounded-lg border border-border py-1.5 text-[11px] font-bold text-forest hover:border-forest/50 transition disabled:opacity-60"
              >
                {uploadingId === p.id ? 'Загружаем...' : 'Загрузить фото'}
              </button>
              <input
                value={p.image}
                onChange={e => update(p.id, { image: e.target.value })}
                placeholder="или ссылка на фото"
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-[10px] outline-none focus:border-forest transition"
              />
              <div className="mt-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Ещё фото
              </div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {(p.images || []).map(url => (
                  <div
                    key={url}
                    className="relative w-11 h-11 rounded-lg overflow-hidden border border-border bg-background group"
                  >
                    <img src={url} alt="" loading="lazy" className="w-full h-full object-contain p-0.5" />
                    <button
                      onClick={() => makeMain(p.id, url)}
                      title="Сделать главным"
                      className="absolute inset-x-0 bottom-0 bg-forest/80 text-white text-[8px] font-bold py-0.5 opacity-0 group-hover:opacity-100 transition"
                    >
                      ГЛАВНОЕ
                    </button>
                    <button
                      onClick={() => removeGalleryPhoto(p.id, url)}
                      title="Удалить фото"
                      className="absolute top-0 right-0 bg-primary text-white w-4 h-4 flex items-center justify-center text-[10px] leading-none rounded-bl-md opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <input
                  ref={el => (galleryRefs.current[p.id] = el)}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={e => {
                    const files = Array.from(e.target.files || []);
                    if (files.length) uploadGallery(p.id, files);
                    e.target.value = '';
                  }}
                />
                <button
                  onClick={() => galleryRefs.current[p.id]?.click()}
                  disabled={uploadingId === p.id}
                  title="Добавить фото"
                  className="w-11 h-11 rounded-lg border border-dashed border-border text-muted-foreground hover:border-forest hover:text-forest transition flex items-center justify-center disabled:opacity-60"
                >
                  <Icon name="Plus" size={16} />
                </button>
              </div>
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
                    {(packOptions.includes(p.category) ? packOptions : [p.category, ...packOptions]).map(c => (
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