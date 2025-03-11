
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth/useAuth';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Calendar, Clock, Users, CreditCard, MessageSquare, PhoneCall } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ReservationPage = () => {
  const { user, userProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(location.state?.trip || null);
  const [loading, setLoading] = useState(false);
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phone_number || '');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Redirect if no trip is selected
  useEffect(() => {
    if (!trip && !location.state?.trip) {
      toast.error("Aucun trajet sélectionné");
      navigate('/');
    }
  }, [trip, location.state, navigate]);

  // Handle reservation form submission
  const handleReservation = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Vous devez être connecté pour réserver");
      navigate('/login');
      return;
    }

    if (seatsToBook <= 0 || seatsToBook > trip.seats) {
      toast.error(`Veuillez sélectionner entre 1 et ${trip.seats} place(s)`);
      return;
    }

    setLoading(true);
    
    try {
      // For the demo data trips, convert the ID to a UUID if it's not already
      let tripId = trip.id;
      // Check if it's a demo trip with format "trip-N"
      if (trip.id && trip.id.startsWith('trip-')) {
        // For demo data, we'll generate a UUID
        tripId = crypto.randomUUID();
        
        // First, insert the trip into the trips table if it doesn't exist
        const { data: existingTrip, error: checkError } = await supabase
          .from('trips')
          .select('id')
          .eq('id', tripId)
          .single();
        
        if (checkError && checkError.code !== 'PGRST116') {
          // If error is not "no rows returned", it's a real error
          throw checkError;
        }
        
        if (!existingTrip) {
          // Insert the trip data first
          const { error: tripError } = await supabase
            .from('trips')
            .insert({
              id: tripId,
              from_location: trip.from,
              to_location: trip.to,
              date: trip.date,
              time: trip.time,
              price: trip.price,
              seats: trip.seats,
              image: trip.image || 'default.jpg',
              driver_id: user.id // Using current user as driver for demo
            });
            
          if (tripError) throw tripError;
        }
      }

      // 1. Create the reservation in the database
      const { data: reservation, error: reservationError } = await supabase
        .from('reservations')
        .insert({
          trip_id: tripId,
          passenger_id: user.id,
          seats_booked: seatsToBook,
          phone_number: phoneNumber,
          notes: notes,
          payment_method: paymentMethod,
          status: 'confirmed'
        })
        .select()
        .single();

      if (reservationError) throw reservationError;

      // 2. Update the available seats in the trip
      const { error: tripUpdateError } = await supabase
        .from('trips')
        .update({ seats: trip.seats - seatsToBook })
        .eq('id', tripId);

      if (tripUpdateError) throw tripUpdateError;

      toast.success("Réservation confirmée !", {
        description: `Vous avez réservé ${seatsToBook} place(s) pour ce trajet`
      });

      // Redirect to home page after successful reservation
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
      toast.error("Erreur lors de la réservation", {
        description: "Veuillez réessayer plus tard."
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-500/80 to-teal-600/90">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Réservation</h1>
            <p className="text-white/80 mb-6">Vous devez être connecté pour effectuer une réservation</p>
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-[#FEC6A1]/80 hover:bg-[#FEC6A1] text-white rounded-lg transition-colors"
            >
              Se connecter
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-500/80 to-teal-600/90">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Réservation</h1>
            <p className="text-white/80 mb-6">Aucun trajet sélectionné</p>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-[#FEC6A1]/80 hover:bg-[#FEC6A1] text-white rounded-lg transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500/80 to-teal-600/90">
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Réservation de trajet</h1>
          
          {/* Trip details card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Détails du trajet</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#FEC6A1]" />
                <div>
                  <p className="text-sm text-white/70">Départ</p>
                  <p className="font-medium">{trip?.from}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#FEC6A1]" />
                <div>
                  <p className="text-sm text-white/70">Destination</p>
                  <p className="font-medium">{trip?.to}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#FEC6A1]" />
                <div>
                  <p className="text-sm text-white/70">Date</p>
                  <p className="font-medium">{trip?.date ? new Date(trip.date).toLocaleDateString('fr-FR') : ''}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#FEC6A1]" />
                <div>
                  <p className="text-sm text-white/70">Heure</p>
                  <p className="font-medium">{trip?.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#FEC6A1]" />
                <div>
                  <p className="text-sm text-white/70">Places disponibles</p>
                  <p className="font-medium">{trip?.seats}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-[#FEC6A1]" />
                <div>
                  <p className="text-sm text-white/70">Prix</p>
                  <p className="font-medium">{trip?.price} DZD</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reservation form */}
          <form onSubmit={handleReservation} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Détails de la réservation</h2>
            
            {/* Number of seats */}
            <div className="mb-4">
              <label htmlFor="seats" className="block text-white/90 mb-2">Nombre de places</label>
              <select
                id="seats"
                value={seatsToBook}
                onChange={(e) => setSeatsToBook(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/70"
                disabled={loading}
              >
                {trip && [...Array(trip.seats)].map((_, i) => (
                  <option key={i} value={i + 1} className="bg-teal-700">
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Phone number */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-white/90 mb-2">Numéro de téléphone</label>
              <div className="relative">
                <PhoneCall className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/70"
                  placeholder="Votre numéro de téléphone"
                  disabled={loading}
                  required
                />
              </div>
            </div>
            
            {/* Payment method */}
            <div className="mb-4">
              <label htmlFor="payment" className="block text-white/90 mb-2">Méthode de paiement</label>
              <select
                id="payment"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/70"
                disabled={loading}
              >
                <option value="cash" className="bg-teal-700">Paiement en espèces</option>
                <option value="card" className="bg-teal-700">Carte bancaire</option>
                <option value="mobile" className="bg-teal-700">Paiement mobile</option>
              </select>
            </div>
            
            {/* Notes */}
            <div className="mb-6">
              <label htmlFor="notes" className="block text-white/90 mb-2">Notes additionnelles</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-white/50" size={18} />
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/70"
                  placeholder="Instructions particulières ou détails additionnels..."
                  rows={3}
                  disabled={loading}
                />
              </div>
            </div>
            
            {/* Total price calculation */}
            <div className="mb-6 p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Prix par place:</span>
                <span className="text-white font-medium">{trip?.price} DZD</span>
              </div>
              <div className="flex justify-between items-center font-bold mt-2 pt-2 border-t border-white/10">
                <span className="text-white">Total:</span>
                <span className="text-[#FEC6A1] text-xl">{trip?.price * seatsToBook} DZD</span>
              </div>
            </div>
            
            {/* Submit button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-white font-medium transition-all ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#FEC6A1] to-[#45B39D] hover:shadow-lg"
              }`}
              disabled={loading}
            >
              {loading ? "Traitement en cours..." : "Confirmer la réservation"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReservationPage;
