interface SnowTextProps {
  text: string;
  className?: string;
}

export function SnowDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <filter id="snow-cap" x="-10%" y="-40%" width="120%" height="180%" colorInterpolationFilters="sRGB">
          <feOffset in="SourceAlpha" dy="3.5" result="down" />
          <feComposite in="SourceAlpha" in2="down" operator="out" result="band" />
          <feOffset in="band" dy="-2.5" result="lifted" />
          <feMorphology in="lifted" operator="dilate" radius="0.8" result="fat" />
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="fat" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="lumpy" />
          <feGaussianBlur in="lumpy" stdDeviation="0.6" result="soft" />
          <feComponentTransfer in="soft" result="cap">
            <feFuncA type="linear" slope="3.5" intercept="-0.9" />
          </feComponentTransfer>

          <feOffset in="cap" dy="-1.2" result="capUp" />
          <feComposite in="cap" in2="capUp" operator="out" result="rimBand" />
          <feFlood floodColor="#a9c9f2" />
          <feComposite in2="rimBand" operator="in" result="rim" />

          <feFlood floodColor="#ffffff" />
          <feComposite in2="cap" operator="in" result="white" />

          <feGaussianBlur in="cap" stdDeviation="1" result="shBlur" />
          <feOffset in="shBlur" dy="1.2" result="shOff" />
          <feFlood floodColor="#0a1a4a" floodOpacity="0.45" />
          <feComposite in2="shOff" operator="in" result="shadow" />

          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="white" />
            <feMergeNode in="rim" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
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
