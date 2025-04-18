
import { useState } from "react";
import { Car, User, Facebook, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth/useAuth";
import AuthBackground from "@/components/auth/AuthBackground";
import AuthContainer from "@/components/auth/AuthContainer";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";

/**
 * Page de connexion utilisateur
 */
const Login = () => {
  const [userType, setUserType] = useState<'passenger' | 'driver'>('passenger');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { signIn, signInWithProvider } = useAuth();

  // Get redirect URL from query parameters if it exists
  const query = new URLSearchParams(location.search);
  const redirectTo = query.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      // Navigate to the redirect URL after successful login
      navigate(redirectTo);
    } catch (error) {
      console.error("Erreur de connexion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    await signInWithProvider(provider);
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
            type="button"
            aria-pressed={userType === 'passenger'}
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
            type="button"
            aria-pressed={userType === 'driver'}
          >
            <Car className="mr-2 w-4 h-4" />
            {t('driver')}
          </button>
        </div>

        {/* Redirection message if applicable */}
        {redirectTo !== '/' && (
          <div className="mb-4 p-3 bg-white/10 rounded-lg text-white/90 text-sm">
            Vous devez vous connecter pour accéder à la page demandée.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder={t('emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormField
            id="password"
            label={t('password')}
            type="password"
            placeholder={t('passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          
          <SubmitButton isLoading={isLoading}>
            <Mail className="mr-2 w-4 h-4" />
            {isLoading ? "Connexion..." : t('login')}
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
              onClick={() => handleSocialLogin('google')}
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
              onClick={() => handleSocialLogin('facebook')}
              className="py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
            >
              <Facebook className="w-5 h-5 mr-2" />
              Facebook
            </button>
          </div>
          
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
