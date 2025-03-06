
// =======================================================
// Page d'accueil principale
// Description: Interface principale de l'application
// =======================================================

import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TripCard from "@/components/TripCard";
import Map from "@/components/Map";
import GroupChat from "@/components/GroupChat";
import { Search, MapPin, Calendar, Clock, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

// -------------------------------------------------------
// DONNÉES SIMULÉES
// Description: Données de démonstration pour l'affichage des trajets
// -------------------------------------------------------
const trips = [
  {
    id: "trip-1",
    from: "Constantine Centre",
    to: "Hamma Bouziane",
    date: "2024-03-20",
    time: "08:00",
    price: 100,
    seats: 3,
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2000",
    driverName: "Ahmed B."
  },
  {
    id: "trip-2",
    from: "Ali Mendjeli",
    to: "Constantine Centre",
    date: "2024-03-21",
    time: "07:30",
    price: 150,
    seats: 4,
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2000",
    driverName: "Karim M."
  },
  {
    id: "trip-3",
    from: "El Khroub",
    to: "Constantine Centre",
    date: "2024-03-22",
    time: "09:00",
    price: 120,
    seats: 2,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=2000",
    driverName: "Sofiane L."
  },
  {
    id: "trip-4",
    from: "Didouche Mourad",
    to: "Constantine Centre",
    date: "2024-03-22",
    time: "08:30",
    price: 130,
    seats: 3,
    image: "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=2000",
    driverName: "Nassim K."
  },
  {
    id: "trip-5",
    from: "Ain Smara",
    to: "Constantine Centre",
    date: "2024-03-23",
    time: "10:00",
    price: 110,
    seats: 4,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000",
    driverName: "Riad D."
  },
  {
    id: "trip-6",
    from: "Zighoud Youcef",
    to: "Constantine Centre",
    date: "2024-03-23",
    time: "09:30",
    price: 140,
    seats: 2,
    image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=2000",
    driverName: "Ismail T."
  },
  // Nouvelles destinations ajoutées
  {
    id: "trip-7",
    from: "Constantine Université",
    to: "Ali Mendjeli",
    date: "2024-03-24",
    time: "08:00",
    price: 105,
    seats: 3,
    image: "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=2000",
    driverName: "Mohammed H."
  },
  {
    id: "trip-8",
    from: "Nouvelle Ville",
    to: "Constantine Centre",
    date: "2024-03-24",
    time: "07:00",
    price: 95,
    seats: 4,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=2000",
    driverName: "Yacine F."
  },
  {
    id: "trip-9",
    from: "Cité Daksi",
    to: "El Khroub",
    date: "2024-03-25",
    time: "08:30",
    price: 115,
    seats: 2,
    image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=2000",
    driverName: "Hichem B."
  },
  {
    id: "trip-10",
    from: "Cité Zouaghi",
    to: "Constantine Centre",
    date: "2024-03-25",
    time: "07:30",
    price: 125,
    seats: 3,
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2000",
    driverName: "Amir T."
  },
  {
    id: "trip-11",
    from: "Cité Boussouf",
    to: "Didouche Mourad",
    date: "2024-03-26",
    time: "08:00",
    price: 135,
    seats: 4,
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2000",
    driverName: "Omar L."
  },
  {
    id: "trip-12",
    from: "Cité des Frères Abbas",
    to: "Constantine Centre",
    date: "2024-03-26",
    time: "09:00",
    price: 145,
    seats: 2,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000",
    driverName: "Bilal M."
  },
];

// -------------------------------------------------------
// COMPOSANT PRINCIPAL
// Description: Interface principale de l'application
// -------------------------------------------------------
const Index = () => {
  // ==== ÉTATS ET HOOKS ====
  // Navigation
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // États pour la recherche et le filtrage
  const [departSearch, setDepartSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [timeSearch, setTimeSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  
  // État pour le trajet réservé et le chat
  const [reservedTrip, setReservedTrip] = useState<string | null>(null);
  const [reservedTripDetails, setReservedTripDetails] = useState<(typeof trips)[0] | null>(null);
  
  // ==== PRÉPARATION DES DONNÉES ====
  // Extraction des valeurs uniques pour les filtres
  const departures = [...new Set(trips.map(trip => trip.from))];
  const destinations = [...new Set(trips.map(trip => trip.to))];
  const times = [...new Set(trips.map(trip => trip.time))];

  // ==== FONCTIONS ====
  // Filtrage des trajets selon les critères de recherche
  const filteredTrips = trips.filter(trip => {
    const matchesDepart = !departSearch || trip.from.toLowerCase().includes(departSearch.toLowerCase());
    const matchesDestination = !destinationSearch || trip.to.toLowerCase().includes(destinationSearch.toLowerCase());
    const matchesTime = !timeSearch || trip.time === timeSearch;
    const matchesDate = !dateSearch || trip.date === dateSearch;
    const matchesSelectedDestination = !selectedDestination || trip.to === selectedDestination;
    
    return matchesDepart && matchesDestination && matchesTime && matchesDate && matchesSelectedDestination;
  });

  // Gestionnaire de réservation
  const handleReservation = (trip: (typeof trips)[0]) => {
    // Naviguer vers la page de réservation avec les détails du trajet
    console.log("Navigation vers la page de réservation", trip);
    navigate("/reservation", { state: { trip } });
  };

  // Simuler une réservation déjà effectuée pour le chat
  // Dans une vraie application, cela viendrait d'une base de données
  const simulatedReservation = () => {
    if (!reservedTrip) {
      // Simuler une réservation pour le premier trajet
      const trip = trips[0];
      setReservedTrip(trip.id);
      setReservedTripDetails(trip);
    }
  };

  // Fonctions interactives pour les différentes sections
  const handleMapClick = () => {
    toast.info("Ouverture de la carte complète", {
      description: "Vous seriez redirigé vers une vue détaillée de la carte",
    });
    navigate("/map");
  };

  const handleSearchClick = () => {
    toast.success("Recherche lancée", {
      description: "Résultats de recherche filtrés selon vos critères",
    });
  };

  const handleSuggestionClick = (destination: string) => {
    setSelectedDestination(destination);
    toast.info(`Filtrage par ${destination}`, {
      description: `Affichage des trajets vers ${destination}`,
    });
  };

  const handleChatClick = () => {
    if (!reservedTripDetails) {
      toast.info("Accès au chat global", {
        description: "Vous seriez redirigé vers le chat communautaire",
      });
      navigate("/community-chat");
    }
  };

  // Appel à la simulation pour démonstration
  // Dans une application réelle, on vérifierait les réservations lors du chargement
  simulatedReservation();

  // ==== RENDU ====
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500/80 to-teal-600/90 flex flex-col">
      {/* ==== HEADER ==== */}
      <Header />
      
      {/* ==== MAIN CONTENT ==== */}
      <main className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        {/* Section titre - Rendue interactive, cliquable pour aller à l'À propos */}
        <div 
          className="text-center mb-16 animate-fade-up cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/about")}
        >
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            {t('travelTogether')}
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            {t('clickToLearnMore')}
          </p>
        </div>

        {/* ==== SEARCH SECTION ==== */}
        <div className="bg-teal-600/40 backdrop-blur-sm rounded-2xl p-6 mb-12 animate-fade-up">
          <div className="mb-6 cursor-pointer hover:text-white/80 transition-colors" onClick={() => navigate("/search-help")}>
            <h3 className="text-xl font-semibold text-white mb-2">{t('searchTrip')}</h3>
            <p className="text-white/80 text-sm">
              {t('findTrip')}
            </p>
          </div>
          
          {/* Filtres de recherche */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Champ de départ */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
              <select
                value={departSearch}
                onChange={(e) => setDepartSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none cursor-pointer"
                onClick={() => toast.info("Sélection du lieu de départ")}
              >
                <option value="">{t('departureLocation')}</option>
                {departures.map((departure) => (
                  <option key={departure} value={departure} className="text-gray-900">
                    {departure}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Champ de destination */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
              <select
                value={destinationSearch}
                onChange={(e) => setDestinationSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none cursor-pointer"
                onClick={() => toast.info("Sélection de la destination")}
              >
                <option value="">{t('destination')}</option>
                {destinations.map((destination) => (
                  <option key={destination} value={destination} className="text-gray-900">
                    {destination}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Champ de date */}
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
              <input
                type="date"
                value={dateSearch}
                onChange={(e) => setDateSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                onClick={() => toast.info("Sélection de la date")}
              />
            </div>
            
            {/* Champ d'heure */}
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
              <select
                value={timeSearch}
                onChange={(e) => setTimeSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none cursor-pointer"
                onClick={() => toast.info("Sélection de l'heure")}
              >
                <option value="">{t('departureTime')}</option>
                {times.map((time) => (
                  <option key={time} value={time} className="text-gray-900">
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Boutons de recherche */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => {
                setDepartSearch("");
                setDestinationSearch("");
                setTimeSearch("");
                setDateSearch("");
                setSelectedDestination("");
                toast.info("Critères réinitialisés");
              }}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl mr-4 transition-all duration-300"
            >
              {t('reset')}
            </button>
            <button 
              className="px-8 py-2 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 flex items-center"
              onClick={handleSearchClick}
            >
              <Search className="mr-2" size={18} />
              {t('search')}
            </button>
          </div>
        </div>

        {/* ==== RESULTS SECTION ==== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip, index) => (
              <div key={index} className="relative cursor-pointer" onClick={() => handleReservation(trip)}>
                <TripCard 
                  {...trip} 
                  onReserve={() => handleReservation(trip)} 
                />
              </div>
            ))
          ) : (
            <div 
              className="col-span-full text-center py-12 cursor-pointer hover:bg-teal-600/30 rounded-xl transition-all" 
              onClick={() => navigate("/create-trip")}
            >
              <p className="text-white text-xl">{t('noTripsFound')}</p>
              <p className="text-white/80 mt-2">{t('clickToCreateTrip')}</p>
            </div>
          )}
        </div>

        {/* ==== MAP SECTION ==== */}
        <div 
          className="bg-teal-600/40 backdrop-blur-sm p-6 rounded-2xl animate-fade-up cursor-pointer hover:bg-teal-600/60 transition-all"
          onClick={handleMapClick}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {t('discoverMap')}
          </h2>
          <Map />
        </div>
      </main>

      {/* ==== FOOTER ==== */}
      <Footer />
      
      {/* ==== CHAT COMPONENT ==== */}
      {/* Chat de groupe - Affiché uniquement si l'utilisateur a une réservation active */}
      {reservedTripDetails ? (
        <GroupChat 
          tripId={reservedTripDetails.id}
          tripInfo={{
            from: reservedTripDetails.from,
            to: reservedTripDetails.to,
            date: reservedTripDetails.date,
            time: reservedTripDetails.time
          }}
          currentUser={{
            id: "current-user",
            name: "Moi",
            role: "passenger"
          }}
        />
      ) : (
        <div 
          className="fixed bottom-6 right-6 bg-[#FEC6A1]/90 p-3 rounded-full shadow-lg cursor-pointer hover:bg-[#FEC6A1] transition-all"
          onClick={handleChatClick}
        >
          <MessageSquare size={28} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default Index;
