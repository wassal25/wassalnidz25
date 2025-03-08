
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Session, User, Provider } from "@supabase/supabase-js";

// Type de contexte d'authentification
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: Provider) => Promise<void>;
  userProfile: any | null;
  updateUserProfile: (data: any) => Promise<void>;
}

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Fournisseur du contexte d'authentification
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Configurer l'écouteur des changements d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          
          setUserProfile(profile);
        } else {
          setUserProfile(null);
        }
      }
    );

    // Vérifier la session initiale
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setSession(session);
        setUser(session.user);
        
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        
        setUserProfile(profile);
      }
      
      setLoading(false);
    };

    initializeAuth();

    // Nettoyer l'écouteur
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // Inscription
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            user_type: userData.user_type || "passenger",
          }
        }
      });

      if (error) throw error;
      
      toast.success("Inscription réussie", {
        description: "Veuillez vérifier votre email pour confirmer votre compte.",
      });
      
      // Rediriger vers la page de connexion
      navigate("/login");
    } catch (error: any) {
      toast.error("Erreur d'inscription", {
        description: error.message,
      });
    }
  };

  // Connexion
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success("Connexion réussie", {
        description: "Bienvenue sur Wassalni!",
      });
      
      // Rediriger vers la page d'accueil
      navigate("/");
    } catch (error: any) {
      toast.error("Erreur de connexion", {
        description: error.message,
      });
    }
  };

  // Connexion avec un fournisseur (Google, Facebook)
  const signInWithProvider = async (provider: Provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(`Erreur de connexion avec ${provider}`, {
        description: error.message,
      });
    }
  };

  // Déconnexion
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Déconnexion réussie");
      
      // Réinitialiser l'état local après la déconnexion
      setUser(null);
      setSession(null);
      setUserProfile(null);
      
      // Rediriger vers la page de connexion
      navigate("/login");
    } catch (error: any) {
      toast.error("Erreur de déconnexion", {
        description: error.message,
      });
    }
  };

  // Mettre à jour le profil utilisateur
  const updateUserProfile = async (data: any) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Mettre à jour l'état local du profil
      setUserProfile({
        ...userProfile,
        ...data
      });
      
      toast.success("Profil mis à jour avec succès");
    } catch (error: any) {
      toast.error("Erreur lors de la mise à jour du profil", {
        description: error.message,
      });
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithProvider,
    userProfile,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
