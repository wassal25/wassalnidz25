
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500/80 to-teal-600/90 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-lg animate-fade-up">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">À propos de WASSALNI</h1>
          
          <div className="space-y-6 text-white/90">
            <p>
              WASSALNI est une application innovante de covoiturage spécialement conçue pour faciliter les déplacements au sein de la wilaya de Constantine, en Algérie.
            </p>
            
            <div className="bg-white/10 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-white mb-3">Notre mission</h2>
              <p>
                Nous visons à réduire les embouteillages, diminuer l'empreinte carbone et faciliter les déplacements quotidiens des habitants de Constantine grâce à une solution de transport collaboratif moderne, sécurisée et efficace.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-white mb-3">Comment ça fonctionne ?</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Inscrivez-vous gratuitement comme conducteur ou passager</li>
                <li>Publiez votre trajet ou recherchez un trajet existant</li>
                <li>Réservez votre place dans un véhicule</li>
                <li>Communiquez avec les autres participants via le chat</li>
                <li>Voyagez ensemble et partagez les frais</li>
              </ol>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-white mb-3">Nos valeurs</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sécurité - Vérification des conducteurs et système d'évaluation</li>
                <li>Économie - Réduction des frais de transport</li>
                <li>Écologie - Diminution de l'empreinte carbone</li>
                <li>Communauté - Création de liens sociaux entre habitants</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
