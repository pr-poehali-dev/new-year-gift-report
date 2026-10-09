import { CSSProperties, useEffect, useRef } from 'react';
import { useSiteContext } from '@/hooks/useSiteTexts';

interface Props {
  textKey: string;
  value: string;
  style?: CSSProperties;
}

export default function EditableText({ textKey, value, style }: Props) {
  const { setValue } = useSiteContext();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value]);

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      data-edit-key={textKey}
      style={style}
      onBlur={e => setValue(textKey, e.currentTarget.innerText.trim())}
      onKeyDown={e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      }}
      className="outline-none rounded-[3px] ring-1 ring-dashed ring-sky-400/70 ring-offset-2 ring-offset-transparent hover:ring-sky-500 focus:ring-2 focus:ring-solid focus:ring-sky-500 transition cursor-text"
    >
      {value}
    </span>
  );
}
