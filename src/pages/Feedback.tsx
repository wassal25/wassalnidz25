
// =======================================================
// Page de Feedback
// Description: Page pour recueillir les avis et suggestions des utilisateurs
// =======================================================

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SendHorizontal, ThumbsUp, Star, MessageCircle, Bug, Lightbulb, AlertTriangle, Heart } from "lucide-react";

/**
 * Composant Feedback - Page pour recueillir l'avis des utilisateurs
 * 
 * Cette page permet aux utilisateurs de soumettre leurs commentaires,
 * suggestions et évaluations concernant l'application.
 */
const Feedback = () => {
  // États pour les données du formulaire
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackType, setFeedbackType] = useState("suggestion");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  // Suggestions prédéfinies par type de feedback
  const suggestionTemplates = {
    suggestion: [
      "J'aimerais suggérer d'ajouter plus de trajets entre les quartiers périphériques.",
      "Il serait utile d'avoir une option pour les trajets réguliers (abonnements).",
      "Je propose d'ajouter une fonctionnalité de messagerie directe avec le conducteur.",
      "Pourriez-vous ajouter un système de fidélité avec des points ou réductions?"
    ],
    problem: [
      "J'ai rencontré un problème lors de la réservation, le bouton ne fonctionne pas correctement.",
      "L'application est lente lors de la recherche de trajets aux heures de pointe.",
      "Je ne reçois pas les notifications des messages du conducteur.",
      "Le système de paiement affiche une erreur lors de la validation."
    ],
    other: [
      "Je souhaite signaler un conducteur pour son comportement inapproprié.",
      "Comment puis-je devenir partenaire de votre plateforme?",
      "J'aimerais en savoir plus sur vos mesures de sécurité pour les passagers.",
      "Je souhaite vous féliciter pour la qualité de votre service client."
    ]
  };

  // Effet pour animer les transitions lors du changement de type de feedback
  useEffect(() => {
    // Réinitialiser la suggestion sélectionnée lors du changement de type
    setSelectedSuggestion("");
  }, [feedbackType]);

  // Gestionnaire de suggestions prédéfinies
  const handleSuggestionClick = (suggestion: string) => {
    if (selectedSuggestion === suggestion) {
      setSelectedSuggestion("");
      setMessage(message.replace(suggestion, "").trim());
    } else {
      setSelectedSuggestion(suggestion);
      setMessage((prev) => (prev ? `${prev}\n\n${suggestion}` : suggestion));
    }
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simuler l'envoi du feedback
    console.log({
      name,
      email,
      feedbackType,
      rating,
      message
    });
    
    // Réinitialiser le formulaire et afficher un message de confirmation
    setSubmitted(true);
    setName("");
    setEmail("");
    setFeedbackType("suggestion");
    setRating(5);
    setMessage("");
    setSelectedSuggestion("");
    
    // Réinitialiser l'état de soumission après 5 secondes
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  // Rendu des étoiles pour la notation
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={28}
          className={`cursor-pointer transition-all duration-300 ${
            i <= rating ? "fill-yellow-400 text-yellow-400" : "text-white/40"
          } hover:scale-110`}
          onClick={() => setRating(i)}
        />
      );
    }
    
    return stars;
  };

  // Options de navigation des onglets
  const tabs = [
    { name: "Formulaire", icon: <MessageCircle size={18} /> },
    { name: "Comment ça marche", icon: <Lightbulb size={18} /> }
  ];

  // Icône correspondant au type de feedback
  const getFeedbackTypeIcon = () => {
    switch (feedbackType) {
      case "suggestion":
        return <Lightbulb size={20} />;
      case "problem":
        return <Bug size={20} />;
      case "other":
        return <AlertTriangle size={20} />;
      default:
        return <MessageCircle size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-teal-600 to-[#45B39D] flex flex-col">
      {/* En-tête */}
      <Header />
      
      {/* Contenu principal */}
      <main className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        {/* Section titre */}
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Votre Avis Compte
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            Partagez vos commentaires, suggestions et idées pour améliorer notre service
          </p>
        </div>

        {/* Onglets de navigation */}
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 mb-8 max-w-md mx-auto">
          <div className="flex">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === index
                    ? "bg-white text-teal-700 shadow-md"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className="max-w-4xl mx-auto">
          {/* Onglet Formulaire */}
          {activeTab === 0 && (
            <div className="bg-gradient-to-br from-white/10 to-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 animate-fade-up">
              {submitted ? (
                <div className="text-center py-12 px-4">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Heart className="text-white" size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Merci pour votre feedback!</h3>
                  <p className="text-white/80 text-lg max-w-md mx-auto mb-6">
                    Votre avis est important pour nous et nous aidera à améliorer notre service.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300"
                  >
                    Envoyer un autre feedback
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Informations personnelles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="name" className="text-white/90 text-sm font-medium mb-2 block">
                        Nom
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Votre nom"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300 group-hover:bg-white/20"
                        required
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="email" className="text-white/90 text-sm font-medium mb-2 block">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Votre email"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300 group-hover:bg-white/20"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Type de feedback */}
                  <div>
                    <label className="text-white/90 text-sm font-medium mb-2 block">
                      Type de feedback
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <label className="relative">
                        <input
                          type="radio"
                          name="feedbackType"
                          value="suggestion"
                          checked={feedbackType === "suggestion"}
                          onChange={() => setFeedbackType("suggestion")}
                          className="sr-only"
                        />
                        <div className={`px-4 py-3 rounded-xl border ${
                          feedbackType === "suggestion"
                            ? "bg-[#FEC6A1]/30 border-[#FEC6A1]"
                            : "bg-white/10 border-white/20"
                        } cursor-pointer transition-all flex items-center justify-center hover:bg-white/20`}>
                          <Lightbulb size={18} className="mr-2" />
                          <span className="text-white">Suggestion</span>
                        </div>
                      </label>
                      <label className="relative">
                        <input
                          type="radio"
                          name="feedbackType"
                          value="problem"
                          checked={feedbackType === "problem"}
                          onChange={() => setFeedbackType("problem")}
                          className="sr-only"
                        />
                        <div className={`px-4 py-3 rounded-xl border ${
                          feedbackType === "problem"
                            ? "bg-[#FEC6A1]/30 border-[#FEC6A1]"
                            : "bg-white/10 border-white/20"
                        } cursor-pointer transition-all flex items-center justify-center hover:bg-white/20`}>
                          <Bug size={18} className="mr-2" />
                          <span className="text-white">Problème</span>
                        </div>
                      </label>
                      <label className="relative">
                        <input
                          type="radio"
                          name="feedbackType"
                          value="other"
                          checked={feedbackType === "other"}
                          onChange={() => setFeedbackType("other")}
                          className="sr-only"
                        />
                        <div className={`px-4 py-3 rounded-xl border ${
                          feedbackType === "other"
                            ? "bg-[#FEC6A1]/30 border-[#FEC6A1]"
                            : "bg-white/10 border-white/20"
                        } cursor-pointer transition-all flex items-center justify-center hover:bg-white/20`}>
                          <AlertTriangle size={18} className="mr-2" />
                          <span className="text-white">Autre</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  {/* Suggestions prédéfinies */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h4 className="text-white text-sm font-medium mb-3 flex items-center">
                      {getFeedbackTypeIcon()}
                      <span className="ml-2">Suggestions courantes</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {suggestionTemplates[feedbackType as keyof typeof suggestionTemplates].map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={`text-xs px-3 py-1.5 rounded-full text-white transition-all duration-300 ${
                            selectedSuggestion === suggestion
                              ? "bg-[#FEC6A1] text-teal-900"
                              : "bg-white/10 hover:bg-white/20"
                          }`}
                        >
                          {suggestion.length > 40 ? suggestion.substring(0, 40) + "..." : suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Notation */}
                  <div>
                    <label className="text-white/90 text-sm font-medium mb-2 block">
                      Comment noteriez-vous notre service ?
                    </label>
                    <div className="flex items-center justify-center space-x-2 py-4 bg-white/5 rounded-xl">
                      {renderStars()}
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="text-white/90 text-sm font-medium mb-2 block">
                      Votre message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Partagez vos commentaires, idées ou suggestions..."
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300 resize-none"
                      required
                    />
                  </div>
                  
                  {/* Bouton d'envoi */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-[#FEC6A1] to-[#45B39D] hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg flex items-center hover:scale-105 transform"
                    >
                      <SendHorizontal size={18} className="mr-2" />
                      Envoyer mon feedback
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Onglet Comment ça marche */}
          {activeTab === 1 && (
            <div className="bg-gradient-to-br from-white/10 to-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 animate-fade-up">
              <div className="text-center mb-8">
                <Lightbulb size={40} className="mx-auto mb-4 text-yellow-300" />
                <h3 className="text-2xl font-bold text-white mb-2">Comment fonctionne le feedback ?</h3>
                <p className="text-white/80">
                  Nous prenons votre avis très au sérieux pour améliorer constamment notre service.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 p-6 rounded-xl border border-white/20 transform transition-all duration-300 hover:translate-y-[-5px] hover:bg-white/20">
                  <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
                    <MessageCircle size={24} className="text-teal-300" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">1. Partagez</h4>
                  <p className="text-white/70">
                    Partagez vos idées, suggestions ou problèmes rencontrés lors de l'utilisation de notre service.
                  </p>
                </div>

                <div className="bg-white/10 p-6 rounded-xl border border-white/20 transform transition-all duration-300 hover:translate-y-[-5px] hover:bg-white/20">
                  <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
                    <Lightbulb size={24} className="text-yellow-300" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">2. Nous analysons</h4>
                  <p className="text-white/70">
                    Notre équipe analyse chaque retour avec attention pour comprendre vos besoins et préoccupations.
                  </p>
                </div>

                <div className="bg-white/10 p-6 rounded-xl border border-white/20 transform transition-all duration-300 hover:translate-y-[-5px] hover:bg-white/20">
                  <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
                    <ThumbsUp size={24} className="text-teal-300" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">3. Nous améliorons</h4>
                  <p className="text-white/70">
                    Vos retours nous aident à améliorer continuellement l'application et à offrir une meilleure expérience.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setActiveTab(0)}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300"
                >
                  Partager mon avis maintenant
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Pied de page */}
      <Footer />
    </div>
  );
};

export default Feedback;
