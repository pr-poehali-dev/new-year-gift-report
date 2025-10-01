export default function CornerDecorations() {
  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 pointer-events-none opacity-80">
        <img 
          src="https://static.tildacdn.com/tild6465-6162-4032-a639-313333306430/_6.png" 
          alt="decoration"
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="fixed top-0 right-0 z-40 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 pointer-events-none opacity-80 transform scale-x-[-1]">
        <img 
          src="https://static.tildacdn.com/tild6465-6162-4032-a639-313333306430/_6.png" 
          alt="decoration"
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="fixed bottom-0 left-0 z-40 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 pointer-events-none opacity-80 transform scale-y-[-1]">
        <img 
          src="https://static.tildacdn.com/tild6465-6162-4032-a639-313333306430/_6.png" 
          alt="decoration"
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="fixed bottom-0 right-0 z-40 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 pointer-events-none opacity-80 transform scale-[-1]">
        <img 
          src="https://static.tildacdn.com/tild6465-6162-4032-a639-313333306430/_6.png" 
          alt="decoration"
          className="w-full h-full object-contain"
        />
      </div>
    </>
  );
}
