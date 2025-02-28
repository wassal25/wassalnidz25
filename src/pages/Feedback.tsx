
// =======================================================
// Page de Feedback
// Description: Page pour recueillir les avis et suggestions des utilisateurs
// =======================================================

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SendHorizontal, ThumbsUp, Star, MessageCircle } from "lucide-react";

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
          }`}
          onClick={() => setRating(i)}
        />
      );
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500/80 to-teal-600/90 flex flex-col">
      {/* En-tête */}
      <Header />
      
      {/* Contenu principal */}
      <main className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        {/* Section titre */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Votre Avis Compte
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            Partagez vos commentaires, suggestions et idées pour améliorer notre service
          </p>
        </div>

        {/* Section de formulaire */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 animate-fade-up">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="text-green-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Merci pour votre feedback!</h3>
                <p className="text-white/80">
                  Votre avis est important pour nous et nous aidera à améliorer notre service.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations personnelles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="text-white/90 text-sm font-medium mb-2 block">
                      Nom
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-white/90 text-sm font-medium mb-2 block">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
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
                      } cursor-pointer transition-all flex items-center justify-center`}>
                        <MessageCircle size={16} className="mr-2" />
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
                      } cursor-pointer transition-all flex items-center justify-center`}>
                        <MessageCircle size={16} className="mr-2" />
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
                      } cursor-pointer transition-all flex items-center justify-center`}>
                        <MessageCircle size={16} className="mr-2" />
                        <span className="text-white">Autre</span>
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Notation */}
                <div>
                  <label className="text-white/90 text-sm font-medium mb-2 block">
                    Comment noteriez-vous notre service ?
                  </label>
                  <div className="flex items-center justify-center space-x-2 py-4">
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
                    className="px-8 py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg flex items-center"
                  >
                    <SendHorizontal size={18} className="mr-2" />
                    Envoyer mon feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      
      {/* Pied de page */}
      <Footer />
    </div>
  );
};

export default Feedback;
