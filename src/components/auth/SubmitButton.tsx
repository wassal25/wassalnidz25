
import React from "react";

interface SubmitButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

/**
 * Composant de bouton de soumission pour les formulaires d'authentification
 */
const SubmitButton = ({ children, isLoading = false }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center disabled:opacity-70"
    >
      {isLoading ? (
        <>
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
          Chargement...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
