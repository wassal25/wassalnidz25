
// =======================================================
// Fichier: Footer.tsx
// Description: Pied de page de l'application avec informations de contact et liens
// Fonctionnalité: Affiche les informations légales et de contact
// =======================================================

import { Copyright } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Composant Footer - Pied de page
 * 
 * Affiche les informations de contact, liens utiles,
 * et informations légales de l'application.
 * Prend en compte la langue et le thème actuel.
 */
const Footer = () => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  
  // Classes dynamiques pour s'adapter au thème
  const footerBgClass = theme === 'dark' 
    ? 'bg-gray-900/40 backdrop-blur-sm text-white' 
    : 'bg-teal-600/40 backdrop-blur-sm text-white';
  
  const linkHoverClass = theme === 'dark'
    ? 'hover:text-teal-400'
    : 'hover:text-white';

  return (
    <footer className={footerBgClass}>
      <div className="container mx-auto px-4 py-8">
        {/* Grille principale d'informations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {/* Section À propos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('aboutCompany')}</h3>
            <p className="text-white/90">
              {language === 'fr' && "Wassalni est une plateforme de transport collaboratif qui connecte les voyageurs à travers Constantine."}
              {language === 'ar' && "وصلني هي منصة نقل تشاركية تربط المسافرين عبر قسنطينة."}
              {language === 'en' && "Wassalni is a collaborative transportation platform that connects travelers throughout Constantine."}
            </p>
          </div>
          
          {/* Section Liens utiles */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('usefulLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-white/90 ${linkHoverClass} transition-colors`}>
                  {t('howItWorks')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-white/90 ${linkHoverClass} transition-colors`}>
                  {t('faq')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-white/90 ${linkHoverClass} transition-colors`}>
                  {t('contactUs')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Section Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contactInfo')}</h3>
            <ul className="space-y-2 text-white/90">
              <li>{t('email')}: contact@wassalni.com</li>
              <li>{t('phone')}: +213 123 456 789</li>
              <li>{t('address')}: Constantine, Algérie</li>
            </ul>
          </div>
        </div>
        
        {/* Section copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 flex items-center justify-center text-white/80">
          <Copyright size={20} className="mr-2" />
          <p>2025 Wassalni. {t('copyright')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
