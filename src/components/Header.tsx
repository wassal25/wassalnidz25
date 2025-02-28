
// =======================================================
// Composant Header
// Description: Barre de navigation principale de l'application
// =======================================================

import { useEffect, useState } from "react";
import { Home, Settings, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

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
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/f4bfb0ca-890b-4d1c-a6d4-4e02fc042ff9.png" 
                alt="Wassalni Logo" 
                className="h-10 mr-2"
              />
              <span className="text-white text-2xl font-bold tracking-wider">
                WASSALNI
              </span>
            </Link>
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
