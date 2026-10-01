import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import func2url from '../../../backend/func2url.json';

const LEADS_URL = func2url.leads;

export interface Lead {
  id: number;
  name: string;
  phone: string;
  amount: string;
  status: 'new' | 'in_work' | 'done';
  email_sent: boolean;
  sms_sent: boolean;
  notify_error: string;
  created_at: string;
}

export interface LeadsData {
  leads: Lead[];
  settings: Record<string, string>;
  configured: { email: boolean; sms: boolean };
}

const AMOUNT_LABELS: Record<string, string> = {
  '1-10': '1–10 шт.',
  '10-50': '10–50 шт.',
  '50-200': '50–200 шт.',
  '200+': 'Более 200 шт.',
};

const STATUSES = [
  { key: 'new', label: 'Новая', cls: 'bg-primary text-white' },
  { key: 'in_work', label: 'В работе', cls: 'bg-secondary text-secondary-foreground' },
  { key: 'done', label: 'Обработана', cls: 'bg-forest text-forest-foreground' },
] as const;

export async function leadsRequest(body?: object) {
  const res = await fetch(LEADS_URL, {
    method: body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Password': sessionStorage.getItem('admin_pw') || '',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export function useLeads() {
  const [data, setData] = useState<LeadsData | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    const { ok, data } = await leadsRequest();
    setLoading(false);
    if (ok) setData(data as LeadsData);
    else toast.error('Не удалось загрузить заявки');
  };

  useEffect(() => {
    reload();
  }, []);

  return { data, loading, reload };
}

export default function LeadsEditor() {
  const { data, loading, reload } = useLeads();
  const [filter, setFilter] = useState<'all' | Lead['status']>('all');

  const leads = data?.leads || [];
  const shown = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  const setStatus = async (id: number, status: Lead['status']) => {
    const { ok } = await leadsRequest({ action: 'status', id, status });
    if (ok) reload();
    else toast.error('Не удалось изменить статус');
  };

  const remove = async (id: number) => {
    if (!confirm('Удалить заявку?')) return;
    const { ok } = await leadsRequest({ action: 'delete', id });
    if (ok) {
      toast.success('Заявка удалена');
      reload();
    }
  };

  const formatDate = (s: string) =>
    new Date(s.replace(' ', 'T')).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl border border-border p-4">
        <div className="flex flex-wrap gap-1.5">
          {[{ key: 'all', label: 'Все' }, ...STATUSES].map(s => {
            const count = s.key === 'all' ? leads.length : leads.filter(l => l.status === s.key).length;
            return (
              <button
                key={s.key}
                onClick={() => setFilter(s.key as typeof filter)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                  filter === s.key ? 'bg-forest text-forest-foreground' : 'border border-border text-forest hover:border-forest/40'
                }`}
              >
                {s.label} · {count}
              </button>
            );
          })}
        </div>
        <Button onClick={reload} variant="outline" className="rounded-full font-bold" disabled={loading}>
          <Icon name="RefreshCw" size={14} className={`mr-1.5 ${loading ? 'animate-spin' : ''}`} />
          Обновить
        </Button>
      </div>

      {loading && !data && <div className="text-sm text-muted-foreground p-4">Загружаем заявки...</div>}

      {!loading && shown.length === 0 && (
        <div className="bg-white rounded-2xl border border-border p-10 text-center">
          <Icon name="Inbox" size={32} className="mx-auto text-muted-foreground" />
          <div className="mt-3 font-bold text-forest">Заявок пока нет</div>
          <div className="text-xs text-muted-foreground mt-1">
            Здесь появятся все, кто нажал «Жду звонка» на сайте
          </div>
        </div>
      )}

      {shown.map(l => {
        const st = STATUSES.find(s => s.key === l.status) || STATUSES[0];
        return (
          <div key={l.id} className="bg-white rounded-2xl border border-border p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${st.cls}`}>
                    {st.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    №{l.id} · {formatDate(l.created_at)}
                  </span>
                </div>
                <div className="mt-2 text-lg font-extrabold text-forest">{l.name}</div>
                <a
                  href={`tel:${l.phone.replace(/[^+\d]/g, '')}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                >
                  <Icon name="Phone" size={14} />
                  {l.phone}
                </a>
                <div className="mt-1 text-xs text-muted-foreground">
                  Количество подарков: <b className="text-forest">{AMOUNT_LABELS[l.amount] || l.amount || 'не указано'}</b>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-1.5">
                  {STATUSES.map(s => (
                    <button
                      key={s.key}
                      onClick={() => setStatus(l.id, s.key)}
                      disabled={l.status === s.key}
                      className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold border transition ${
                        l.status === s.key ? `${s.cls} border-transparent` : 'border-border text-forest hover:border-forest/50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                  <button
                    onClick={() => remove(l.id)}
                    title="Удалить"
                    className="rounded-lg px-2 py-1.5 border border-border text-primary hover:bg-primary/5"
                  >
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
                <div className="flex gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Icon name={l.email_sent ? 'MailCheck' : 'MailX'} size={13} className={l.email_sent ? 'text-forest' : 'text-primary'} />
                    {l.email_sent ? 'Письмо ушло' : 'Письмо не ушло'}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Icon name={l.sms_sent ? 'MessageSquareText' : 'MessageSquareOff'} size={13} className={l.sms_sent ? 'text-forest' : 'text-primary'} />
                    {l.sms_sent ? 'СМС ушло' : 'СМС не ушло'}
                  </span>
                </div>
              </div>
            </div>
            {l.notify_error && (
              <div className="mt-3 rounded-xl bg-primary/5 px-3 py-2 text-[11px] text-primary">{l.notify_error}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
