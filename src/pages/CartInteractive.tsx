
import { useLanguage } from "@/context/LanguageContext";

/**
 * Page Cart Interactive - Accès à la carte interactive locale
 * 
 * Cette page fournit différentes méthodes pour accéder à la carte interactive
 * hébergée localement.
 */
const CartInteractive = () => {
  const { t } = useLanguage();

  const mapPath = "file:///C:/Users/User/AppData/Local/Temp/qgis2web/qgis2web_2025_06_10-21_05_38_996880/index.html";

  const handleOpenInNewTab = () => {
    // Essayer d'ouvrir dans un nouvel onglet
    const newWindow = window.open(mapPath, '_blank');
    if (!newWindow) {
      // Si bloqué par le navigateur, copier dans le presse-papier
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
        
        {/* Méthodes d'accès à la carte */}
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Bouton principal pour ouvrir la carte */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold text-white mb-4">Ouvrir la Carte Interactive</h2>
            <button
              onClick={handleOpenInNewTab}
              className="px-8 py-4 bg-gradient-to-r from-[#45B39D] to-[#FEC6A1] text-white rounded-xl hover:opacity-90 transition-opacity text-lg font-semibold shadow-lg mb-4"
            >
              🗺️ Accéder à la Carte
            </button>
            <p className="text-white/70 text-sm">
              Cliquez pour ouvrir la carte dans un nouvel onglet ou copier le lien automatiquement
            </p>
          </div>

          {/* Instructions alternatives */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Instructions d'accès :</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex items-start space-x-3">
                <span className="bg-[#45B39D] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <p>Cliquez sur le bouton "Accéder à la Carte" ci-dessus</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-[#45B39D] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <p>Si la carte ne s'ouvre pas automatiquement, le lien sera copié dans votre presse-papier</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-[#45B39D] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <p>Collez le lien dans la barre d'adresse de votre navigateur et appuyez sur Entrée</p>
              </div>
            </div>
          </div>

          {/* Lien manuel */}
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

          {/* Informations complémentaires */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">ℹ️ Informations importantes :</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>• La carte est hébergée localement sur votre ordinateur</li>
              <li>• Assurez-vous que le fichier existe à l'emplacement indiqué</li>
              <li>• Certains navigateurs peuvent bloquer les fichiers locaux pour des raisons de sécurité</li>
              <li>• Si vous rencontrez des problèmes, essayez d'ouvrir le fichier directement depuis l'explorateur de fichiers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInteractive;
