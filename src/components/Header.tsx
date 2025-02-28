
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
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#FEC6A1] to-[#45B39D] flex items-center justify-center mr-2 relative overflow-hidden shadow-md">
                {/* Logo W avec effet modéré */}
                <span className="text-white text-2xl font-bold transform hover:scale-110 transition-transform duration-300" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>W</span>
                <div className="absolute inset-0 bg-white/10 rounded-lg" style={{ backgroundImage: "linear-gradient(45deg, transparent 65%, rgba(255,255,255,0.3) 70%, transparent 75%)", backgroundSize: "200% 200%", animation: "shine 3s linear infinite" }}></div>
              </div>
              <span className="text-white text-2xl font-bold tracking-wider">
                WASSALNI
              </span>
            </Link>
            
            {/* Menu de navigation */}
            <ul className="flex items-center space-x-8">
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
    </header>
  );
};

export default Header;
