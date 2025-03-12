
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth/useAuth';
import { toast } from 'sonner';
import { Loading } from '@/components/ui/loading';

interface RequireAuthProps {
  children: React.ReactNode;
}

/**
 * Composant pour protéger les routes qui nécessitent une authentification
 * Redirige vers la page de connexion si l'utilisateur n'est pas connecté
 */
const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isTimeout, setIsTimeout] = useState(false);
  const [loadingDuration, setLoadingDuration] = useState(0);

  // Add a progressive timeout to prevent infinite loading
  useEffect(() => {
    if (!loading) return;
    
    const startTime = Date.now();
    const interval = setInterval(() => {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      setLoadingDuration(duration);
      
      // Reduce timeout to 5 seconds
      if (duration >= 5) {
        setIsTimeout(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  // If loading has timed out, allow user to continue without authentication
  // or redirect to login based on their choice
  if (isTimeout) {
    // Give user options instead of automatic redirect
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-500/80 to-teal-600/90">
        <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md text-center max-w-md">
          <div className="w-16 h-16 bg-yellow-100/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Temps d'attente dépassé</h2>
          <p className="text-white/80 mb-4">La vérification de l'authentification prend plus de temps que prévu.</p>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => {
                toast.error("Veuillez vous connecter pour accéder à cette page");
                window.location.href = `/login?redirect=${encodeURIComponent(location.pathname)}`;
              }}
              className="py-2 px-4 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors"
            >
              Se connecter
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="py-2 px-4 bg-teal-500/30 hover:bg-teal-500/50 text-white font-medium rounded-lg transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If still loading, show loading indicator with progress feedback
  if (loading) {
    return (
      <Loading 
        fullScreen 
        text={`Vérification de l'authentification${loadingDuration > 2 ? ` (${loadingDuration}s)` : '...'}`} 
      />
    );
  }

  // If the user isn't logged in, redirect to the login page
  if (!user) {
    toast.error("Vous devez être connecté pour accéder à cette page");
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // If the user is logged in, show the protected content
  return <>{children}</>;
};

export default RequireAuth;
