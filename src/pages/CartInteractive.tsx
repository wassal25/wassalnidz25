
import { useLanguage } from "@/context/LanguageContext";

/**
 * Page Cart Interactive - Affiche la carte interactive locale
 * 
 * Cette page affiche directement la carte interactive
 * hébergée localement dans une iframe.
 */
const CartInteractive = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#45B39D]/80 to-[#FEC6A1]/50 flex flex-col">
      <div className="container mx-auto px-4 pt-20 pb-8 flex-grow">
        <div className="text-center text-white mb-6">
          <h1 className="text-3xl font-bold mb-4">Carte Interactive de Constantine</h1>
          <p className="text-lg">Explorez la carte interactive pour visualiser les trajets disponibles</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 h-[calc(100vh-200px)]">
          <iframe
            src="file:///C:/Users/User/AppData/Local/Temp/qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html"
            className="w-full h-full rounded-lg border-2 border-white/20"
            title="Carte Interactive Constantine"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-white/80 text-sm">
            Si la carte ne s'affiche pas, copiez et collez ce lien dans votre navigateur :
          </p>
          <p className="text-white/60 text-xs mt-2 break-all">
            file:///C:/Users/User/AppData/Local/Temp/qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartInteractive;
