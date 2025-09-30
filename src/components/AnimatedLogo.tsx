import { useEffect, useState } from 'react';

export default function AnimatedLogo() {
  const [shimmer, setShimmer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShimmer(prev => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center py-8 sm:py-12">
      <div className="relative">
        <div className="absolute inset-0 blur-2xl opacity-50 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-yellow-400 via-red-500 to-green-500 rounded-full"></div>
        </div>
        
        <div className="relative bg-gradient-to-br from-red-600 via-primary to-green-700 text-white px-8 sm:px-16 py-6 sm:py-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div 
            className="absolute inset-0 rounded-3xl opacity-60"
            style={{
              background: `linear-gradient(${shimmer * 3.6}deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)`,
              animation: 'shine 3s linear infinite'
            }}
          />
          
          <div className="relative flex items-center gap-3 sm:gap-4">
            <div className="text-5xl sm:text-7xl animate-bounce" style={{animationDuration: '2s'}}>
              🎁
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight drop-shadow-lg">
                Новогодний
              </h1>
              <p className="text-xl sm:text-3xl font-light tracking-wide text-yellow-100">
                подарки РФ
              </p>
            </div>
            <div className="text-5xl sm:text-7xl animate-spin-slow" style={{animationDuration: '8s'}}>
              ✨
            </div>
          </div>
          
          <div className="absolute -top-3 -right-3 text-4xl sm:text-5xl animate-pulse">
            ⭐
          </div>
          <div className="absolute -bottom-3 -left-3 text-3xl sm:text-4xl animate-pulse" style={{animationDelay: '0.5s'}}>
            🎄
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(30deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(30deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}