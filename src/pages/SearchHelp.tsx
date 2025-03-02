
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, MapPin, Calendar, Clock, Info, AlertTriangle } from "lucide-react";

const SearchHelp = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500/80 to-teal-600/90 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-lg animate-fade-up">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Comment rechercher un trajet</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <MapPin className="text-[#FEC6A1] mr-3" size={24} />
                <h2 className="text-xl font-bold text-white">Lieu de départ et destination</h2>
              </div>
              <p className="text-white/90">
                Sélectionnez votre point de départ et votre destination parmi les options disponibles. Vous pouvez choisir parmi les principales localités de la wilaya de Constantine.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Calendar className="text-[#FEC6A1] mr-3" size={24} />
                <h2 className="text-xl font-bold text-white">Date du trajet</h2>
              </div>
              <p className="text-white/90">
                Sélectionnez la date à laquelle vous souhaitez voyager. Les trajets sont disponibles sur une période de 7 jours.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Clock className="text-[#FEC6A1] mr-3" size={24} />
                <h2 className="text-xl font-bold text-white">Heure de départ</h2>
              </div>
              <p className="text-white/90">
                Choisissez l'heure de départ qui vous convient. Les trajets sont généralement proposés aux heures de pointe entre 7h00 et 19h00.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Search className="text-[#FEC6A1] mr-3" size={24} />
                <h2 className="text-xl font-bold text-white">Recherche et filtres</h2>
              </div>
              <p className="text-white/90">
                Cliquez sur le bouton "Rechercher" pour afficher les trajets correspondant à vos critères. Utilisez "Réinitialiser" pour effacer tous les filtres.
              </p>
            </div>
          </div>
          
          <div className="bg-[#FEC6A1]/20 p-6 rounded-xl mb-8">
            <div className="flex items-start">
              <Info className="text-white mr-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Conseils pour votre recherche</h3>
                <ul className="list-disc pl-6 text-white/90 space-y-2">
                  <li>Commencez par une recherche large puis affinez progressivement</li>
                  <li>Consultez régulièrement l'application pour voir les nouveaux trajets</li>
                  <li>Enregistrez vos trajets favoris pour y accéder rapidement</li>
                  <li>Vérifiez les trajets similaires si votre recherche exacte ne donne pas de résultats</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-500/20 p-6 rounded-xl mb-8">
            <div className="flex items-start">
              <AlertTriangle className="text-orange-300 mr-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Important</h3>
                <p className="text-white/90">
                  Si vous ne trouvez pas de trajet correspondant à vos critères, vous pouvez créer votre propre demande de trajet ou vous inscrire en tant que conducteur pour proposer un nouveau trajet.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300"
            >
              Retour à l'accueil
            </button>
            <button 
              onClick={() => navigate("/create-trip")}
              className="px-6 py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300"
            >
              Proposer un trajet
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchHelp;
