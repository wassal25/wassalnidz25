
import { useState } from "react";
import { Car, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
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
  const { t } = useLanguage();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      // La redirection est gérée dans le contexte d'authentification
    } catch (error) {
      console.error("Erreur de connexion:", error);
    } finally {
      setIsLoading(false);
    }
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
          
          <SubmitButton>
            {isLoading ? "Connexion..." : t('login')}
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
