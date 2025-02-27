
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TripCard from "@/components/TripCard";
import Map from "@/components/Map";
import ChatBox from "@/components/ChatBox";
import AnimatedClock from "@/components/AnimatedClock";
import { Search, MapPin, Calendar, Clock } from "lucide-react";
import { useState } from "react";

const trips = [
  {
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
    from: "Constantine Centre",
    to: "Ali Mendjeli",
    date: "2024-03-21",
    time: "07:30",
    price: 150,
    seats: 4,
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2000",
    driverName: "Karim M."
  },
  {
    from: "Constantine Centre",
    to: "El Khroub",
    date: "2024-03-22",
    time: "09:00",
    price: 120,
    seats: 2,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=2000",
    driverName: "Sofiane L."
  },
  {
    from: "Constantine Centre",
    to: "Didouche Mourad",
    date: "2024-03-22",
    time: "08:30",
    price: 130,
    seats: 3,
    image: "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=2000",
    driverName: "Nassim K."
  },
  {
    from: "Constantine Centre",
    to: "Ain Smara",
    date: "2024-03-22",
    time: "10:00",
    price: 110,
    seats: 4,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000",
    driverName: "Riad D."
  },
  {
    from: "Constantine Centre",
    to: "Zighoud Youcef",
    date: "2024-03-22",
    time: "09:30",
    price: 140,
    seats: 2,
    image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=2000",
    driverName: "Ismail T."
  },
];

const Index = () => {
  const [departSearch, setDepartSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [timeSearch, setTimeSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [reservedTrip, setReservedTrip] = useState<(typeof trips)[0] | null>(null);

  const departures = [...new Set(trips.map(trip => trip.from))];
  const destinations = [...new Set(trips.map(trip => trip.to))];
  const times = [...new Set(trips.map(trip => trip.time))];

  const filteredTrips = trips.filter(trip => {
    const matchesDepart = !departSearch || trip.from.toLowerCase().includes(departSearch.toLowerCase());
    const matchesDestination = !destinationSearch || trip.to.toLowerCase().includes(destinationSearch.toLowerCase());
    const matchesTime = !timeSearch || trip.time === timeSearch;
    const matchesDate = !dateSearch || trip.date === dateSearch;
    const matchesSelectedDestination = !selectedDestination || trip.to === selectedDestination;
    
    return matchesDepart && matchesDestination && matchesTime && matchesDate && matchesSelectedDestination;
  });

  const handleReservation = (trip: (typeof trips)[0]) => {
    setReservedTrip(trip);
    // Ici vous pourriez également enregistrer la réservation dans une base de données
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500/80 to-teal-600/90 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Transport Collaboratif
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            Voyagez ensemble dans la wilaya de Constantine
          </p>
        </div>

        <div className="bg-teal-600/40 backdrop-blur-sm rounded-2xl p-6 mb-12 animate-fade-up">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">Rechercher un trajet</h3>
              <p className="text-white/80 text-sm mb-4">
                Trouvez un trajet qui correspond à vos besoins
              </p>
            </div>
            <div className="flex-shrink-0">
              <AnimatedClock />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Champ de départ */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
              <select
                value={departSearch}
                onChange={(e) => setDepartSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none"
              >
                <option value="">Lieu de départ</option>
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
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none"
              >
                <option value="">Destination</option>
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
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            
            {/* Champ d'heure */}
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
              <select
                value={timeSearch}
                onChange={(e) => setTimeSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none"
              >
                <option value="">Heure de départ</option>
                {times.map((time) => (
                  <option key={time} value={time} className="text-gray-900">
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => {
                setDepartSearch("");
                setDestinationSearch("");
                setTimeSearch("");
                setDateSearch("");
                setSelectedDestination("");
              }}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl mr-4 transition-all duration-300"
            >
              Réinitialiser
            </button>
            <button className="px-8 py-2 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 flex items-center">
              <Search className="mr-2" size={18} />
              Rechercher
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip, index) => (
              <div key={index} className="relative">
                <TripCard {...trip} />
                <button
                  onClick={() => handleReservation(trip)}
                  className="w-full mt-2 py-2 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300"
                >
                  Réserver ce trajet
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-white text-xl">Aucun trajet ne correspond à votre recherche.</p>
              <p className="text-white/80 mt-2">Essayez d'autres critères de recherche.</p>
            </div>
          )}
        </div>

        <div className="bg-teal-600/40 backdrop-blur-sm p-6 rounded-2xl animate-fade-up">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Découvrez nos trajets sur la carte
          </h2>
          <Map />
        </div>
      </main>

      <Footer />
      
      {/* Afficher le chat seulement si un trajet est réservé */}
      {reservedTrip && (
        <ChatBox 
          driverName={reservedTrip.driverName} 
          tripId="trip-123" 
          onClose={() => {}} 
        />
      )}
    </div>
  );
};

export default Index;
