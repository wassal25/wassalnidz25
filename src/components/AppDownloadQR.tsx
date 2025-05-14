
import { Download, QrCode } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AppDownloadQRProps {
  qrImagePath: string;
}

const AppDownloadQR = ({ qrImagePath }: AppDownloadQRProps) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6">
      <div className="flex flex-col items-center sm:items-start">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <QrCode size={20} />
          {t('downloadApp')}
        </h3>
        <p className="text-gray-600 text-center sm:text-left mb-4">
          {t('scanToDownload')}
        </p>
        <a 
          href="#" 
          className="bg-gradient-to-r from-[#45B39D] to-[#FEC6A1] text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Download size={18} />
          {t('downloadNow')}
        </a>
      </div>
      
      <div className="flex-shrink-0 border-4 border-white bg-white rounded-lg shadow-md overflow-hidden">
        <img 
          src={qrImagePath} 
          alt="QR Code pour télécharger l'application" 
          className="w-32 h-32 object-contain"
        />
      </div>
    </div>
  );
};

export default AppDownloadQR;
