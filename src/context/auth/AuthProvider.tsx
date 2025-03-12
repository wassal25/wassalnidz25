
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
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
  const [authInitialized, setAuthInitialized] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Starting auth initialization process...");
    let mounted = true;
    
    const checkUser = async () => {
      try {
        console.log("Checking user session...");
        setLoading(true);
        
        // Shorter timeout (5 seconds) to prevent long waiting
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Auth session check timed out")), 5000)
        );
        
        // Race the session check with a timeout
        const { data } = await Promise.race([
          supabase.auth.getSession(),
          timeoutPromise
        ]) as any;
        
        console.log("Session data received:", data ? "Yes" : "No");
        
        if (!mounted) return;
        
        setUser(data?.session?.user || null);
        
        if (data?.session?.user) {
          console.log("User found, loading profile...");
          try {
            const profile = await loadUserProfile(data.session.user.id);
            if (mounted) {
              setUserProfile(profile);
              console.log("Profile loaded successfully");
            }
          } catch (profileError) {
            console.error("Error loading profile:", profileError);
            if (mounted) {
              // Don't set auth error for profile loading issues
              // Continue the flow even with profile error
              console.log("Continuing despite profile error");
            }
          }
        } else {
          console.log("No user session found");
          if (mounted) {
            setUserProfile(null);
          }
        }
        
        // Always complete initialization regardless of errors
        if (mounted) {
          setAuthInitialized(true);
          setLoading(false);
          setAuthError(null);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (mounted) {
          // Set error but don't block the app
          setAuthError(error instanceof Error ? error.message : "Unknown authentication error");
          
          // Let the app continue anyway
          setAuthInitialized(true);
          setLoading(false);
          
          // Auto-retry once for connectivity issues
          if (retryCount < 1) {
            setRetryCount(prev => prev + 1);
            setTimeout(() => checkUser(), 1000);
          }
        }
      }
    };

    // Check user on load
    checkUser();

    // Set up auth listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event);
        
        if (!mounted) return;
        
        setUser(session?.user || null);
        
        if (session?.user) {
          try {
            const profile = await loadUserProfile(session.user.id);
            if (!mounted) return;
            
            setUserProfile(profile);
            if (event === 'SIGNED_IN') {
              toast.success("Connecté avec succès!");
              navigate('/');
            }
          } catch (error) {
            console.error("Error loading profile on auth change:", error);
            // Continue even with profile error
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
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [navigate, retryCount]);

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

  // If authentication is still initializing, show a loading spinner
  if (!authInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-500/80 to-teal-600/90">
        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md text-center">
          <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto"></div>
          <p className="text-white font-medium mt-4">Initialisation de l'authentification...</p>
          <p className="text-white/70 text-sm mt-2">Veuillez patienter un instant...</p>
        </div>
      </div>
    );
  }

  // Show error state if there was an authentication error, but with a continue option
  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-500/80 to-teal-600/90">
        <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md text-center max-w-md">
          <div className="w-16 h-16 bg-red-100/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Problème d'authentification</h2>
          <p className="text-white/80 mb-4">Une erreur est survenue lors de l'initialisation de l'authentification.</p>
          <div className="bg-white/10 p-3 rounded text-left mb-4">
            <p className="text-white/90 text-sm">{authError}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => window.location.reload()}
              className="py-2 px-4 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors"
            >
              Réessayer
            </button>
            <button 
              onClick={() => {
                setAuthError(null);
                setLoading(false);
              }}
              className="py-2 px-4 bg-teal-500/30 hover:bg-teal-500/50 text-white font-medium rounded-lg transition-colors"
            >
              Continuer quand même
            </button>
          </div>
        </div>
      </div>
    );
  }

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
