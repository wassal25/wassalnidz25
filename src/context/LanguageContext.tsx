
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create translations object
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // French translations
    settings: 'Paramètres',
    back: 'Retour',
    themeAndAppearance: 'Thème et apparence',
    darkMode: 'Mode sombre',
    textSize: 'Taille du texte',
    small: 'Petit',
    medium: 'Moyen',
    large: 'Grand',
    notifications: 'Notifications',
    generalNotifications: 'Notifications générales',
    driverNotifications: 'Notifications chauffeur',
    receiveNotifications: 'Recevez une notification lorsqu\'un chauffeur accepte votre réservation',
    autoAcceptTrips: 'Auto-acceptation des trajets',
    autoAcceptDescription: 'Accepter automatiquement les trajets qui correspondent à vos critères',
    languageAndRegion: 'Langue et région',
    language: 'Langue',
    region: 'Région',
    timeFormat: 'Format de l\'heure',
    hour24: '24 heures',
    hour12: '12 heures (AM/PM)',
    paymentAndSecurity: 'Paiement et sécurité',
    savePaymentInfo: 'Sauvegarder les infos de paiement',
    secureStorage: 'Stockez vos informations de paiement de manière sécurisée',
    managePaymentMethods: 'Gérer les méthodes de paiement',
    viewTransactionHistory: 'Voir l\'historique des transactions',
    vehicles: 'Véhicules',
    active: 'Actif',
    addVehicle: 'Ajouter un véhicule',
    supportAndHelp: 'Support et aide',
    helpCenter: 'Centre d\'aide',
    contactSupport: 'Contacter le support',
    callCustomerService: 'Appeler le service clientèle',
    about: 'À propos de Wassalni',
    rideSharingApp: 'Application de covoiturage',
    version: 'Version',
    termsOfUse: 'Conditions d\'utilisation',
    privacyPolicy: 'Politique de confidentialité',
    editProfile: 'Modifier le profil',
    supabaseConnection: 'Connexion à Supabase',
    connectToSupabase: 'Connecter à Supabase',
    supabaseProjectId: 'ID du projet Supabase',
    supabaseApiKey: 'Clé API Supabase',
  },
  ar: {
    // Arabic translations
    settings: 'الإعدادات',
    back: 'رجوع',
    themeAndAppearance: 'المظهر والسمة',
    darkMode: 'الوضع الداكن',
    textSize: 'حجم النص',
    small: 'صغير',
    medium: 'متوسط',
    large: 'كبير',
    notifications: 'الإشعارات',
    generalNotifications: 'الإشعارات العامة',
    driverNotifications: 'إشعارات السائق',
    receiveNotifications: 'تلقي إشعار عندما يقبل سائق حجزك',
    autoAcceptTrips: 'القبول التلقائي للرحلات',
    autoAcceptDescription: 'قبول الرحلات التي تتوافق مع معاييرك تلقائيًا',
    languageAndRegion: 'اللغة والمنطقة',
    language: 'اللغة',
    region: 'المنطقة',
    timeFormat: 'تنسيق الوقت',
    hour24: '24 ساعة',
    hour12: '12 ساعة (صباحًا/مساءً)',
    paymentAndSecurity: 'الدفع والأمان',
    savePaymentInfo: 'حفظ معلومات الدفع',
    secureStorage: 'تخزين معلومات الدفع الخاصة بك بشكل آمن',
    managePaymentMethods: 'إدارة طرق الدفع',
    viewTransactionHistory: 'عرض سجل المعاملات',
    vehicles: 'المركبات',
    active: 'نشط',
    addVehicle: 'إضافة مركبة',
    supportAndHelp: 'الدعم والمساعدة',
    helpCenter: 'مركز المساعدة',
    contactSupport: 'الاتصال بالدعم',
    callCustomerService: 'الاتصال بخدمة العملاء',
    about: 'حول وصلني',
    rideSharingApp: 'تطبيق مشاركة الركوب',
    version: 'الإصدار',
    termsOfUse: 'شروط الاستخدام',
    privacyPolicy: 'سياسة الخصوصية',
    editProfile: 'تعديل الملف الشخصي',
    supabaseConnection: 'الاتصال بـ Supabase',
    connectToSupabase: 'الاتصال بـ Supabase',
    supabaseProjectId: 'معرف مشروع Supabase',
    supabaseApiKey: 'مفتاح API لـ Supabase',
  },
  en: {
    // English translations
    settings: 'Settings',
    back: 'Back',
    themeAndAppearance: 'Theme and Appearance',
    darkMode: 'Dark Mode',
    textSize: 'Text Size',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    notifications: 'Notifications',
    generalNotifications: 'General Notifications',
    driverNotifications: 'Driver Notifications',
    receiveNotifications: 'Receive a notification when a driver accepts your reservation',
    autoAcceptTrips: 'Auto-accept Trips',
    autoAcceptDescription: 'Automatically accept trips that match your criteria',
    languageAndRegion: 'Language and Region',
    language: 'Language',
    region: 'Region',
    timeFormat: 'Time Format',
    hour24: '24 hours',
    hour12: '12 hours (AM/PM)',
    paymentAndSecurity: 'Payment and Security',
    savePaymentInfo: 'Save Payment Information',
    secureStorage: 'Store your payment information securely',
    managePaymentMethods: 'Manage Payment Methods',
    viewTransactionHistory: 'View Transaction History',
    vehicles: 'Vehicles',
    active: 'Active',
    addVehicle: 'Add Vehicle',
    supportAndHelp: 'Support and Help',
    helpCenter: 'Help Center',
    contactSupport: 'Contact Support',
    callCustomerService: 'Call Customer Service',
    about: 'About Wassalni',
    rideSharingApp: 'Ride Sharing Application',
    version: 'Version',
    termsOfUse: 'Terms of Use',
    privacyPolicy: 'Privacy Policy',
    editProfile: 'Edit Profile',
    supabaseConnection: 'Supabase Connection',
    connectToSupabase: 'Connect to Supabase',
    supabaseProjectId: 'Supabase Project ID',
    supabaseApiKey: 'Supabase API Key',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'fr',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check if language preference is saved in localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'fr';
  });

  // Effect to save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    
    // Set direction based on language
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
