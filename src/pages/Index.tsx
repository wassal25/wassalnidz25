
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TripCard from "@/components/TripCard";
import Map from "@/components/Map";
import { Search, MapPin } from "lucide-react";
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
  },
  {
    from: "Constantine Centre",
    to: "Ali Mendjeli",
    date: "2024-03-21",
    time: "07:30",
    price: 150,
    seats: 4,
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2000",
  },
  {
    from: "Constantine Centre",
    to: "El Khroub",
    date: "2024-03-22",
    time: "09:00",
    price: 120,
    seats: 2,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=2000",
  },
  {
    from: "Constantine Centre",
    to: "Didouche Mourad",
    date: "2024-03-22",
    time: "08:30",
    price: 130,
    seats: 3,
    image: "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=2000",
  },
  {
    from: "Constantine Centre",
    to: "Ain Smara",
    date: "2024-03-22",
    time: "10:00",
    price: 110,
    seats: 4,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000",
  },
  {
    from: "Constantine Centre",
    to: "Zighoud Youcef",
    date: "2024-03-22",
    time: "09:30",
    price: 140,
    seats: 2,
    image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=2000",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");

  const destinations = [...new Set(trips.map(trip => trip.to))];

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.from.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDestination = !selectedDestination || trip.to === selectedDestination;
    return matchesSearch && matchesDestination;
  });

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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
              <input
                type="text"
                placeholder="Rechercher un trajet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="pl-12 pr-8 py-3 bg-white/10 border border-white/20 rounded-xl text-white appearance-none cursor-pointer min-w-[200px] focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="">Toutes les destinations</option>
                {destinations.map((destination) => (
                  <option key={destination} value={destination} className="text-gray-900">
                    {destination}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredTrips.map((trip, index) => (
            <TripCard key={index} {...trip} />
          ))}
        </div>

        <div className="bg-teal-600/40 backdrop-blur-sm p-6 rounded-2xl animate-fade-up">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Découvrez nos trajets sur la carte
          </h2>
          <Map />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
