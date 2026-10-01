import { useMemo } from 'react';

interface BlendImageProps {
  src: string;
  alt: string;
  className?: string;
}

const MASK = 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 55%, rgba(0,0,0,0.6) 72%, transparent 100%)';

export default function BlendImage({ src, alt, className = '' }: BlendImageProps) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        top: 8 + Math.random() * 84,
        left: 6 + Math.random() * 88,
        size: Math.random() * 10 + 8,
        delay: Math.random() * 3,
        duration: Math.random() * 1.5 + 1.8,
      })),
    []
  );

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(255,214,120,0.45),transparent_70%)] blur-2xl animate-twinkle" style={{ animationDuration: '5s' }} />
      <div className="relative animate-float" style={{ animationDuration: '7s' }}>
        <img
          src={src}
          alt={alt}
          className="w-full aspect-square object-cover"
          style={{ WebkitMaskImage: MASK, maskImage: MASK }}
        />
      </div>
      {sparkles.map(s => (
        <svg
          key={s.id}
          viewBox="0 0 24 24"
          className="absolute animate-twinkle pointer-events-none"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            filter: 'drop-shadow(0 0 6px rgba(255,230,150,0.9))',
          }}
          aria-hidden
        >
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#fff6d6" />
        </svg>
      ))}
    </div>
  );
}
