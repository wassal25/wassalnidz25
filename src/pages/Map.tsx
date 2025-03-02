
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { ArrowLeft, Search } from "lucide-react";

const MapPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500/80 to-teal-600/90 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        <div className="mb-6 flex items-center justify-between">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Retour à l'accueil
          </button>
          
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Rechercher un lieu..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={16} />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-3xl shadow-lg animate-fade-up overflow-hidden">
          <h1 className="text-2xl font-bold text-white mb-4 text-center">Carte des trajets disponibles</h1>
          
          <div className="rounded-2xl overflow-hidden h-[70vh] relative">
            <Map />
            <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm p-3 rounded-lg">
              <div className="flex flex-col space-y-2">
                <button className="w-8 h-8 bg-white/20 hover:bg-white/40 rounded-md flex items-center justify-center text-white transition-colors">
                  +
                </button>
                <button className="w-8 h-8 bg-white/20 hover:bg-white/40 rounded-md flex items-center justify-center text-white transition-colors">
                  -
                </button>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm p-3 rounded-lg text-white">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Trajets disponibles</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Votre position</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center space-x-4">
            <button 
              onClick={() => navigate("/create-trip")}
              className="px-6 py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300"
            >
              Proposer un trajet
            </button>
            <button 
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300"
            >
              Retour aux résultats
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapPage;
