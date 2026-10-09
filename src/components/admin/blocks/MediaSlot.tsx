import { useRef, useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { TEXTS_URL } from '@/hooks/useSiteTexts';
import { compressImage } from '@/lib/compressImage';

interface MediaSlotProps {
  label: string;
  value: string;
  kind: 'image' | 'file';
  tall?: boolean;
  changed?: boolean;
  onChange: (url: string) => void;
}

async function uploadToServer(data: string, filename: string): Promise<string | null> {
  const res = await fetch(TEXTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Password': sessionStorage.getItem('admin_pw') || '',
    },
    body: JSON.stringify({ action: 'upload', image: data, filename }),
  });
  if (!res.ok) return null;
  const json = await res.json().catch(() => ({}));
  return json.url || null;
}

export default function MediaSlot({ label, value, kind, tall, changed, onChange }: MediaSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [showUrl, setShowUrl] = useState(false);

  const pick = async (file: File) => {
    setBusy(true);
    try {
      const data =
        kind === 'image' && file.type.startsWith('image/')
          ? await compressImage(file, 1600, 0.85)
          : await new Promise<string>((resolve, reject) => {
              const r = new FileReader();
              r.onload = () => resolve(r.result as string);
              r.onerror = () => reject(new Error('read'));
              r.readAsDataURL(file);
            });
      const url = await uploadToServer(data, file.name);
      if (url) {
        onChange(url);
        toast.success('Загружено — не забудьте сохранить');
      } else {
        toast.error('Не удалось загрузить');
      }
    } catch {
      toast.error('Не удалось обработать файл');
    }
    setBusy(false);
  };

  return (
    <div
      className={`rounded-2xl bg-white/95 text-forest border shadow-sm p-2 ${
        changed ? 'border-secondary ring-2 ring-secondary/40' : 'border-border'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={kind === 'image' ? 'image/*' : '.pdf,.doc,.docx,.xls,.xlsx,.zip'}
        className="hidden"
        onChange={e => {
          const f = e.target.files?.[0];
          if (f) pick(f);
          e.target.value = '';
        }}
      />
      {kind === 'image' ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className={`group relative block w-full overflow-hidden rounded-xl bg-background ${tall ? 'h-52 sm:h-64' : 'h-24'}`}
        >
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Icon name="ImagePlus" size={26} />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-forest/60 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition">
            <Icon name={busy ? 'Loader2' : 'Upload'} size={16} className={`mr-1.5 ${busy ? 'animate-spin' : ''}`} />
            {busy ? 'Загружаем...' : 'Заменить'}
          </div>
          {busy && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <Icon name="Loader2" size={22} className="animate-spin text-forest" />
            </div>
          )}
        </button>
      ) : (
        <div className="flex items-center gap-2 rounded-xl bg-background px-3 py-2.5">
          <Icon name="FileText" size={18} className="text-primary shrink-0" />
          <span className="text-xs font-semibold truncate flex-1">
            {value ? decodeURIComponent(value.split('/').pop() || 'файл') : 'Файл не загружен'}
          </span>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="text-xs font-bold text-primary hover:underline shrink-0"
          >
            {busy ? 'Загружаем...' : value ? 'Заменить' : 'Загрузить'}
          </button>
          {value && (
            <button type="button" onClick={() => onChange('')} className="text-muted-foreground hover:text-primary shrink-0" title="Убрать">
              <Icon name="X" size={14} />
            </button>
          )}
        </div>
      )}
      <div className="mt-1.5 flex items-center justify-between gap-2 px-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground truncate">{label}</span>
        <button
          type="button"
          onClick={() => setShowUrl(v => !v)}
          className="text-[10px] font-bold text-muted-foreground hover:text-forest shrink-0"
        >
          {showUrl ? 'Скрыть ссылку' : 'Ссылка'}
        </button>
      </div>
      {showUrl && (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://..."
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-[11px] outline-none focus:border-forest"
        />
      )}
    </div>
  );
}
