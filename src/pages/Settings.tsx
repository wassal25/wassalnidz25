
// =======================================================
// Page de paramètres
// Description: Permet aux utilisateurs de configurer l'application
// =======================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  Clock
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  
  // États pour les différentes options de paramètres
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [driverNotificationsEnabled, setDriverNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("fr");
  const [savePaymentInfo, setSavePaymentInfo] = useState(false);
  const [region, setRegion] = useState("constantine");
  const [autoAcceptTrips, setAutoAcceptTrips] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500/80 to-teal-600/90 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        {/* En-tête de la page */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="text-white/80 hover:text-white flex items-center transition-colors"
          >
            <ChevronLeft size={20} className="mr-1" />
            Retour
          </button>
          <h1 className="text-3xl font-bold text-white mx-auto pr-10">
            Paramètres
          </h1>
        </div>
        
        {/* Conteneur principal */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-12 max-w-4xl mx-auto shadow-xl animate-fade-up border border-white/20">
          {/* Photo de profil et informations utilisateur */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#FEC6A1]/30 to-[#45B39D]/30 flex items-center justify-center mb-4 border-2 border-white/30">
              <User className="text-white" size={48} />
            </div>
            <h2 className="text-xl font-bold text-white">Utilisateur Wassalni</h2>
            <p className="text-white/70">utilisateur@example.com</p>
            <button className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300">
              Modifier le profil
            </button>
          </div>
          
          {/* Section thème et apparence */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Sun className="mr-2" size={18} />
              Thème et apparence
            </h3>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <label className="text-white/90">Mode sombre</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="dark-mode"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    className="opacity-0 w-0 h-0"
                  />
                  <label 
                    htmlFor="dark-mode"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${darkMode ? 'bg-teal-500' : 'bg-gray-400'}`}
                  >
                    <span className={`absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${darkMode ? 'transform translate-x-6' : ''}`}></span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="text-white/90 block mb-2">Taille du texte</label>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  step="1" 
                  defaultValue="2"
                  className="w-full" 
                />
                <div className="flex justify-between text-white/70 text-xs">
                  <span>Petit</span>
                  <span>Moyen</span>
                  <span>Grand</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section notifications */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Bell className="mr-2" size={18} />
              Notifications
            </h3>
            <div className="bg-white/5 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-white/90">Notifications générales</label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    className="opacity-0 w-0 h-0"
                  />
                  <label 
                    htmlFor="notifications"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${notificationsEnabled ? 'bg-teal-500' : 'bg-gray-400'}`}
                  >
                    <span className={`absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${notificationsEnabled ? 'transform translate-x-6' : ''}`}></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white/90 block">Notifications chauffeur</label>
                  <span className="text-white/50 text-xs">Recevez une notification lorsqu'un chauffeur accepte votre réservation</span>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="driver-notifications"
                    checked={driverNotificationsEnabled}
                    onChange={() => setDriverNotificationsEnabled(!driverNotificationsEnabled)}
                    className="opacity-0 w-0 h-0"
                  />
                  <label 
                    htmlFor="driver-notifications"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${driverNotificationsEnabled ? 'bg-teal-500' : 'bg-gray-400'}`}
                  >
                    <span className={`absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${driverNotificationsEnabled ? 'transform translate-x-6' : ''}`}></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white/90 block">Auto-acceptation des trajets</label>
                  <span className="text-white/50 text-xs">Accepter automatiquement les trajets qui correspondent à vos critères</span>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="auto-accept"
                    checked={autoAcceptTrips}
                    onChange={() => setAutoAcceptTrips(!autoAcceptTrips)}
                    className="opacity-0 w-0 h-0"
                  />
                  <label 
                    htmlFor="auto-accept"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${autoAcceptTrips ? 'bg-teal-500' : 'bg-gray-400'}`}
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
              Langue et région
            </h3>
            <div className="bg-white/5 rounded-xl p-4 space-y-4">
              <div>
                <label className="text-white/90 block mb-2">Langue</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none"
                >
                  <option value="fr">Français</option>
                  <option value="ar">Arabe</option>
                  <option value="en">Anglais</option>
                </select>
              </div>
              
              <div>
                <label className="text-white/90 block mb-2">Région</label>
                <select 
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none"
                >
                  <option value="constantine">Constantine</option>
                  <option value="alger">Alger</option>
                  <option value="oran">Oran</option>
                  <option value="annaba">Annaba</option>
                </select>
              </div>
              
              <div>
                <label className="text-white/90 block mb-2">Format de l'heure</label>
                <div className="flex space-x-4">
                  <label className="flex items-center text-white/90">
                    <input type="radio" name="time-format" defaultChecked className="mr-2" />
                    <span>24 heures</span>
                  </label>
                  <label className="flex items-center text-white/90">
                    <input type="radio" name="time-format" className="mr-2" />
                    <span>12 heures (AM/PM)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section paiement et sécurité */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Shield className="mr-2" size={18} />
              Paiement et sécurité
            </h3>
            <div className="bg-white/5 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white/90 block">Sauvegarder les infos de paiement</label>
                  <span className="text-white/50 text-xs">Stockez vos informations de paiement de manière sécurisée</span>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="save-payment"
                    checked={savePaymentInfo}
                    onChange={() => setSavePaymentInfo(!savePaymentInfo)}
                    className="opacity-0 w-0 h-0"
                  />
                  <label 
                    htmlFor="save-payment"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${savePaymentInfo ? 'bg-teal-500' : 'bg-gray-400'}`}
                  >
                    <span className={`absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${savePaymentInfo ? 'transform translate-x-6' : ''}`}></span>
                  </label>
                </div>
              </div>
              
              <div>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 flex items-center justify-center">
                  <CreditCard className="mr-2" size={18} />
                  Gérer les méthodes de paiement
                </button>
              </div>
              
              <div>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 flex items-center justify-center">
                  <Clock className="mr-2" size={18} />
                  Voir l'historique des transactions
                </button>
              </div>
            </div>
          </div>
          
          {/* Section véhicules (pour les chauffeurs) */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Car className="mr-2" size={18} />
              Véhicules
            </h3>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-white font-medium">Renault Symbol</h4>
                  <p className="text-white/50 text-sm">123 ABC 25</p>
                </div>
                <div className="flex items-center">
                  <span className="text-white/70 text-sm bg-teal-500/20 px-2 py-1 rounded mr-2">Actif</span>
                  <button className="text-white/70 hover:text-white transition-colors">
                    <Truck size={18} />
                  </button>
                </div>
              </div>
              <button className="w-full py-2 bg-gradient-to-r from-[#FEC6A1]/50 to-[#45B39D]/50 hover:from-[#FEC6A1]/60 hover:to-[#45B39D]/60 text-white rounded-xl transition-all duration-300">
                Ajouter un véhicule
              </button>
            </div>
          </div>
          
          {/* Section support */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <HelpCircle className="mr-2" size={18} />
              Support et aide
            </h3>
            <div className="bg-white/5 rounded-xl p-4 space-y-4">
              <div>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 flex items-center justify-center">
                  <HelpCircle className="mr-2" size={18} />
                  Centre d'aide
                </button>
              </div>
              
              <div>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 flex items-center justify-center">
                  <Mail className="mr-2" size={18} />
                  Contacter le support
                </button>
              </div>
              
              <div>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 flex items-center justify-center">
                  <Phone className="mr-2" size={18} />
                  Appeler le service clientèle
                </button>
              </div>
            </div>
          </div>
          
          {/* Section à propos */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <MapPin className="mr-2" size={18} />
              À propos de Wassalni
            </h3>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <img 
                src="/lovable-uploads/f4bfb0ca-890b-4d1c-a6d4-4e02fc042ff9.png" 
                alt="Wassalni Logo" 
                className="h-16 mx-auto mb-2"
              />
              <h4 className="text-white font-bold text-xl mb-1">WASSALNI</h4>
              <p className="text-white/70 mb-3">Application de covoiturage</p>
              <p className="text-white/50 text-sm mb-2">Version 1.0.0</p>
              <div className="flex justify-center space-x-2 mt-4">
                <button className="px-4 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 text-sm">
                  Conditions d'utilisation
                </button>
                <button className="px-4 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 text-sm">
                  Politique de confidentialité
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
