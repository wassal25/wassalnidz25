
import React, { ReactNode } from "react";
import AuthBackground from "./AuthBackground";

interface AuthContainerProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

/**
 * Container réutilisable pour les pages d'authentification
 * Gère l'affichage du background, du titre, du sous-titre et du contenu
 */
const AuthContainer: React.FC<AuthContainerProps> = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center w-full">
      {/* Fond animé */}
      <AuthBackground>
        {/* Contenu principal */}
        <div className="z-10 w-full max-w-md px-6 py-8 bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
            {title}
          </h1>
          <p className="text-white/70 text-center mb-8">
            {subtitle}
          </p>
          
          {children}
        </div>
      </AuthBackground>
    </div>
  );
};

export default AuthContainer;
