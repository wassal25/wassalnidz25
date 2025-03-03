import { useState } from "react";
import { Car, User, Home } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Home button - Added */}
      <Link 
        to="/" 
        className="absolute top-4 left-4 z-20 bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
        aria-label={t('returnToHome')}
      >
        <Home className="w-6 h-6 text-white" />
      </Link>
      
      {/* Image d'arrière-plan représentant Constantine */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=2070")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Overlay gradient pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/50 via-transparent to-[#45B39D]/50 z-0" />
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl animate-fade-up border border-white/20 relative z-10">
        <h2 className="text-4xl font-bold text-white text-center mb-4 drop-shadow-lg">
          WASSALNI
        </h2>
        <p className="text-white/90 text-center mb-6 text-sm">
          {t('travelSafely')}
        </p>

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
          <div>
            <label htmlFor="email" className="text-white/90 text-sm font-medium mb-2 block">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder={t('emailPlaceholder')}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white/90 text-sm font-medium mb-2 block">
              {t('password')}
            </label>
            <input
              id="password"
              type="password"
              placeholder={t('passwordPlaceholder')}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-white/90">
              <input type="checkbox" className="mr-2 rounded bg-white/10 border-white/20" />
              {t('rememberMe')}
            </label>
            <a href="#" className="text-white/90 hover:text-white transition-colors">
              {t('forgotPassword')}
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm font-medium text-lg"
          >
            {t('login')}
          </button>
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
      </div>
    </div>
  );
};

export default Login;
