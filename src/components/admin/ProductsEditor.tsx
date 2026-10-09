import { useMemo, useRef, useState } from 'react';
import { clearDraft, loadDraft, useLocalDraft } from '@/hooks/useLocalDraft';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { PRODUCTS_URL, ApiProduct, useProducts } from '@/hooks/useProducts';
import { useSiteContext } from '@/hooks/useSiteTexts';
import { parseFilters } from '@/lib/siteConfig';
import { compressImage } from '@/lib/compressImage';
import ProductEditForm from '@/components/admin/ProductEditForm';

const DRAFT_KEY = 'admin_products_draft';

type StatusFilter = 'all' | 'active' | 'sold' | 'hidden';

const STATUS_TABS: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'active', label: 'В продаже' },
  { key: 'sold', label: 'Закончились' },
  { key: 'hidden', label: 'Скрытые' },
];

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
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [pack, setPack] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);

  const counts = useMemo(
    () => ({
      all: list.length,
      active: list.filter(p => p.is_active && !p.is_sold_out).length,
      sold: list.filter(p => p.is_sold_out).length,
      hidden: list.filter(p => !p.is_active).length,
    }),
    [list],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return list.filter(p => {
      if (status === 'active' && !(p.is_active && !p.is_sold_out)) return false;
      if (status === 'sold' && !p.is_sold_out) return false;
      if (status === 'hidden' && p.is_active) return false;
      if (pack && p.category !== pack) return false;
      if (!q) return true;
      return [p.name, p.description, p.badge, p.weight, String(p.price)].some(v =>
        (v || '').toLowerCase().includes(q),
      );
    });
  }, [list, query, status, pack]);

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
      is_sold_out: false,
    };
    setDraft([...base, newItem]);
    setQuery('');
    setStatus('all');
    setPack('');
    setOpenId(newItem.id);
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


  const allPacks = Array.from(new Set([...packOptions, ...list.map(p => p.category)])).filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-20 -mx-1 px-1 pt-1 pb-2 bg-background/95 backdrop-blur space-y-3">
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

        <div className="bg-white rounded-2xl border border-border p-3 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Найти подарок по названию, цене, описанию..."
                className="w-full rounded-full border border-border bg-background pl-10 pr-9 py-2.5 text-sm outline-none focus:border-forest transition"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-forest"
                  aria-label="Очистить поиск"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
            <select
              value={pack}
              onChange={e => setPack(e.target.value)}
              className="rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-forest transition"
            >
              <option value="">Любая упаковка</option>
              {allPacks.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {STATUS_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setStatus(tab.key)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold border transition ${
                  status === tab.key
                    ? 'bg-forest text-white border-forest'
                    : 'bg-background text-forest border-border hover:border-forest'
                }`}
              >
                {tab.label} <span className="opacity-70">{counts[tab.key]}</span>
              </button>
            ))}
          </div>
        </div>

        {draft && (
          <div className="flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 px-4 py-2.5 text-xs font-semibold text-primary">
            <Icon name="TriangleAlert" size={15} />
            Есть несохранённые правки — они не пропадут при обновлении страницы. Нажмите «Сохранить каталог».
          </div>
        )}
      </div>

      {visible.length === 0 && (
        <div className="bg-white rounded-2xl border border-border p-8 text-center text-sm text-muted-foreground">
          Ничего не найдено. Измените поиск или фильтры.
        </div>
      )}

      <div className="space-y-2">
        {visible.map(p => {
          const isOpen = openId === p.id;
          return (
            <div
              key={p.id}
              className={`bg-white rounded-2xl border transition ${isOpen ? 'border-forest shadow-md' : 'border-border'}`}
            >
              <div className="flex items-center gap-3 p-2.5 sm:p-3">
                <button
                  onClick={() => setOpenId(isOpen ? null : p.id)}
                  className="flex flex-1 min-w-0 items-center gap-3 text-left"
                >
                  <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-background border border-border flex items-center justify-center">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        className={`max-w-full max-h-full object-contain p-1 ${p.is_sold_out ? 'grayscale opacity-60' : ''}`}
                      />
                    ) : (
                      <Icon name="Image" size={18} className="text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-sm text-forest truncate">{p.name || 'Без названия'}</span>
                      {p.badge && (
                        <span className="rounded-full bg-primary text-white text-[9px] font-extrabold px-1.5 py-0.5">
                          {p.badge}
                        </span>
                      )}
                      {p.is_sold_out && (
                        <span className="rounded-full bg-forest text-white text-[9px] font-extrabold px-1.5 py-0.5">
                          ЗАКОНЧИЛИСЬ
                        </span>
                      )}
                      {!p.is_active && (
                        <span className="rounded-full bg-muted text-muted-foreground text-[9px] font-extrabold px-1.5 py-0.5">
                          СКРЫТ
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {p.price.toLocaleString('ru-RU')} ₽ • {p.category} • {p.weight}
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => update(p.id, { is_sold_out: !p.is_sold_out })}
                  title={p.is_sold_out ? 'Вернуть в продажу' : 'Отметить «Закончились»'}
                  className={`hidden sm:inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-bold border transition ${
                    p.is_sold_out
                      ? 'bg-forest text-white border-forest'
                      : 'bg-background text-forest border-border hover:border-forest'
                  }`}
                >
                  <Icon name={p.is_sold_out ? 'PackageX' : 'PackageCheck'} size={13} />
                  {p.is_sold_out ? 'Закончились' : 'В наличии'}
                </button>
                <button
                  onClick={() => setOpenId(isOpen ? null : p.id)}
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-forest hover:bg-background transition"
                  aria-label={isOpen ? 'Свернуть' : 'Редактировать'}
                >
                  <Icon name={isOpen ? 'ChevronUp' : 'Pencil'} size={16} />
                </button>
              </div>
              {isOpen && (
                <div className="border-t border-border p-4 sm:p-5">
                  <ProductEditForm
                    p={p}
                    packOptions={packOptions}
                    uploadingId={uploadingId}
                    fileRefs={fileRefs}
                    galleryRefs={galleryRefs}
                    update={update}
                    uploadPhoto={uploadPhoto}
                    uploadGallery={uploadGallery}
                    removeGalleryPhoto={removeGalleryPhoto}
                    makeMain={makeMain}
                    removeProduct={removeProduct}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
