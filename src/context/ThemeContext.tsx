
// =======================================================
// Fichier: ThemeContext.tsx
// Description: Contexte global pour la gestion du thème (clair/sombre)
// Fonctionnalité: Permet de basculer entre les modes clair et sombre dans toute l'application
// =======================================================

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

// Interface définissant les propriétés du contexte de thème
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Création du contexte avec des valeurs par défaut
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});

// Hook personnalisé pour utiliser le contexte de thème
export const useTheme = () => useContext(ThemeContext);

/**
 * Composant Provider pour le thème
 * Gère l'état du thème et l'applique à l'ensemble du document
 * Persiste le choix dans localStorage
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // État local pour le thème avec initialisation depuis localStorage
  const [theme, setTheme] = useState<Theme>(() => {
    // Vérifier si une préférence de thème est sauvegardée dans localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  // Effet pour appliquer le thème au document et le sauvegarder
  useEffect(() => {
    // Sauvegarder la préférence de thème dans localStorage
    localStorage.setItem('theme', theme);
    
    // Appliquer la classe de thème au document HTML globalement
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }

    // Mettre à jour la métadonnée pour le thème couleur sur mobile
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a1f2c' : '#FDE1D3');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = theme === 'dark' ? '#1a1f2c' : '#FDE1D3';
      document.head.appendChild(meta);
    }
  }, [theme]);

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
