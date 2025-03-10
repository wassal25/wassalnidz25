
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { AuthContextType, UserProfile } from './types';
import { 
  loadUserProfile, 
  signUpUser, 
  signInUser, 
  signInWithProviderAuth, 
  signOutUser, 
  resetUserPassword, 
  updateProfile 
} from './authUtils';

// Create the auth context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
        
        if (data.session?.user) {
          const profile = await loadUserProfile(data.session.user.id);
          setUserProfile(profile);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur:", error);
      } finally {
        setLoading(false);
      }
    };

    // Check user on load
    checkUser();

    // Set up auth listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event);
        setUser(session?.user || null);
        
        if (session?.user) {
          const profile = await loadUserProfile(session.user.id);
          setUserProfile(profile);
          if (event === 'SIGNED_IN') {
            toast.success("Connecté avec succès!");
            navigate('/');
          }
        } else {
          setUserProfile(null);
          if (event === 'SIGNED_OUT') {
            toast.success("Déconnecté avec succès!");
            navigate('/');
          }
        }
        
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // Update user profile
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    try {
      await updateProfile(user.id, data);
      // Update local state
      setUserProfile(prev => prev ? { ...prev, ...data } : null);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Sign up
  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const data = await signUpUser(email, password, firstName, lastName);
      navigate('/');
      return data;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  // Sign in
  const signIn = async (email: string, password: string) => {
    try {
      const data = await signInUser(email, password);
      if (data.user) {
        const profile = await loadUserProfile(data.user.id);
        setUserProfile(profile);
      }
      return data;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  // Sign in with provider
  const signInWithProvider = async (provider: 'google' | 'facebook') => {
    try {
      await signInWithProviderAuth(provider);
    } catch (error) {
      console.error("Sign in with provider error:", error);
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await resetUserPassword(email);
    } catch (error) {
      console.error("Reset password error:", error);
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
