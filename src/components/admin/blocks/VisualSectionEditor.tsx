import { useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { TEXTS_URL, TextField, SettingField } from '@/hooks/useSiteTexts';
import InlineField from '@/components/admin/blocks/InlineField';
import MediaSlot from '@/components/admin/blocks/MediaSlot';
import { Group, SECTION_LAYOUTS, groupKeys } from '@/components/admin/blocks/sectionLayouts';

interface Props {
  section: string;
  fields: TextField[];
  settingFields: SettingField[];
  textDraft: Record<string, string>;
  setTextDraft: (d: Record<string, string>) => void;
  onSaved: () => void;
  onOpen: (tab: string) => void;
}

export default function VisualSectionEditor({
  section,
  fields,
  settingFields,
  textDraft,
  setTextDraft,
  onSaved,
  onOpen,
}: Props) {
  const [setDraft, setSetDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const layout = SECTION_LAYOUTS[section];
  const sectionFields = fields.filter(f => f.section === section);
  const byKey = Object.fromEntries(fields.map(f => [f.key, f]));
  const settingByKey = Object.fromEntries(settingFields.map(f => [f.key, f]));

  const val = (k: string) => textDraft[k] ?? byKey[k]?.value ?? '';
  const isChanged = (k: string) => byKey[k] !== undefined && textDraft[k] !== undefined && textDraft[k] !== byKey[k].value;
  const setVal = (k: string, v: string) => setTextDraft({ ...textDraft, [k]: v });

  const sVal = (k: string) => setDraft[k] ?? settingByKey[k]?.value ?? '';
  const sChanged = (k: string) => setDraft[k] !== undefined && setDraft[k] !== settingByKey[k]?.value;
  const setSVal = (k: string, v: string) => setSetDraft({ ...setDraft, [k]: v });

  const changedTexts = fields.filter(f => isChanged(f.key));
  const changedSettings = Object.keys(setDraft).filter(sChanged);
  const totalChanged = changedTexts.length + changedSettings.length;

  const save = async () => {
    if (!totalChanged) return;
    setSaving(true);
    const res = await fetch(TEXTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Password': sessionStorage.getItem('admin_pw') || '',
      },
      body: JSON.stringify({
        updates: Object.fromEntries(changedTexts.map(f => [f.key, textDraft[f.key]])),
        settings: Object.fromEntries(changedSettings.map(k => [k, setDraft[k]])),
      }),
    });
    setSaving(false);
    if (res.ok) {
      setSetDraft({});
      toast.success('Блок сохранён — изменения уже на сайте');
      onSaved();
    } else {
      toast.error('Не удалось сохранить');
    }
  };

  const reset = () => {
    const next = { ...textDraft };
    sectionFields.forEach(f => delete next[f.key]);
    setTextDraft(next);
    setSetDraft({});
  };

  const dark = layout?.dark;
  const bg = layout?.bgImage ? sVal(layout.bgImage) : '';
  const muted = dark ? 'text-white/75' : 'text-muted-foreground';
  const hint = (k: string) => byKey[k]?.title || '';

  const field = (k: string, cls = '') =>
    byKey[k] ? (
      <InlineField key={k} value={val(k)} onChange={v => setVal(k, v)} hint={hint(k)} changed={isChanged(k)} className={cls} />
    ) : null;

  const renderGroup = (g: Group, i: number) => {
    switch (g.type) {
      case 'pill':
        return (
          <div key={i} className="inline-block max-w-full rounded-full bg-secondary text-secondary-foreground px-4 py-1.5">
            {field(g.key, 'text-[11px] font-extrabold uppercase tracking-wider')}
          </div>
        );
      case 'eyebrow':
        return <div key={i}>{field(g.key, `eyebrow-script ${dark ? 'text-secondary' : 'text-primary'}`)}</div>;
      case 'bignum':
        return <div key={i}>{field(g.key, `text-5xl font-black ${dark ? 'text-white/20' : 'text-forest/15'}`)}</div>;
      case 'title':
        return (
          <div key={i} className="space-y-0.5">
            {g.keys.map(k => field(k, `text-2xl sm:text-4xl title-festive leading-tight ${dark ? 'text-white' : ''}`))}
            {(g.accentKeys || []).map(k => field(k, 'text-2xl sm:text-4xl title-festive leading-tight text-secondary'))}
          </div>
        );
      case 'text':
        return <div key={i}>{field(g.key, `text-sm leading-relaxed ${muted}`)}</div>;
      case 'buttons':
        return (
          <div key={i} className="flex flex-wrap gap-2">
            {g.keys.map((k, j) => (
              <div
                key={k}
                className={`min-w-[150px] rounded-full px-5 py-2.5 ${
                  j === 0 ? 'bg-primary text-white' : dark ? 'border border-white/40 text-white' : 'border border-forest/30 text-forest'
                }`}
              >
                {field(k, 'text-sm font-bold text-center')}
              </div>
            ))}
          </div>
        );
      case 'stats':
        return (
          <div key={i} className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {g.pairs.map(([v, l]) => (
              <div key={v} className={`rounded-2xl p-3 ${dark ? 'bg-white/10' : 'bg-background border border-border'}`}>
                {field(v, `text-xl font-black ${dark ? 'text-secondary' : 'text-forest'}`)}
                {field(l, `text-[11px] leading-snug ${muted}`)}
              </div>
            ))}
          </div>
        );
      case 'cards':
        return (
          <div key={i} className="grid sm:grid-cols-2 gap-3">
            {g.pairs.map(([t, x], j) => (
              <div key={t} className="rounded-2xl bg-white border border-border p-4 text-forest shadow-sm">
                <div className="mb-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-black">
                  {j + 1}
                </div>
                {field(t, 'font-extrabold text-base')}
                {field(x, 'mt-1 text-xs text-muted-foreground leading-relaxed')}
              </div>
            ))}
          </div>
        );
      case 'list':
        return (
          <div key={i} className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
            {g.keys.map(k => (
              <div key={k} className="flex items-start gap-2">
                <Icon name="Check" size={15} className="mt-1 text-secondary shrink-0" />
                <div className="flex-1">{field(k, `text-sm ${dark ? 'text-white' : 'text-forest'}`)}</div>
              </div>
            ))}
          </div>
        );
      case 'contacts':
        return (
          <div key={i} className="space-y-2">
            {g.items.map(it => (
              <div key={it.key} className={`flex items-center gap-3 rounded-2xl px-3 py-2 ${dark ? 'bg-white/10' : 'bg-white border border-border'}`}>
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon name={it.icon} size={15} />
                </div>
                <div className="flex-1">{field(it.key, `text-sm font-bold ${dark ? 'text-white' : 'text-forest'}`)}</div>
              </div>
            ))}
          </div>
        );
      case 'circle':
        return (
          <div key={i} className="flex justify-end -mt-14 mr-3 relative z-10">
            <div className="w-32 h-32 rounded-full bg-secondary text-secondary-foreground shadow-xl flex flex-col items-center justify-center px-3 text-center">
              {field(g.value, 'text-lg font-black text-center')}
              {field(g.sub, 'text-[10px] font-semibold text-center leading-tight')}
            </div>
          </div>
        );
      case 'note':
        return (
          <div key={i} className="rounded-2xl bg-white text-forest border border-border shadow-sm p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">{g.title}</div>
            {g.keys.map((k, j) => field(k, j === 0 && g.keys.length > 1 ? 'font-extrabold text-sm' : 'text-xs text-muted-foreground'))}
          </div>
        );
      case 'image':
      case 'file':
        if (!settingByKey[g.key]) return null;
        return (
          <MediaSlot
            key={i}
            label={g.label}
            kind={g.type}
            tall={g.type === 'image' ? g.tall : false}
            value={sVal(g.key)}
            changed={sChanged(g.key)}
            onChange={v => setSVal(g.key, v)}
          />
        );
      default:
        return null;
    }
  };

  const covered = new Set([...(layout?.left || []), ...(layout?.right || [])].flatMap(groupKeys));
  const rest = sectionFields.filter(f => !covered.has(f.key));

  return (
    <div className="space-y-4">
      <div className="sticky top-[64px] z-10 flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl border border-border p-3 sm:p-4 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-forest text-white flex items-center justify-center shrink-0">
            <Icon name={layout?.icon || 'LayoutTemplate'} fallback="LayoutTemplate" size={17} />
          </div>
          <div className="min-w-0">
            <div className="font-extrabold text-forest truncate">{section}</div>
            <div className="text-[11px] text-muted-foreground">
              {totalChanged ? `Изменено: ${totalChanged}` : 'Нажмите на любой текст или картинку, чтобы изменить'}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {totalChanged > 0 && (
            <Button onClick={reset} variant="ghost" className="rounded-full font-bold">
              Отменить
            </Button>
          )}
          <Button
            onClick={save}
            disabled={!totalChanged || saving}
            className="rounded-full font-bold bg-secondary text-secondary-foreground hover:brightness-105"
          >
            {saving ? 'Сохраняем...' : totalChanged ? `Сохранить (${totalChanged})` : 'Сохранено'}
          </Button>
        </div>
      </div>

      {layout?.links && (
        <div className="flex flex-wrap gap-2">
          {layout.links.map(l => (
            <button
              key={l.tab}
              onClick={() => onOpen(l.tab)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3.5 py-2 text-xs font-bold text-forest hover:border-forest/50 transition"
            >
              <Icon name={l.icon} size={14} />
              {l.label}
              <Icon name="ArrowRight" size={13} className="opacity-60" />
            </button>
          ))}
        </div>
      )}

      <div
        className={`relative overflow-hidden rounded-3xl border border-border shadow-sm ${dark ? 'bg-forest text-white' : 'bg-background text-forest'}`}
      >
        {bg && (
          <div
            className={`absolute inset-0 bg-cover bg-center ${dark ? 'opacity-25' : 'opacity-15'}`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        )}
        <div className="absolute top-3 right-3 z-10 rounded-full bg-black/40 text-white text-[10px] font-bold px-2.5 py-1 backdrop-blur">
          Предпросмотр блока
        </div>
        <div className={`relative p-5 sm:p-8 grid gap-6 ${layout?.right ? 'lg:grid-cols-[1.2fr_1fr]' : ''}`}>
          <div className="space-y-4 min-w-0">{(layout?.left || []).map(renderGroup)}</div>
          {layout?.right && <div className="space-y-3 min-w-0">{layout.right.map(renderGroup)}</div>}
        </div>
      </div>

      {rest.length > 0 && (
        <div className="bg-white rounded-2xl border border-border p-4 sm:p-5 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Другие надписи блока</div>
          {rest.map(f => (
            <div key={f.key}>
              <div className="text-xs font-bold text-forest mb-1">{f.title}</div>
              <div className="rounded-xl border border-border bg-background px-3 py-2">
                {field(f.key, 'text-sm')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
