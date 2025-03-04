
import React, { ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

/**
 * Bouton de soumission standardisé pour les formulaires d'authentification
 */
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  onClick,
  type = "submit"
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm font-medium text-lg flex items-center justify-center"
    >
      {children}
    </button>
  );
};

export default SubmitButton;
