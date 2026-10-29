import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { REVIEWS_URL, formatReviewDate } from '@/hooks/useReviews';

interface AdminReview {
  id: number;
  name: string;
  email: string;
  rating: number;
  text: string;
  is_published: boolean;
  created_at: string;
}

async function request(body: object) {
  const res = await fetch(REVIEWS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Password': sessionStorage.getItem('admin_pw') || '',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('request failed');
  return res.json();
}

export default function ReviewsModeration() {
  const [list, setList] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const d = await request({ action: 'admin_list' });
      setList(d.reviews || []);
    } catch {
      toast.error('Не удалось загрузить отзывы');
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (r: AdminReview) => {
    setBusy(r.id);
    try {
      await request({ action: 'set_published', id: r.id, published: !r.is_published });
      setList(prev => prev.map(x => (x.id === r.id ? { ...x, is_published: !x.is_published } : x)));
      toast.success(r.is_published ? 'Отзыв скрыт с сайта' : 'Отзыв снова на сайте');
    } catch {
      toast.error('Не удалось сохранить');
    }
    setBusy(null);
  };

  const remove = async (r: AdminReview) => {
    if (!window.confirm(`Удалить отзыв от «${r.name}» навсегда?`)) return;
    setBusy(r.id);
    try {
      await request({ action: 'delete', id: r.id });
      setList(prev => prev.filter(x => x.id !== r.id));
      toast.success('Отзыв удалён');
    } catch {
      toast.error('Не удалось удалить');
    }
    setBusy(null);
  };

  const shown = list.filter(r => r.is_published).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl border border-border p-4">
        <span className="text-sm text-muted-foreground">
          Отзывы покупателей с сайта. На сайте: {shown} из {list.length}
        </span>
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-forest hover:border-forest/50 transition"
        >
          <Icon name="RefreshCw" size={13} />
          Обновить
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground p-4">Загружаем...</div>
      ) : list.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border p-8 text-center text-sm text-muted-foreground">
          Покупатели пока не оставляли отзывов. На сайте показываются отзывы-примеры — их можно изменить или скрыть в разделе «Отзывы».
        </div>
      ) : (
        <div className="space-y-2">
          {list.map(r => (
            <div
              key={r.id}
              className={`bg-white rounded-2xl border border-border p-4 transition ${r.is_published ? '' : 'opacity-60'}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-forest">{r.name}</span>
                    <span className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={13}
                          className={i < r.rating ? 'text-secondary fill-secondary' : 'text-border'}
                        />
                      ))}
                    </span>
                    {!r.is_published && (
                      <span className="rounded-full bg-muted text-muted-foreground px-2 py-0.5 text-[10px] font-bold uppercase">
                        Скрыт
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {formatReviewDate(r.created_at)}
                    {r.email ? ` · ${r.email}` : ''}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => toggle(r)}
                    disabled={busy === r.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-forest hover:border-forest/50 transition disabled:opacity-50"
                  >
                    <Icon name={r.is_published ? 'EyeOff' : 'Eye'} size={13} />
                    {r.is_published ? 'Скрыть' : 'Показать'}
                  </button>
                  <button
                    onClick={() => remove(r)}
                    disabled={busy === r.id}
                    title="Удалить"
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-red-600 hover:border-red-300 hover:bg-red-50 transition disabled:opacity-50"
                  >
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </div>
              <p className="mt-2.5 text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
