import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { TEXTS_URL, useSiteContext } from '@/hooks/useSiteTexts';

export default function EditModeBar() {
  const { editMode, values, reload } = useSiteContext();
  const initial = useRef<Record<string, string> | null>(null);
  const [dirty, setDirty] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editMode) return;
    if (!initial.current && Object.keys(values).length) {
      initial.current = { ...values };
    }
    if (initial.current) {
      const base = initial.current;
      setDirty(Object.keys(values).filter(k => values[k] !== base[k]).length);
    }
  }, [values, editMode]);

  if (!editMode) return null;

  const save = async () => {
    const base = initial.current || {};
    const updates = Object.fromEntries(
      Object.keys(values).filter(k => values[k] !== base[k]).map(k => [k, values[k]]),
    );
    if (!Object.keys(updates).length) return;
    setSaving(true);
    const res = await fetch(TEXTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Password': sessionStorage.getItem('admin_pw') || '',
      },
      body: JSON.stringify({ updates }),
    });
    setSaving(false);
    if (res.ok) {
      initial.current = { ...values };
      setDirty(0);
      reload();
      toast.success('Изменения сохранены');
    } else {
      toast.error('Не удалось сохранить');
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 rounded-full bg-[hsl(163_62%_10%)] text-white pl-5 pr-2 py-2 shadow-2xl border border-white/10">
      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold whitespace-nowrap">
        <Icon name="Pencil" size={15} className="text-sky-400" />
        {dirty ? `Изменено надписей: ${dirty}` : 'Кликните по любой надписи'}
      </div>
      <a
        href="/admin"
        className="text-xs font-semibold text-white/60 hover:text-white transition whitespace-nowrap"
      >
        В админку
      </a>
      <Button
        onClick={save}
        disabled={!dirty || saving}
        size="sm"
        className="rounded-full font-bold bg-secondary text-secondary-foreground hover:brightness-105"
      >
        {saving ? 'Сохраняем...' : 'Сохранить'}
      </Button>
    </div>
  );
}
