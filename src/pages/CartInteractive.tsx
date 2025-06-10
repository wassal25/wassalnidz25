
import { useLanguage } from "@/context/LanguageContext";

/**
 * Page Cart Interactive - Accès à la carte interactive locale
 * 
 * Cette page fournit différentes méthodes pour accéder à la carte interactive
 * hébergée localement.
 */
const CartInteractive = () => {
  const { t } = useLanguage();

  const mapPath = "qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html";

  const handleOpenMap = () => {
    // Essayer d'ouvrir la carte dans un nouvel onglet
    const newWindow = window.open(mapPath, '_blank');
    if (!newWindow) {
      // Si bloqué par le navigateur, afficher le lien pour copie manuelle
      navigator.clipboard.writeText(mapPath).then(() => {
        alert("Le lien a été copié dans le presse-papier. Collez-le dans la barre d'adresse de votre navigateur.");
      }).catch(() => {
        alert("Veuillez copier manuellement ce lien dans votre navigateur : " + mapPath);
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(mapPath).then(() => {
      alert("Lien copié dans le presse-papier !");
    }).catch(() => {
      alert("Impossible de copier automatiquement. Veuillez copier manuellement le lien ci-dessous.");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#45B39D]/80 to-[#FEC6A1]/50 flex flex-col">
      <div className="container mx-auto px-4 pt-20 pb-8 flex-grow">
        <div className="text-center text-white mb-8">
          <h1 className="text-3xl font-bold mb-4">Carte Interactive de Constantine</h1>
          <p className="text-lg mb-6">Accédez à la carte interactive pour visualiser les trajets disponibles</p>
        </div>
        
        {/* Tentative d'affichage direct de la carte */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">Carte Interactive</h2>
            <div className="w-full h-96 md:h-[600px] rounded-lg overflow-hidden bg-white/5 border border-white/20">
              <iframe
                src={mapPath}
                className="w-full h-full border-0"
                title="Carte Interactive de Constantine"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
            <p className="text-white/70 text-sm mt-2 text-center">
              Si la carte ne s'affiche pas, utilisez les options ci-dessous
            </p>
          </div>
        </div>

        {/* Méthodes d'accès alternatives */}
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Bouton principal pour ouvrir la carte */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold text-white mb-4">Ouvrir dans un Nouvel Onglet</h2>
            <button
              onClick={handleOpenMap}
              className="px-8 py-4 bg-gradient-to-r from-[#45B39D] to-[#FEC6A1] text-white rounded-xl hover:opacity-90 transition-opacity text-lg font-semibold shadow-lg mb-4"
            >
              🗺️ Ouvrir la Carte
            </button>
            <p className="text-white/70 text-sm">
              Cliquez pour ouvrir la carte dans un nouvel onglet
            </p>
          </div>

          {/* Lien direct */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Lien direct :</h3>
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-[#FEC6A1]/80 text-white rounded-lg hover:bg-[#FEC6A1] transition-colors text-sm"
              >
                📋 Copier le lien
              </button>
            </div>
            <div className="bg-black/20 rounded-lg p-3 break-all">
              <code className="text-white/60 text-xs">
                {mapPath}
              </code>
            </div>
            <p className="text-white/70 text-sm mt-2">
              Copiez ce lien et collez-le directement dans votre navigateur
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">📋 Instructions :</h3>
            <ol className="space-y-2 text-white/80 text-sm list-decimal list-inside">
              <li>La carte devrait s'afficher directement ci-dessus</li>
              <li>Si elle ne s'affiche pas, cliquez sur "Ouvrir la Carte" pour un nouvel onglet</li>
              <li>Vous pouvez aussi copier le lien et le coller dans votre navigateur</li>
              <li>Assurez-vous que le dossier qgis2web est dans le même répertoire que votre application</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInteractive;
