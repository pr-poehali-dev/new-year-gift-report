import { useState } from 'react';
import Icon from '@/components/ui/icon';
import FestiveBackground from '@/components/festive/FestiveBackground';
import BlendImage from '@/components/festive/BlendImage';
import { compositions, compositionImage, villageBgImage } from '@/data/products';
import { useText, useSetting } from '@/hooks/useSiteTexts';

interface CompositionSectionProps {
  onOpenComposition: () => void;
}

export default function CompositionSection({ onOpenComposition }: CompositionSectionProps) {
  const t = useText();
  const st = useSetting();
  const weights = Object.keys(compositions);
  const [activeWeight, setActiveWeight] = useState(weights[0]);

  return (
    <section id="composition" className="relative bg-[#141238] text-forest-foreground">
      <FestiveBackground image={st('img.compositionBg', villageBgImage)} flakes={40} overlay="linear-gradient(90deg, rgba(12,16,48,0.9) 0%, rgba(20,18,60,0.75) 50%, rgba(20,18,60,0.45) 100%)" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3">
            {t('comp.eyebrow', 'Внутри — только радость')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            {t('comp.title', 'Состав, которому доверяют родители')}
          </h2>
          <p className="mt-5 text-sm sm:text-base text-forest-foreground/75 max-w-lg leading-relaxed">
            {t('comp.text', 'Собираем подарки из популярных конфет крупнейших российских фабрик. Качество и безопасность подтверждены сертификатами.')}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {weights.map(w => (
              <button
                key={w}
                onClick={() => setActiveWeight(w)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                  activeWeight === w
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-white/10 border border-white/20 hover:bg-white/20'
                }`}
              >
                {w}
              </button>
            ))}
          </div>

          <div className="mt-7 grid sm:grid-cols-2 gap-3">
            {compositions[activeWeight].map(item => (
              <div key={item} className="flex items-center gap-2.5 text-sm">
                <span className="w-5 h-5 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                  <Icon name="Check" size={12} />
                </span>
                {item}
              </div>
            ))}
          </div>

          <button
            onClick={onOpenComposition}
            className="mt-8 inline-flex items-center gap-2 font-bold border-b-2 border-secondary pb-1 hover:gap-3 transition-all"
          >
            {t('comp.btn', 'Посмотреть полный состав')}
            <Icon name="ArrowRight" size={17} />
          </button>
        </div>

        <div className="relative">
          <BlendImage src={st('img.composition', compositionImage)} alt="Состав подарка" className="max-w-[540px] mx-auto -my-6 sm:-my-10" />
          <div className="animate-float absolute bottom-4 right-4 sm:right-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-secondary text-secondary-foreground flex flex-col items-center justify-center text-center shadow-xl">
            <span className="font-extrabold text-base sm:text-lg">{t('comp.badge', '100%')}</span>
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wide">{t('comp.badgeSub', 'контроль качества')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
