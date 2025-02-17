
import Header from "@/components/Header";
import TripCard from "@/components/TripCard";

const trips = [
  {
    from: "Constantine",
    to: "Sétif",
    date: "2024-03-20",
    time: "08:00",
    price: 1200,
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2000",
  },
  {
    from: "Constantine",
    to: "Alger",
    date: "2024-03-21",
    time: "07:30",
    price: 2500,
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2000",
  },
  {
    from: "Constantine",
    to: "Annaba",
    date: "2024-03-22",
    time: "09:00",
    price: 800,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=2000",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Transport Collaboratif
          </h1>
          <p className="text-lg text-muted-foreground">
            Voyagez ensemble à travers Constantine et ses environs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip, index) => (
            <TripCard key={index} {...trip} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
