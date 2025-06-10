
import { useLanguage } from "@/context/LanguageContext";

/**
 * Page Cart Interactive - Redirige vers la carte interactive locale
 * 
 * Cette page permet à l'utilisateur d'accéder à la carte interactive
 * hébergée localement en cliquant sur le lien.
 */
const CartInteractive = () => {
  const { t } = useLanguage();

  const handleOpenMap = () => {
    window.open("file:///C:/Users/User/AppData/Local/Temp/qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#45B39D]/80 to-[#FEC6A1]/50 flex items-center justify-center">
      <div className="text-center text-white max-w-md mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Carte Interactive</h1>
        <p className="text-lg mb-8">Cliquez sur le bouton ci-dessous pour ouvrir la carte interactive de Constantine.</p>
        
        <button
          onClick={handleOpenMap}
          className="px-8 py-4 bg-gradient-to-r from-[#45B39D] to-[#FEC6A1] text-white rounded-xl hover:opacity-90 transition-opacity text-lg font-semibold shadow-lg"
        >
          Ouvrir la Carte Interactive
        </button>
        
        <div className="mt-8 p-4 bg-white/10 backdrop-blur-md rounded-xl">
          <p className="text-sm text-white/80">
            Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :
          </p>
          <p className="text-xs text-white/60 mt-2 break-all">
            file:///C:/Users/User/AppData/Local/Temp/qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartInteractive;
