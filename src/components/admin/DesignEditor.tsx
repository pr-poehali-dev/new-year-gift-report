import { useRef, useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { TEXTS_URL, SettingField, applyTheme } from '@/hooks/useSiteTexts';

const FONTS = [
  'Manrope',
  'Montserrat',
  'Golos Text',
  'Rubik',
  'Inter',
  'Nunito',
  'Comfortaa',
  'PT Sans',
  'Roboto',
  'Play',
];

interface Props {
  fields: SettingField[];
  kinds: string[];
  onSaved: () => void;
}

export default function DesignEditor({ fields, kinds, onSaved }: Props) {
  const visible = fields.filter(f => kinds.includes(f.kind));
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const valueOf = (f: SettingField) => draft[f.key] ?? f.value;
  const changed = visible.filter(f => draft[f.key] !== undefined && draft[f.key] !== f.value);

  const set = (key: string, value: string) => {
    const next = { ...draft, [key]: value };
    setDraft(next);
    applyTheme(Object.fromEntries([...fields.map(f => [f.key, f.value]), ...Object.entries(next)]));
  };

  const upload = (key: string, file: File) => {
    setUploading(key);
    const reader = new FileReader();
    reader.onload = async () => {
      const res = await fetch(TEXTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': sessionStorage.getItem('admin_pw') || '',
        },
        body: JSON.stringify({ action: 'upload', image: reader.result, filename: file.name }),
      });
      setUploading(null);
      if (res.ok) {
        const data = await res.json();
        set(key, data.url);
        toast.success('Загружено — не забудьте сохранить');
      } else {
        toast.error('Не удалось загрузить');
      }
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    if (!changed.length) return;
    setSaving(true);
    const res = await fetch(TEXTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Password': sessionStorage.getItem('admin_pw') || '',
      },
      body: JSON.stringify({
        settings: Object.fromEntries(changed.map(f => [f.key, draft[f.key]])),
      }),
    });
    setSaving(false);
    if (res.ok) {
      setDraft({});
      onSaved();
      toast.success('Сохранено');
    } else {
      toast.error('Не удалось сохранить');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 bg-white rounded-2xl border border-border p-4">
        <span className="text-sm text-muted-foreground">
          {changed.length ? `Не сохранено: ${changed.length}` : 'Все изменения сохранены'}
        </span>
        <Button
          onClick={save}
          disabled={!changed.length || saving}
          className="rounded-full font-bold bg-secondary text-secondary-foreground hover:brightness-105"
        >
          {saving ? 'Сохраняем...' : 'Сохранить'}
        </Button>
      </div>

      {visible.map(f => (
        <div key={f.key} className="bg-white rounded-2xl border border-border p-4 sm:p-5">
          <div className="text-xs font-bold text-forest">{f.title}</div>
          {f.hint && <div className="text-[11px] text-muted-foreground mt-0.5">{f.hint}</div>}

          {f.kind === 'image' && (
            <div className="mt-3 flex items-center gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-background border border-border flex items-center justify-center shrink-0">
                {valueOf(f) ? (
                  <img src={valueOf(f)} alt="" className="w-full h-full object-contain" />
                ) : (
                  <Icon name="Image" size={24} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <input
                  ref={el => (fileRefs.current[f.key] = el)}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && upload(f.key, e.target.files[0])}
                />
                <button
                  onClick={() => fileRefs.current[f.key]?.click()}
                  disabled={uploading === f.key}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-bold text-forest hover:border-forest/50 transition"
                >
                  {uploading === f.key ? 'Загружаем...' : 'Выбрать файл'}
                </button>
                <input
                  value={valueOf(f)}
                  onChange={e => set(f.key, e.target.value)}
                  placeholder="или вставьте ссылку на картинку"
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-forest transition"
                />
              </div>
            </div>
          )}

          {f.kind === 'file' && (
            <div className="mt-3">
              <input
                ref={el => (fileRefs.current[f.key] = el)}
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
                className="hidden"
                onChange={e => e.target.files?.[0] && upload(f.key, e.target.files[0])}
              />
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => fileRefs.current[f.key]?.click()}
                  disabled={uploading === f.key}
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-bold text-forest hover:border-forest/50 transition"
                >
                  <Icon name="Upload" size={14} />
                  {uploading === f.key ? 'Загружаем...' : 'Загрузить файл'}
                </button>
                {valueOf(f) && (
                  <>
                    <a
                      href={valueOf(f)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      <Icon name="FileText" size={14} />
                      Проверить файл
                    </a>
                    <button
                      onClick={() => set(f.key, '')}
                      className="text-xs font-semibold text-muted-foreground hover:text-primary transition"
                    >
                      Убрать
                    </button>
                  </>
                )}
              </div>
              <input
                value={valueOf(f)}
                onChange={e => set(f.key, e.target.value)}
                placeholder="или вставьте ссылку на файл"
                className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-forest transition"
              />
            </div>
          )}

          {f.kind === 'color' && (
            <div className="mt-3 flex items-center gap-3">
              <input
                type="color"
                value={valueOf(f)}
                onChange={e => set(f.key, e.target.value)}
                className="w-14 h-12 rounded-xl border border-border cursor-pointer bg-white p-1"
              />
              <input
                value={valueOf(f)}
                onChange={e => set(f.key, e.target.value)}
                className="w-32 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-mono outline-none focus:border-forest transition"
              />
            </div>
          )}

          {f.kind === 'font' && (
            <select
              value={valueOf(f)}
              onChange={e => set(f.key, e.target.value)}
              className="mt-3 w-full sm:w-64 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-forest transition"
            >
              {FONTS.map(font => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          )}

          {f.kind === 'fontsize' && (
            <div className="mt-3 flex items-center gap-4">
              <input
                type="range"
                min={85}
                max={120}
                step={5}
                value={Number(valueOf(f))}
                onChange={e => set(f.key, e.target.value)}
                className="flex-1 max-w-xs accent-[hsl(var(--primary))]"
              />
              <span className="text-sm font-bold text-forest w-14">{valueOf(f)}%</span>
            </div>
          )}

          {draft[f.key] !== undefined && draft[f.key] !== f.value && (
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-primary font-semibold">
              <Icon name="Pencil" size={12} />
              Изменено — не забудьте сохранить
            </div>
          )}
        </div>
      ))}
    </div>
  );
}