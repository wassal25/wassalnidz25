
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { setupStorage } from './integrations/supabase/setupStorage';

// Initialize Supabase storage
setupStorage().catch(console.error);

// Set error event listener for debugging
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Set unhandled rejection listener for debugging
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
