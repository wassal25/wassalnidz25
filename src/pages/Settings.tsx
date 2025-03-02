
// =======================================================
// Page de paramètres
// Description: Permet aux utilisateurs de configurer l'application
// =======================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage, Language } from "@/context/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  Shield, 
  CreditCard, 
  User, 
  Car, 
  Truck, 
  ChevronLeft, 
  Languages, 
  MapPin, 
  Phone, 
  Mail, 
  HelpCircle,
  Clock,
  Database
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  
  // États pour les différentes options de paramètres
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [driverNotificationsEnabled, setDriverNotificationsEnabled] = useState(true);
  const [region, setRegion] = useState("constantine");
  const [autoAcceptTrips, setAutoAcceptTrips] = useState(false);
  const [savePaymentInfo, setSavePaymentInfo] = useState(false);
  const [textSize, setTextSize] = useState("2");
  const [timeFormat, setTimeFormat] = useState("24");
  
  // États pour Supabase
  const [supabaseProjectId, setSupabaseProjectId] = useState("");
  const [supabaseApiKey, setSupabaseApiKey] = useState("");
  const [isConnectedToSupabase, setIsConnectedToSupabase] = useState(false);

  // Effet pour charger les paramètres sauvegardés
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notificationsEnabled');
    const savedDriverNotifications = localStorage.getItem('driverNotificationsEnabled');
    const savedRegion = localStorage.getItem('region');
    const savedAutoAccept = localStorage.getItem('autoAcceptTrips');
    const savedPaymentInfo = localStorage.getItem('savePaymentInfo');
    const savedTextSize = localStorage.getItem('textSize');
    const savedTimeFormat = localStorage.getItem('timeFormat');
    const savedSupabaseProjectId = localStorage.getItem('supabaseProjectId');
    const savedSupabaseApiKey = localStorage.getItem('supabaseApiKey');
    const savedSupabaseConnection = localStorage.getItem('isConnectedToSupabase');
    
    if (savedNotifications) setNotificationsEnabled(savedNotifications === 'true');
    if (savedDriverNotifications) setDriverNotificationsEnabled(savedDriverNotifications === 'true');
    if (savedRegion) setRegion(savedRegion);
    if (savedAutoAccept) setAutoAcceptTrips(savedAutoAccept === 'true');
    if (savedPaymentInfo) setSavePaymentInfo(savedPaymentInfo === 'true');
    if (savedTextSize) setTextSize(savedTextSize);
    if (savedTimeFormat) setTimeFormat(savedTimeFormat);
    if (savedSupabaseProjectId) setSupabaseProjectId(savedSupabaseProjectId);
    if (savedSupabaseApiKey) setSupabaseApiKey(savedSupabaseApiKey);
    if (savedSupabaseConnection) setIsConnectedToSupabase(savedSupabaseConnection === 'true');
  }, []);

  // Fonction pour sauvegarder les paramètres dans localStorage
  const saveSettings = (key: string, value: string | boolean) => {
    localStorage.setItem(key, value.toString());
  };

  // Appliquer la taille du texte
  useEffect(() => {
    const sizes = {
      "1": "text-sm",
      "2": "text-base",
      "3": "text-lg"
    };
    
    document.documentElement.classList.remove("text-sm", "text-base", "text-lg");
    document.documentElement.classList.add(sizes[textSize as keyof typeof sizes]);
    saveSettings('textSize', textSize);
  }, [textSize]);

  // Gérer la connexion à Supabase
  const handleSupabaseConnection = () => {
    if (supabaseProjectId && supabaseApiKey) {
      // Simuler une connexion à Supabase
      setIsConnectedToSupabase(true);
      saveSettings('supabaseProjectId', supabaseProjectId);
      saveSettings('supabaseApiKey', supabaseApiKey);
      saveSettings('isConnectedToSupabase', 'true');
      
      toast({
        title: language === 'fr' ? "Connexion réussie" : language === 'ar' ? "تم الاتصال بنجاح" : "Connection successful",
        description: language === 'fr' ? "Votre projet Supabase est maintenant connecté" : 
                    language === 'ar' ? "تم توصيل مشروع Supabase الخاص بك الآن" : 
                    "Your Supabase project is now connected",
      });
    } else {
      toast({
        variant: "destructive",
        title: language === 'fr' ? "Erreur de connexion" : language === 'ar' ? "خطأ في الاتصال" : "Connection error",
        description: language === 'fr' ? "Veuillez remplir tous les champs" : 
                    language === 'ar' ? "يرجى ملء جميع الحقول" : 
                    "Please fill in all fields",
      });
    }
  };

  // Gérer le changement de langue
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  // Classes dynamiques pour s'adapter au thème sombre
  const bgClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-teal-500/80 to-teal-600/90 text-white';
  const cardBgClass = theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/10 border-white/20';
  const sectionBgClass = theme === 'dark' ? 'bg-gray-800/20' : 'bg-white/5';
  const buttonBgClass = theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-600/60' : 'bg-white/10 hover:bg-white/20';
  const gradientButtonClass = theme === 'dark' 
    ? 'bg-gradient-to-r from-gray-700/80 to-gray-600/80 hover:from-gray-700 hover:to-gray-600' 
    : 'bg-gradient-to-r from-[#FEC6A1]/50 to-[#45B39D]/50 hover:from-[#FEC6A1]/60 hover:to-[#45B39D]/60';
  const inputBgClass = theme === 'dark' ? 'bg-gray-700/50 border-gray-600/70' : 'bg-white/10 border-white/20';
  const toggleBgActive = theme === 'dark' ? 'bg-blue-600' : 'bg-teal-500';
  const toggleBgInactive = theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400';

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col`}>
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 flex-grow" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {/* En-tête de la page */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="text-white/80 hover:text-white flex items-center transition-colors"
          >
            <ChevronLeft size={20} className="mr-1" />
            {t('back')}
          </button>
          <h1 className="text-3xl font-bold text-white mx-auto pr-10">
            {t('settings')}
          </h1>
        </div>
        
        {/* Conteneur principal */}
        <div className={`${cardBgClass} backdrop-blur-sm rounded-2xl p-6 mb-12 max-w-4xl mx-auto shadow-xl animate-fade-up border`}>
          {/* Photo de profil et informations utilisateur */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#FEC6A1]/30 to-[#45B39D]/30 flex items-center justify-center mb-4 border-2 border-white/30">
              <User className="text-white" size={48} />
            </div>
            <h2 className="text-xl font-bold text-white">Utilisateur Wassalni</h2>
            <p className="text-white/70">utilisateur@example.com</p>
            <button className={`mt-4 px-6 py-2 ${buttonBgClass} text-white rounded-xl transition-all duration-300`}>
              {t('editProfile')}
            </button>
          </div>
          
          {/* Section Supabase */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Database className="mr-2" size={18} />
              {t('supabaseConnection')}
            </h3>
            <div className={`${sectionBgClass} rounded-xl p-4 space-y-4`}>
              {isConnectedToSupabase ? (
                <div className="flex flex-col items-center">
                  <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-lg mb-2">
                    {language === 'fr' ? "Connecté à Supabase" : language === 'ar' ? "متصل بـ Supabase" : "Connected to Supabase"}
                  </div>
                  <button 
                    onClick={() => {
                      setIsConnectedToSupabase(false);
                      saveSettings('isConnectedToSupabase', 'false');
                      toast({
                        title: language === 'fr' ? "Déconnexion réussie" : language === 'ar' ? "تم قطع الاتصال بنجاح" : "Disconnection successful",
                      });
                    }}
                    className={`w-full py-2 ${buttonBgClass} text-white rounded-xl transition-all duration-300 mt-2`}
                  >
                    {language === 'fr' ? "Déconnecter" : language === 'ar' ? "قطع الاتصال" : "Disconnect"}
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-white/90 block mb-2">{t('supabaseProjectId')}</label>
                    <input 
                      type="text" 
                      value={supabaseProjectId}
                      onChange={(e) => setSupabaseProjectId(e.target.value)}
                      className={`w-full px-4 py-2 ${inputBgClass} rounded-xl text-white focus:outline-none`}
                      placeholder="exemple: abcdefghijklmnopqrst"
                    />
                  </div>
                  <div>
                    <label className="text-white/90 block mb-2">{t('supabaseApiKey')}</label>
                    <input 
                      type="password" 
                      value={supabaseApiKey}
                      onChange={(e) => setSupabaseApiKey(e.target.value)}
                      className={`w-full px-4 py-2 ${inputBgClass} rounded-xl text-white focus:outline-none`}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    />
                  </div>
                  <button 
                    onClick={handleSupabaseConnection}
                    className={`w-full py-2 ${gradientButtonClass} text-white rounded-xl transition-all duration-300`}
                  >
                    {t('connectToSupabase')}
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* Section thème et apparence */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              {theme === 'dark' ? (
                <Moon className="mr-2" size={18} />
              ) : (
                <Sun className="mr-2" size={18} />
              )}
              {t('themeAndAppearance')}
            </h3>
            <div className={`${sectionBgClass} rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-4">
                <label className="text-white/90">{t('darkMode')}</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="dark-mode"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                    className="opacity-0 w-0 h-0"
                  />
                  <label 
                    htmlFor="dark-mode"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${theme === 'dark' ? toggleBgActive : toggleBgInactive}`}
                  >
                    <span className={`absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${theme === 'dark' ? 'transform translate-x-6' : ''}`}></span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="text-white/90 block mb-2">{t('textSize')}</label>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  step="1" 
                  value={textSize}
                  onChange={(e) => setTextSize(e.target.value)}
                  className="w-full" 
                />
                <div className="flex justify-between text-white/70 text-xs">
                  <span>{t('small')}</span>
                  <span>{t('medium')}</span>
                  <span>{t('large')}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section notifications */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Bell className="mr-2" size={18} />
              {t('notifications')}
            </h3>
            <div className={`${sectionBgClass} rounded-xl p-4 space-y-4`}>
              <div className="flex items-center justify-between">
                <label className="text-white/90">{t('generalNotifications')}</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={notificationsEnabled}
                    onChange={() => {
                      setNotificationsEnabled(!notificationsEnabled);
                      saveSettings('notificationsEnabled', !notificationsEnabled);
                    }}
                    className="opacity-0 w-0 h-0"
                  />
                  <label 
                    htmlFor="notifications"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${notificationsEnabled ? toggleBgActive : toggleBgInactive}`}
                  >
                    <span className={`absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${notificationsEnabled ? 'transform translate-x-6' : ''}`}></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white/90 block">{t('driverNotifications')}</label>
                  <span className="text-white/50 text-xs">{t('receiveNotifications')}</span>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="driver-notifications"
                    checked={driverNotificationsEnabled}
                    onChange={() => {
                      setDriverNotificationsEnabled(!driverNotificationsEnabled);
                      saveSettings('driverNotificationsEnabled', !driverNotificationsEnabled);
                    }}
                    className="opacity-0 w-0 h-0"
                  />
                  <label 
                    htmlFor="driver-notifications"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${driverNotificationsEnabled ? toggleBgActive : toggleBgInactive}`}
                  >
                    <span className={`absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${driverNotificationsEnabled ? 'transform translate-x-6' : ''}`}></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white/90 block">{t('autoAcceptTrips')}</label>
                  <span className="text-white/50 text-xs">{t('autoAcceptDescription')}</span>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="auto-accept"
                    checked={autoAcceptTrips}
                    onChange={() => {
                      setAutoAcceptTrips(!autoAcceptTrips);
                      saveSettings('autoAcceptTrips', !autoAcceptTrips);
                    }}
                    className="opacity-0 w-0 h-0"
                  />
                  <label 
                    htmlFor="auto-accept"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${autoAcceptTrips ? toggleBgActive : toggleBgInactive}`}
                  >
                    <span className={`absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${autoAcceptTrips ? 'transform translate-x-6' : ''}`}></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section langue et région */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Globe className="mr-2" size={18} />
              {t('languageAndRegion')}
            </h3>
            <div className={`${sectionBgClass} rounded-xl p-4 space-y-4`}>
              <div>
                <label className="text-white/90 block mb-2">{t('language')}</label>
                <select 
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as Language)}
                  className={`w-full px-4 py-2 ${inputBgClass} rounded-xl text-white focus:outline-none`}
                >
                  <option value="fr">Français</option>
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div>
                <label className="text-white/90 block mb-2">{t('region')}</label>
                <select 
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value);
                    saveSettings('region', e.target.value);
                  }}
                  className={`w-full px-4 py-2 ${inputBgClass} rounded-xl text-white focus:outline-none`}
                >
                  <option value="constantine">Constantine</option>
                  <option value="alger">Alger</option>
                  <option value="oran">Oran</option>
                  <option value="annaba">Annaba</option>
                </select>
              </div>
              
              <div>
                <label className="text-white/90 block mb-2">{t('timeFormat')}</label>
                <div className="flex space-x-4">
                  <label className="flex items-center text-white/90">
                    <input 
                      type="radio" 
                      name="time-format" 
                      value="24"
                      checked={timeFormat === "24"}
                      onChange={() => {
                        setTimeFormat("24");
                        saveSettings('timeFormat', "24");
                      }}
                      className="mr-2" 
                    />
                    <span>{t('hour24')}</span>
                  </label>
                  <label className="flex items-center text-white/90">
                    <input 
                      type="radio" 
                      name="time-format" 
                      value="12"
                      checked={timeFormat === "12"}
                      onChange={() => {
                        setTimeFormat("12");
                        saveSettings('timeFormat', "12");
                      }}
                      className="mr-2" 
                    />
                    <span>{t('hour12')}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section paiement et sécurité */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Shield className="mr-2" size={18} />
              {t('paymentAndSecurity')}
            </h3>
            <div className={`${sectionBgClass} rounded-xl p-4 space-y-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white/90 block">{t('savePaymentInfo')}</label>
                  <span className="text-white/50 text-xs">{t('secureStorage')}</span>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="save-payment"
                    checked={savePaymentInfo}
                    onChange={() => {
                      setSavePaymentInfo(!savePaymentInfo);
                      saveSettings('savePaymentInfo', !savePaymentInfo);
                    }}
                    className="opacity-0 w-0 h-0"
                  />
                  <label 
                    htmlFor="save-payment"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${savePaymentInfo ? toggleBgActive : toggleBgInactive}`}
                  >
                    <span className={`absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${savePaymentInfo ? 'transform translate-x-6' : ''}`}></span>
                  </label>
                </div>
              </div>
              
              <div>
                <button className={`w-full py-2 ${buttonBgClass} text-white rounded-xl transition-all duration-300 flex items-center justify-center`}>
                  <CreditCard className="mr-2" size={18} />
                  {t('managePaymentMethods')}
                </button>
              </div>
              
              <div>
                <button className={`w-full py-2 ${buttonBgClass} text-white rounded-xl transition-all duration-300 flex items-center justify-center`}>
                  <Clock className="mr-2" size={18} />
                  {t('viewTransactionHistory')}
                </button>
              </div>
            </div>
          </div>
          
          {/* Section véhicules (pour les chauffeurs) */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Car className="mr-2" size={18} />
              {t('vehicles')}
            </h3>
            <div className={`${sectionBgClass} rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-white font-medium">Renault Symbol</h4>
                  <p className="text-white/50 text-sm">123 ABC 25</p>
                </div>
                <div className="flex items-center">
                  <span className="text-white/70 text-sm bg-teal-500/20 px-2 py-1 rounded mr-2">{t('active')}</span>
                  <button className="text-white/70 hover:text-white transition-colors">
                    <Truck size={18} />
                  </button>
                </div>
              </div>
              <button className={`w-full py-2 ${gradientButtonClass} text-white rounded-xl transition-all duration-300`}>
                {t('addVehicle')}
              </button>
            </div>
          </div>
          
          {/* Section support */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <HelpCircle className="mr-2" size={18} />
              {t('supportAndHelp')}
            </h3>
            <div className={`${sectionBgClass} rounded-xl p-4 space-y-4`}>
              <div>
                <button className={`w-full py-2 ${buttonBgClass} text-white rounded-xl transition-all duration-300 flex items-center justify-center`}>
                  <HelpCircle className="mr-2" size={18} />
                  {t('helpCenter')}
                </button>
              </div>
              
              <div>
                <button className={`w-full py-2 ${buttonBgClass} text-white rounded-xl transition-all duration-300 flex items-center justify-center`}>
                  <Mail className="mr-2" size={18} />
                  {t('contactSupport')}
                </button>
              </div>
              
              <div>
                <button className={`w-full py-2 ${buttonBgClass} text-white rounded-xl transition-all duration-300 flex items-center justify-center`}>
                  <Phone className="mr-2" size={18} />
                  {t('callCustomerService')}
                </button>
              </div>
            </div>
          </div>
          
          {/* Section à propos */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <MapPin className="mr-2" size={18} />
              {t('about')}
            </h3>
            <div className={`${sectionBgClass} rounded-xl p-4 text-center`}>
              <img 
                src="/lovable-uploads/f4bfb0ca-890b-4d1c-a6d4-4e02fc042ff9.png" 
                alt="Wassalni Logo" 
                className="h-16 mx-auto mb-2"
              />
              <h4 className="text-white font-bold text-xl mb-1">WASSALNI</h4>
              <p className="text-white/70 mb-3">{t('rideSharingApp')}</p>
              <p className="text-white/50 text-sm mb-2">{t('version')} 1.0.0</p>
              <div className="flex justify-center space-x-2 mt-4">
                <button className={`px-4 py-1 ${buttonBgClass} text-white rounded-lg transition-all duration-300 text-sm`}>
                  {t('termsOfUse')}
                </button>
                <button className={`px-4 py-1 ${buttonBgClass} text-white rounded-lg transition-all duration-300 text-sm`}>
                  {t('privacyPolicy')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
