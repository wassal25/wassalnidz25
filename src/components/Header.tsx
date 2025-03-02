
// =======================================================
// Composant Header
// Description: Barre de navigation principale de l'application
// =======================================================

import { useEffect, useState } from "react";
import { Home, Settings, LogIn, MessageSquare, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

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
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, t } = useLanguage();

  // Effet pour gérer l'événement de défilement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // CSS classes conditionnelles basées sur le thème
  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled ? 
      (theme === 'dark' ? "bg-gray-900/20 backdrop-blur-lg shadow-lg" : "bg-[#FDE1D3]/20 backdrop-blur-lg shadow-lg") 
      : ""
  }`;
  
  const navClasses = theme === 'dark' 
    ? "bg-gray-900/30 backdrop-blur-sm text-white" 
    : "bg-[#FDE1D3]/30 backdrop-blur-sm";

  return (
    <header className={headerClasses}>
      <nav className={navClasses}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo et nom de l'application - maintenant clickable avec redirections vers l'accueil */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center shadow-lg relative overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105">
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
                <span className={`text-2xl font-bold tracking-wider ml-3 ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                  WASSALNI
                </span>
              </Link>
            </div>
            
            {/* Menu de navigation desktop */}
            <ul className="hidden md:flex items-center space-x-8">
              <li>
                <Link to="/" className={`flex items-center space-x-2 hover:opacity-80 transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                  <Home size={20} />
                  <span>{language === 'fr' ? 'Accueil' : language === 'ar' ? 'الرئيسية' : 'Home'}</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className={`flex items-center space-x-2 hover:opacity-80 transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                  <Settings size={20} />
                  <span>{language === 'fr' ? 'Paramètres' : language === 'ar' ? 'الإعدادات' : 'Settings'}</span>
                </Link>
              </li>
              <li>
                <Link to="/feedback" className={`flex items-center space-x-2 hover:opacity-80 transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                  <MessageSquare size={20} />
                  <span>{language === 'fr' ? 'Feedback' : language === 'ar' ? 'تعليقات' : 'Feedback'}</span>
                </Link>
              </li>
              <li>
                <button 
                  onClick={toggleTheme}
                  className={`flex items-center space-x-2 p-2 rounded-full transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'text-white bg-gray-800/50' : 'text-white bg-teal-700/30'}`}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className={`flex items-center space-x-2 px-6 py-2 ${theme === 'dark' ? 'bg-gray-800/50 hover:bg-gray-700/60' : 'bg-[#FEC6A1]/50 hover:bg-[#FEC6A1]/60'} text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                >
                  <LogIn size={20} />
                  <span>{language === 'fr' ? 'Connexion' : language === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
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
