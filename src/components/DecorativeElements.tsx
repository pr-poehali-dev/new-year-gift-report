export default function DecorativeElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <div className="absolute top-20 left-4 text-6xl animate-bounce" style={{animationDuration: '3s'}}>🎄</div>
      <div className="absolute top-20 right-4 text-6xl animate-bounce" style={{animationDuration: '3.5s'}}>🎄</div>
      <div className="absolute bottom-20 left-8 text-5xl animate-bounce" style={{animationDuration: '4s'}}>🎄</div>
      <div className="absolute bottom-20 right-8 text-5xl animate-bounce" style={{animationDuration: '3.2s'}}>🎄</div>
      
      <div className="absolute top-40 left-16 text-4xl animate-spin" style={{animationDuration: '8s'}}>🎁</div>
      <div className="absolute top-60 right-20 text-4xl animate-spin" style={{animationDuration: '10s'}}>🎀</div>
      <div className="absolute top-96 left-24 text-3xl animate-pulse" style={{animationDuration: '2s'}}>⛄</div>
      <div className="absolute top-[500px] right-12 text-3xl animate-pulse" style={{animationDuration: '2.5s'}}>🔔</div>
      <div className="absolute bottom-40 left-32 text-4xl animate-bounce" style={{animationDuration: '3.8s'}}>🎅</div>
      <div className="absolute bottom-32 right-24 text-4xl animate-bounce" style={{animationDuration: '4.2s'}}>⭐</div>
      
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-20"></div>
      <div className="absolute top-8 left-0 w-full h-4 bg-gradient-to-r from-yellow-400 via-red-400 to-green-400 opacity-30"></div>
    </div>
  );
}