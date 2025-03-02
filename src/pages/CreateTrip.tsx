
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Calendar, Clock, Users, CreditCard, Car, Info } from "lucide-react";
import { toast } from "sonner";

const CreateTrip = () => {
  const navigate = useNavigate();
  const [isDriver, setIsDriver] = useState(true);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    toast.success(isDriver ? "Trajet proposé avec succès!" : "Demande de trajet publiée!", {
      description: "Vous serez notifié lorsqu'une correspondance sera trouvée.",
      position: "top-center",
      duration: 4000,
    });
    
    // Rediriger vers la page d'accueil
    setTimeout(() => navigate('/'), 2000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500/80 to-teal-600/90 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-lg animate-fade-up max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            {isDriver ? "Proposer un trajet" : "Demander un trajet"}
          </h1>
          
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 p-1 rounded-full">
              <div className="flex">
                <button
                  className={`px-6 py-2 rounded-full transition-all ${
                    isDriver ? 'bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 text-white' : 'text-white/70'
                  }`}
                  onClick={() => setIsDriver(true)}
                >
                  Je suis conducteur
                </button>
                <button
                  className={`px-6 py-2 rounded-full transition-all ${
                    !isDriver ? 'bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 text-white' : 'text-white/70'
                  }`}
                  onClick={() => setIsDriver(false)}
                >
                  Je suis passager
                </button>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
              <input
                type="text"
                placeholder="Lieu de départ"
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
              <input
                type="text"
                placeholder="Destination"
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>
              
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                <input
                  type="time"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>
            </div>
            
            {isDriver && (
              <>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                  <select
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none"
                    required
                  >
                    <option value="" className="text-gray-900">Nombre de places disponibles</option>
                    <option value="1" className="text-gray-900">1 place</option>
                    <option value="2" className="text-gray-900">2 places</option>
                    <option value="3" className="text-gray-900">3 places</option>
                    <option value="4" className="text-gray-900">4 places</option>
                  </select>
                </div>
                
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                  <input
                    type="number"
                    placeholder="Prix par passager (en DA)"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                    min="0"
                  />
                </div>
                
                <div className="relative">
                  <Car className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                  <input
                    type="text"
                    placeholder="Description du véhicule"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                  />
                </div>
              </>
            )}
            
            <div className="relative">
              <Info className="absolute left-4 top-5 text-white/70" size={20} />
              <textarea
                placeholder="Informations complémentaires"
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400 min-h-[100px]"
              ></textarea>
            </div>
            
            <div className="flex justify-center space-x-4 pt-4">
              <button 
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300"
              >
                Annuler
              </button>
              <button 
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300"
              >
                {isDriver ? "Publier le trajet" : "Publier la demande"}
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateTrip;
