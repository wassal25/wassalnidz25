
import { useState } from "react";
import { UserCheck, Facebook } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import AuthBackground from "@/components/auth/AuthBackground";
import AuthContainer from "@/components/auth/AuthContainer";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";

/**
 * Page d'inscription pour les passagers
 */
const RegisterPassenger = () => {
  const { t } = useLanguage();
  const { signUp, signInWithProvider } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // États du formulaire
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: ""
  });

  // Gestion des changements de formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Vérifier que les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      alert(t('passwordMismatch'));
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(formData.email, formData.password, {
        full_name: formData.name,
        user_type: "passenger",
        phone_number: formData.phone,
        address: formData.address
      });
      // La redirection est gérée dans le contexte d'authentification
    } catch (error) {
      console.error("Erreur d'inscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'facebook') => {
    await signInWithProvider(provider);
  };

  return (
    <AuthBackground>
      <AuthContainer 
        title="WASSALNI" 
        subtitle={t('passengerRegistration')}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            id="name"
            label={t('fullName')}
            type="text"
            placeholder={t('namePlaceholder')}
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder={t('emailPlaceholder')}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <FormField
            id="phone"
            label={t('phoneNumber')}
            type="tel"
            placeholder={t('phoneNumberPlaceholder')}
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <FormField
            id="address"
            label={t('address')}
            type="text"
            placeholder={t('addressPlaceholder')}
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <FormField
            id="password"
            label={t('password')}
            type="password"
            placeholder={t('createPassword')}
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <FormField
            id="confirmPassword"
            label={t('confirmPassword')}
            type="password"
            placeholder={t('confirmPasswordPlaceholder')}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          
          <SubmitButton>
            <UserCheck className="mr-2 w-5 h-5" />
            {isLoading ? t('registering') : t('register')}
          </SubmitButton>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#45B39D]/20 text-white/80">{t('orContinueWith')}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialSignup('google')}
              className="py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialSignup('facebook')}
              className="py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
            >
              <Facebook className="w-5 h-5 mr-2" />
              Facebook
            </button>
          </div>
          
          <p className="text-center text-white/90 mt-4">
            {t('alreadyHaveAccount')}{" "}
            <a href="/login" className="text-white hover:underline font-medium">
              {t('login')}
            </a>
          </p>
        </form>
      </AuthContainer>
    </AuthBackground>
  );
};

export default RegisterPassenger;
