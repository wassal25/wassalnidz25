
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Send, User, ArrowLeft } from "lucide-react";

const CommunityChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  
  // Messages simulés pour l'exemple
  const [messages, setMessages] = useState([
    { id: 1, user: "Ahmed", text: "Bonjour à tous! Quelqu'un va vers Ali Mendjeli demain matin?", time: "10:30" },
    { id: 2, user: "Karima", text: "Je pars à 8h de Constantine centre vers Ali Mendjeli", time: "10:32" },
    { id: 3, user: "Mohammed", text: "Est-ce qu'il y a des trajets réguliers entre El Khroub et Constantine?", time: "10:45" },
    { id: 4, user: "Sarah", text: "Je fais ce trajet tous les jours pour aller à l'université, départ 7h30", time: "10:48" },
    { id: 5, user: "Youcef", text: "Y a-t-il quelqu'un qui part de Didouche Mourad ce soir?", time: "11:15" }
  ]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: "Moi",
          text: message,
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setMessage("");
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500/80 to-teal-600/90 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-lg animate-fade-up overflow-hidden max-w-4xl mx-auto flex flex-col h-[70vh]">
          <div className="p-4 bg-white/10 flex items-center justify-between border-b border-white/10">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center text-white hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="mr-2" size={18} />
              Retour
            </button>
            <h2 className="text-xl font-bold text-white text-center">Chat communautaire WASSALNI</h2>
            <div className="w-24"></div> {/* Pour centrer le titre */}
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex ${msg.user === "Moi" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md rounded-2xl p-3 ${
                    msg.user === "Moi" 
                      ? "bg-[#45B39D]/60 rounded-tr-none" 
                      : "bg-white/10 rounded-tl-none"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {msg.user !== "Moi" && (
                      <div className="bg-teal-600/60 rounded-full p-1 mr-2">
                        <User size={14} className="text-white" />
                      </div>
                    )}
                    <span className="font-medium text-white text-sm">{msg.user}</span>
                    <span className="text-white/60 text-xs ml-auto">{msg.time}</span>
                  </div>
                  <p className="text-white/90">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 bg-white/5 border-t border-white/10">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-grow px-4 py-3 bg-white/10 border border-white/20 rounded-l-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button 
                type="submit"
                className="px-4 py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-r-xl transition-all duration-300"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Règles du chat communautaire</h3>
            <ul className="list-disc text-white/90 pl-6 space-y-2">
              <li>Restez respectueux et courtois envers tous les membres</li>
              <li>Ne partagez pas d'informations personnelles sensibles publiquement</li>
              <li>Utilisez le chat principalement pour organiser des trajets</li>
              <li>Signalez tout comportement inapproprié à notre équipe</li>
              <li>Pour les discussions privées, utilisez les messages directs</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommunityChat;
