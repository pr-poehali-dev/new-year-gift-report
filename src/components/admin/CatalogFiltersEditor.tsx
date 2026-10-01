import { useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { TEXTS_URL, SettingField } from '@/hooks/useSiteTexts';
import { CatalogFilters, parseFilters } from '@/lib/siteConfig';

interface Props {
  fields: SettingField[];
  onSaved: () => void;
}

const KEY = 'catalog.filters';

export default function CatalogFiltersEditor({ fields, onSaved }: Props) {
  const saved = parseFilters(fields.find(f => f.key === KEY)?.value);
  const [draft, setDraft] = useState<CatalogFilters | null>(null);
  const [newCat, setNewCat] = useState('');
  const [saving, setSaving] = useState(false);
  const cfg = draft ?? saved;

  const patch = (p: Partial<CatalogFilters>) => setDraft({ ...cfg, ...p });

  const move = (i: number, dir: -1 | 1) => {
    const list = [...cfg.categories];
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    patch({ categories: list });
  };

  const addCat = () => {
    const name = newCat.trim();
    if (!name) return;
    if (cfg.categories.includes(name)) {
      toast.error('Такая кнопка уже есть');
      return;
    }
    patch({ categories: [...cfg.categories, name] });
    setNewCat('');
  };

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    const res = await fetch(TEXTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Password': sessionStorage.getItem('admin_pw') || '',
      },
      body: JSON.stringify({ settings: { [KEY]: JSON.stringify(draft) } }),
    });
    setSaving(false);
    if (res.ok) {
      setDraft(null);
      onSaved();
      toast.success('Кнопки каталога сохранены');
    } else {
      toast.error('Не удалось сохранить');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 bg-white rounded-2xl border border-border p-4">
        <span className="text-sm text-muted-foreground">
          {draft ? 'Есть несохранённые изменения' : 'Все изменения сохранены'}
        </span>
        <Button
          onClick={save}
          disabled={!draft || saving}
          className="rounded-full font-bold bg-secondary text-secondary-foreground hover:brightness-105"
        >
          {saving ? 'Сохраняем...' : 'Сохранить'}
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-border p-4 sm:p-5">
        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Так это выглядит на сайте</div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-background p-3">
          <div className="flex flex-wrap gap-2">
            {cfg.showAll && (
              <span className="rounded-full px-4 py-2 text-xs font-semibold bg-forest text-forest-foreground">
                {cfg.allLabel || 'Все подарки'}
              </span>
            )}
            {cfg.categories.map((c, i) => (
              <span
                key={c}
                className={`rounded-full px-4 py-2 text-xs font-semibold border border-border ${
                  !cfg.showAll && i === 0 ? 'bg-forest text-forest-foreground' : 'bg-white text-forest'
                }`}
              >
                {c}
              </span>
            ))}
          </div>
          {cfg.showSort && cfg.sorts.filter(s => s.enabled).length > 1 && (
            <span className="rounded-full bg-white border border-border px-4 py-2 text-xs font-semibold text-forest inline-flex items-center gap-1.5">
              <Icon name="ArrowDownUp" size={13} />
              {cfg.sorts.find(s => s.enabled)?.label}
            </span>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-4 sm:p-5">
        <div className="text-sm font-extrabold text-forest">Кнопки фильтра</div>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Название кнопки должно совпадать с упаковкой у подарка — тогда фильтр покажет нужные товары.
        </p>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-border p-3">
          <input
            type="checkbox"
            checked={cfg.showAll}
            onChange={e => patch({ showAll: e.target.checked })}
            className="w-4 h-4 accent-[hsl(var(--primary))]"
          />
          <input
            value={cfg.allLabel}
            onChange={e => patch({ allLabel: e.target.value })}
            disabled={!cfg.showAll}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-forest disabled:opacity-50"
          />
          <span className="text-[11px] text-muted-foreground hidden sm:inline">кнопка «показать всё»</span>
        </div>

        <div className="mt-2 space-y-2">
          {cfg.categories.map((c, i) => (
            <div key={c + i} className="flex items-center gap-2 rounded-xl border border-border p-2 pl-3">
              <Icon name="GripVertical" size={16} className="text-muted-foreground" />
              <input
                value={c}
                onChange={e => {
                  const list = [...cfg.categories];
                  list[i] = e.target.value;
                  patch({ categories: list });
                }}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-forest"
              />
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                title="Выше"
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-forest hover:border-forest/50 disabled:opacity-30"
              >
                <Icon name="ChevronUp" size={16} />
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === cfg.categories.length - 1}
                title="Ниже"
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-forest hover:border-forest/50 disabled:opacity-30"
              >
                <Icon name="ChevronDown" size={16} />
              </button>
              <button
                onClick={() => patch({ categories: cfg.categories.filter((_, j) => j !== i) })}
                title="Удалить кнопку"
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-primary hover:bg-primary/5"
              >
                <Icon name="Trash2" size={15} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <input
            value={newCat}
            onChange={e => setNewCat(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCat()}
            placeholder="Новая кнопка, например «Жесть»"
            className="flex-1 rounded-xl border border-dashed border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-forest"
          />
          <Button onClick={addCat} variant="outline" className="rounded-xl font-bold">
            <Icon name="Plus" size={16} className="mr-1" />
            Добавить
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-4 sm:p-5">
        <label className="flex items-center gap-2 text-sm font-extrabold text-forest cursor-pointer">
          <input
            type="checkbox"
            checked={cfg.showSort}
            onChange={e => patch({ showSort: e.target.checked })}
            className="w-4 h-4 accent-[hsl(var(--primary))]"
          />
          Показывать сортировку
        </label>
        <div className={`mt-3 space-y-2 ${cfg.showSort ? '' : 'opacity-50 pointer-events-none'}`}>
          {cfg.sorts.map((s, i) => (
            <div key={s.key} className="flex items-center gap-3 rounded-xl border border-border p-2 pl-3">
              <input
                type="checkbox"
                checked={s.enabled}
                onChange={e => {
                  const list = [...cfg.sorts];
                  list[i] = { ...s, enabled: e.target.checked };
                  patch({ sorts: list });
                }}
                className="w-4 h-4 accent-[hsl(var(--primary))]"
              />
              <input
                value={s.label}
                onChange={e => {
                  const list = [...cfg.sorts];
                  list[i] = { ...s, label: e.target.value };
                  patch({ sorts: list });
                }}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-forest"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
