interface SnowTextProps {
  text: string;
  className?: string;
}

export default function SnowText({ text, className = '' }: SnowTextProps) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="snow-word" data-text={w}>
            <span className={`snow-word-fill ${className}`}>{w}</span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </>
  );
}
