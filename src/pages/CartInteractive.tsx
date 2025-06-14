
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MapPin, ExternalLink, Copy } from "lucide-react";

/**
 * Page Cart Interactive - Accès à la carte interactive locale
 * 
 * Cette page fournit différentes méthodes pour accéder à la carte interactive
 * hébergée localement.
 */
const CartInteractive = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);

  // Chemin vers la carte - essayer différents chemins possibles
  const mapPaths = [
    "/qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html",
    "./qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html",
    "qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html",
    "/public/qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html"
  ];

  const handleMapLoad = () => {
    console.log("Carte chargée avec succès");
    setMapLoaded(true);
    setMapError(false);
  };

  const handleMapError = () => {
    console.log("Erreur de chargement de la carte, tentative avec le chemin suivant");
    setMapError(true);
    setMapLoaded(false);
    
    // Essayer le chemin suivant
    if (currentPathIndex < mapPaths.length - 1) {
      setTimeout(() => {
        setCurrentPathIndex(currentPathIndex + 1);
        setMapError(false);
      }, 2000);
    }
  };

  const handleOpenInNewTab = (path: string) => {
    const fullPath = window.location.origin + "/" + path.replace(/^\//, "");
    console.log("Tentative d'ouverture de:", fullPath);
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

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#45B39D]/80 to-[#FEC6A1]/50 flex flex-col">
      <div className="container mx-auto px-4 pt-20 pb-8 flex-grow">
        {/* Header avec bouton retour */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-center text-white flex-grow">
            <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <MapPin className="w-8 h-8" />
              Carte Interactive de Constantine
            </h1>
            <p className="text-lg mb-6">Visualisez les trajets et les points d'intérêt de Constantine</p>
          </div>
          <Button
            onClick={handleReturnHome}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
          >
            <Home className="w-4 h-4 mr-2" />
            Accueil
          </Button>
        </div>
        
        {/* Affichage principal de la carte */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">Carte Interactive - Constantine</h2>
            
            {/* Container pour la carte */}
            <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-2xl" style={{ height: '600px' }}>
              {/* Tentative d'affichage de la carte */}
              {!mapError && (
                <iframe
                  key={currentPathIndex}
                  src={mapPaths[currentPathIndex]}
                  className="w-full h-full border-0"
                  title="Carte Interactive de Constantine"
                  onLoad={handleMapLoad}
                  onError={handleMapError}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                  allow="geolocation"
                  style={{ 
                    minHeight: '600px',
                    backgroundColor: '#f0f9ff'
                  }}
                />
              )}
              
              {/* Overlay si la carte ne charge pas */}
              {(mapError || !mapLoaded) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                  <div className="text-center p-8 max-w-md">
                    {!mapError ? (
                      <>
                        <div className="animate-spin text-4xl mb-4">🔄</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Chargement de la carte...</h3>
                        <p className="text-gray-600 mb-4">Tentative {currentPathIndex + 1} sur {mapPaths.length}</p>
                      </>
                    ) : (
                      <>
                        <div className="text-6xl mb-4">🗺️</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Carte Interactive</h3>
                        <p className="text-gray-600 mb-6">
                          La carte ne peut pas être chargée directement. 
                          Veuillez utiliser les options ci-dessous.
                        </p>
                        
                        <div className="space-y-3">
                          <Button
                            onClick={() => handleOpenInNewTab(mapPaths[0])}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Ouvrir la carte dans un nouvel onglet
                          </Button>
                          
                          <Button
                            onClick={() => handleCopyLink(mapPaths[0])}
                            variant="outline"
                            className="w-full"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copier le lien de la carte
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              {/* Indicateur de succès */}
              {mapLoaded && !mapError && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  ✅ Carte chargée
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Options d'accès alternatives */}
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Boutons d'accès direct */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Accès Direct à la Carte</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                onClick={() => handleOpenInNewTab(mapPaths[0])}
                className="w-full px-6 py-4 bg-gradient-to-r from-[#45B39D] to-[#FEC6A1] text-white hover:opacity-90 font-semibold shadow-lg"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Ouvrir dans un nouvel onglet
              </Button>
              
              <Button
                onClick={() => handleCopyLink(mapPaths[0])}
                variant="outline"
                className="w-full px-6 py-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Copy className="w-5 h-5 mr-2" />
                Copier le lien
              </Button>
            </div>
          </div>

          {/* Instructions détaillées */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">📋 Instructions d'utilisation :</h3>
            <div className="space-y-3 text-white/80 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-green-300 font-bold">1.</span>
                <span>Cliquez sur "Ouvrir dans un nouvel onglet" pour accéder à la carte</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-300 font-bold">2.</span>
                <span>Si cela ne fonctionne pas, copiez le lien et collez-le dans votre navigateur</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-300 font-bold">3.</span>
                <span>Assurez-vous que le fichier de la carte est accessible sur votre serveur</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-300 font-bold">⚠️</span>
                <span>Le fichier doit être placé dans le dossier public de votre application</span>
              </div>
            </div>
          </div>

          {/* Lien direct */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">🔗 Lien direct :</h3>
            <div className="bg-black/20 rounded p-3 font-mono text-xs text-white/70 break-all">
              {window.location.origin}/qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInteractive;
