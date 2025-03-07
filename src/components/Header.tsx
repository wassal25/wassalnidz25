
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, Globe, User, LogOut } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

/**
 * Composant d'en-tête de l'application
 * Inclut la navigation principale, le changement de thème et de langue
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut, userProfile } = useAuth();
  const location = useLocation();

  // Détection du défilement pour changer l'apparence de l'en-tête
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-2 bg-white/10 backdrop-blur-md shadow-md" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/lovable-uploads/a5974721-6a83-40c5-8a16-dcfb7657615c.png"
            alt="Wassalni Logo"
            className="h-10"
          />
          <span className="text-white font-bold text-xl ml-2">Wassalni</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white/90 hover:text-white transition-colors">
            {t('home')}
          </Link>
          <Link to="/search-help" className="text-white/90 hover:text-white transition-colors">
            {t('howItWorks')}
          </Link>
          <Link to="/about" className="text-white/90 hover:text-white transition-colors">
            {t('about')}
          </Link>
          <Link to="/feedback" className="text-white/90 hover:text-white transition-colors">
            {t('feedback')}
          </Link>
        </nav>

        {/* Actions - Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Thème */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label={theme === "dark" ? t('lightMode') : t('darkMode')}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Langue */}
          <div className="relative group">
            <button
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center"
              aria-label={t('changeLanguage')}
            >
              <Globe size={20} />
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-white/10 backdrop-blur-md rounded-md shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <button
                onClick={() => setLanguage("fr")}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
                  language === "fr" ? "text-white font-medium" : "text-white/80"
                }`}
              >
                Français
              </button>
              <button
                onClick={() => setLanguage("ar")}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
                  language === "ar" ? "text-white font-medium" : "text-white/80"
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
                  language === "en" ? "text-white font-medium" : "text-white/80"
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Authentification */}
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="text-white text-sm">
                {userProfile?.full_name || user.email}
              </div>
              <Link
                to="/settings"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label={t('profile')}
              >
                <User size={20} />
              </Link>
              <button
                onClick={() => signOut()}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label={t('logout')}
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                {t('login')}
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1] hover:to-[#45B39D] text-white transition-colors"
              >
                {t('register')}
              </Link>
            </div>
          )}
        </div>

        {/* Menu Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden">
          <div className="h-full w-3/4 bg-gradient-to-b from-[#45B39D]/90 to-[#FEC6A1]/90 p-6 flex flex-col justify-between">
            <div>
              <Link to="/" className="flex items-center mb-8">
                <img
                  src="/lovable-uploads/a5974721-6a83-40c5-8a16-dcfb7657615c.png"
                  alt="Wassalni Logo"
                  className="h-10"
                />
                <span className="text-white font-bold text-xl ml-2">Wassalni</span>
              </Link>

              <nav className="flex flex-col space-y-4">
                <Link to="/" className="text-white/90 hover:text-white transition-colors text-lg">
                  {t('home')}
                </Link>
                <Link
                  to="/search-help"
                  className="text-white/90 hover:text-white transition-colors text-lg"
                >
                  {t('howItWorks')}
                </Link>
                <Link to="/about" className="text-white/90 hover:text-white transition-colors text-lg">
                  {t('about')}
                </Link>
                <Link
                  to="/feedback"
                  className="text-white/90 hover:text-white transition-colors text-lg"
                >
                  {t('feedback')}
                </Link>
              </nav>

              {/* Authentification Mobile */}
              <div className="mt-8 space-y-4">
                {user ? (
                  <>
                    <div className="text-white mb-2">
                      {userProfile?.full_name || user.email}
                    </div>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-center"
                    >
                      {t('profile')}
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-center"
                    >
                      {t('login')}
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 rounded-xl bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1] hover:to-[#45B39D] text-white transition-colors text-center"
                    >
                      {t('register')}
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              {/* Thème */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label={theme === "dark" ? t('lightMode') : t('darkMode')}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Langue */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setLanguage("fr")}
                  className={`px-3 py-1 rounded-md ${
                    language === "fr"
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLanguage("ar")}
                  className={`px-3 py-1 rounded-md ${
                    language === "ar"
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  AR
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded-md ${
                    language === "en"
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
