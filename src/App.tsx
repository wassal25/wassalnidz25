// =======================================================
// Fichier: App.tsx
// Description: Composant racine App
// Fonctionnalité: Configuration des routes et fournisseurs globaux
// =======================================================

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterDriver from "./pages/RegisterDriver";
import RegisterPassenger from "./pages/RegisterPassenger";
import ReservationPage from "./pages/ReservationPage";
import Settings from "./pages/Settings";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import SearchHelp from "./pages/SearchHelp";
import Map from "./pages/Map";
import CreateTrip from "./pages/CreateTrip";
import CommunityChat from "./pages/CommunityChat";
import UserProfile from "./pages/UserProfile";

// Client React Query pour la gestion d'état et des requêtes
const queryClient = new QueryClient();

/**
 * Composant principal de l'application
 * Structure l'application avec les différents contextes et le routeur
 * Assure que le thème et la langue sont appliqués globalement
 */
const App = () => (
  // QueryClientProvider pour la gestion des requêtes API
  <QueryClientProvider client={queryClient}>
    {/* ThemeProvider pour la gestion du thème clair/sombre à l'échelle de l'application */}
    <ThemeProvider>
      {/* LanguageProvider pour la gestion multilingue (français, arabe, anglais) */}
      <LanguageProvider>
        <TooltipProvider>
          {/* Gestionnaires de notifications */}
          <Toaster />
          <Sonner />
          
          {/* Configuration du routeur avec les différentes routes de l'application */}
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register-driver" element={<RegisterDriver />} />
                <Route path="/register-passenger" element={<RegisterPassenger />} />
                <Route path="/reservation" element={<ReservationPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/about" element={<About />} />
                <Route path="/search-help" element={<SearchHelp />} />
                <Route path="/map" element={<Map />} />
                <Route path="/create-trip" element={<CreateTrip />} />
                <Route path="/community-chat" element={<CommunityChat />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
