
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { setupStorage } from './integrations/supabase/setupStorage';
import { toast } from 'sonner'

// Initialize Supabase storage with better error handling
setupStorage().catch(error => {
  console.error("Failed to initialize Supabase storage:", error);
  // Don't block app startup for storage failures
});

// Log important app events for debugging
console.log("Application starting...");

// Set error event listener for debugging
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  
  // Provide user-friendly notification for network errors
  if (event.error?.message?.includes('NetworkError') || 
      event.error?.message?.includes('Failed to fetch') ||
      event.error?.message?.includes('Network request failed')) {
    toast.error("Problème de connexion réseau. Veuillez vérifier votre connexion internet.");
  }
});

// Set unhandled rejection listener for debugging
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  // Handle specific Supabase errors
  if (event.reason?.error?.includes('JWT') || 
      event.reason?.message?.includes('auth') ||
      event.reason?.message?.includes('timed out')) {
    toast.error("Problème d'authentification. Veuillez vous reconnecter.");
  }
});

// Add timing logs to track rendering performance
console.time('Initial render');

// Check for Supabase connectivity with retry mechanism
const checkSupabaseConnection = async () => {
  const maxRetries = 3;
  let retryCount = 0;
  let connected = false;
  
  const tryConnection = async () => {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const startTime = Date.now();
      const { error } = await supabase.from('profiles').select('count').limit(1);
      const endTime = Date.now();
      
      if (!error) {
        console.log(`Supabase connection test: Success (${endTime - startTime}ms)`);
        connected = true;
        return true;
      } else {
        console.error('Supabase connection error:', error);
        return false;
      }
    } catch (err) {
      console.error('Supabase import or connection error:', err);
      return false;
    }
  };
  
  while (!connected && retryCount < maxRetries) {
    const success = await tryConnection();
    if (success) break;
    
    retryCount++;
    if (retryCount < maxRetries) {
      console.log(`Retrying Supabase connection (attempt ${retryCount + 1}/${maxRetries})...`);
      // Wait a bit longer between retries
      await new Promise(resolve => setTimeout(resolve, retryCount * 1000));
    }
  }
  
  if (!connected) {
    console.error(`Failed to connect to Supabase after ${maxRetries} attempts`);
    toast.error("Problème de connexion à la base de données. L'application pourrait ne pas fonctionner correctement.");
  }
};

// Run connection test in background
checkSupabaseConnection();

// Add online/offline detection for better user experience
window.addEventListener('online', () => {
  console.log('App is online');
  toast.success("Connexion internet rétablie.");
  // Reload the app to restore connectivity
  setTimeout(() => window.location.reload(), 1500);
});

window.addEventListener('offline', () => {
  console.log('App is offline');
  toast.error("Connexion internet perdue. Certaines fonctionnalités peuvent ne pas fonctionner.");
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

// Log after render
window.addEventListener('load', () => {
  console.timeEnd('Initial render');
  console.log('Application fully loaded');
});
