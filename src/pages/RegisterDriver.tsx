import { useState } from "react";
import { Upload, Camera, UserCheck, Home } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

const RegisterDriver = () => {
  const [step, setStep] = useState(1);
  const [previewVehicle, setPreviewVehicle] = useState<string | null>(null);
  const [previewProfile, setPreviewProfile] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Données du formulaire
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    license: "",
    vehicleBrand: "",
    vehicleModel: "",
    registration: ""
  });

  const handleVehicleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewVehicle(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewProfile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Gestion des changements de formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Gestion du changement d'étape avec prévention du comportement par défaut
  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prévient le comportement par défaut du bouton
    setStep(step + 1);
    window.scrollTo(0, 0); // Retour en haut de page
  };
  
  const prevStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prévient le comportement par défaut du bouton
    setStep(step - 1);
    window.scrollTo(0, 0); // Retour en haut de page
  };

  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de soumission finale du formulaire
    console.log("Formulaire soumis:", formData, { previewProfile, previewVehicle });
    
    // Notification de succès
    toast.success(t('registerSuccess'), {
      description: t('registerSuccessMessage'),
      position: "top-center",
      duration: 4000,
      style: {
        background: "linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)",
        color: "white",
        border: "none"
      }
    });
    
    // Rediriger vers la page de connexion
    setTimeout(() => navigate('/login'), 2000);
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
          {t('driverRegistration')}
        </p>

        {/* Indicateur d'étape */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#45B39D]' : 'bg-white/20'} text-white font-bold`}>1</div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-[#45B39D]' : 'bg-white/20'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#45B39D]' : 'bg-white/20'} text-white font-bold`}>2</div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-[#45B39D]' : 'bg-white/20'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#45B39D]' : 'bg-white/20'} text-white font-bold`}>3</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="name" className="text-white/90 text-sm font-medium mb-2 block">
                  {t('fullName')}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={t('namePlaceholder')}
                  value={formData.name}
                  onChange={handleInputChange}
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
                  value={formData.email}
                  onChange={handleInputChange}
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
                  value={formData.phone}
                  onChange={handleInputChange}
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
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                  required
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label htmlFor="license" className="text-white/90 text-sm font-medium mb-2 block">
                  {t('licenseNumber')}
                </label>
                <input
                  id="license"
                  type="text"
                  placeholder={t('licenseNumber')}
                  value={formData.license}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="vehicleBrand" className="text-white/90 text-sm font-medium mb-2 block">
                  {t('vehicleBrand')}
                </label>
                <input
                  id="vehicleBrand"
                  type="text"
                  placeholder="Ex: Renault, Peugeot..."
                  value={formData.vehicleBrand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="vehicleModel" className="text-white/90 text-sm font-medium mb-2 block">
                  {t('vehicleModel')}
                </label>
                <input
                  id="vehicleModel"
                  type="text"
                  placeholder="Ex: Symbol, 301..."
                  value={formData.vehicleModel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="registration" className="text-white/90 text-sm font-medium mb-2 block">
                  {t('registrationNumber')}
                </label>
                <input
                  id="registration"
                  type="text"
                  placeholder={t('registrationNumber')}
                  value={formData.registration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                  required
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-4">
                <label className="text-white/90 text-sm font-medium mb-2 block">
                  {t('profilePicture')}
                </label>
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-2 overflow-hidden">
                    {previewProfile ? (
                      <img src={previewProfile} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="text-white/50 w-12 h-12" />
                    )}
                  </div>
                  <label htmlFor="profile-pic" className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white cursor-pointer hover:bg-white/20 transition-all flex items-center">
                    <Upload className="mr-2 w-4 h-4" />
                    {t('upload')}
                    <input 
                      type="file" 
                      id="profile-pic" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleProfileImageChange}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-white/90 text-sm font-medium mb-2 block">
                  {t('vehiclePicture')}
                </label>
                <div className="flex flex-col items-center">
                  <div className="w-full h-40 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-2 overflow-hidden">
                    {previewVehicle ? (
                      <img src={previewVehicle} alt="Vehicle Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="text-white/50 w-12 h-12" />
                    )}
                  </div>
                  <label htmlFor="vehicle-pic" className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white cursor-pointer hover:bg-white/20 transition-all flex items-center">
                    <Upload className="mr-2 w-4 h-4" />
                    {t('upload')}
                    <input 
                      type="file" 
                      id="vehicle-pic" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleVehicleImageChange}
                    />
                  </label>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-white/10 text-white rounded-xl transition-all duration-300 hover:bg-white/20"
              >
                {t('previous')}
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg"
                style={{ marginLeft: step === 1 ? 'auto' : '0' }}
              >
                {t('next')}
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg flex items-center"
              >
                <UserCheck className="mr-2 w-4 h-4" />
                {t('register')}
              </button>
            )}
          </div>
        </form>

        <p className="text-center text-white/90 mt-8">
          {t('alreadyHaveAccount')}{" "}
          <a href="/login" className="text-white hover:underline font-medium">
            {t('login')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterDriver;
