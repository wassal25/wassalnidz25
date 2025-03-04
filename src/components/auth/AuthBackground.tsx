
import React from "react";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

interface AuthBackgroundProps {
  children: React.ReactNode;
}

/**
 * Composant d'arrière-plan pour les pages d'authentification
 * Inclut l'image de fond, le dégradé et le bouton de retour à l'accueil
 */
export const AuthBackground: React.FC<AuthBackgroundProps> = ({ children }) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Bouton de retour à l'accueil */}
      <Link 
        to="/" 
        className="absolute top-4 left-4 z-20 bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
        aria-label={t('returnToHome')}
      >
        <Home className="w-6 h-6 text-white" />
      </Link>
      
      {/* Image d'arrière-plan de Constantine */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=2070")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Overlay gradient pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/50 via-transparent to-[#45B39D]/50 z-0" />
      
      {/* Contenu */}
      {children}
    </div>
  );
};

export default AuthBackground;
