import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { TEXTS_URL, TextField } from '@/hooks/useSiteTexts';

export default function Admin() {
  const [password, setPassword] = useState(() => sessionStorage.getItem('admin_pw') || '');
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(false);
  const [fields, setFields] = useState<TextField[]>([]);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const loadFields = async () => {
    const res = await fetch(TEXTS_URL);
    const data = await res.json();
    const list: TextField[] = data.fields || [];
    setFields(list);
    setDraft(Object.fromEntries(list.map(f => [f.key, f.value])));
    if (list.length) setActiveSection(prev => prev || list[0].section);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pw');
    if (saved) {
      setAuthorized(true);
      loadFields();
    }
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    const res = await fetch(TEXTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', password }),
    });
    setChecking(false);
    if (res.ok) {
      sessionStorage.setItem('admin_pw', password);
      setAuthorized(true);
      loadFields();
    } else {
      toast.error('Неверный пароль');
    }
  };

  const sections = useMemo(() => {
    const order: string[] = [];
    fields.forEach(f => {
      if (!order.includes(f.section)) order.push(f.section);
    });
    return order;
  }, [fields]);

  const changed = useMemo(
    () => fields.filter(f => draft[f.key] !== undefined && draft[f.key] !== f.value),
    [fields, draft],
  );

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
        updates: Object.fromEntries(changed.map(f => [f.key, draft[f.key]])),
      }),
    });
    setSaving(false);
    if (res.ok) {
      toast.success('Сохранено! Обновите главную страницу, чтобы увидеть изменения');
      loadFields();
    } else {
      toast.error('Не удалось сохранить');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('admin_pw');
    setAuthorized(false);
    setPassword('');
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-forest flex items-center justify-center px-4">
        <form onSubmit={login} className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl">
          <img src="/logo.png" alt="ЧЕБподарки" className="h-16 w-auto mx-auto" />
          <h1 className="mt-5 text-xl font-extrabold text-forest text-center">Редактирование сайта</h1>
          <p className="mt-1.5 text-xs text-muted-foreground text-center">Введите пароль администратора</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Пароль"
            className="mt-6 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest transition"
          />
          <Button type="submit" disabled={checking} className="mt-4 w-full rounded-xl py-6 font-bold">
            {checking ? 'Проверяем...' : 'Войти'}
          </Button>
        </form>
      </div>
    );
  }

  const visible = fields.filter(f => f.section === activeSection);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-forest text-forest-foreground">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo-light.png" alt="" className="h-9 w-auto" />
            <div className="font-extrabold text-sm sm:text-base">Редактор надписей</div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold hover:text-secondary transition">
              <Icon name="ExternalLink" size={15} />
              Открыть сайт
            </a>
            <button onClick={logout} className="text-xs font-semibold hover:text-secondary transition px-2">
              Выйти
            </button>
            <Button
              onClick={save}
              disabled={!changed.length || saving}
              className="rounded-full font-bold bg-secondary text-secondary-foreground hover:brightness-105"
            >
              {saving ? 'Сохраняем...' : changed.length ? `Сохранить (${changed.length})` : 'Сохранено'}
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        <nav className="flex lg:flex-col gap-1.5 overflow-x-auto lg:sticky lg:top-24 lg:self-start pb-1">
          {sections.map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`whitespace-nowrap text-left rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                activeSection === s
                  ? 'bg-forest text-forest-foreground'
                  : 'bg-white border border-border text-forest hover:border-forest/40'
              }`}
            >
              {s}
            </button>
          ))}
        </nav>

        <div className="space-y-4">
          {visible.map(f => (
            <div key={f.key} className="bg-white rounded-2xl border border-border p-4 sm:p-5">
              <label className="block text-xs font-bold text-forest mb-2">{f.title}</label>
              {f.multiline ? (
                <textarea
                  value={draft[f.key] ?? ''}
                  onChange={e => setDraft({ ...draft, [f.key]: e.target.value })}
                  rows={3}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest transition resize-y"
                />
              ) : (
                <input
                  value={draft[f.key] ?? ''}
                  onChange={e => setDraft({ ...draft, [f.key]: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest transition"
                />
              )}
              {draft[f.key] !== f.value && (
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-primary font-semibold">
                  <Icon name="Pencil" size={12} />
                  Изменено — не забудьте сохранить
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
