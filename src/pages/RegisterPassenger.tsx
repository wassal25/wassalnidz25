
import { useState } from "react";
import { UserCheck } from "lucide-react";
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
  const { signUp } = useAuth();
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
