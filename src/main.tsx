
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Toaster } from 'sonner';

// Ajout d'une vérification de viewport meta tag pour s'assurer de la compatibilité mobile
const setViewportMetaTag = () => {
  // Vérifier si la meta viewport existe déjà
  let viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    // Si non, créer et ajouter la meta tag
    viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewport);
  }
};

// Configurer la meta viewport
setViewportMetaTag();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster closeButton position="top-center" richColors />
  </React.StrictMode>,
)
