
import { useState } from "react";
import { UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import AuthBackground from "@/components/auth/AuthBackground";
import AuthContainer from "@/components/auth/AuthContainer";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import ProfilePhotoUpload from "@/components/driver/ProfilePhotoUpload";

/**
 * Composant pour les indicateurs d'étape du formulaire
 */
const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex justify-center mb-8">
    <div className="flex items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[#45B39D]' : 'bg-white/20'} text-white font-bold`}>1</div>
      <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-[#45B39D]' : 'bg-white/20'}`}></div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[#45B39D]' : 'bg-white/20'} text-white font-bold`}>2</div>
      <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-[#45B39D]' : 'bg-white/20'}`}></div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-[#45B39D]' : 'bg-white/20'} text-white font-bold`}>3</div>
    </div>
  </div>
);

/**
 * Composant pour les boutons de navigation entre les étapes
 */
const StepNavigation = ({ 
  step, 
  prevStep, 
  nextStep, 
  isLastStep,
  isLoading 
}: { 
  step: number;
  prevStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
  nextStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLastStep: boolean;
  isLoading: boolean;
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-between">
      {step > 1 && (
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 bg-white/10 text-white rounded-xl transition-all duration-300 hover:bg-white/20"
          disabled={isLoading}
        >
          {t('previous')}
        </button>
      )}
      
      {!isLastStep ? (
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg"
          style={{ marginLeft: step === 1 ? 'auto' : '0' }}
          disabled={isLoading}
        >
          {t('next')}
        </button>
      ) : (
        <SubmitButton isLoading={isLoading}>
          <UserCheck className="mr-2 w-4 h-4" />
          {t('register')}
        </SubmitButton>
      )}
    </div>
  );
};

/**
 * Page d'inscription pour les chauffeurs
 */
const RegisterDriver = () => {
  const [step, setStep] = useState(1);
  const [previewVehicle, setPreviewVehicle] = useState<string | null>(null);
  const [previewProfile, setPreviewProfile] = useState<string | null>(null);
  const [vehicleFile, setVehicleFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { signUp } = useAuth();
  
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
      setVehicleFile(file);
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
      setProfileFile(file);
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
    e.preventDefault();
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  // Fonction pour télécharger une image sur Supabase
  const uploadImage = async (file: File, folder: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;
      
      // Télécharger le fichier dans le bucket 'public'
      const { data, error } = await supabase.storage
        .from('public')
        .upload(filePath, file);
        
      if (error) {
        throw error;
      }
      
      // Obtenir l'URL publique du fichier
      const { data: urlData } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);
        
      return urlData.publicUrl;
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      throw error;
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Vérifier que les mots de passe correspondent (si nécessaire)
      console.log("Formulaire soumis:", formData);
      
      // Télécharger les images
      let profileImageUrl = null;
      let vehicleImageUrl = null;
      
      if (profileFile) {
        profileImageUrl = await uploadImage(profileFile, 'profiles');
      }
      
      if (vehicleFile) {
        vehicleImageUrl = await uploadImage(vehicleFile, 'vehicles');
      }
      
      // 1. Créer un compte utilisateur avec authentification
      const { data: userData, error: signUpError } = await signUp(formData.email, formData.password, {
        full_name: formData.name,
        user_type: "driver",
        phone_number: formData.phone,
        driver_license: formData.license,
        profile_image: profileImageUrl,
        is_verified: false
      });
      
      if (signUpError) {
        throw signUpError;
      }
      
      // 2. Si l'inscription réussit, enregistrer les informations du véhicule
      if (userData?.user?.id) {
        // Créer l'entrée du véhicule
        const { error: vehicleError } = await supabase.from('vehicles').insert({
          driver_id: userData.user.id,
          brand: formData.vehicleBrand,
          model: formData.vehicleModel,
          registration_number: formData.registration,
          image: vehicleImageUrl
        });
        
        if (vehicleError) {
          console.error("Erreur lors de l'enregistrement du véhicule:", vehicleError);
        }
      }
      
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
      
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error(t('registerFailed'), {
        description: error.message || t('registerFailedMessage'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthBackground>
      <AuthContainer 
        title="WASSALNI" 
        subtitle={t('driverRegistration')}
      >
        {/* Indicateur d'étape */}
        <StepIndicator currentStep={step} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
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
                id="password"
                label={t('password')}
                type="password"
                placeholder={t('passwordPlaceholder')}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </>
          )}

          {step === 2 && (
            <>
              <FormField
                id="license"
                label={t('licenseNumber')}
                type="text"
                placeholder={t('licenseNumber')}
                value={formData.license}
                onChange={handleInputChange}
                required
              />
              <FormField
                id="vehicleBrand"
                label={t('vehicleBrand')}
                type="text"
                placeholder="Ex: Renault, Peugeot..."
                value={formData.vehicleBrand}
                onChange={handleInputChange}
                required
              />
              <FormField
                id="vehicleModel"
                label={t('vehicleModel')}
                type="text"
                placeholder="Ex: Symbol, 301..."
                value={formData.vehicleModel}
                onChange={handleInputChange}
                required
              />
              <FormField
                id="registration"
                label={t('registrationNumber')}
                type="text"
                placeholder={t('registrationNumber')}
                value={formData.registration}
                onChange={handleInputChange}
                required
              />
            </>
          )}

          {step === 3 && (
            <>
              <ProfilePhotoUpload
                onImageChange={handleProfileImageChange}
                preview={previewProfile}
                label={t('profilePicture')}
              />

              <ProfilePhotoUpload
                onImageChange={handleVehicleImageChange}
                preview={previewVehicle}
                label={t('vehiclePicture')}
                isVehicle={true}
              />
            </>
          )}

          <StepNavigation 
            step={step} 
            prevStep={prevStep} 
            nextStep={nextStep} 
            isLastStep={step === 3} 
            isLoading={isLoading}
          />
        </form>

        <p className="text-center text-white/90 mt-8">
          {t('alreadyHaveAccount')}{" "}
          <a href="/login" className="text-white hover:underline font-medium">
            {t('login')}
          </a>
        </p>
      </AuthContainer>
    </AuthBackground>
  );
};

export default RegisterDriver;
