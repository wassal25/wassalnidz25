
import { useState } from "react";
import { UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import AuthBackground from "@/components/auth/AuthBackground";
import AuthContainer from "@/components/auth/AuthContainer";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";

/**
 * Page d'inscription pour les passagers
 */
const RegisterPassenger = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simuler une inscription réussie
    toast.success(t('registerSuccess'), {
      description: t('registerSuccessMessage'),
      position: "top-center",
      duration: 4000,
      style: {
        background: "linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)",
        color: "white",
        border: "none"
      }
    });
    
    // Rediriger vers la page de connexion
    setTimeout(() => navigate('/login'), 2000);
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
            required
          />
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder={t('emailPlaceholder')}
            required
          />
          <FormField
            id="phone"
            label={t('phoneNumber')}
            type="tel"
            placeholder={t('phoneNumberPlaceholder')}
            required
          />
          <FormField
            id="address"
            label={t('address')}
            type="text"
            placeholder={t('addressPlaceholder')}
            required
          />
          <FormField
            id="password"
            label={t('password')}
            type="password"
            placeholder={t('createPassword')}
            required
          />
          <FormField
            id="confirmPassword"
            label={t('confirmPassword')}
            type="password"
            placeholder={t('confirmPasswordPlaceholder')}
            required
          />
          
          <SubmitButton>
            <UserCheck className="mr-2 w-5 h-5" />
            {t('register')}
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
