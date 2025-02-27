
import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "driver";
  timestamp: Date;
}

interface ChatBoxProps {
  driverName: string;
  tripId: string;
  onClose: () => void;
}

const ChatBox = ({ driverName, tripId, onClose }: ChatBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Bonjour ! Je suis ${driverName}, votre chauffeur pour ce trajet. N'hésitez pas à me contacter si vous avez des questions.`,
      sender: "driver",
      timestamp: new Date(),
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() === "") return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulation de réponse du chauffeur après 1s
    setTimeout(() => {
      const driverResponse: Message = {
        id: messages.length + 2,
        text: "D'accord, merci pour votre message !",
        sender: "driver",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, driverResponse]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Bouton flottant pour ouvrir le chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-[#FEC6A1] to-[#45B39D] text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse z-50"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Boîte de dialogue de chat */}
      <div
        className={`fixed bottom-0 right-0 w-80 sm:w-96 bg-white/10 backdrop-blur-xl rounded-tl-2xl border border-white/20 shadow-2xl transition-all duration-300 z-50 ${
          isOpen ? "translate-y-0" : "translate-y-full hidden"
        }`}
      >
        {/* En-tête du chat */}
        <div className="bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 p-4 rounded-tl-2xl flex justify-between items-center">
          <h3 className="text-white font-medium flex items-center">
            <MessageSquare size={18} className="mr-2" />
            Chat avec {driverName}
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Corps du chat - messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-[#FEC6A1]/60 to-[#45B39D]/60 text-white"
                    : "bg-white/20 text-white"
                }`}
              >
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

export default ChatBox;
