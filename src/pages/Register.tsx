
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import AuthBackground from "@/components/auth/AuthBackground";
import AuthContainer from "@/components/auth/AuthContainer";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";

/**
 * Page d'inscription générale
 */
const Register = () => {
  const { t } = useLanguage();
  
  return (
    <AuthBackground>
      <AuthContainer 
        title="WASSALNI" 
        subtitle={t('createAccount')}
      >
        <form className="space-y-6">
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
            {t('register')}
          </SubmitButton>
          
          <p className="text-center text-white/90 mt-4">
            {t('alreadyHaveAccount')}{" "}
            <Link to="/login" className="text-white hover:underline font-medium">
              {t('login')}
            </Link>
          </p>
        </form>
      </AuthContainer>
    </AuthBackground>
  );
};

export default Register;
