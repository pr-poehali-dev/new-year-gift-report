import { useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { TEXTS_URL, SettingField } from '@/hooks/useSiteTexts';
import { CompositionSet, parseComposition } from '@/lib/siteConfig';

interface Props {
  fields: SettingField[];
  onSaved: () => void;
}

const KEY = 'composition.sets';

const adminHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Admin-Password': sessionStorage.getItem('admin_pw') || '',
});

export default function CompositionEditor({ fields, onSaved }: Props) {
  const saved = parseComposition(fields.find(f => f.key === KEY)?.value);
  const [draft, setDraft] = useState<CompositionSet[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<number | null>(null);
  const list = draft ?? saved;

  const update = (i: number, p: Partial<CompositionSet>) => {
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

  const remove = (i: number) => {
    if (list.length <= 1) return toast.error('Должен остаться хотя бы один вес');
    if (!confirm(`Убрать набор «${list[i].weight}»?`)) return;
    setDraft(list.filter((_, j) => j !== i));
  };

  const upload = (i: number, file: File) => {
    setUploading(i);
    const reader = new FileReader();
    reader.onload = async () => {
      const res = await fetch(TEXTS_URL, {
        method: 'POST',
        headers: adminHeaders(),
        body: JSON.stringify({ action: 'upload', image: reader.result, filename: file.name }),
      });
      setUploading(null);
      if (res.ok) {
        const data = await res.json();
        update(i, { image: data.url });
        toast.success('Картинка загружена — не забудьте сохранить');
      } else {
        toast.error('Не удалось загрузить картинку');
      }
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    if (!draft) return;
    const clean = draft
      .map(c => ({ weight: c.weight.trim(), candies: c.candies.trim(), image: c.image }))
      .filter(c => c.weight);
    setSaving(true);
    const res = await fetch(TEXTS_URL, {
      method: 'POST',
      headers: adminHeaders(),
      body: JSON.stringify({ settings: { [KEY]: JSON.stringify(clean) } }),
    });
    setSaving(false);
    if (res.ok) {
      setDraft(null);
      onSaved();
      toast.success('Состав сохранён');
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
        Вес и количество конфет видны в блоке «Состав», картинка — в окне «Посмотреть полный состав».
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl border border-border p-4 flex flex-col">
            <div className="relative rounded-xl overflow-hidden bg-sky-50 aspect-[3/4]">
              {c.image ? (
                <img src={c.image} alt={c.weight} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Icon name="ImageOff" size={28} />
                </div>
              )}
              <label className="absolute bottom-2 inset-x-2 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && upload(i, e.target.files[0])}
                />
                <span className="flex items-center justify-center gap-1.5 rounded-full bg-white/95 shadow px-3 py-2 text-xs font-bold text-forest hover:bg-white">
                  <Icon name={uploading === i ? 'Loader2' : 'Upload'} size={14} className={uploading === i ? 'animate-spin' : ''} />
                  {uploading === i ? 'Загружаем...' : 'Заменить картинку'}
                </span>
              </label>
            </div>

            <label className="block mt-3 text-[11px] font-bold text-muted-foreground">Вес</label>
            <input
              value={c.weight}
              onChange={e => update(i, { weight: e.target.value })}
              placeholder="700 г"
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-bold text-forest outline-none focus:border-forest"
            />
            <label className="block mt-2 text-[11px] font-bold text-muted-foreground">Количество конфет</label>
            <input
              value={c.candies}
              onChange={e => update(i, { candies: e.target.value })}
              placeholder="25–30 конфет"
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-forest"
            />

            <div className="mt-3 flex gap-1.5">
              <button onClick={() => move(i, -1)} disabled={i === 0} title="Левее" className="flex-1 h-8 rounded-lg border border-border flex items-center justify-center text-forest disabled:opacity-30">
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button onClick={() => move(i, 1)} disabled={i === list.length - 1} title="Правее" className="flex-1 h-8 rounded-lg border border-border flex items-center justify-center text-forest disabled:opacity-30">
                <Icon name="ChevronRight" size={16} />
              </button>
              <button onClick={() => remove(i)} title="Убрать" className="flex-1 h-8 rounded-lg border border-border flex items-center justify-center text-primary hover:bg-primary/5">
                <Icon name="Trash2" size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => setDraft([...list, { weight: '', candies: '', image: '' }])}
        variant="outline"
        className="w-full rounded-2xl border-dashed font-bold py-6"
      >
        <Icon name="Plus" size={16} className="mr-1" />
        Добавить вес
      </Button>
    </div>
  );
}
