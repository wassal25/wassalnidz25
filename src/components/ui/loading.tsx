
import React from "react";

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export const Loading = ({ text = "Chargement...", fullScreen = false }: LoadingProps) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-teal-500/80 to-teal-600/90">
        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md text-center">
          <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto"></div>
          <p className="text-white font-medium mt-4">{text}</p>
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
