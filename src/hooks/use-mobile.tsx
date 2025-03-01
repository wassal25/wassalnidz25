import { useState, useEffect, RefObject } from "react";

/**
 * Hook pour détecter si l'appareil est mobile basé sur la largeur de l'écran
 * 
 * @returns {boolean} true si l'appareil est considéré comme mobile
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Vérifier au chargement
    checkMobile();
    
    // Ajouter un écouteur pour les changements de taille d'écran
    window.addEventListener('resize', checkMobile);
    
    // Nettoyer l'écouteur
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return isMobile;
}

/**
 * Hook pour détecter les clics en dehors d'un élément
 * 
 * @param ref - Référence à l'élément à surveiller
 * @param handler - Fonction à exécuter lorsqu'un clic est détecté en dehors de l'élément
 */
export function useClickAway(ref: RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      
      // Ne rien faire si le clic était à l'intérieur de l'élément
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      
      handler();
    };
    
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
