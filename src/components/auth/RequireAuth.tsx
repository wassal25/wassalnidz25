
import React from 'react';
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

  // Si l'authentification est en cours de chargement, afficher un indicateur de chargement
  if (loading) {
    return <Loading fullScreen text="Vérification de l'authentification..." />;
  }

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!user) {
    toast.error("Vous devez être connecté pour accéder à cette page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si l'utilisateur est connecté, afficher le contenu protégé
  return <>{children}</>;
};

export default RequireAuth;
