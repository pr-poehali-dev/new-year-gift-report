import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface Props {
  photos: string[];
  name: string;
  startIndex?: number;
  onClose: () => void;
}

export default function ProductGallery({ photos, name, startIndex = 0, onClose }: Props) {
  const [index, setIndex] = useState(startIndex);

  const prev = () => setIndex(i => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex(i => (i + 1) % photos.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [photos.length]);

  if (!photos.length) return null;

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/85 flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition"
      >
        <Icon name="X" size={20} />
      </button>

      <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
        <img
          src={photos[index]}
          alt={name}
          className="w-full max-h-[70vh] object-contain rounded-2xl bg-white"
        />
        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Предыдущее фото"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-forest flex items-center justify-center shadow-lg hover:scale-105 transition"
            >
              <Icon name="ChevronLeft" size={22} />
            </button>
            <button
              onClick={next}
              aria-label="Следующее фото"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-forest flex items-center justify-center shadow-lg hover:scale-105 transition"
            >
              <Icon name="ChevronRight" size={22} />
            </button>
          </>
        )}
      </div>

      <div className="mt-4 text-white text-sm font-bold" onClick={e => e.stopPropagation()}>
        {name} · {index + 1} / {photos.length}
      </div>

      {photos.length > 1 && (
        <div
          className="mt-3 flex gap-2 overflow-x-auto max-w-full px-2 pb-1"
          onClick={e => e.stopPropagation()}
        >
          {photos.map((url, i) => (
            <button
              key={url + i}
              onClick={() => setIndex(i)}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 bg-white transition ${
                i === index ? 'border-secondary' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={url} alt="" loading="lazy" className="w-full h-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
