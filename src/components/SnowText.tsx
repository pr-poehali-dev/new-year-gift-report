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

const NO_ICICLE = /[рудзфцщуёйъ,.!?\-–—:;]/i;

function Icicle({ len, left }: { len: number; left: string }) {
  return (
    <svg
      className="icicle"
      style={{ left, height: `${len}em`, width: `${len * 0.42}em` }}
      viewBox="0 0 10 32"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ice-g" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#bfe3ff" />
          <stop offset="0.35" stopColor="#ffffff" />
          <stop offset="1" stopColor="#8cc4f5" />
        </linearGradient>
      </defs>
      <path d="M0 0 H10 C9 6 7 14 5.6 31 Q5 32.5 4.4 31 C3 14 1 6 0 0 Z" fill="url(#ice-g)" />
      <path d="M2.6 1 C3.2 8 4 16 4.8 26" stroke="#ffffff" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

export default function SnowText({ text, className = '' }: SnowTextProps) {
  const words = text.split(/\s+/).filter(Boolean);
  let n = 0;
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="snow-word" data-text={w}>
            <span className={`snow-word-fill ${className}`}>{w}</span>
            <span className="icicles" aria-hidden="true">
              {[...w].map((ch, j) => {
                n += 1;
                if (NO_ICICLE.test(ch) || n % 2 === 0) return null;
                const len = [0.42, 0.55, 0.46, 0.6][n % 4];
                return <Icicle key={j} len={len} left={`${((j + 0.5) / w.length) * 100}%`} />;
              })}
            </span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </>
  );
}
