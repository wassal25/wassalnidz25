
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { setupStorage } from './integrations/supabase/setupStorage';

// Initialize Supabase storage
setupStorage().catch(console.error);

// Log important app events for debugging
console.log("Application starting...");

// Set error event listener for debugging
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Set unhandled rejection listener for debugging
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Add timing logs to track rendering performance
console.time('Initial render');

// Check for Supabase connectivity
const checkSupabaseConnection = async () => {
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    const startTime = Date.now();
    const { error } = await supabase.from('profiles').select('count').limit(1);
    const endTime = Date.now();
    console.log(`Supabase connection test: ${error ? 'Failed' : 'Success'} (${endTime - startTime}ms)`);
    if (error) {
      console.error('Supabase connection error:', error);
    }
  } catch (err) {
    console.error('Supabase import or connection error:', err);
  }
};

// Run connection test in background
checkSupabaseConnection();

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
