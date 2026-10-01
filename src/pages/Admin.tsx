import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { TEXTS_URL, TextField, SettingField, applyTheme, useSiteContext } from '@/hooks/useSiteTexts';
import { clearDraft, loadDraft, useLocalDraft } from '@/hooks/useLocalDraft';
import ProductsEditor from '@/components/admin/ProductsEditor';
import DesignEditor from '@/components/admin/DesignEditor';
import BlocksEditor from '@/components/admin/BlocksEditor';
import CatalogFiltersEditor from '@/components/admin/CatalogFiltersEditor';

const BLOCKS_TAB = 'Блоки страницы';
const PRODUCTS_TAB = 'Подарки в каталоге';
const FILTERS_TAB = 'Кнопки фильтра';
const IMAGES_TAB = 'Картинки сайта';
const DESIGN_TAB = 'Цвета и шрифты';
const FILES_TAB = 'Файлы для скачивания';
const SPECIAL_TABS = [BLOCKS_TAB, PRODUCTS_TAB, FILTERS_TAB, IMAGES_TAB, FILES_TAB, DESIGN_TAB];

const TAB_ICONS: Record<string, string> = {
  [BLOCKS_TAB]: 'LayoutTemplate',
  [PRODUCTS_TAB]: 'Gift',
  [FILTERS_TAB]: 'SlidersHorizontal',
  [IMAGES_TAB]: 'Image',
  [FILES_TAB]: 'FileDown',
  [DESIGN_TAB]: 'Palette',
};
const TEXTS_DRAFT_KEY = 'admin_texts_draft';

export default function Admin() {
  const [password, setPassword] = useState(() => sessionStorage.getItem('admin_pw') || '');
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(false);
  const [fields, setFields] = useState<TextField[]>([]);
  const [settingFields, setSettingFields] = useState<SettingField[]>([]);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { reload: reloadSite } = useSiteContext();

  const loadFields = async () => {
    reloadSite();
    const res = await fetch(TEXTS_URL);
    const data = await res.json();
    const list: TextField[] = data.fields || [];
    setFields(list);
    setSettingFields(data.settingFields || []);
    applyTheme(data.settings || {});
    const saved = loadDraft<Record<string, string>>(TEXTS_DRAFT_KEY) || {};
    setDraft({ ...Object.fromEntries(list.map(f => [f.key, f.value])), ...saved });
    setActiveSection(prev => prev || BLOCKS_TAB);
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

  const navGroups = useMemo(() => {
    const textSections: string[] = [];
    fields.forEach(f => {
      if (!textSections.includes(f.section)) textSections.push(f.section);
    });
    return [
      { title: 'Страница', items: [BLOCKS_TAB] },
      { title: 'Каталог', items: [PRODUCTS_TAB, FILTERS_TAB] },
      { title: 'Тексты блоков', items: textSections },
      { title: 'Оформление', items: [IMAGES_TAB, DESIGN_TAB, FILES_TAB] },
    ];
  }, [fields]);

  const changed = useMemo(
    () => fields.filter(f => draft[f.key] !== undefined && draft[f.key] !== f.value),
    [fields, draft],
  );

  useLocalDraft(
    TEXTS_DRAFT_KEY,
    Object.fromEntries(changed.map(f => [f.key, draft[f.key]])),
    changed.length > 0,
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
      clearDraft(TEXTS_DRAFT_KEY);
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
            <a href="/?edit=1" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-bold hover:bg-white/20 transition whitespace-nowrap">
              <Icon name="MousePointerClick" size={14} />
              <span className="hidden sm:inline">Править на сайте</span>
            </a>
            <a href="/" target="_blank" rel="noreferrer" className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold hover:text-secondary transition">
              <Icon name="ExternalLink" size={15} />
              Открыть сайт
            </a>
            <button onClick={logout} className="text-xs font-semibold hover:text-secondary transition px-2">
              Выйти
            </button>
            {!SPECIAL_TABS.includes(activeSection) && (
              <Button
                onClick={save}
                disabled={!changed.length || saving}
                className="rounded-full font-bold bg-secondary text-secondary-foreground hover:brightness-105"
              >
                {saving ? 'Сохраняем...' : changed.length ? `Сохранить (${changed.length})` : 'Сохранено'}
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        <nav className="flex lg:flex-col gap-1.5 overflow-x-auto lg:sticky lg:top-24 lg:self-start pb-1 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          {navGroups.map(g => (
            <div key={g.title} className="contents lg:block lg:mb-3">
              <div className="hidden lg:block px-1 pb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {g.title}
              </div>
              <div className="contents lg:flex lg:flex-col lg:gap-1.5">
                {g.items.map(s => (
                  <button
                    key={s}
                    onClick={() => setActiveSection(s)}
                    className={`whitespace-nowrap text-left rounded-xl px-4 py-2.5 text-sm font-semibold transition inline-flex items-center gap-2 ${
                      activeSection === s
                        ? 'bg-forest text-forest-foreground'
                        : 'bg-white border border-border text-forest hover:border-forest/40'
                    }`}
                  >
                    <Icon name={TAB_ICONS[s] || 'Type'} fallback="Type" size={15} className="shrink-0 opacity-80" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {activeSection === BLOCKS_TAB ? (
          <BlocksEditor fields={settingFields} onSaved={loadFields} onOpen={setActiveSection} />
        ) : activeSection === FILTERS_TAB ? (
          <CatalogFiltersEditor fields={settingFields} onSaved={loadFields} />
        ) : activeSection === PRODUCTS_TAB ? (
          <ProductsEditor />
        ) : activeSection === IMAGES_TAB ? (
          <DesignEditor fields={settingFields} kinds={['image']} onSaved={loadFields} />
        ) : activeSection === FILES_TAB ? (
          <DesignEditor fields={settingFields} kinds={['file']} onSaved={loadFields} />
        ) : activeSection === DESIGN_TAB ? (
          <DesignEditor fields={settingFields} kinds={['color', 'font', 'fontsize']} onSaved={loadFields} />
        ) : (
        <div className="space-y-4">
          {activeSection === 'Каталог подарков' && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSection(FILTERS_TAB)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3.5 py-2 text-xs font-bold text-forest hover:border-forest/50 transition"
              >
                <Icon name="SlidersHorizontal" size={14} />
                Кнопки фильтра
              </button>
              <button
                onClick={() => setActiveSection(PRODUCTS_TAB)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3.5 py-2 text-xs font-bold text-forest hover:border-forest/50 transition"
              >
                <Icon name="Gift" size={14} />
                Подарки в каталоге
              </button>
            </div>
          )}
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
        )}
      </div>
    </div>
  );
}