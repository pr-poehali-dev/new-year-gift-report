import { useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { TEXTS_URL, SettingField } from '@/hooks/useSiteTexts';
import { PackagingType, parsePackaging, PACKAGING_COLORS, PACKAGING_ICONS } from '@/lib/siteConfig';

interface Props {
  fields: SettingField[];
  onSaved: () => void;
}

const KEY = 'catalog.packaging';

export default function PackagingEditor({ fields, onSaved }: Props) {
  const saved = parsePackaging(fields.find(f => f.key === KEY)?.value);
  const [draft, setDraft] = useState<PackagingType[] | null>(null);
  const [saving, setSaving] = useState(false);
  const list = draft ?? saved;

  const update = (i: number, p: Partial<PackagingType>) => {
    const next = [...list];
    next[i] = { ...next[i], ...p };
    setDraft(next);
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    setDraft(next);
  };

  const add = () => {
    const colors = Object.keys(PACKAGING_COLORS);
    setDraft([...list, { name: 'Новая упаковка', icon: 'Gift', description: '', color: colors[list.length % colors.length] }]);
  };

  const remove = (i: number) => {
    if (!confirm(`Убрать «${list[i].name}»?`)) return;
    setDraft(list.filter((_, j) => j !== i));
  };

  const save = async () => {
    if (!draft) return;
    const clean = draft.map(p => ({ ...p, name: p.name.trim(), description: p.description.trim() })).filter(p => p.name);
    setSaving(true);
    const res = await fetch(TEXTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Password': sessionStorage.getItem('admin_pw') || '',
      },
      body: JSON.stringify({ settings: { [KEY]: JSON.stringify(clean) } }),
    });
    setSaving(false);
    if (res.ok) {
      setDraft(null);
      onSaved();
      toast.success('Виды упаковки сохранены');
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

      <p className="text-[11px] text-muted-foreground px-1">
        Карточки в блоке «Какой будет ваш подарок?». Если убрать все — блок скроется с сайта.
      </p>

      <div className="space-y-3">
        {list.map((p, i) => (
          <div key={i} className="bg-white rounded-2xl border border-border p-4">
            <div className="flex gap-3">
              <div className={`${(PACKAGING_COLORS[p.color] || PACKAGING_COLORS.rose).bg} w-14 h-14 rounded-2xl flex items-center justify-center shrink-0`}>
                <Icon name={p.icon} fallback="Gift" size={24} className="text-forest" />
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <input
                  value={p.name}
                  onChange={e => update(i, { name: e.target.value })}
                  placeholder="Название"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-bold text-forest outline-none focus:border-forest"
                />
                <input
                  value={p.description}
                  onChange={e => update(i, { description: e.target.value })}
                  placeholder="Короткое описание"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-forest"
                />
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => move(i, -1)} disabled={i === 0} title="Выше" className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-forest disabled:opacity-30">
                  <Icon name="ChevronUp" size={16} />
                </button>
                <button onClick={() => move(i, 1)} disabled={i === list.length - 1} title="Ниже" className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-forest disabled:opacity-30">
                  <Icon name="ChevronDown" size={16} />
                </button>
                <button onClick={() => remove(i)} title="Убрать" className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-primary hover:bg-primary/5">
                  <Icon name="Trash2" size={15} />
                </button>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-muted-foreground mr-1">Значок:</span>
              {PACKAGING_ICONS.map(ic => (
                <button
                  key={ic}
                  onClick={() => update(i, { icon: ic })}
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center ${p.icon === ic ? 'border-forest bg-forest text-white' : 'border-border text-forest hover:border-forest/50'}`}
                >
                  <Icon name={ic} size={15} />
                </button>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-muted-foreground mr-1">Фон:</span>
              {Object.entries(PACKAGING_COLORS).map(([key, c]) => (
                <button
                  key={key}
                  onClick={() => update(i, { color: key })}
                  title={c.label}
                  className={`w-8 h-8 rounded-lg border-2 ${c.bg} ${p.color === key ? 'border-forest' : 'border-border'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={add} variant="outline" className="w-full rounded-2xl border-dashed font-bold py-6">
        <Icon name="Plus" size={16} className="mr-1" />
        Добавить вид упаковки
      </Button>
    </div>
  );
}
