
import React from "react";

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export const Loading = ({ text = "Chargement...", fullScreen = false }: LoadingProps) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-teal-500/80 to-teal-600/90">
        <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md text-center max-w-md">
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto"></div>
          <p className="text-white font-medium mt-4">{text}</p>
          <p className="text-white/70 text-sm mt-2">
            Veuillez patienter un instant...
          </p>
          <div className="mt-4 bg-white/10 p-3 rounded text-left hidden">
            <p className="text-white/90 text-xs font-mono">
              Si cette page persiste, essayez de recharger l'application.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-8 h-8 border-3 border-t-transparent border-teal-500 rounded-full animate-spin"></div>
      <p className="ml-3 text-teal-700 dark:text-teal-300">{text}</p>
    </div>
  );
};
