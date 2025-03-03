
// =======================================================
// Fichier: Header.tsx
// Description: Barre de navigation principale de l'application
// Fonctionnalité: Navigation entre les pages et contrôle du thème/langue
// =======================================================

import { useEffect, useState } from "react";
import { Home, Settings, LogIn, MessageSquare, Moon, Sun, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage, Language } from "@/context/LanguageContext";

/**
 * Composant Header - Barre de navigation principale
 * 
 * Ce composant affiche la barre de navigation en haut de l'application.
 * Il contient le logo, le nom de l'application et les liens de navigation.
 * Il change d'apparence lors du défilement de la page.
 * Il permet également de changer le thème et la langue de l'application.
 */
const Header = () => {
  // État pour suivre si l'utilisateur a fait défiler la page
  const [scrolled, setScrolled] = useState(false);
  // État pour le menu mobile (ouvert/fermé)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  // Effet pour gérer l'événement de défilement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gestion du changement de langue
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  // Toggle du menu mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
            {/* Logo et nom de l'application - avec redirection vers l'accueil */}
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
            
            {/* Bouton menu hamburger pour mobile */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu} 
                className="text-white p-2"
                aria-label="Toggle mobile menu"
              >
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
              </button>
            </div>
            
            {/* Menu de navigation desktop */}
            <ul className="hidden md:flex items-center space-x-8">
              <li>
                <Link to="/" className={`flex items-center space-x-2 hover:opacity-80 transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                  <Home size={20} />
                  <span>{t('home')}</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className={`flex items-center space-x-2 hover:opacity-80 transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                  <Settings size={20} />
                  <span>{t('settings')}</span>
                </Link>
              </li>
              <li>
                <Link to="/feedback" className={`flex items-center space-x-2 hover:opacity-80 transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                  <MessageSquare size={20} />
                  <span>{t('feedback')}</span>
                </Link>
              </li>
              <li>
                <div className="flex items-center space-x-2">
                  {/* Sélecteur de langue */}
                  <div className="relative group">
                    <button className={`flex items-center space-x-2 p-2 rounded-full transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'text-white bg-gray-800/50' : 'text-white bg-teal-700/30'}`}>
                      <Globe size={20} />
                    </button>
                    <div className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-32 overflow-hidden">
                      <button 
                        onClick={() => handleLanguageChange('fr')}
                        className={`block w-full px-4 py-2 text-left ${language === 'fr' ? 'bg-teal-500/20' : 'hover:bg-white/5'} transition-colors`}
                      >
                        Français
                      </button>
                      <button 
                        onClick={() => handleLanguageChange('ar')}
                        className={`block w-full px-4 py-2 text-left ${language === 'ar' ? 'bg-teal-500/20' : 'hover:bg-white/5'} transition-colors`}
                      >
                        العربية
                      </button>
                      <button 
                        onClick={() => handleLanguageChange('en')}
                        className={`block w-full px-4 py-2 text-left ${language === 'en' ? 'bg-teal-500/20' : 'hover:bg-white/5'} transition-colors`}
                      >
                        English
                      </button>
                    </div>
                  </div>
                  
                  {/* Bouton thème */}
                  <button 
                    onClick={toggleTheme}
                    className={`flex items-center space-x-2 p-2 rounded-full transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'text-white bg-gray-800/50' : 'text-white bg-teal-700/30'}`}
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className={`flex items-center space-x-2 px-6 py-2 ${theme === 'dark' ? 'bg-gray-800/50 hover:bg-gray-700/60' : 'bg-[#FEC6A1]/50 hover:bg-[#FEC6A1]/60'} text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                >
                  <LogIn size={20} />
                  <span>{t('login')}</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Menu mobile */}
          {mobileMenuOpen && (
            <div className={`md:hidden ${theme === 'dark' ? 'bg-gray-900/95' : 'bg-[#FDE1D3]/95'} backdrop-blur-lg py-4 px-2 rounded-lg shadow-lg absolute left-2 right-2 top-16 transition-all duration-300 z-50`}>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/" 
                    className={`flex items-center space-x-3 p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-white/10'} transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home size={20} />
                    <span>{t('home')}</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/settings" 
                    className={`flex items-center space-x-3 p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-white/10'} transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings size={20} />
                    <span>{t('settings')}</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/feedback" 
                    className={`flex items-center space-x-3 p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-white/10'} transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MessageSquare size={20} />
                    <span>{t('feedback')}</span>
                  </Link>
                </li>
                <li>
                  <div className="flex flex-wrap gap-2 px-2">
                    <button 
                      onClick={() => handleLanguageChange('fr')}
                      className={`px-3 py-1 rounded-full ${language === 'fr' ? 'bg-teal-500/40' : 'bg-white/10'} transition-colors`}
                    >
                      FR
                    </button>
                    <button 
                      onClick={() => handleLanguageChange('ar')}
                      className={`px-3 py-1 rounded-full ${language === 'ar' ? 'bg-teal-500/40' : 'bg-white/10'} transition-colors`}
                    >
                      عربي
                    </button>
                    <button 
                      onClick={() => handleLanguageChange('en')}
                      className={`px-3 py-1 rounded-full ${language === 'en' ? 'bg-teal-500/40' : 'bg-white/10'} transition-colors`}
                    >
                      EN
                    </button>
                    <button 
                      onClick={toggleTheme}
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/10'} transition-colors`}
                      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                  </div>
                </li>
                <li>
                  <Link 
                    to="/login" 
                    className={`block text-center px-6 py-2 ${theme === 'dark' ? 'bg-gray-800/70 hover:bg-gray-700/80' : 'bg-[#FEC6A1]/50 hover:bg-[#FEC6A1]/60'} text-white rounded-lg transition-all duration-300 hover:shadow-lg`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                </li>
              </ul>
            </div>
          )}
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
