
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

  // Add a timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setIsTimeout(true);
      }
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(timer);
  }, [loading]);

  // If loading has timed out, redirect to login
  if (isTimeout) {
    toast.error("Problème de connexion. Veuillez vous reconnecter.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If still loading, show loading indicator
  if (loading) {
    return <Loading fullScreen text="Vérification de l'authentification..." />;
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
