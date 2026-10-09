import { useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { STYLE_FONTS, TextStyle, WEIGHTS, isEmptyStyle, loadFontPreview, styleToCss } from '@/lib/textStyles';

const PALETTE = ['#ffffff', '#0f1d5c', '#e11d2e', '#f5b800', '#1f8a4c', '#7c3aed', '#f97316', '#111827'];

interface Props {
  title: string;
  value: string;
  style: TextStyle;
  onText: (v: string) => void;
  onStyle: (s: TextStyle) => void;
  onClose: () => void;
}

export default function TextStylePanel({ title, value, style, onText, onStyle, onClose }: Props) {
  useEffect(() => loadFontPreview(STYLE_FONTS), []);

  const set = (patch: Partial<TextStyle>) => onStyle({ ...style, ...patch });
  const size = style.size || 100;

  return (
    <aside className="fixed z-40 inset-x-0 bottom-0 max-h-[70vh] lg:max-h-none lg:inset-x-auto lg:right-0 lg:top-[64px] lg:bottom-0 lg:w-[340px] bg-white border-t lg:border-t-0 lg:border-l border-border shadow-2xl flex flex-col rounded-t-3xl lg:rounded-none animate-in slide-in-from-bottom lg:slide-in-from-right duration-200">
      <div className="flex items-center justify-between gap-2 px-5 py-4 border-b border-border">
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Надпись</div>
          <div className="font-extrabold text-forest truncate">{title}</div>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-forest hover:bg-background transition"
          aria-label="Закрыть"
        >
          <Icon name="X" size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        <div>
          <label className="block text-xs font-bold text-forest mb-1.5">Текст</label>
          <textarea
            value={value}
            onChange={e => onText(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-forest transition resize-y"
          />
        </div>

        <div className="rounded-2xl bg-forest p-4 text-center overflow-hidden">
          <div className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">Как будет выглядеть</div>
          <div className="text-xl text-white break-words" style={styleToCss(style)}>
            {value || 'Пример текста'}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-forest mb-1.5">Шрифт</label>
          <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
            <button
              onClick={() => set({ font: '' })}
              className={`rounded-xl border px-2.5 py-2 text-xs font-semibold text-left transition ${
                !style.font ? 'border-forest bg-forest text-white' : 'border-border text-forest hover:border-forest/50'
              }`}
            >
              Как в дизайне
            </button>
            {STYLE_FONTS.map(f => (
              <button
                key={f}
                onClick={() => set({ font: f })}
                style={{ fontFamily: `'${f}', sans-serif` }}
                className={`rounded-xl border px-2.5 py-2 text-sm text-left truncate transition ${
                  style.font === f ? 'border-forest bg-forest text-white' : 'border-border text-forest hover:border-forest/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-forest">Размер</label>
            <span className="text-xs font-bold text-muted-foreground">{size}%</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => set({ size: Math.max(50, size - 10) })}
              className="w-8 h-8 rounded-full border border-border text-forest flex items-center justify-center hover:border-forest"
            >
              <Icon name="Minus" size={14} />
            </button>
            <input
              type="range"
              min={50}
              max={250}
              step={5}
              value={size}
              onChange={e => set({ size: Number(e.target.value) })}
              className="flex-1 accent-[hsl(var(--primary))]"
            />
            <button
              onClick={() => set({ size: Math.min(250, size + 10) })}
              className="w-8 h-8 rounded-full border border-border text-forest flex items-center justify-center hover:border-forest"
            >
              <Icon name="Plus" size={14} />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-forest mb-1.5">Цвет</label>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => set({ color: '' })}
              title="Как в дизайне"
              className={`h-8 px-2.5 rounded-full border text-[11px] font-bold transition ${
                !style.color ? 'border-forest bg-forest text-white' : 'border-border text-forest'
              }`}
            >
              Авто
            </button>
            {PALETTE.map(c => (
              <button
                key={c}
                onClick={() => set({ color: c })}
                className={`w-8 h-8 rounded-full border-2 transition ${
                  style.color === c ? 'border-primary scale-110' : 'border-border'
                }`}
                style={{ background: c }}
                aria-label={c}
              />
            ))}
            <label className="relative w-8 h-8 rounded-full border-2 border-dashed border-border flex items-center justify-center cursor-pointer text-muted-foreground hover:border-forest" title="Свой цвет">
              <Icon name="Pipette" size={13} />
              <input
                type="color"
                value={style.color || '#ffffff'}
                onChange={e => set({ color: e.target.value })}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-forest mb-1.5">Начертание</label>
          <select
            value={style.weight || ''}
            onChange={e => set({ weight: e.target.value })}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-forest"
          >
            {WEIGHTS.map(w => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </select>
          <div className="mt-2 flex gap-1.5">
            <button
              onClick={() => set({ italic: !style.italic })}
              className={`flex-1 rounded-xl border py-2 text-sm italic font-semibold transition ${
                style.italic ? 'border-forest bg-forest text-white' : 'border-border text-forest hover:border-forest/50'
              }`}
            >
              Курсив
            </button>
            <button
              onClick={() => set({ upper: !style.upper })}
              className={`flex-1 rounded-xl border py-2 text-xs uppercase font-bold transition ${
                style.upper ? 'border-forest bg-forest text-white' : 'border-border text-forest hover:border-forest/50'
              }`}
            >
              Заглавные
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-border flex items-center justify-between gap-2">
        <button
          onClick={() => onStyle({})}
          disabled={isEmptyStyle(style)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline disabled:opacity-40 disabled:no-underline"
        >
          <Icon name="RotateCcw" size={13} />
          Сбросить оформление
        </button>
        <button onClick={onClose} className="rounded-full bg-forest text-white px-4 py-2 text-xs font-bold hover:brightness-110">
          Готово
        </button>
      </div>
    </aside>
  );
}
