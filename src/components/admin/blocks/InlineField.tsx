import { useLayoutEffect, useRef } from 'react';

interface InlineFieldProps {
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  changed?: boolean;
  className?: string;
  placeholder?: string;
}

export default function InlineField({ value, onChange, hint, changed, className = '', placeholder }: InlineFieldProps) {
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
      className={`block w-full resize-none overflow-hidden bg-transparent rounded-md outline-none transition px-1 -mx-1 border border-dashed hover:border-gray-400/60 focus:border-solid focus:bg-white/90 focus:text-forest focus:shadow-sm placeholder:opacity-40 ${
        changed ? 'border-secondary ring-2 ring-secondary/40' : 'border-transparent'
      } ${className}`}
    />
  );
}