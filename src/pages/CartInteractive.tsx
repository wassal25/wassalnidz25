
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";

/**
 * Page Cart Interactive - Accès à la carte interactive locale
 * 
 * Cette page fournit différentes méthodes pour accéder à la carte interactive
 * hébergée localement.
 */
const CartInteractive = () => {
  const { t } = useLanguage();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Chemin vers la carte - essayer différents chemins possibles
  const mapPaths = [
    "/qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html",
    "qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html",
    "./qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html"
  ];

  const handleMapLoad = () => {
    setMapLoaded(true);
    setMapError(false);
  };

  const handleMapError = () => {
    setMapError(true);
    setMapLoaded(false);
  };

  const handleOpenInNewTab = (path: string) => {
    // Essayer d'ouvrir dans un nouvel onglet
    const fullPath = window.location.origin + "/" + path.replace(/^\//, "");
    window.open(fullPath, '_blank');
  };

  const handleCopyLink = (path: string) => {
    const fullPath = window.location.origin + "/" + path.replace(/^\//, "");
    navigator.clipboard.writeText(fullPath).then(() => {
      alert("Lien copié dans le presse-papier !");
    }).catch(() => {
      alert("Veuillez copier manuellement ce lien : " + fullPath);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#45B39D]/80 to-[#FEC6A1]/50 flex flex-col">
      <div className="container mx-auto px-4 pt-20 pb-8 flex-grow">
        <div className="text-center text-white mb-8">
          <h1 className="text-3xl font-bold mb-4">Carte Interactive de Constantine</h1>
          <p className="text-lg mb-6">Visualisez les trajets et les points d'intérêt de Constantine</p>
        </div>
        
        {/* Affichage principal de la carte */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">Carte Interactive - Constantine</h2>
            
            {/* Container pour la carte avec les bonnes proportions */}
            <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-2xl" style={{ height: '600px' }}>
              {/* Essayer d'afficher la carte avec le premier chemin */}
              <iframe
                src={mapPaths[0]}
                className="w-full h-full border-0"
                title="Carte Interactive de Constantine"
                onLoad={handleMapLoad}
                onError={handleMapError}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                allow="geolocation"
                style={{ 
                  minHeight: '600px',
                  backgroundColor: '#f0f9ff'
                }}
              />
              
              {/* Overlay si la carte ne charge pas */}
              {mapError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🗺️</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Carte Interactive</h3>
                    <p className="text-gray-600 mb-6">La carte ne peut pas être chargée directement dans cette vue.</p>
                    <div className="space-y-3">
                      {mapPaths.map((path, index) => (
                        <div key={index} className="flex gap-2">
                          <button
                            onClick={() => handleOpenInNewTab(path)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm flex-1"
                          >
                            🔗 Ouvrir (Option {index + 1})
                          </button>
                          <button
                            onClick={() => handleCopyLink(path)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                          >
                            📋
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Indicateur de chargement si la carte se charge */}
              {!mapLoaded && !mapError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                  <div className="text-center">
                    <div className="animate-spin text-4xl mb-4">🔄</div>
                    <p className="text-gray-600">Chargement de la carte...</p>
                  </div>
                </div>
              )}
            </div>
            
            {mapLoaded && (
              <p className="text-green-200 text-sm mt-2 text-center">
                ✅ Carte chargée avec succès !
              </p>
            )}
          </div>
        </div>

        {/* Options d'accès alternatives */}
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Boutons d'accès direct */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Accès Direct à la Carte</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {mapPaths.map((path, index) => (
                <div key={index} className="text-center">
                  <button
                    onClick={() => handleOpenInNewTab(path)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#45B39D] to-[#FEC6A1] text-white rounded-xl hover:opacity-90 transition-opacity font-semibold shadow-lg mb-2"
                  >
                    🗺️ Option {index + 1}
                  </button>
                  <button
                    onClick={() => handleCopyLink(path)}
                    className="w-full px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm"
                  >
                    📋 Copier le lien
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions détaillées */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">📋 Instructions d'utilisation :</h3>
            <div className="space-y-3 text-white/80 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-green-300 font-bold">1.</span>
                <span>La carte devrait s'afficher automatiquement ci-dessus</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-300 font-bold">2.</span>
                <span>Si elle ne s'affiche pas, cliquez sur les boutons "Option 1, 2 ou 3" pour ouvrir dans un nouvel onglet</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-300 font-bold">3.</span>
                <span>Vous pouvez copier le lien et le coller directement dans votre navigateur</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-300 font-bold">⚠️</span>
                <span>Assurez-vous que le dossier qgis2web est accessible depuis votre serveur web</span>
              </div>
            </div>
          </div>

          {/* Informations techniques */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">🔧 Informations techniques :</h3>
            <div className="space-y-2 text-white/70 text-xs">
              <p><strong>Chemins testés :</strong></p>
              {mapPaths.map((path, index) => (
                <div key={index} className="bg-black/20 rounded p-2 font-mono break-all">
                  {window.location.origin}/{path.replace(/^\//, "")}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInteractive;
