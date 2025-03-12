
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { setupStorage } from './integrations/supabase/setupStorage';
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'

// Initialize Supabase storage with better error handling
setupStorage().catch(error => {
  console.error("Failed to initialize Supabase storage:", error);
});

// Check Supabase connection status
const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    console.log("Supabase connection successful:", data ? "Session exists" : "No session");
    return true;
  } catch (error) {
    console.error("Supabase connection error:", error);
    toast.error("Problème de connexion au serveur. Veuillez réessayer.");
    return false;
  }
};

// Handle authentication errors
supabase.auth.onAuthStateChange((event, session) => {
  console.log("Auth state changed:", event, session ? "Session exists" : "No session");
  if (event === 'SIGNED_OUT') {
    console.log("User signed out");
  } else if (event === 'SIGNED_IN') {
    console.log("User signed in successfully");
  }
});

// Set error event listener for debugging
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  if (event.error?.message?.includes('NetworkError') || 
      event.error?.message?.includes('Failed to fetch')) {
    toast.error("Problème de connexion réseau. Veuillez vérifier votre connexion internet.");
  }
});

// Check connection before mounting app
checkSupabaseConnection().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </React.StrictMode>,
  );
});
