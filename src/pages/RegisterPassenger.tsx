
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthContainer from "@/components/auth/AuthContainer";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import ProfilePhotoUpload from "@/components/driver/ProfilePhotoUpload";

const RegisterPassenger = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
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
      
      // 2. Télécharger l'image de profil si présente
      let profileImageUrl = '';
      
      if (profileImage) {
        profileImageUrl = await uploadImage(profileImage, 'profile-images', 'passengers');
      }
      
      // 3. Ajouter les informations du passager dans le profil
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          phone_number: phone,
          profile_image: profileImageUrl,
          is_driver: false
        })
        .eq('id', userId);
      
      if (profileError) {
        throw profileError;
      }
      
      toast.success("Inscription réussie ! Votre compte passager a été créé.");
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
      title="Devenir Passager"
      subtitle="Rejoignez notre communauté et commencez à trouver des trajets."
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
        
        <div className="flex justify-center pt-4">
          <ProfilePhotoUpload 
            onImageChange={handleProfileImageChange}
            preview={profilePreview}
            label="Photo de profil"
          />
        </div>
        
        <SubmitButton isLoading={isLoading}>S'inscrire comme passager</SubmitButton>
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
          Vous êtes un chauffeur ?{" "}
          <Link to="/register-driver" className="text-white hover:underline">
            Inscrivez-vous en tant que chauffeur
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
};

export default RegisterPassenger;
