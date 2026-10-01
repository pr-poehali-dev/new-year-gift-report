import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { leadsRequest, useLeads } from '@/components/admin/LeadsEditor';

function ListField({
  title,
  icon,
  placeholder,
  items,
  onChange,
}: {
  title: string;
  icon: string;
  placeholder: string;
  items: string[];
  onChange: (v: string[]) => void;
}) {
  const [value, setValue] = useState('');
  const add = () => {
    const v = value.trim();
    if (!v || items.includes(v)) return;
    onChange([...items, v]);
    setValue('');
  };
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-extrabold text-forest">
        <Icon name={icon} size={16} />
        {title}
      </div>
      <div className="mt-3 space-y-2">
        {items.map((it, i) => (
          <div key={it + i} className="flex items-center gap-2">
            <input
              value={it}
              onChange={e => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-forest"
            />
            <button
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              title="Удалить"
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-primary hover:bg-primary/5"
            >
              <Icon name="Trash2" size={15} />
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            placeholder={placeholder}
            className="flex-1 rounded-xl border border-dashed border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-forest"
          />
          <Button onClick={add} variant="outline" className="rounded-xl font-bold h-auto">
            <Icon name="Plus" size={16} className="mr-1" />
            Добавить
          </Button>
        </div>
      </div>
    </div>
  );
}

const toList = (s = '') => s.split(/[,;\n]+/).map(x => x.trim()).filter(Boolean);

export default function NotifySettingsEditor() {
  const { data, reload } = useLeads();
  const [emails, setEmails] = useState<string[]>([]);
  const [emailOn, setEmailOn] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    if (!data) return;
    setEmails(toList(data.settings.emails));
    setEmailOn(data.settings.email_enabled !== 'false');
  }, [data]);

  const save = async () => {
    setSaving(true);
    const { ok } = await leadsRequest({
      action: 'settings',
      settings: {
        emails: emails.map(e => e.trim()).filter(Boolean).join(','),
        email_enabled: emailOn ? 'true' : 'false',
        sms_enabled: 'false',
      },
    });
    setSaving(false);
    if (ok) {
      toast.success('Настройки уведомлений сохранены');
      reload();
    } else toast.error('Не удалось сохранить');
  };

  const test = async () => {
    setTesting(true);
    const { ok, data: r } = await leadsRequest({ action: 'test' });
    setTesting(false);
    if (!ok) return toast.error('Не удалось отправить проверку');
    if (r.email === 'ok') toast.success('Тестовое письмо отправлено');
    else if (r.email) toast.error(r.email);
  };

  const cfg = data?.configured;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl border border-border p-4">
        <span className="text-sm text-muted-foreground">Куда приходят заявки «Жду звонка»</span>
        <div className="flex gap-2">
          <Button onClick={test} variant="outline" disabled={testing} className="rounded-full font-bold">
            <Icon name="Send" size={14} className="mr-1.5" />
            {testing ? 'Отправляем...' : 'Проверить'}
          </Button>
          <Button
            onClick={save}
            disabled={saving}
            className="rounded-full font-bold bg-secondary text-secondary-foreground hover:brightness-105"
          >
            {saving ? 'Сохраняем...' : 'Сохранить'}
          </Button>
        </div>
      </div>

      {cfg && !cfg.email && (
        <div className="flex gap-2 rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-xs text-primary font-semibold">
          <Icon name="TriangleAlert" size={16} className="shrink-0" />
          <div>
            <div>Почта ещё не подключена — добавьте ключи доступа к почтовому ящику.</div>
            <div className="font-normal mt-0.5">Пока ключей нет, заявки всё равно сохраняются в разделе «Заявки».</div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-border p-4 sm:p-5">
        <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-4 cursor-pointer">
          <input type="checkbox" checked={emailOn} onChange={e => setEmailOn(e.target.checked)} className="w-4 h-4 accent-[hsl(var(--primary))]" />
          Отправлять письма
        </label>
        <div className={emailOn ? '' : 'opacity-50 pointer-events-none'}>
          <ListField title="Почта для уведомлений" icon="Mail" placeholder="example@yandex.ru" items={emails} onChange={setEmails} />
        </div>
      </div>

    </div>
  );
}