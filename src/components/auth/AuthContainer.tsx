
import React from "react";

interface AuthContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

/**
 * Conteneur pour les formulaires d'authentification
 * Standardise l'apparence des formulaires à travers l'application
 */
export const AuthContainer: React.FC<AuthContainerProps> = ({ 
  children, 
  title, 
  subtitle 
}) => {
  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl animate-fade-up border border-white/20 relative z-10">
      <h2 className="text-4xl font-bold text-white text-center mb-4 drop-shadow-lg">
        {title}
      </h2>
      <p className="text-white/90 text-center mb-6 text-sm">
        {subtitle}
      </p>
      {children}
    </div>
  );
};

export default AuthContainer;
