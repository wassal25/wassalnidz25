
// =======================================================
// Composant racine App
// Description: Configuration des routes et fournisseurs globaux
// =======================================================

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterDriver from "./pages/RegisterDriver";
import RegisterPassenger from "./pages/RegisterPassenger";
import ReservationPage from "./pages/ReservationPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Client React Query pour la gestion d'état et des requêtes
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Gestionnaires de notifications */}
      <Toaster />
      <Sonner />
      
      {/* Configuration du routeur */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-driver" element={<RegisterDriver />} />
          <Route path="/register-passenger" element={<RegisterPassenger />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
