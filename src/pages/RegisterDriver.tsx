import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthContainer from "@/components/auth/AuthContainer";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import { useAuth } from "@/context/auth/useAuth";
import { supabase } from "@/lib/supabase";
import ProfilePhotoUpload from "@/components/driver/ProfilePhotoUpload";

const RegisterDriver = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [vehicleImage, setVehicleImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [vehiclePreview, setVehiclePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Gestionnaire de changement d'image de profil
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Gestionnaire de changement d'image de véhicule
  const handleVehicleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVehicleImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVehiclePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction pour télécharger les images dans le bucket supabase
  const uploadImage = async (file: File, bucket: string, folder: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);
      
      if (error) {
        throw error;
      }
      
      // Construire l'URL complète de l'image
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
      
      return urlData.publicUrl;
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      throw error;
    }
  };

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Créer le compte utilisateur
      const userResponse = await signUp(email, password, firstName, lastName);
      
      if (!userResponse || !userResponse.user) {
        throw new Error("Échec de l'inscription utilisateur");
      }
      
      const userId = userResponse.user.id;
      
      // 2. Télécharger les images si présentes
      let profileImageUrl = '';
      let vehicleImageUrl = '';
      
      if (profileImage) {
        profileImageUrl = await uploadImage(profileImage, 'profile-images', 'drivers');
      }
      
      if (vehicleImage) {
        vehicleImageUrl = await uploadImage(vehicleImage, 'vehicle-images', 'vehicles');
      }
      
      // 3. Ajouter les informations du chauffeur dans le profil
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          phone_number: phone,
          driver_license: driverLicense,
          profile_image: profileImageUrl,
          is_driver: true
        })
        .eq('id', userId);
      
      if (profileError) {
        throw profileError;
      }
      
      // 4. Ajouter les informations du véhicule
      const { error: vehicleError } = await supabase
        .from('vehicles')
        .insert([
          { 
            driver_id: userId,
            brand: carBrand,
            model: carModel,
            registration_number: plateNumber,
            image: vehicleImageUrl
          }
        ]);
      
      if (vehicleError) {
        throw vehicleError;
      }
      
      toast.success("Inscription réussie ! Votre compte chauffeur a été créé.");
      navigate("/");
    } catch (error: any) {
      toast.error(`Erreur lors de l'inscription: ${error.message || "Veuillez réessayer."}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer
      title="Devenir Chauffeur"
      subtitle="Rejoignez notre réseau de chauffeurs et commencez à proposer des trajets."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            id="firstName"
            label="Prénom"
            type="text"
            placeholder="Entrez votre prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          
          <FormField
            id="lastName"
            label="Nom"
            type="text"
            placeholder="Entrez votre nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="Entrez votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <FormField
          id="phone"
          label="Téléphone"
          type="tel"
          placeholder="Entrez votre numéro de téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        
        <FormField
          id="password"
          label="Mot de passe"
          type="password"
          placeholder="Créez un mot de passe sécurisé"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <FormField
          id="driverLicense"
          label="Numéro de permis de conduire"
          type="text"
          placeholder="Entrez votre numéro de permis"
          value={driverLicense}
          onChange={(e) => setDriverLicense(e.target.value)}
          required
        />
        
        <div className="pt-4 border-t border-white/10">
          <h3 className="text-white text-lg font-medium mb-4">Information sur le véhicule</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <FormField
              id="carBrand"
              label="Marque du véhicule"
              type="text"
              placeholder="Ex: Renault, Peugeot, Toyota..."
              value={carBrand}
              onChange={(e) => setCarBrand(e.target.value)}
              required
            />
            
            <FormField
              id="carModel"
              label="Modèle du véhicule"
              type="text"
              placeholder="Ex: Clio, 308, Corolla..."
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              required
            />
          </div>
          
          <FormField
            id="plateNumber"
            label="Numéro d'immatriculation"
            type="text"
            placeholder="Entrez le numéro d'immatriculation"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
          <ProfilePhotoUpload 
            onImageChange={handleProfileImageChange}
            preview={profilePreview}
            label="Photo de profil"
          />
          
          <ProfilePhotoUpload 
            onImageChange={handleVehicleImageChange}
            preview={vehiclePreview}
            label="Photo du véhicule"
            isVehicle={true}
          />
        </div>
        
        <SubmitButton isLoading={isLoading}>S'inscrire comme chauffeur</SubmitButton>
      </form>
      
      <div className="mt-6">
        <p className="text-center text-white/70">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="text-white hover:underline">
            Connectez-vous
          </Link>
        </p>
      </div>
      
      <div className="mt-3">
        <p className="text-center text-white/70">
          Vous êtes un passager ?{" "}
          <Link to="/register" className="text-white hover:underline">
            Inscrivez-vous en tant que passager
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
};

export default RegisterDriver;
