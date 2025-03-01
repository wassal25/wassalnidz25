
// =======================================================
// Composant Header
// Description: Barre de navigation principale de l'application
// =======================================================

import { useEffect, useState } from "react";
import { Home, Settings, LogIn, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Composant Header - Barre de navigation principale
 * 
 * Ce composant affiche la barre de navigation en haut de l'application.
 * Il contient le logo, le nom de l'application et les liens de navigation.
 * Il change d'apparence lors du défilement de la page.
 */
const Header = () => {
  // État pour suivre si l'utilisateur a fait défiler la page
  const [scrolled, setScrolled] = useState(false);

  // Effet pour gérer l'événement de défilement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#FDE1D3]/20 backdrop-blur-lg shadow-lg" : ""
    }`}>
      <nav className="bg-[#FDE1D3]/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo et nom de l'application */}
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center shadow-lg relative overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl">
                {/* Logo moderne avec W et forme officielle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/c4210440-d310-4d38-87b8-3de8cf89dd76.png" 
                    alt="Wassalni Logo" 
                    className="h-10 w-10 object-contain"
                  />
                </div>
                
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-white/10 rounded-xl" 
                  style={{ 
                    backgroundImage: "linear-gradient(45deg, transparent 65%, rgba(255,255,255,0.3) 70%, transparent 75%)", 
                    backgroundSize: "200% 200%", 
                    animation: "shine 3s linear infinite" 
                  }}
                />
              </div>
              <span className="text-white text-2xl font-bold tracking-wider ml-3">
                WASSALNI
              </span>
            </div>
            
            {/* Menu de navigation desktop */}
            <ul className="hidden md:flex items-center space-x-8">
              <li>
                <Link to="/" className="flex items-center space-x-2 hover:text-white/80 text-white transition-all duration-300 hover:scale-105">
                  <Home size={20} />
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center space-x-2 hover:text-white/80 text-white transition-all duration-300 hover:scale-105">
                  <Settings size={20} />
                  <span>Paramètres</span>
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="flex items-center space-x-2 hover:text-white/80 text-white transition-all duration-300 hover:scale-105">
                  <MessageSquare size={20} />
                  <span>Feedback</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="flex items-center space-x-2 px-6 py-2 bg-[#FEC6A1]/50 hover:bg-[#FEC6A1]/60 text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <LogIn size={20} />
                  <span>Connexion</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      {/* Bannière du logo de la société sur toute la largeur */}
      <div className="w-full bg-gradient-to-r from-green-100 to-blue-200 relative py-2 overflow-hidden">
        <div className="w-full flex justify-center items-center">
          <img 
            src="/lovable-uploads/a5974721-6a83-40c5-8a16-dcfb7657615c.png" 
            alt="Wassalni - Application de covoiturage" 
            className="w-full h-16 object-cover"
          />
        </div>
        
        {/* Effet de vague pour accentuer le dynamisme */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600/30"></div>
      </div>
      
      {/* Style pour l'animation de brillance */}
      <style>
        {`
          @keyframes shine {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: 0 0;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
