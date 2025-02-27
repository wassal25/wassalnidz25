
// =======================================================
// Composant AnimatedClock
// Description: Horloge analogique et numérique animée
// =======================================================

import { useState, useEffect } from "react";

const AnimatedClock = () => {
  // État local pour suivre l'heure actuelle
  const [time, setTime] = useState(new Date());

  // Effet pour mettre à jour l'heure chaque seconde
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Calcul de l'heure, des minutes et des secondes
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  
  // Calcul des angles de rotation pour les aiguilles
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegrees = minutes * 6;
  const secondDegrees = seconds * 6;

  return (
    // Conteneur principal de l'horloge
    <div className="w-28 h-28 relative mx-auto">
      {/* Fond d'horloge avec effet de verre */}
      <div className="w-full h-full rounded-full bg-gradient-to-br from-white/5 to-white/20 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center overflow-hidden">
        {/* Cercle lumineux autour du cadran */}
        <div className="absolute w-full h-full rounded-full bg-gradient-to-tr from-[#FEC6A1]/10 to-[#45B39D]/10"></div>
        
        {/* Marqueurs des heures */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className={`absolute w-1 ${i % 3 === 0 ? 'h-3 bg-white/80' : 'h-2 bg-white/40'}`}
            style={{ 
              transform: `rotate(${i * 30}deg) translateY(-52px)` 
            }}
          ></div>
        ))}
        
        {/* Aiguille des heures */}
        <div 
          className="w-1.5 h-12 bg-gradient-to-t from-white to-white/80 rounded-full origin-bottom absolute z-10"
          style={{ 
            transform: `translateY(-6px) rotate(${hourDegrees}deg)`,
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)'
          }}
        ></div>
        
        {/* Aiguille des minutes */}
        <div 
          className="w-1 h-16 bg-gradient-to-t from-[#FEC6A1] to-[#FEC6A1]/80 rounded-full origin-bottom absolute z-10"
          style={{ 
            transform: `translateY(-8px) rotate(${minuteDegrees}deg)`,
            boxShadow: '0 0 5px rgba(254, 198, 161, 0.5)'
          }}
        ></div>
        
        {/* Aiguille des secondes */}
        <div 
          className="w-0.5 h-18 bg-gradient-to-t from-[#45B39D] to-[#45B39D]/80 rounded-full origin-bottom absolute z-10"
          style={{ 
            transform: `translateY(-9px) rotate(${secondDegrees}deg)`,
            boxShadow: '0 0 5px rgba(69, 179, 157, 0.5)'
          }}
        ></div>
        
        {/* Point central de l'horloge */}
        <div className="w-3 h-3 rounded-full bg-white absolute z-20 shadow-md"></div>
        
        {/* Cercle extérieur décoratif */}
        <div className="absolute w-full h-full rounded-full border-2 border-white/10"></div>
      </div>
      
      {/* Affichage numérique de l'heure */}
      <div className="text-white/90 text-center mt-2 font-mono text-sm tracking-wider bg-white/5 rounded-lg px-2 py-1 backdrop-blur-sm">
        <span className="text-[#FEC6A1]">{hours.toString().padStart(2, '0')}</span>
        <span className="animate-pulse">:</span>
        <span className="text-white">{minutes.toString().padStart(2, '0')}</span>
        <span className="animate-pulse">:</span>
        <span className="text-[#45B39D]">{seconds.toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default AnimatedClock;
