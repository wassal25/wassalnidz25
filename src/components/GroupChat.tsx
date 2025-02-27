
// =======================================================
// Composant de chat de groupe
// Description: Interface de discussion entre passagers et chauffeur
// =======================================================

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, Users } from "lucide-react";

// Interfaces pour les types de données
interface Message {
  id: number;
  text: string;
  sender: {
    id: string;
    name: string;
    role: "driver" | "passenger";
  };
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
  role: "driver" | "passenger";
  isOnline: boolean;
}

interface GroupChatProps {
  tripId: string;
  tripInfo: {
    from: string;
    to: string;
    date: string;
    time: string;
  };
  currentUser: {
    id: string;
    name: string;
    role: "driver" | "passenger";
  };
}

const GroupChat = ({ tripId, tripInfo, currentUser }: GroupChatProps) => {
  // États pour gérer le chat
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isMembersListOpen, setIsMembersListOpen] = useState(false);
  
  // Données simulées
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Bonjour à tous ! Je suis le chauffeur pour le trajet ${tripInfo.from} → ${tripInfo.to}. N'hésitez pas à me contacter si vous avez des questions.`,
      sender: {
        id: "driver-1",
        name: "Ahmed B.",
        role: "driver"
      },
      timestamp: new Date(Date.now() - 3600000), // 1 heure plus tôt
    },
    {
      id: 2,
      text: "Bonjour ! À quelle heure exactement comptez-vous arriver au point de départ ?",
      sender: {
        id: "passenger-1",
        name: "Karim L.",
        role: "passenger"
      },
      timestamp: new Date(Date.now() - 1800000), // 30 minutes plus tôt
    },
    {
      id: 3,
      text: "Je serai là 10 minutes avant l'heure prévue. Merci de votre ponctualité !",
      sender: {
        id: "driver-1",
        name: "Ahmed B.",
        role: "driver"
      },
      timestamp: new Date(Date.now() - 1500000), // 25 minutes plus tôt
    },
  ]);
  
  const [members, setMembers] = useState<User[]>([
    {
      id: "driver-1",
      name: "Ahmed B.",
      role: "driver",
      isOnline: true
    },
    {
      id: "passenger-1",
      name: "Karim L.",
      role: "passenger",
      isOnline: true
    },
    {
      id: "passenger-2",
      name: "Samia T.",
      role: "passenger",
      isOnline: false
    },
    {
      id: currentUser.id,
      name: currentUser.name,
      role: currentUser.role,
      isOnline: true
    }
  ]);
  
  // Référence pour faire défiler automatiquement vers le bas
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fonction pour faire défiler vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Défilement automatique lors de l'ouverture ou de nouveaux messages
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Gestionnaire d'envoi de message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() === "") return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: currentUser,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  // Formatage de l'heure pour affichage
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Formatage de la date pour le titre du chat
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long"
    }).format(date);
  };

  return (
    <>
      {/* Bouton flottant pour ouvrir le chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-[#FEC6A1] to-[#45B39D] text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 z-50 group"
        >
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
            3
          </div>
          <MessageSquare size={24} />
          <span className="absolute left-0 -ml-2 -mt-10 w-max bg-black/70 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Chat de groupe
          </span>
        </button>
      )}

      {/* Boîte de dialogue de chat */}
      <div
        className={`fixed bottom-0 right-0 w-full sm:w-96 bg-white/10 backdrop-blur-xl rounded-t-2xl sm:rounded-tl-2xl sm:rounded-tr-none border border-white/20 shadow-2xl transition-all duration-300 z-50 ${
          isOpen ? "translate-y-0" : "translate-y-full hidden"
        }`}
      >
        {/* En-tête du chat */}
        <div className="bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 p-4 rounded-t-2xl sm:rounded-tl-2xl sm:rounded-tr-none flex justify-between items-center">
          <div>
            <h3 className="text-white font-medium flex items-center">
              <MessageSquare size={18} className="mr-2" />
              Trajet {tripInfo.from} → {tripInfo.to}
            </h3>
            <p className="text-white/80 text-xs">
              {formatDate(tripInfo.date)} - {tripInfo.time}
            </p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsMembersListOpen(!isMembersListOpen)}
              className="text-white/70 hover:text-white transition-colors mr-3"
              title="Voir les participants"
            >
              <Users size={20} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              title="Fermer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Liste des membres (conditionnellement affichée) */}
        {isMembersListOpen && (
          <div className="bg-black/30 backdrop-blur-md p-4 border-b border-white/10 animate-fade-up">
            <h4 className="text-white font-medium mb-2">Participants ({members.length})</h4>
            <ul className="space-y-2">
              {members.map((member) => (
                <li key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${member.isOnline ? 'bg-green-400' : 'bg-gray-400'} mr-2`}></div>
                    <span className="text-white">{member.name}</span>
                  </div>
                  <span className="text-white/60 text-xs">
                    {member.role === 'driver' ? 'Chauffeur' : 'Passager'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Corps du chat - messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender.id === currentUser.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender.id === currentUser.id
                    ? "bg-gradient-to-r from-[#FEC6A1]/60 to-[#45B39D]/60 text-white"
                    : msg.sender.role === "driver"
                    ? "bg-teal-700/40 text-white"
                    : "bg-white/20 text-white"
                }`}
              >
                {msg.sender.id !== currentUser.id && (
                  <p className="text-xs font-medium mb-1 opacity-80">
                    {msg.sender.name} {msg.sender.role === "driver" && "🚗"}
                  </p>
                )}
                <p>{msg.text}</p>
                <p className="text-xs mt-1 opacity-70 text-right">
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Formulaire d'envoi de message */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tapez votre message..."
              className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 text-white placeholder:text-white/50 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 text-white px-4 rounded-r-lg hover:from-[#FEC6A1] hover:to-[#45B39D] transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default GroupChat;
