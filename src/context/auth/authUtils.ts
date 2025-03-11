import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from './types';
import { toast } from 'sonner';

// Function to load a user's profile
export const loadUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error("Erreur lors du chargement du profil:", error);
      return null;
    }

    if (!data) return null;

    // Map the database fields to the UserProfile type
    const userProfile: UserProfile = {
      id: data.id,
      email: '', // Will be populated from auth user
      first_name: data.full_name ? data.full_name.split(' ')[0] : undefined,
      last_name: data.full_name ? data.full_name.split(' ')[1] : undefined,
      full_name: data.full_name || undefined,
      phone_number: data.phone_number || undefined,
      address: data.address || undefined,
      avatar_url: data.profile_image || undefined,
      is_driver: data.user_type === 'driver',
    };

    // Get the user's email from auth
    const { data: userData } = await supabase.auth.getUser();
    if (userData?.user) {
      userProfile.email = userData.user.email || '';
    }

    return userProfile;
  } catch (error) {
    console.error("Erreur lors du chargement du profil:", error);
    return null;
  }
};

// Sign up a new user
export const signUpUser = async (
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string
) => {
  try {
    // Create a new user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) throw error;

    // Create a user profile
    if (data.user) {
      const fullName = `${firstName} ${lastName}`.trim();
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: data.user.id, 
            first_name: firstName, 
            last_name: lastName, 
            full_name: fullName,
            email: email,
            is_driver: false
          }
        ]);

      if (profileError) throw profileError;
      
      toast.success("Inscription réussie! Vous êtes maintenant connecté.");
    }

    return data;
  } catch (error: any) {
    toast.error(`Erreur d'inscription: ${error.message}`);
    throw error;
  }
};

// Sign in an existing user
export const signInUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    if (data.user) {
      toast.success("Connecté avec succès!");
    }
    
    return data;
  } catch (error: any) {
    toast.error(`Erreur de connexion: ${error.message}`);
    throw error;
  }
};

// Sign in with a provider (OAuth)
export const signInWithProviderAuth = async (provider: 'google' | 'facebook') => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
  } catch (error: any) {
    toast.error(`Erreur d'authentification: ${error.message}`);
    throw error;
  }
};

// Sign out a user
export const signOutUser = async () => {
  try {
    console.log("Tentative de déconnexion...");
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Erreur de déconnexion:", error);
      throw error;
    }
    
    console.log("Déconnexion réussie côté API");
  } catch (error: any) {
    console.error("Erreur lors de la déconnexion:", error);
    toast.error(`Erreur de déconnexion: ${error.message}`);
    throw error;
  }
};

// Reset password
export const resetUserPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    toast.success("Instructions de réinitialisation envoyées à votre email");
  } catch (error: any) {
    toast.error(`Erreur de réinitialisation: ${error.message}`);
    throw error;
  }
};

// Update user profile
export const updateProfile = async (userId: string, data: Partial<UserProfile>) => {
  try {
    if (!userId) throw new Error("Utilisateur non connecté");

    // Convert from UserProfile structure to database structure
    const dbData: any = {
      full_name: data.full_name,
      phone_number: data.phone_number,
      address: data.address,
    };
    
    // Map avatar_url to profile_image if it exists
    if (data.avatar_url) {
      dbData.profile_image = data.avatar_url;
    }

    const { error } = await supabase
      .from('profiles')
      .update(dbData)
      .eq('id', userId);

    if (error) throw error;
    
    toast.success("Profil mis à jour avec succès");
  } catch (error: any) {
    toast.error(`Erreur de mise à jour: ${error.message}`);
    throw error;
  }
};
