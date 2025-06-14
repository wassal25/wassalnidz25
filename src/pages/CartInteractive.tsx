
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MapPin, ExternalLink, Copy, RefreshCw } from "lucide-react";

/**
 * Page Cart Interactive - Accès à la carte interactive locale
 * 
 * Cette page fournit l'accès à la carte interactive de Constantine
 * avec les arrêts de bus et taxi.
 */
const CartInteractive = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Chemin vers la carte interactive
  const mapPath = "/qgis2web/index.html";

  const handleMapLoad = () => {
    console.log("Carte chargée avec succès");
    setMapLoaded(true);
    setMapError(false);
  };

  const handleMapError = () => {
    console.log("Erreur de chargement de la carte");
    setMapError(true);
    setMapLoaded(false);
  };

  const handleRefresh = () => {
    console.log("Rechargement de la carte");
    setMapLoaded(false);
    setMapError(false);
    // Force refresh de l'iframe
    window.location.reload();
  };

  const handleOpenInNewTab = () => {
    const fullPath = window.location.origin + mapPath;
    console.log("Ouverture de la carte dans un nouvel onglet:", fullPath);
    window.open(fullPath, '_blank');
  };

  const handleCopyLink = () => {
    const fullPath = window.location.origin + mapPath;
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
      <div className="container mx-auto px-4 pt-8 pb-8 flex-grow">
        {/* Header avec bouton retour */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-center text-white flex-grow">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <MapPin className="w-8 h-8" />
              Carte Interactive de Constantine
            </h1>
            <p className="text-lg mb-4">Arrêts de bus, taxi et points d'intérêt</p>
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
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
            {/* Container pour la carte */}
            <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-2xl" style={{ height: '70vh', minHeight: '500px' }}>
              {/* Carte interactive */}
              <iframe
                src={mapPath}
                className="w-full h-full border-0"
                title="Carte Interactive de Constantine"
                onLoad={handleMapLoad}
                onError={handleMapError}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-downloads"
                allow="geolocation"
                style={{ 
                  minHeight: '500px',
                  backgroundColor: '#ffffff'
                }}
              />
              
              {/* Overlay de chargement */}
              {!mapLoaded && !mapError && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm">
                  <div className="text-center p-6">
                    <div className="animate-spin text-4xl mb-4">🔄</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Chargement de la carte...</h3>
                    <p className="text-gray-600">Veuillez patienter</p>
                  </div>
                </div>
              )}
              
              {/* Overlay d'erreur */}
              {mapError && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-50/90 backdrop-blur-sm">
                  <div className="text-center p-6 max-w-md">
                    <div className="text-6xl mb-4">❌</div>
                    <h3 className="text-xl font-semibold text-red-700 mb-4">Erreur de chargement</h3>
                    <p className="text-red-600 mb-4">
                      La carte ne peut pas être chargée. Vérifiez que les fichiers sont présents.
                    </p>
                    <Button onClick={handleRefresh} className="bg-red-500 hover:bg-red-600 text-white">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Réessayer
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Indicateur de succès */}
              {mapLoaded && !mapError && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  ✅ Carte chargée
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Boutons d'accès */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Actions</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                onClick={handleOpenInNewTab}
                className="w-full px-4 py-3 bg-gradient-to-r from-[#45B39D] to-[#FEC6A1] text-white hover:opacity-90 font-semibold shadow-lg"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ouvrir en plein écran
              </Button>
              
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="w-full px-4 py-3 bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copier le lien
              </Button>

              <Button
                onClick={handleRefresh}
                variant="outline"
                className="w-full px-4 py-3 bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">📍 Fonctionnalités de la carte :</h3>
            <div className="grid md:grid-cols-2 gap-4 text-white/90 text-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-300">🚌</span>
                  <span>Arrêts de bus</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-300">🚕</span>
                  <span>Arrêts de taxi</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-red-300">🚖</span>
                  <span>Taxi irrégulier</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-300">🗺️</span>
                  <span>Navigation interactive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInteractive;
