
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
      scrolled ? "bg-white/80 backdrop-blur-lg shadow-lg" : ""
    }`}>
      <div className="w-full">
        <div className="w-full">
          <img 
            src="/lovable-uploads/935fdad3-49cd-43e7-87a7-c532e68ba0c0.png" 
            alt="Wassalni" 
            className="w-full h-20 object-cover"
          />
        </div>
        <nav className="bg-primary text-white">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-end space-x-8 h-12">
              <li>
                <a href="/" className="flex items-center space-x-2 hover:text-white/80 transition-colors">
                  <Home size={20} />
                  <span>Accueil</span>
                </a>
              </li>
              <li>
                <a href="/login" className="flex items-center space-x-2 hover:text-white/80 transition-colors">
                  <LogIn size={20} />
                  <span>Connexion</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
