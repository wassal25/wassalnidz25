
import { useState } from "react";
import { Car, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import AuthBackground from "@/components/auth/AuthBackground";
import AuthContainer from "@/components/auth/AuthContainer";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";

/**
 * Page de connexion utilisateur
 */
const Login = () => {
  const [userType, setUserType] = useState<'passenger' | 'driver'>('passenger');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simuler une connexion réussie
    toast.success(t('loginSuccess'), {
      description: t('loginSuccessMessage'),
      position: "top-center",
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)",
        color: "white",
        border: "none"
      }
    });
    
    // Rediriger vers la page d'accueil
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <AuthBackground>
      <AuthContainer 
        title="WASSALNI" 
        subtitle={t('travelSafely')}
      >
        {/* Sélecteur de type d'utilisateur */}
        <div className="flex bg-white/5 p-1 rounded-xl mb-8">
          <button
            className={`flex-1 py-2 rounded-lg flex items-center justify-center ${
              userType === 'passenger' 
                ? 'bg-gradient-to-r from-[#FEC6A1]/60 to-[#45B39D]/60 text-white' 
                : 'text-white/70 hover:text-white'
            } transition-all duration-300`}
            onClick={() => setUserType('passenger')}
          >
            <User className="mr-2 w-4 h-4" />
            {t('passenger')}
          </button>
          <button
            className={`flex-1 py-2 rounded-lg flex items-center justify-center ${
              userType === 'driver' 
                ? 'bg-gradient-to-r from-[#FEC6A1]/60 to-[#45B39D]/60 text-white' 
                : 'text-white/70 hover:text-white'
            } transition-all duration-300`}
            onClick={() => setUserType('driver')}
          >
            <Car className="mr-2 w-4 h-4" />
            {t('driver')}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder={t('passwordPlaceholder')}
            required
          />
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-white/90">
              <input type="checkbox" className="mr-2 rounded bg-white/10 border-white/20" />
              {t('rememberMe')}
            </label>
            <a href="#" className="text-white/90 hover:text-white transition-colors">
              {t('forgotPassword')}
            </a>
          </div>
          
          <SubmitButton>
            {t('login')}
          </SubmitButton>
          
          <p className="text-center text-white/90 mt-4">
            {t('doNotHaveAccount')}{" "}
            {userType === 'passenger' ? (
              <a href="/register-passenger" className="text-white hover:underline font-medium">
                {t('registerAsPassenger')}
              </a>
            ) : (
              <a href="/register-driver" className="text-white hover:underline font-medium">
                {t('registerAsDriver')}
              </a>
            )}
          </p>
        </form>
      </AuthContainer>
    </AuthBackground>
  );
};

export default Login;
