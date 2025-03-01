
// =======================================================
// Composant Header
// Description: Barre de navigation principale de l'application
// =======================================================

import { useEffect, useState, useRef } from "react";
import { Home, Settings, LogIn, MessageSquare, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useClickAway } from "@/hooks/use-mobile";

/**
 * Composant Header - Barre de navigation principale
 * 
 * Ce composant affiche la barre de navigation en haut de l'application.
 * Il contient le logo, le nom de l'application et les liens de navigation.
 * Il change d'apparence lors du défilement de la page et possède un menu animé.
 */
const Header = () => {
  // État pour suivre si l'utilisateur a fait défiler la page
  const [scrolled, setScrolled] = useState(false);
  // État pour le menu déroulant
  const [menuOpen, setMenuOpen] = useState(false);
  // Référence pour le menu afin de gérer les clics en dehors
  const menuRef = useRef<HTMLDivElement>(null);

  // Gestion du clic en dehors du menu pour le fermer
  useClickAway(menuRef, () => {
    if (menuOpen) setMenuOpen(false);
  });

  // Effet pour gérer l'événement de défilement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle du menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#FDE1D3]/20 backdrop-blur-lg shadow-lg" : ""
    }`}>
      <nav className="bg-[#FDE1D3]/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo et nom de l'application */}
            <div className="flex items-center">
              <div 
                ref={menuRef}
                className="relative z-20"
              >
                {/* Logo sur une forme moderne et interactive */}
                <button 
                  onClick={toggleMenu}
                  className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center shadow-lg relative overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl"
                >
                  {/* Logo moderne avec W et forme officielle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/c4210440-d310-4d38-87b8-3de8cf89dd76.png" 
                      alt="Wassalni Logo" 
                      className={`h-10 w-10 object-contain transition-all duration-500 ${menuOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
                    />
                    <X 
                      size={24} 
                      className={`text-white absolute transition-all duration-500 ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
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
                </button>

                {/* Menu animé qui sort du logo */}
                <div 
                  className={`absolute top-full left-0 mt-2 bg-white/90 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden transition-all duration-500 origin-top-left z-10 border border-teal-100 ${
                    menuOpen 
                      ? "opacity-100 scale-100 translate-y-0" 
                      : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
                  }`}
                  style={{
                    width: "220px",
                    transformOrigin: "top left"
                  }}
                >
                  <ul className="py-2">
                    <li>
                      <Link to="/" className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 transition-colors">
                        <Home size={18} className="mr-3 text-teal-600" />
                        <span>Accueil</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 transition-colors">
                        <Settings size={18} className="mr-3 text-teal-600" />
                        <span>Paramètres</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/feedback" className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 transition-colors">
                        <MessageSquare size={18} className="mr-3 text-teal-600" />
                        <span>Feedback</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/login" className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 transition-colors">
                        <LogIn size={18} className="mr-3 text-teal-600" />
                        <span>Connexion</span>
                      </Link>
                    </li>
                  </ul>
                </div>
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
      
      {/* Style pour l'animation de brillance */}
      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: 0 0;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
