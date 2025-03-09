
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Interface pour le profil utilisateur
interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email: string;
  phone_number?: string;
  address?: string;
  avatar_url?: string;
  is_driver: boolean;
}

interface AuthContextType {
  user: any | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithProvider: (provider: 'google' | 'facebook') => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour charger le profil utilisateur
  const loadUserProfile = async (userId: string) => {
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

      setUserProfile(data as UserProfile);
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement du profil:", error);
      return null;
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
        
        if (data.session?.user) {
          await loadUserProfile(data.session.user.id);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur:", error);
      } finally {
        setLoading(false);
      }
    };

    // Vérifier l'utilisateur au chargement
    checkUser();

    // Mettre en place un listener pour les changements d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        
        if (session?.user) {
          await loadUserProfile(session.user.id);
          
          // Afficher un message de succès lors de la connexion
          if (event === 'SIGNED_IN') {
            toast.success("Vous êtes maintenant connecté!");
            
            // Rediriger vers la page d'accueil
            window.location.href = '/';
          }
        } else {
          setUserProfile(null);
          
          // Afficher un message de succès lors de la déconnexion
          if (event === 'SIGNED_OUT') {
            toast.success("Vous avez été déconnecté avec succès!");
            
            // Rediriger vers la page d'accueil
            window.location.href = '/';
          }
        }
        
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  /**
   * Mise à jour du profil utilisateur
   */
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    try {
      if (!user) throw new Error("Utilisateur non connecté");

      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) throw error;

      // Mettre à jour l'état local
      setUserProfile(prev => prev ? { ...prev, ...data } : null);
      
      toast.success("Profil mis à jour avec succès");
    } catch (error: any) {
      toast.error(`Erreur de mise à jour: ${error.message}`);
      throw error;
    }
  };

  /**
   * Inscription d'un nouvel utilisateur
   */
  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      // Créer un nouvel utilisateur
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

      // Créer un profil utilisateur
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
      }

      toast.success("Inscription réussie! Vous êtes maintenant connecté.");
      
      // Rediriger vers la page d'accueil
      window.location.href = '/';
      
      return data;
    } catch (error: any) {
      toast.error(`Erreur d'inscription: ${error.message}`);
      throw error;
    }
  };

  /**
   * Connexion d'un utilisateur existant
   */
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Charger le profil utilisateur si la connexion réussit
      if (data.user) {
        await loadUserProfile(data.user.id);
        toast.success("Connexion réussie!");
        
        // Rediriger vers la page d'accueil
        window.location.href = '/';
      }
      
      return data;
    } catch (error: any) {
      toast.error(`Erreur de connexion: ${error.message}`);
      throw error;
    }
  };

  /**
   * Connexion avec fournisseur OAuth
   */
  const signInWithProvider = async (provider: 'google' | 'facebook') => {
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

  /**
   * Déconnexion de l'utilisateur
   */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setUserProfile(null);
      toast.success("Vous avez été déconnecté avec succès!");
      
      // Rediriger vers la page d'accueil
      window.location.href = '/';
    } catch (error: any) {
      toast.error(`Erreur de déconnexion: ${error.message}`);
      throw error;
    }
  };

  /**
   * Réinitialisation du mot de passe
   */
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      toast.success("Instructions de réinitialisation envoyées à votre email");
    } catch (error: any) {
      toast.error(`Erreur de réinitialisation: ${error.message}`);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signUp,
        signIn,
        signInWithProvider,
        signOut,
        resetPassword,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
