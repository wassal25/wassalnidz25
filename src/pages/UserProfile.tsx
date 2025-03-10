
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft, User, Phone, Home, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import AuthBackground from "@/components/auth/AuthBackground";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import ProfilePhotoUpload from "@/components/driver/ProfilePhotoUpload";
import { supabase } from "@/integrations/supabase/client";

/**
 * Page de profil utilisateur
 */
const UserProfile = () => {
  const { t } = useLanguage();
  const { user, userProfile, updateUserProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  // États du formulaire
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  // Initialiser les données du formulaire avec les données du profil utilisateur
  useEffect(() => {
    if (user && userProfile) {
      setFormData({
        full_name: userProfile.full_name || "",
        email: user.email || "",
        phone_number: userProfile.phone_number || "",
        address: userProfile.address || "",
      });
      
      // Set profile image if available
      if (userProfile.avatar_url) {
        setProfileImage(userProfile.avatar_url);
      }
    }
  }, [user, userProfile]);

  // Gestion des changements de formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Gestion du téléchargement de l'image de profil
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) {
      return;
    }

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
    const filePath = `profile-photos/${fileName}`;

    // Afficher l'aperçu de l'image
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setProfileImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Télécharger l'image vers Supabase Storage
    try {
      const { error: storageError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (storageError) throw storageError;
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      if (urlData?.publicUrl) {
        // Update profile with new avatar URL
        await updateUserProfile({
          avatar_url: urlData.publicUrl
        });
      }
      
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image:", error);
      toast.error("Erreur lors du téléchargement de l'image");
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateUserProfile({
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        address: formData.address,
      });
      
      setUpdateSuccess(true);
      toast.success("Profil mis à jour avec succès");
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      toast.error("Erreur lors de la mise à jour du profil");
    } finally {
      setIsLoading(false);
    }
  };

  // Déconnexion
  const handleLogout = async () => {
    try {
      await signOut();
      // La navigation sera gérée par le composant AuthContext après déconnexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  if (!user || !userProfile) {
    return (
      <AuthBackground>
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl text-white text-center">
          <p>{t('pleaseLogin')}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 rounded-xl"
          >
            {t('login')}
          </button>
        </div>
      </AuthBackground>
    );
  }

  return (
    <AuthBackground>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors mr-3"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-white text-xl font-semibold">
                {t('myProfile')}
              </h2>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 px-4 rounded-lg bg-red-500/30 hover:bg-red-500/50 text-white transition-colors"
            >
              {t('logout')}
            </button>
          </div>

          {updateSuccess && (
            <div className="mb-4 p-3 bg-green-500/20 text-white rounded-lg">
              Profil mis à jour avec succès!
            </div>
          )}

          <div className="mb-6 flex justify-center">
            <ProfilePhotoUpload
              onImageChange={handleImageChange}
              preview={profileImage}
              label={t('profilePhoto')}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              id="full_name"
              label={t('fullName')}
              type="text"
              placeholder={t('namePlaceholder')}
              value={formData.full_name}
              onChange={handleInputChange}
              required
            />
            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder={t('emailPlaceholder')}
              value={formData.email}
              onChange={() => {}}
              disabled
            />
            <FormField
              id="phone_number"
              label={t('phoneNumber')}
              type="tel"
              placeholder={t('phoneNumberPlaceholder')}
              value={formData.phone_number}
              onChange={handleInputChange}
            />
            <FormField
              id="address"
              label={t('address')}
              type="text"
              placeholder={t('addressPlaceholder')}
              value={formData.address}
              onChange={handleInputChange}
            />
            
            <SubmitButton isLoading={isLoading}>
              {isLoading ? t('saving') : t('saveChanges')}
            </SubmitButton>
          </form>
        </div>
      </div>
    </AuthBackground>
  );
};

export default UserProfile;
