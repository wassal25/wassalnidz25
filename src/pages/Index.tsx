
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TripCard from "@/components/TripCard";

const trips = [
  {
    from: "Constantine Centre",
    to: "Hamma Bouziane",
    date: "2024-03-20",
    time: "08:00",
    price: 100,
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2000",
  },
  {
    from: "Constantine Centre",
    to: "Ali Mendjeli",
    date: "2024-03-21",
    time: "07:30",
    price: 150,
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2000",
  },
  {
    from: "Constantine Centre",
    to: "El Khroub",
    date: "2024-03-22",
    time: "09:00",
    price: 120,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=2000",
  },
  {
    from: "Constantine Centre",
    to: "Didouche Mourad",
    date: "2024-03-22",
    time: "08:30",
    price: 130,
    image: "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=2000",
  },
  {
    from: "Constantine Centre",
    to: "Ain Smara",
    date: "2024-03-22",
    time: "10:00",
    price: 110,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000",
  },
  {
    from: "Constantine Centre",
    to: "Zighoud Youcef",
    date: "2024-03-22",
    time: "09:30",
    price: 140,
    image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=2000",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500/80 to-teal-600/90 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 pt-40 pb-16 flex-grow">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Transport Collaboratif
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            Voyagez ensemble dans la wilaya de Constantine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip, index) => (
            <TripCard key={index} {...trip} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
