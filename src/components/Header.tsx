
import { useEffect, useState } from "react";
import { Home, LogIn } from "lucide-react";

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
      scrolled ? "bg-teal-500/30 backdrop-blur-lg shadow-lg" : ""
    }`}>
      <nav className="bg-teal-600/40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center">
              <span className="text-white text-2xl font-bold tracking-wider">
                WASSALNI
              </span>
            </a>
            <ul className="flex items-center space-x-8">
              <li>
                <a href="/" className="flex items-center space-x-2 hover:text-white/80 text-white transition-colors">
                  <Home size={20} />
                  <span>Accueil</span>
                </a>
              </li>
              <li>
                <a href="/login" className="flex items-center space-x-2 hover:text-white/80 text-white transition-colors">
                  <LogIn size={20} />
                  <span>Connexion</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
