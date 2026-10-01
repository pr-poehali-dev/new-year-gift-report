import { useMemo, type CSSProperties } from 'react';

interface FestiveBackgroundProps {
  image: string;
  flakes?: number;
  overlay?: string;
}

const GARLAND_COLORS = ['#ff3b5c', '#ffd23f', '#3be8ff', '#7dff6b', '#ff8a3b', '#c77dff'];

export default function FestiveBackground({
  image,
  flakes = 60,
  overlay = 'linear-gradient(90deg, rgba(12,16,48,0.88) 0%, rgba(20,18,60,0.65) 45%, rgba(20,18,60,0.25) 100%)',
}: FestiveBackgroundProps) {
  const snow = useMemo(
    () =>
      Array.from({ length: flakes }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 5 + 2,
        duration: Math.random() * 8 + 8,
        delay: -Math.random() * 16,
        dx: (Math.random() - 0.5) * 80,
        opacity: Math.random() * 0.5 + 0.5,
      })),
    [flakes]
  );

  const lights = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        color: GARLAND_COLORS[i % GARLAND_COLORS.length],
        delay: Math.random() * 2,
        duration: Math.random() * 1.2 + 1.2,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />
      <div className="absolute inset-0" style={{ background: overlay }} />

      <div className="absolute top-0 inset-x-0 h-10">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 10">
          <path d="M0 2 Q 3.5 7 7 2 T 14 2 T 21 2 T 28 2 T 35 2 T 42 2 T 49 2 T 56 2 T 63 2 T 70 2 T 77 2 T 84 2 T 91 2 T 98 2 T 105 2" fill="none" stroke="rgba(30,40,30,0.7)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="absolute inset-0 flex justify-between px-[1.5%]">
          {lights.map((l, i) => (
            <span
              key={l.id}
              className="animate-twinkle rounded-full"
              style={{
                width: 9,
                height: 13,
                marginTop: i % 2 === 0 ? 14 : 4,
                background: l.color,
                boxShadow: `0 0 10px 3px ${l.color}`,
                animationDelay: `${l.delay}s`,
                animationDuration: `${l.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      {snow.map(f => (
        <span
          key={f.id}
          className="absolute top-0 rounded-full bg-white animate-snow"
          style={
            {
              left: `${f.left}%`,
              width: f.size,
              height: f.size,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
              filter: f.size > 5 ? 'blur(1px)' : undefined,
              '--dx': `${f.dx}px`,
              '--o': f.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
