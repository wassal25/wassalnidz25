
// =======================================================
// Page de feedback
// Description: Permet aux utilisateurs de soumettre des commentaires
// =======================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageSquare, Send, Mail, User, Phone } from "lucide-react";

const Feedback = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  
  // Options pour les types de feedback
  const feedbackOptions = [
    { id: "suggestion", label: "Suggestion d'amélioration" },
    { id: "problem", label: "Signalement de problème" },
    { id: "complaint", label: "Réclamation" },
    { id: "appreciation", label: "Appréciation" },
    { id: "other", label: "Autre" }
  ];

  // Suggestions de réponses prédéfinies selon le type
  const suggestionsByType = {
    suggestion: [
      "Je souhaite suggérer une amélioration pour la recherche de trajets.",
      "Je propose d'ajouter une fonctionnalité de partage de trajet.",
      "Voici une idée pour améliorer l'interface utilisateur."
    ],
    problem: [
      "J'ai rencontré un problème lors de la réservation d'un trajet.",
      "L'application ne fonctionne pas correctement sur mon appareil.",
      "Je n'arrive pas à accéder à certaines fonctionnalités."
    ],
    complaint: [
      "Je n'ai pas été satisfait du service de covoiturage.",
      "Le chauffeur n'était pas ponctuel.",
      "Je souhaite signaler un comportement inapproprié."
    ],
    appreciation: [
      "Je tiens à exprimer ma satisfaction pour votre service.",
      "Votre application est très intuitive et facile à utiliser.",
      "J'apprécie particulièrement la fonctionnalité de..."
    ],
    other: [
      "J'ai une question concernant votre service.",
      "Je souhaite vous contacter pour une proposition de partenariat.",
      "J'aimerais obtenir plus d'informations sur..."
    ]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!name || !email || !message || !feedbackType) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    
    // Simuler l'envoi des données
    setTimeout(() => {
      toast.success("Votre feedback a été envoyé avec succès! Merci pour votre contribution.");
      
      // Réinitialiser le formulaire
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setFeedbackType("");
      
      // Rediriger vers la page d'accueil après un délai
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 1000);
  };

  const handleFeedbackTypeChange = (type: string) => {
    setFeedbackType(type);
    // Réinitialiser le message pour permettre la sélection d'une suggestion
    setMessage("");
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-500/80 to-teal-600/90">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 pt-40 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Colonne de gauche: Image d'équipe et texte explicatif */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            <div className="relative rounded-xl overflow-hidden shadow-lg mb-6 transform transition-transform hover:scale-[1.02]">
              {/* Image générée représentant une équipe de support client professionnelle */}
              <div className="relative h-80 w-full rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-teal-800/70"></div>
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                  alt="L'équipe Wassalni" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">Notre équipe à votre écoute</h3>
                  <p className="text-white/90">Nous sommes là pour vous accompagner et améliorer votre expérience</p>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Votre opinion compte</h2>
            <p className="text-white/90 mb-6">
              Chez Wassalni, nous accordons une grande importance à l'expérience de nos utilisateurs.
              Vos commentaires nous aident à améliorer constamment notre service de covoiturage.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-teal-400/20 rounded-full p-2">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Communiquez avec nous</h3>
                  <p className="text-white/80 text-sm">Partagez vos idées, suggestions ou préoccupations</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-teal-400/20 rounded-full p-2">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Support réactif</h3>
                  <p className="text-white/80 text-sm">Notre équipe vous répondra dans les plus brefs délais</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Colonne de droite: Formulaire de feedback */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MessageSquare className="mr-2" />
              Formulaire de feedback
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type de feedback */}
              <div>
                <label className="block text-white font-medium mb-2">Type de feedback</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {feedbackOptions.map((option) => (
                    <div 
                      key={option.id}
                      onClick={() => handleFeedbackTypeChange(option.id)}
                      className={`px-4 py-3 rounded-xl cursor-pointer transition-all ${
                        feedbackType === option.id 
                          ? "bg-teal-600 text-white" 
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Champ Nom */}
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Nom complet
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-teal-200" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/10 border border-white/20 text-white rounded-xl block w-full pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-white/60"
                    placeholder="Votre nom"
                    required
                  />
                </div>
              </div>
              
              {/* Champ Email */}
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-teal-200" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border border-white/20 text-white rounded-xl block w-full pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-white/60"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>
              
              {/* Champ Téléphone (optionnel) */}
              <div>
                <label htmlFor="phone" className="block text-white font-medium mb-2">
                  Téléphone (optionnel)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-teal-200" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-white/10 border border-white/20 text-white rounded-xl block w-full pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-white/60"
                    placeholder="Votre numéro de téléphone"
                  />
                </div>
              </div>
              
              {/* Suggestions basées sur le type de feedback sélectionné */}
              {feedbackType && (
                <div className="space-y-2">
                  <label className="block text-white font-medium mb-1">
                    Suggestions:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(suggestionsByType[feedbackType as keyof typeof suggestionsByType] || []).map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionSelect(suggestion)}
                        className="px-3 py-2 text-sm bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                      >
                        {suggestion.length > 40 ? suggestion.substring(0, 40) + '...' : suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Champ Message */}
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Votre message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="bg-white/10 border border-white/20 text-white rounded-xl block w-full px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-white/60"
                  placeholder="Décrivez votre feedback ici..."
                  required
                ></textarea>
              </div>
              
              {/* Bouton d'envoi */}
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Send className="h-5 w-5" />
                <span>Envoyer votre feedback</span>
              </button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Feedback;
