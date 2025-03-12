
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth/useAuth';
import { toast } from 'sonner';
import { Loading } from '@/components/ui/loading';
import { supabase } from '@/integrations/supabase/client';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isTimeout, setIsTimeout] = useState(false);
  const [loadingDuration, setLoadingDuration] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Handle authentication check with retries
  const checkAuth = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error("Auth check error:", error);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const initAuth = async () => {
      if (!loading) return;

      const startTime = Date.now();
      
      // Set a shorter timeout (3 seconds)
      timeoutId = setTimeout(() => {
        if (mounted) {
          if (retryCount < maxRetries) {
            console.log(`Retrying auth check (${retryCount + 1}/${maxRetries})`);
            setRetryCount(prev => prev + 1);
            initAuth();
          } else {
            setIsTimeout(true);
            toast.error("Problème d'authentification. Veuillez réessayer.");
          }
        }
      }, 3000);

      // Update loading duration
      intervalId = setInterval(() => {
        if (mounted) {
          const duration = Math.floor((Date.now() - startTime) / 1000);
          setLoadingDuration(duration);
        }
      }, 1000);

      // Try to check authentication
      const session = await checkAuth();
      if (mounted && session) {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      }
    };

    initAuth();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [loading, retryCount]);

  if (isTimeout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-500/80 to-teal-600/90">
        <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md text-center max-w-md">
          <div className="w-16 h-16 bg-yellow-100/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Problème d'authentification</h2>
          <p className="text-white/80 mb-4">Impossible de vérifier votre authentification.</p>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => {
                setIsTimeout(false);
                setRetryCount(0);
                window.location.reload();
              }}
              className="py-2 px-4 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors"
            >
              Réessayer
            </button>
            <button 
              onClick={() => {
                window.location.href = `/login?redirect=${encodeURIComponent(location.pathname)}`;
              }}
              className="py-2 px-4 bg-teal-500/30 hover:bg-teal-500/50 text-white font-medium rounded-lg transition-colors"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <Loading 
        fullScreen 
        text={`Vérification de l'authentification${loadingDuration > 1 ? ` (${loadingDuration}s)` : '...'}`}
      />
    );
  }

  if (!user) {
    toast.error("Vous devez être connecté pour accéder à cette page");
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
