import { CSSProperties, useLayoutEffect, useRef } from 'react';

interface InlineFieldProps {
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  changed?: boolean;
  className?: string;
  placeholder?: string;
  style?: CSSProperties;
  active?: boolean;
  onFocus?: () => void;
}

export default function InlineField({ value, onChange, hint, changed, className = '', placeholder, style, active, onFocus }: InlineFieldProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      title={hint}
      placeholder={placeholder || hint}
      onChange={e => onChange(e.target.value)}
      onFocus={onFocus}
      style={style}
      className={`block w-full resize-none overflow-hidden bg-transparent rounded-md outline-none transition px-1 -mx-1 border border-dashed hover:border-gray-400/60 focus:border-solid focus:bg-white/90 focus:text-forest focus:shadow-sm placeholder:opacity-40 ${
        active ? 'border-sky-500 border-solid ring-2 ring-sky-400/50' : changed ? 'border-secondary ring-2 ring-secondary/40' : 'border-transparent'
      } ${className}`}
    />
  );
}