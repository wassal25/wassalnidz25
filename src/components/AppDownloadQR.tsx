
import { Download, QrCode } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

interface AppDownloadQRProps {
  qrImagePath: string;
}

const AppDownloadQR = ({ qrImagePath }: AppDownloadQRProps) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className="backdrop-blur-sm bg-gradient-to-r from-teal-600/20 to-teal-500/30 rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 border border-white/20">
      <div className="flex flex-col items-center sm:items-start">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <QrCode size={20} />
          {t('downloadApp')}
        </h3>
        <p className="text-gray-100 text-center sm:text-left mb-4">
          {t('scanToDownload')}
        </p>
        <a 
          href="https://gofile.io/d/obF8bQ" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-[#45B39D] to-[#FEC6A1] text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md"
        >
          <Download size={18} />
          {t('downloadNow')}
        </a>
      </div>
      
      <div className="flex-shrink-0 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#45B39D]/50 to-[#FEC6A1]/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-1"></div>
        <div className={`border-4 ${theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-white bg-gray-100'} rounded-lg shadow-lg overflow-hidden p-2`}>
          <img 
            src="/lovable-uploads/ae2fb072-5f36-4d52-a73a-c89f61ee2018.png" 
            alt={t('downloadApp')}
            className="w-32 h-32 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AppDownloadQR;
