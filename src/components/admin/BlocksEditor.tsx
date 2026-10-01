import { useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { TEXTS_URL, SettingField } from '@/hooks/useSiteTexts';
import { BLOCKS_META, PageBlock, parseBlocks } from '@/lib/siteConfig';

interface Props {
  fields: SettingField[];
  onSaved: () => void;
  onOpen: (section: string) => void;
}

const KEY = 'page.blocks';

export default function BlocksEditor({ fields, onSaved, onOpen }: Props) {
  const saved = parseBlocks(fields.find(f => f.key === KEY)?.value);
  const [draft, setDraft] = useState<PageBlock[] | null>(null);
  const [saving, setSaving] = useState(false);
  const list = draft ?? saved;

  const move = (i: number, dir: -1 | 1) => {
    const next = [...list];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    setDraft(next);
  };

  const toggle = (i: number) => {
    const next = [...list];
    next[i] = { ...next[i], enabled: !next[i].enabled };
    setDraft(next);
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
      toast.success('Блоки сохранены');
    } else {
      toast.error('Не удалось сохранить');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 bg-white rounded-2xl border border-border p-4">
        <span className="text-sm text-muted-foreground">
          Включайте, выключайте и меняйте порядок блоков на главной странице
        </span>
        <Button
          onClick={save}
          disabled={!draft || saving}
          className="rounded-full font-bold bg-secondary text-secondary-foreground hover:brightness-105 shrink-0"
        >
          {saving ? 'Сохраняем...' : draft ? 'Сохранить' : 'Сохранено'}
        </Button>
      </div>

      <div className="space-y-2">
        {list.map((b, i) => {
          const meta = BLOCKS_META[b.id];
          return (
            <div
              key={b.id}
              className={`flex items-center gap-3 bg-white rounded-2xl border border-border p-3 sm:p-4 transition ${
                b.enabled ? '' : 'opacity-60'
              }`}
            >
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  title="Выше"
                  className="w-7 h-6 rounded-md border border-border flex items-center justify-center text-forest hover:border-forest/50 disabled:opacity-30"
                >
                  <Icon name="ChevronUp" size={14} />
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === list.length - 1}
                  title="Ниже"
                  className="w-7 h-6 rounded-md border border-border flex items-center justify-center text-forest hover:border-forest/50 disabled:opacity-30"
                >
                  <Icon name="ChevronDown" size={14} />
                </button>
              </div>
              <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-forest shrink-0">
                <Icon name={meta.icon} fallback="Square" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-extrabold text-forest text-sm">{meta.title}</div>
                <div className="text-[11px] text-muted-foreground">
                  {b.enabled ? 'Показывается на сайте' : 'Скрыт'}
                </div>
              </div>
              <button
                onClick={() => onOpen(meta.section)}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-forest hover:border-forest/50 transition"
              >
                <Icon name="Pencil" size={13} />
                Редактировать
              </button>
              <button
                onClick={() => toggle(i)}
                title={b.enabled ? 'Скрыть блок' : 'Показать блок'}
                className={`relative w-11 h-6 rounded-full transition shrink-0 ${b.enabled ? 'bg-forest' : 'bg-border'}`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                    b.enabled ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
