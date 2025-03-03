
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
    addressLabel: 'Adresse',
    copyright: 'Tous droits réservés',
    // Index page
    travelTogether: 'Voyagez ensemble dans la wilaya de Constantine',
    clickToLearnMore: 'Cliquez pour en savoir plus sur notre service',
    searchTrip: 'Rechercher un trajet',
    findTrip: 'Trouvez un trajet qui correspond à vos besoins',
    departureLocation: 'Lieu de départ',
    destination: 'Destination',
    departureDate: 'Date de départ',
    departureTime: 'Heure de départ',
    reset: 'Réinitialiser',
    search: 'Rechercher',
    noTripsFound: 'Aucun trajet ne correspond à votre recherche.',
    clickToCreateTrip: 'Cliquez ici pour proposer un nouveau trajet.',
    discoverMap: 'Découvrez nos trajets sur la carte',
    backToHome: 'Retour à l\'accueil',
    searchPlace: 'Rechercher un lieu...',
    availableTripsMap: 'Carte des trajets disponibles',
    offerTrip: 'Proposer un trajet',
    backToResults: 'Retour aux résultats',
    // Authentication
    emailPlaceholder: 'Entrez votre email',
    passwordPlaceholder: 'Entrez votre mot de passe',
    confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
    joinWassalni: 'Rejoignez WASSALNI',
    createAccount: 'Créez votre compte et commencez à voyager',
    fullName: 'Nom complet',
    namePlaceholder: 'Entrez votre nom',
    createPassword: 'Créez votre mot de passe',
    alreadyHaveAccount: 'Vous avez déjà un compte ?',
    doNotHaveAccount: 'Vous n\'avez pas de compte ?',
    registerAsPassenger: 'S\'inscrire en tant que passager',
    registerAsDriver: 'S\'inscrire en tant que chauffeur',
    travelSafely: 'Voyagez ensemble, en toute sécurité',
    rememberMe: 'Se souvenir de moi',
    forgotPassword: 'Mot de passe oublié ?',
    passenger: 'Passager',
    driver: 'Chauffeur',
    registerSuccess: 'Inscription réussie!',
    registerSuccessMessage: 'Votre compte a été créé avec succès. Vous allez être redirigé vers la page de connexion.',
    loginSuccess: 'Connexion réussie!',
    loginSuccessMessage: 'Bienvenue sur Wassalni. Vous allez être redirigé vers la page d\'accueil.',
    // Driver registration
    driverRegistration: 'Inscription Chauffeur',
    licenseNumber: 'Numéro de permis de conduire',
    vehicleBrand: 'Marque du véhicule',
    vehicleModel: 'Modèle du véhicule',
    registrationNumber: 'Numéro d\'immatriculation',
    profilePicture: 'Photo de profil',
    vehiclePicture: 'Photo du véhicule',
    upload: 'Télécharger',
    previous: 'Précédent',
    next: 'Suivant',
    // Passenger registration
    passengerRegistration: 'Inscription Passager',
    phoneNumber: 'Numéro de téléphone',
    phoneNumberPlaceholder: 'Entrez votre numéro',
    addressField: 'Adresse',
    addressPlaceholder: 'Entrez votre adresse',
    availableTrips: 'Trajets disponibles',
    // Feedback page translations
    feedbackFormTitle: 'Formulaire de feedback',
    feedbackType: 'Type de feedback',
    suggestionOption: 'Suggestion d\'amélioration',
    problemOption: 'Signalement de problème',
    complaintOption: 'Réclamation',
    appreciationOption: 'Appréciation',
    otherOption: 'Autre',
    yourOpinionMatters: 'Votre opinion compte',
    feedbackDescription: 'Chez Wassalni, nous accordons une grande importance à l\'expérience de nos utilisateurs. Vos commentaires nous aident à améliorer constamment notre service de covoiturage.',
    communicateWithUs: 'Communiquez avec nous',
    shareIdeas: 'Partagez vos idées, suggestions ou préoccupations',
    reactiveSupport: 'Support réactif',
    quickResponse: 'Notre équipe vous répondra dans les plus brefs délais',
    ourTeamListening: 'Notre équipe à votre écoute',
    teamDescription: 'Nous sommes là pour vous accompagner et améliorer votre expérience',
    suggestions: 'Suggestions:',
    yourMessage: 'Votre message',
    messagePlaceholder: 'Décrivez votre feedback ici...',
    sendFeedback: 'Envoyer votre feedback',
    requiredFieldsError: 'Veuillez remplir tous les champs obligatoires.',
    feedbackSuccess: 'Votre feedback a été envoyé avec succès! Merci pour votre contribution.',
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
    feedback: 'التعليقات',
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
    addressLabel: 'العنوان',
    copyright: 'جميع الحقوق محفوظة',
    // Index page
    travelTogether: 'سافروا معًا في ولاية قسنطينة',
    clickToLearnMore: 'انقر لمعرفة المزيد عن خدمتنا',
    searchTrip: 'البحث عن رحلة',
    findTrip: 'ابحث عن رحلة تناسب احتياجاتك',
    departureLocation: 'مكان المغادرة',
    destination: 'الوجهة',
    departureDate: 'تاريخ المغادرة',
    departureTime: 'وقت المغادرة',
    reset: 'إعادة تعيين',
    search: 'بحث',
    noTripsFound: 'لا توجد رحلات تطابق بحثك.',
    clickToCreateTrip: 'انقر هنا لاقتراح رحلة جديدة.',
    discoverMap: 'اكتشف رحلاتنا على الخريطة',
    backToHome: 'العودة إلى الصفحة الرئيسية',
    searchPlace: 'البحث عن مكان...',
    availableTripsMap: 'خريطة الرحلات المتاحة',
    offerTrip: 'اقتراح رحلة',
    backToResults: 'العودة إلى النتائج',
    // Authentication
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    passwordPlaceholder: 'أدخل كلمة المرور',
    confirmPasswordPlaceholder: 'تأكيد كلمة المرور',
    joinWassalni: 'انضم إلى وصلني',
    createAccount: 'أنشئ حسابك وابدأ السفر',
    fullName: 'الاسم الكامل',
    namePlaceholder: 'أدخل اسمك',
    createPassword: 'إنشاء كلمة مرور',
    alreadyHaveAccount: 'هل لديك حساب بالفعل؟',
    doNotHaveAccount: 'ليس لديك حساب؟',
    registerAsPassenger: 'التسجيل كراكب',
    registerAsDriver: 'التسجيل كسائق',
    travelSafely: 'سافروا معًا، بأمان',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    passenger: 'راكب',
    driver: 'سائق',
    registerSuccess: 'تم التسجيل بنجاح!',
    registerSuccessMessage: 'تم إنشاء حسابك بنجاح. سيتم توجيهك إلى صفحة تسجيل الدخول.',
    loginSuccess: 'تم تسجيل الدخول بنجاح!',
    loginSuccessMessage: 'مرحبًا بك في وصلني. سيتم توجيهك إلى الصفحة الرئيسية.',
    // Driver registration
    driverRegistration: 'تسجيل السائق',
    licenseNumber: 'رقم رخصة القيادة',
    vehicleBrand: 'ماركة السيارة',
    vehicleModel: 'موديل السيارة',
    registrationNumber: 'رقم التسجيل',
    profilePicture: 'صورة الملف الشخصي',
    vehiclePicture: 'صورة السيارة',
    upload: 'تحميل',
    previous: 'السابق',
    next: 'التالي',
    // Passenger registration
    passengerRegistration: 'تسجيل الراكب',
    phoneNumber: 'رقم الهاتف',
    phoneNumberPlaceholder: 'أدخل رقمك',
    addressField: 'العنوان',
    addressPlaceholder: 'أدخل عنوانك',
    availableTrips: 'الرحلات المتاحة',
    // Feedback page translations
    feedbackFormTitle: 'نموذج التعليقات',
    feedbackType: 'نوع التعليق',
    suggestionOption: 'اقتراح للتحسين',
    problemOption: 'الإبلاغ عن مشكلة',
    complaintOption: 'شكوى',
    appreciationOption: 'تقدير',
    otherOption: 'أخرى',
    yourOpinionMatters: 'رأيك يهمنا',
    feedbackDescription: 'في وصلني، نولي أهمية كبيرة لتجربة مستخدمينا. تعليقاتك تساعدنا على تحسين خدمة مشاركة الركوب باستمرار.',
    communicateWithUs: 'تواصل معنا',
    shareIdeas: 'شارك أفكارك واقتراحاتك أو مخاوفك',
    reactiveSupport: 'دعم متفاعل',
    quickResponse: 'سيرد فريقنا في أقرب وقت ممكن',
    ourTeamListening: 'فريقنا يستمع إليك',
    teamDescription: 'نحن هنا لمساعدتك وتحسين تجربتك',
    suggestions: 'اقتراحات:',
    yourMessage: 'رسالتك',
    messagePlaceholder: 'اكتب تعليقك هنا...',
    sendFeedback: 'إرسال التعليق',
    requiredFieldsError: 'يرجى ملء جميع الحقول المطلوبة.',
    feedbackSuccess: 'تم إرسال تعليقك بنجاح! شكرًا على مساهمتك.',
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
    addressLabel: 'Address',
    copyright: 'All rights reserved',
    // Index page
    travelTogether: 'Travel together in Constantine',
    clickToLearnMore: 'Click to learn more about our service',
    searchTrip: 'Search for a trip',
    findTrip: 'Find a trip that matches your needs',
    departureLocation: 'Departure location',
    destination: 'Destination',
    departureDate: 'Departure date',
    departureTime: 'Departure time',
    reset: 'Reset',
    search: 'Search',
    noTripsFound: 'No trips match your search.',
    clickToCreateTrip: 'Click here to offer a new trip.',
    discoverMap: 'Discover our trips on the map',
    backToHome: 'Back to home',
    searchPlace: 'Search for a place...',
    availableTripsMap: 'Available trips map',
    offerTrip: 'Offer a trip',
    backToResults: 'Back to results',
    // Authentication
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    confirmPasswordPlaceholder: 'Confirm your password',
    joinWassalni: 'Join WASSALNI',
    createAccount: 'Create your account and start traveling',
    fullName: 'Full name',
    namePlaceholder: 'Enter your name',
    createPassword: 'Create your password',
    alreadyHaveAccount: 'Already have an account?',
    doNotHaveAccount: 'Don\'t have an account?',
    registerAsPassenger: 'Register as passenger',
    registerAsDriver: 'Register as driver',
    travelSafely: 'Travel together, safely',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    passenger: 'Passenger',
    driver: 'Driver',
    registerSuccess: 'Registration successful!',
    registerSuccessMessage: 'Your account has been created successfully. You will be redirected to the login page.',
    loginSuccess: 'Login successful!',
    loginSuccessMessage: 'Welcome to Wassalni. You will be redirected to the home page.',
    // Driver registration
    driverRegistration: 'Driver Registration',
    licenseNumber: 'Driver\'s license number',
    vehicleBrand: 'Vehicle brand',
    vehicleModel: 'Vehicle model',
    registrationNumber: 'Registration number',
    profilePicture: 'Profile picture',
    vehiclePicture: 'Vehicle picture',
    upload: 'Upload',
    previous: 'Previous',
    next: 'Next',
    // Passenger registration
    passengerRegistration: 'Passenger Registration',
    phoneNumber: 'Phone number',
    phoneNumberPlaceholder: 'Enter your number',
    addressField: 'Address',
    addressPlaceholder: 'Enter your address',
    availableTrips: 'Available trips',
    // Feedback page translations
    feedbackFormTitle: 'Feedback Form',
    feedbackType: 'Feedback Type',
    suggestionOption: 'Improvement Suggestion',
    problemOption: 'Problem Report',
    complaintOption: 'Complaint',
    appreciationOption: 'Appreciation',
    otherOption: 'Other',
    yourOpinionMatters: 'Your Opinion Matters',
    feedbackDescription: 'At Wassalni, we place great importance on the experience of our users. Your comments help us to constantly improve our carpooling service.',
    communicateWithUs: 'Communicate with us',
    shareIdeas: 'Share your ideas, suggestions or concerns',
    reactiveSupport: 'Responsive Support',
    quickResponse: 'Our team will respond to you as soon as possible',
    ourTeamListening: 'Our team is here for you',
    teamDescription: 'We are here to help you and improve your experience',
    suggestions: 'Suggestions:',
    yourMessage: 'Your message',
    messagePlaceholder: 'Describe your feedback here...',
    sendFeedback: 'Send your feedback',
    requiredFieldsError: 'Please fill in all required fields.',
    feedbackSuccess: 'Your feedback has been sent successfully! Thank you for your contribution.',
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
