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
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext"; 
import { supabase } from "@/lib/supabase";

const Feedback = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Options pour les types de feedback
  const feedbackOptions = [
    { id: "suggestion", label: t('suggestionOption') },
    { id: "problem", label: t('problemOption') },
    { id: "complaint", label: t('complaintOption') },
    { id: "appreciation", label: t('appreciationOption') },
    { id: "other", label: t('otherOption') }
  ];

  // Suggestions de réponses prédéfinies selon le type
  const suggestionsByType = {
    suggestion: [
      t('language') === 'fr' ? "Je souhaite suggérer une amélioration pour la recherche de trajets." : 
      t('language') === 'ar' ? "أود أن أقترح تحسينًا لميزة البحث عن الرحلات." : 
      "I would like to suggest an improvement for the trip search feature.",
      
      t('language') === 'fr' ? "Je propose d'ajouter une fonctionnalité de partage de trajet." : 
      t('language') === 'ar' ? "أقترح إضافة ميزة مشاركة الرحلة." : 
      "I suggest adding a trip sharing feature.",
      
      t('language') === 'fr' ? "Voici une idée pour améliorer l'interface utilisateur." : 
      t('language') === 'ar' ? "إليك فكرة لتحسين واجهة المستخدم." : 
      "Here's an idea to improve the user interface."
    ],
    problem: [
      t('language') === 'fr' ? "J'ai rencontré un problème lors de la réservation d'un trajet." : 
      t('language') === 'ar' ? "واجهت مشكلة عند حجز رحلة." : 
      "I encountered a problem when booking a trip.",
      
      t('language') === 'fr' ? "L'application ne fonctionne pas correctement sur mon appareil." : 
      t('language') === 'ar' ? "التطبيق لا يعمل بشكل صحيح على جهازي." : 
      "The application doesn't work properly on my device.",
      
      t('language') === 'fr' ? "Je n'arrive pas à accéder à certaines fonctionnalités." : 
      t('language') === 'ar' ? "لا يمكنني الوصول إلى بعض الميزات." : 
      "I can't access certain features."
    ],
    complaint: [
      t('language') === 'fr' ? "Je n'ai pas été satisfait du service de covoiturage." : 
      t('language') === 'ar' ? "لم أكن راضيًا عن خدمة مشاركة الركوب." : 
      "I was not satisfied with the carpooling service.",
      
      t('language') === 'fr' ? "Le chauffeur n'était pas ponctuel." : 
      t('language') === 'ar' ? "لم يكن السائق في الموعد المحدد." : 
      "The driver was not punctual.",
      
      t('language') === 'fr' ? "Je souhaite signaler un comportement inapproprié." : 
      t('language') === 'ar' ? "أود الإبلاغ عن سلوك غير لائق." : 
      "I want to report inappropriate behavior."
    ],
    appreciation: [
      t('language') === 'fr' ? "Je tiens à exprimer ma satisfaction pour votre service." : 
      t('language') === 'ar' ? "أود أن أعبر عن رضاي عن خدمتكم." : 
      "I would like to express my satisfaction with your service.",
      
      t('language') === 'fr' ? "Votre application est très intuitive et facile à utiliser." : 
      t('language') === 'ar' ? "تطبيقكم بديهي وسهل الاستخدام." : 
      "Your application is very intuitive and easy to use.",
      
      t('language') === 'fr' ? "J'apprécie particulièrement la fonctionnalité de..." : 
      t('language') === 'ar' ? "أقدر بشكل خاص ميزة..." : 
      "I particularly appreciate the feature of..."
    ],
    other: [
      t('language') === 'fr' ? "J'ai une question concernant votre service." : 
      t('language') === 'ar' ? "لدي سؤال بخصوص خدمتكم." : 
      "I have a question about your service.",
      
      t('language') === 'fr' ? "Je souhaite vous contacter pour une proposition de partenariat." : 
      t('language') === 'ar' ? "أود الاتصال بكم بخصوص اقتراح شراكة." : 
      "I wish to contact you for a partnership proposal.",
      
      t('language') === 'fr' ? "J'aimerais obtenir plus d'informations sur..." : 
      t('language') === 'ar' ? "أود الحصول على مزيد من المعلومات حول..." : 
      "I would like to get more information about..."
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!name || !email || !message || !feedbackType) {
      toast.error(t('requiredFieldsError'));
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Préparer les données du feedback
      const feedbackData = {
        user_id: user?.id || null,
        full_name: name,
        email: email,
        type: feedbackType,
        content: message
      };
      
      // Enregistrer le feedback dans Supabase
      const { error } = await supabase
        .from('feedbacks')
        .insert([feedbackData]);
        
      if (error) {
        console.error("Erreur lors de l'enregistrement du feedback:", error);
        toast.error(t('feedbackError'));
        setIsSubmitting(false);
        return;
      }
      
      toast.success(t('feedbackSuccess'));
      
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
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error(t('feedbackError'));
    } finally {
      setIsSubmitting(false);
    }
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
              {/* Image référençant le chemin correct pour support-team.jpg */}
              <div className="relative h-80 w-full rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-teal-800/70"></div>
                <img 
                  src="/images/support-team.jpg" 
                  alt={t('ourTeamListening')} 
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{t('ourTeamListening')}</h3>
                  <p className="text-white/90">{t('teamDescription')}</p>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">{t('yourOpinionMatters')}</h2>
            <p className="text-white/90 mb-6">
              {t('feedbackDescription')}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-teal-400/20 rounded-full p-2">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{t('communicateWithUs')}</h3>
                  <p className="text-white/80 text-sm">{t('shareIdeas')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-teal-400/20 rounded-full p-2">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{t('reactiveSupport')}</h3>
                  <p className="text-white/80 text-sm">{t('quickResponse')}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Colonne de droite: Formulaire de feedback */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MessageSquare className="mr-2" />
              {t('feedbackFormTitle')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type de feedback */}
              <div>
                <label className="block text-white font-medium mb-2">{t('feedbackType')}</label>
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
                  {t('fullName')}
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
                    placeholder={t('namePlaceholder')}
                    required
                  />
                </div>
              </div>
              
              {/* Champ Email */}
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  {t('email')}
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
                    placeholder={t('emailPlaceholder')}
                    required
                  />
                </div>
              </div>
              
              {/* Champ Téléphone (optionnel) */}
              <div>
                <label htmlFor="phone" className="block text-white font-medium mb-2">
                  {t('phoneNumber')} ({t('language') === 'fr' ? 'optionnel' : t('language') === 'ar' ? 'اختياري' : 'optional'})
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
                    placeholder={t('phoneNumberPlaceholder')}
                  />
                </div>
              </div>
              
              {/* Suggestions basées sur le type de feedback sélectionné */}
              {feedbackType && (
                <div className="space-y-2">
                  <label className="block text-white font-medium mb-1">
                    {t('suggestions')}
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
                  {t('yourMessage')}
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="bg-white/10 border border-white/20 text-white rounded-xl block w-full px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-white/60"
                  placeholder={t('messagePlaceholder')}
                  required
                ></textarea>
              </div>
              
              {/* Bouton d'envoi */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    <span>{t('sending')}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    <span>{t('sendFeedback')}</span>
                  </>
                )}
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
