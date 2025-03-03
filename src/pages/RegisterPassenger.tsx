
import { useState } from "react";
import { UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Image d'arrière-plan de Constantine */}
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
        <h2 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
          WASSALNI
        </h2>
        <p className="text-white/90 text-center mb-8 text-sm">
          {t('passengerRegistration')}
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-white/90 text-sm font-medium mb-2 block">
              {t('fullName')}
            </label>
            <input
              id="name"
              type="text"
              placeholder={t('namePlaceholder')}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
              required
            />
          </div>
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
            <label htmlFor="phone" className="text-white/90 text-sm font-medium mb-2 block">
              {t('phoneNumber')}
            </label>
            <input
              id="phone"
              type="tel"
              placeholder={t('phoneNumberPlaceholder')}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="text-white/90 text-sm font-medium mb-2 block">
              {t('address')}
            </label>
            <input
              id="address"
              type="text"
              placeholder={t('addressPlaceholder')}
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
              placeholder={t('createPassword')}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-white/90 text-sm font-medium mb-2 block">
              {t('confirmPassword')}
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder={t('confirmPasswordPlaceholder')}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm font-medium text-lg flex items-center justify-center"
          >
            <UserCheck className="mr-2 w-5 h-5" />
            {t('register')}
          </button>
          <p className="text-center text-white/90 mt-4">
            {t('alreadyHaveAccount')}{" "}
            <a href="/login" className="text-white hover:underline font-medium">
              {t('login')}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPassenger;
