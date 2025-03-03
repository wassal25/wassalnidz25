
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
    (viewport as HTMLMetaElement).name = 'viewport';
    (viewport as HTMLMetaElement).content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewport);
  }
};

// Création des étoiles filantes pour le mode sombre
const createShootingStars = () => {
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars-container';
  
  // Créer 5 étoiles filantes avec des positions et délais aléatoires
  for (let i = 0; i < 5; i++) {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.setProperty('--delay', Math.random() * 10 + '');
    star.style.setProperty('--top', Math.random() * 100 + '');
    star.style.setProperty('--left', Math.random() * 100 + '');
    starsContainer.appendChild(star);
  }
  
  document.body.appendChild(starsContainer);
};

// Configurer la meta viewport
setViewportMetaTag();

// Ajouter les étoiles filantes après le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  createShootingStars();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster closeButton position="top-center" richColors />
  </React.StrictMode>,
)
