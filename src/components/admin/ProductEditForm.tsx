import { MutableRefObject } from 'react';
import Icon from '@/components/ui/icon';
import { ApiProduct } from '@/hooks/useProducts';

interface ProductEditFormProps {
  p: ApiProduct;
  packOptions: string[];
  uploadingId: number | null;
  fileRefs: MutableRefObject<Record<number, HTMLInputElement | null>>;
  galleryRefs: MutableRefObject<Record<number, HTMLInputElement | null>>;
  update: (id: number, patch: Partial<ApiProduct>) => void;
  uploadPhoto: (id: number, file: File) => void;
  uploadGallery: (id: number, files: File[]) => void;
  removeGalleryPhoto: (id: number, url: string) => void;
  makeMain: (id: number, url: string) => void;
  removeProduct: (id: number) => void;
}

export default function ProductEditForm({
  p,
  packOptions,
  uploadingId,
  fileRefs,
  galleryRefs,
  update,
  uploadPhoto,
  uploadGallery,
  removeGalleryPhoto,
  makeMain,
  removeProduct,
}: ProductEditFormProps) {
  return (
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
          <button
            type="button"
            onClick={() => update(p.id, { is_sold_out: !p.is_sold_out })}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold border transition ${
              p.is_sold_out
                ? 'bg-forest text-white border-forest'
                : 'bg-background text-forest border-border hover:border-forest'
            }`}
          >
            <Icon name={p.is_sold_out ? 'PackageX' : 'PackageCheck'} size={14} />
            {p.is_sold_out ? 'Закончились' : 'В наличии'}
          </button>
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
  );
}
