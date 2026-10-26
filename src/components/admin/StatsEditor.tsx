import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Icon from '@/components/ui/icon';
import func2url from '../../../backend/func2url.json';

const STATS_URL = (func2url as Record<string, string>).stats;

interface StatsData {
  days: number;
  summary: {
    today_views: number;
    today_visitors: number;
    yesterday_views: number;
    yesterday_visitors: number;
    period_views: number;
    period_visitors: number;
    period_mobile: number;
  };
  daily: { day: string; views: number; visitors: number }[];
  pages: { path: string; views: number }[];
  sources: { source: string; visitors: number }[];
}

const PERIODS = [
  { days: 7, label: '7 дней' },
  { days: 30, label: '30 дней' },
  { days: 90, label: '3 месяца' },
];

const PAGE_NAMES: Record<string, string> = {
  '/': 'Главная',
  '/reviews': 'Оставить отзыв',
  '/all-reviews': 'Все отзывы',
};

function fillDays(daily: StatsData['daily'], days: number) {
  const map = new Map(daily.map(d => [String(d.day).slice(0, 10), d]));
  const res = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const row = map.get(key);
    res.push({
      label: d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      visitors: Number(row?.visitors || 0),
      views: Number(row?.views || 0),
    });
  }
  return res;
}

function StatCard({ icon, title, value, sub }: { icon: string; title: string; value: number | string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-4">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <Icon name={icon} size={15} className="text-primary" />
        {title}
      </div>
      <div className="mt-2 text-2xl sm:text-3xl font-black text-forest">{value}</div>
      {sub && <div className="mt-0.5 text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

function TopList({ title, icon, rows }: { title: string; icon: string; rows: { name: string; value: number }[] }) {
  const max = Math.max(1, ...rows.map(r => r.value));
  return (
    <div className="bg-white rounded-2xl border border-border p-4 sm:p-5">
      <div className="flex items-center gap-2 font-extrabold text-forest mb-3">
        <Icon name={icon} size={17} />
        {title}
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Пока нет данных</p>
      ) : (
        <div className="space-y-2">
          {rows.map(r => (
            <div key={r.name}>
              <div className="flex justify-between gap-3 text-sm">
                <span className="truncate text-foreground/85">{r.name}</span>
                <span className="font-bold text-forest">{r.value}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary" style={{ width: `${(r.value / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StatsEditor() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError('');
    fetch(`${STATS_URL}?days=${days}`, {
      headers: { 'X-Admin-Password': sessionStorage.getItem('admin_pw') || '' },
    })
      .then(async r => {
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error || 'Не удалось загрузить статистику');
        if (alive) setData(d);
      })
      .catch(e => alive && setError(e instanceof Error ? e.message : 'Ошибка'))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [days]);

  const s = data?.summary;
  const chart = data ? fillDays(data.daily, data.days) : [];
  const mobileShare = s && s.period_views ? Math.round((s.period_mobile / s.period_views) * 100) : 0;

  return (
    <div className="min-w-0 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-forest">Статистика посещений</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Посетители считаются по устройству, заходы в админку не учитываются</p>
        </div>
        <div className="flex gap-1 rounded-full bg-white border border-border p-1">
          {PERIODS.map(p => (
            <button
              key={p.days}
              onClick={() => setDays(p.days)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                days === p.days ? 'bg-forest text-forest-foreground' : 'text-forest hover:bg-muted'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 text-sm p-4">{error}</div>
      ) : loading && !data ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-10 justify-center">
          <Icon name="Loader2" size={18} className="animate-spin" />
          Загружаем статистику...
        </div>
      ) : s ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon="Users" title="Посетители сегодня" value={s.today_visitors} sub={`вчера: ${s.yesterday_visitors}`} />
            <StatCard icon="Eye" title="Просмотры сегодня" value={s.today_views} sub={`вчера: ${s.yesterday_views}`} />
            <StatCard icon="CalendarRange" title="Посетители за период" value={s.period_visitors} sub={`просмотров: ${s.period_views}`} />
            <StatCard icon="Smartphone" title="С телефонов" value={`${mobileShare}%`} sub="доля просмотров" />
          </div>

          <div className="bg-white rounded-2xl border border-border p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="font-extrabold text-forest">Посещаемость по дням</div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" />Посетители</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-secondary" />Просмотры</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chart} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} minTickGap={16} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, fontSize: 12 }}
                    formatter={(v: number, name: string) => [v, name === 'visitors' ? 'Посетители' : 'Просмотры']}
                  />
                  <Area type="monotone" dataKey="views" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.15} strokeWidth={2} />
                  <Area type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <TopList
              title="Популярные страницы"
              icon="FileText"
              rows={(data?.pages || []).map(p => ({ name: PAGE_NAMES[p.path] || p.path, value: Number(p.views) }))}
            />
            <TopList
              title="Откуда приходят"
              icon="Globe"
              rows={(data?.sources || []).map(p => ({ name: p.source, value: Number(p.visitors) }))}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
