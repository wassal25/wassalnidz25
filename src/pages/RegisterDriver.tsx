
import { useState } from "react";
import { Upload, Camera, UserCheck } from "lucide-react";

const RegisterDriver = () => {
  const [step, setStep] = useState(1);
  const [previewVehicle, setPreviewVehicle] = useState<string | null>(null);
  const [previewProfile, setPreviewProfile] = useState<string | null>(null);

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

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

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
          Inscription Chauffeur
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

        <form className="space-y-6">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="name" className="text-white/90 text-sm font-medium mb-2 block">
                  Nom complet
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Entrez votre nom"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-white/90 text-sm font-medium mb-2 block">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Entrez votre email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-white/90 text-sm font-medium mb-2 block">
                  Numéro de téléphone
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Entrez votre numéro"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-white/90 text-sm font-medium mb-2 block">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Créez votre mot de passe"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label htmlFor="license" className="text-white/90 text-sm font-medium mb-2 block">
                  Numéro de permis de conduire
                </label>
                <input
                  id="license"
                  type="text"
                  placeholder="Entrez votre numéro de permis"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="vehicle-brand" className="text-white/90 text-sm font-medium mb-2 block">
                  Marque du véhicule
                </label>
                <input
                  id="vehicle-brand"
                  type="text"
                  placeholder="Ex: Renault, Peugeot..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="vehicle-model" className="text-white/90 text-sm font-medium mb-2 block">
                  Modèle du véhicule
                </label>
                <input
                  id="vehicle-model"
                  type="text"
                  placeholder="Ex: Symbol, 301..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="registration" className="text-white/90 text-sm font-medium mb-2 block">
                  Numéro d'immatriculation
                </label>
                <input
                  id="registration"
                  type="text"
                  placeholder="Numéro de plaque"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-4">
                <label className="text-white/90 text-sm font-medium mb-2 block">
                  Photo de profil
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
                    Télécharger
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
                  Photo du véhicule
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
                    Télécharger
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
                Précédent
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg"
                style={{ marginLeft: step === 1 ? 'auto' : '0' }}
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg flex items-center"
              >
                <UserCheck className="mr-2 w-4 h-4" />
                S'inscrire
              </button>
            )}
          </div>
        </form>

        <p className="text-center text-white/90 mt-8">
          Vous avez déjà un compte ?{" "}
          <a href="/login" className="text-white hover:underline font-medium">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterDriver;
