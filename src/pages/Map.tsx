
// =======================================================
// Page: Map (Vue carte complète)
// Description: Vue complète de la carte avec options avancées
// Fonctionnalités: Affichage carte Google Maps, recherche lieux, proposer trajet
// Couleurs: Dégradé teal (#45B39D) à pêche (#FEC6A1)
// =======================================================

import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { ArrowLeft, Search, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Page Map - Affiche une vue complète de la carte interactive
 * 
 * Cette page permet d'afficher la carte en plein écran avec des
 * options supplémentaires comme la recherche et la proposition de trajet.
 */
const MapPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#45B39D]/80 to-[#FEC6A1]/50 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        {/* Navigation et barre de recherche */}
        <div className="mb-6 flex items-center justify-between">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            {t('backToHome')}
          </button>
          
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder={t('searchPlace')}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={16} />
          </div>
        </div>
        
        {/* Section principale avec la carte */}
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-3xl shadow-lg animate-fade-up overflow-hidden">
          <h1 className="text-2xl font-bold text-white mb-4 text-center">{t('availableTripsMap')}</h1>
          
          <div className="rounded-2xl overflow-hidden h-[70vh] relative">
            <Map />
            
            {/* Contrôles de zoom */}
            <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm p-3 rounded-lg">
              <div className="flex flex-col space-y-2">
                <button className="w-8 h-8 bg-white/20 hover:bg-white/40 rounded-md flex items-center justify-center text-white transition-colors">
                  +
                </button>
                <button className="w-8 h-8 bg-white/20 hover:bg-white/40 rounded-md flex items-center justify-center text-white transition-colors">
                  -
                </button>
              </div>
            </div>
            
            {/* Légende de la carte */}
            <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm p-3 rounded-lg text-white">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#45B39D]"></div>
                <span className="text-sm">{t('availableTrips')}</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-3 h-3 rounded-full bg-[#FEC6A1]"></div>
                <span className="text-sm">Votre position</span>
              </div>
            </div>
          </div>
          
          {/* Boutons d'action */}
          <div className="mt-6 flex justify-center space-x-4">
            <button 
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300"
            >
              {t('backToResults')}
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapPage;
