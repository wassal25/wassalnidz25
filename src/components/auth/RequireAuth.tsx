
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
      
      if (duration >= 8) {
        setIsTimeout(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  // If loading has timed out, redirect to login
  if (isTimeout) {
    toast.error("Problème de connexion. Veuillez vous reconnecter.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If still loading, show loading indicator with progress feedback
  if (loading) {
    return (
      <Loading 
        fullScreen 
        text={`Vérification de l'authentification${loadingDuration > 3 ? ` (${loadingDuration}s)` : '...'}`} 
      />
    );
  }

  // If the user isn't logged in, redirect to the login page
  if (!user) {
    toast.error("Vous devez être connecté pour accéder à cette page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is logged in, show the protected content
  return <>{children}</>;
};

export default RequireAuth;
