
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Page Cart Interactive - Redirige vers la carte interactive locale
 * 
 * Cette page redirige automatiquement l'utilisateur vers la carte interactive
 * hébergée localement.
 */
const CartInteractive = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Redirection automatique vers la carte interactive
    window.location.href = "file:///C:/Users/User/AppData/Local/Temp/qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#45B39D]/80 to-[#FEC6A1]/50 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold mb-4">Redirection vers la carte interactive...</h1>
        <p className="text-lg">Si la redirection ne fonctionne pas, cliquez sur le lien ci-dessous :</p>
        <a 
          href="file:///C:/Users/User/AppData/Local/Temp/qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html"
          className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-[#45B39D] to-[#FEC6A1] text-white rounded-xl hover:opacity-90 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ouvrir la carte interactive
        </a>
      </div>
    </div>
  );
};

export default CartInteractive;
