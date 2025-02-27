
import { useState, useEffect } from "react";

const AnimatedClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegrees = minutes * 6;
  const secondDegrees = seconds * 6;

  return (
    <div className="w-32 h-32 relative mx-auto">
      <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm border border-white/30 shadow-lg flex items-center justify-center">
        {/* Cercle central */}
        <div className="w-3 h-3 bg-white rounded-full absolute z-20"></div>
        
        {/* Heures */}
        <div 
          className="w-1.5 h-16 bg-white/80 rounded-full origin-bottom absolute"
          style={{ transform: `translateY(-8px) rotate(${hourDegrees}deg)` }}
        ></div>
        
        {/* Minutes */}
        <div 
          className="w-1 h-20 bg-teal-300/90 rounded-full origin-bottom absolute"
          style={{ transform: `translateY(-10px) rotate(${minuteDegrees}deg)` }}
        ></div>
        
        {/* Secondes */}
        <div 
          className="w-0.5 h-22 bg-[#FEC6A1] rounded-full origin-bottom absolute"
          style={{ transform: `translateY(-11px) rotate(${secondDegrees}deg)` }}
        ></div>
        
        {/* Marqueurs d'heures */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-3 bg-white/60"
            style={{ 
              transform: `rotate(${i * 30}deg) translateY(-58px)` 
            }}
          ></div>
        ))}
      </div>
      
      {/* Affichage digital */}
      <div className="text-white text-center mt-4 text-lg font-medium tracking-wider">
        {hours.toString().padStart(2, '0')}:
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default AnimatedClock;
