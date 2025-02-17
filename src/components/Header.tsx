
import { useEffect, useState } from "react";

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : ""}`}>
      <div className="w-full">
        <div className="w-full">
          <img 
            src="/lovable-uploads/935fdad3-49cd-43e7-87a7-c532e68ba0c0.png" 
            alt="Wassalni" 
            className="w-full h-20 object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
