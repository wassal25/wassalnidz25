
// =======================================================
// Fichier: LanguageContext.tsx
// Description: Contexte global pour la gestion de la langue (fr/ar/en)
// Fonctionnalité: Permet de changer la langue dans toute l'application et support RTL pour l'arabe
// =======================================================

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'ar' | 'en';

// Interface définissant les propriétés du contexte de langue
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Création des objets de traduction pour chaque langue
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
    // Navigation items
    home: 'Accueil',
    feedback: 'Feedback',
    login: 'Connexion',
    register: 'Inscription',
    aboutUs: 'À propos',
    contactUs: 'Contact',
    // Footer items
    aboutCompany: 'À propos',
    usefulLinks: 'Liens utiles',
    howItWorks: 'Comment ça marche',
    faq: 'FAQ',
    contactInfo: 'Contact',
    email: 'Email',
    phone: 'Téléphone',
    address: 'Adresse',
    copyright: 'Tous droits réservés'
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
    // Navigation items
    home: 'الرئيسية',
    feedback: 'تعليقات',
    login: 'تسجيل الدخول',
    register: 'تسجيل',
    aboutUs: 'من نحن',
    contactUs: 'اتصل بنا',
    // Footer items
    aboutCompany: 'عن الشركة',
    usefulLinks: 'روابط مفيدة',
    howItWorks: 'كيف يعمل',
    faq: 'الأسئلة الشائعة',
    contactInfo: 'معلومات الاتصال',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    address: 'العنوان',
    copyright: 'جميع الحقوق محفوظة'
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
    // Navigation items
    home: 'Home',
    feedback: 'Feedback',
    login: 'Login',
    register: 'Register',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    // Footer items
    aboutCompany: 'About',
    usefulLinks: 'Useful Links',
    howItWorks: 'How It Works',
    faq: 'FAQ',
    contactInfo: 'Contact',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    copyright: 'All rights reserved'
  }
};

// Création du contexte avec des valeurs par défaut
const LanguageContext = createContext<LanguageContextType>({
  language: 'fr',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Hook personnalisé pour utiliser le contexte de langue
export const useLanguage = () => useContext(LanguageContext);

/**
 * Composant Provider pour la langue
 * Gère l'état de la langue et l'applique à l'ensemble du document
 * Persiste le choix dans localStorage et configure la direction du texte (RTL/LTR)
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Vérifier si une préférence de langue est sauvegardée dans localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'fr';
  });

  // Effet pour appliquer les changements de langue au document
  useEffect(() => {
    // Sauvegarder la préférence de langue dans localStorage
    localStorage.setItem('language', language);
    
    // Définir la direction en fonction de la langue (RTL pour l'arabe)
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
    }

    // Définir l'attribut lang sur html
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Fonction de traduction
  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
