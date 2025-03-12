// =======================================================
// Composant TripCard
// Description: Carte affichant les détails d'un trajet disponible
// =======================================================

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

/**
 * Interface définissant les propriétés du composant TripCard
 */
interface TripCardProps {
  id: string;          // Identifiant du trajet
  from: string;         // Lieu de départ
  to: string;           // Destination
  date: string;         // Date du trajet
  time: string;         // Heure de départ
  price: number;        // Prix en DZD
  image: string;        // URL de l'image
  seats: number;        // Nombre de places disponibles
  driverName: string;   // Nom du conducteur
  onReserve?: () => void; // Fonction de callback pour la réservation
}

/**
 * Composant TripCard - Affiche les détails d'un trajet
 * 
 * Ce composant présente les informations d'un trajet disponible
 * sous forme de carte avec une image, des détails et un bouton de réservation.
 */
const TripCard = ({ id, from, to, date, time, price, image, seats: initialSeats, driverName, onReserve }: TripCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [seats, setSeats] = useState(initialSeats);
  const [isReserving, setIsReserving] = useState(false);
  const [dbTripId, setDbTripId] = useState<string | null>(null);
  
  // Format the date to a more readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Initialize trip data - important for handling both demo and real trips
  useEffect(() => {
    // Always keep local state in sync with props
    setSeats(initialSeats);
    
    // Check if this is a demo trip and if it already exists in DB
    const checkTripInDatabase = async () => {
      if (typeof id === 'string' && id.startsWith('trip-')) {
        try {
          const { data: existingTrip, error } = await supabase
            .from('trips')
            .select('id, seats')
            .eq('from_location', from)
            .eq('to_location', to)
            .eq('date', date)
            .eq('time', time)
            .maybeSingle();
          
          if (existingTrip) {
            // If trip exists in database, use its ID and seats count
            setDbTripId(existingTrip.id);
            // Update seats to match what's in the database
            setSeats(existingTrip.seats);
            console.log(`Trip found in DB with ID: ${existingTrip.id}, seats: ${existingTrip.seats}`);
          }
        } catch (error) {
          console.error("Error checking trip in database:", error);
        }
      } else {
        // This is already a DB trip with a UUID
        setDbTripId(id);
      }
    };
    
    checkTripInDatabase();
  }, [id, initialSeats, from, to, date, time]);

  // Handle reservation button click
  const handleReservation = async () => {
    // Check if there are seats available
    if (seats <= 0) {
      toast.error("Ce trajet est complet");
      return;
    }
    
    // Check if user is logged in
    if (!user) {
      toast.error("Veuillez vous connecter pour réserver ce trajet");
      navigate('/login');
      return;
    }
    
    try {
      setIsReserving(true);
      
      // Update the local state to show seats reduction immediately
      const newSeatCount = Math.max(0, seats - 1);
      setSeats(newSeatCount);
      
      let tripId = dbTripId || id;
      
      // For demo trips (with id format "trip-N"), we need a real DB ID
      if (typeof id === 'string' && id.startsWith('trip-') && !dbTripId) {
        // This trip doesn't exist in database yet, create it
        const tripData = {
          from_location: from,
          to_location: to,
          date: date,
          time: time,
          price: price,
          image: image,
          seats: newSeatCount,
          driver_id: user.id // Current user becomes the driver
        };
        
        const { data: newTrip, error: createError } = await supabase
          .from('trips')
          .insert([tripData])
          .select('id')
          .single();
        
        if (createError) {
          console.error("Error creating trip in database:", createError);
          throw createError;
        }
        
        if (newTrip) {
          console.log("Created new trip with ID:", newTrip.id);
          tripId = newTrip.id;
          setDbTripId(newTrip.id);
        }
      } else {
        // Update existing trip seats in database
        const { error: updateError } = await supabase
          .from('trips')
          .update({ seats: newSeatCount })
          .eq('id', tripId);
        
        if (updateError) {
          console.error("Error updating trip seats:", updateError);
          throw updateError;
        }
        
        console.log(`Successfully updated seats for trip ${tripId} to ${newSeatCount}`);
      }
      
      // Create reservation in database
      const reservationData = {
        trip_id: tripId,
        passenger_id: user.id,
        seats_booked: 1,
        status: 'confirmed',
        phone_number: user.phone_number || '',
        notes: `Réservation de ${from} à ${to}`
      };
      
      const { error: reservationError } = await supabase
        .from('reservations')
        .insert([reservationData]);
      
      if (reservationError) {
        console.error("Error creating reservation:", reservationError);
        // If reservation fails, restore the seat count in the database
        const { error: restoreError } = await supabase
          .from('trips')
          .update({ seats: seats })
          .eq('id', tripId);
          
        if (restoreError) {
          console.error("Error restoring seats after reservation failure:", restoreError);
        }
        
        throw reservationError;
      }
      
      // Proceed with reservation callback if provided
      if (onReserve) {
        onReserve();
      }
      
      toast.success("Réservation confirmée ! Places mises à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
      toast.error("Une erreur est survenue lors de la réservation");
      // Restore the seat count if there was an error
      setSeats(initialSeats);
    } finally {
      setIsReserving(false);
    }
  };

  // Mapper les images téléchargées aux bonnes destinations
  const mapDestinationToNewImage = (from: string, to: string) => {
    if (from.includes("Constantine") || to.includes("Constantine")) {
      return "/lovable-uploads/488eac09-7d96-4aad-b400-f6fbad5b4094.png";
    } else if (from.includes("Ali Mendjeli") || to.includes("Ali Mendjeli")) {
      return "/lovable-uploads/e26c89ad-026b-4725-898c-1334395b3b29.png";
    } else if (from.includes("El Khroub") || to.includes("El Khroub")) {
      return "/lovable-uploads/10233626-2686-4fd9-874d-5e6eec39f718.png";
    } else if (from.includes("Didouche") || to.includes("Didouche")) {
      return "/lovable-uploads/9b42fa83-4309-47ba-bd7a-281fd656cc2c.png";
    } else if (from.includes("Hamma") || to.includes("Hamma")) {
      return "/lovable-uploads/87fe55ad-deb6-4fa6-9322-6ddc53f467aa.png";
    } else if (from.includes("Zighoud") || to.includes("Zighoud")) {
      return "/lovable-uploads/0d5c2554-7073-4651-9f9b-1c8075047bfd.png";
    } else if (from.includes("Ain Smara") || to.includes("Ain Smara")) {
      return "/lovable-uploads/8e491583-a9ac-4ed5-854f-b9341b0bb63f.png";
    } else {
      return "/lovable-uploads/c8129868-7559-48d2-8f52-11c5e7ba021c.png"; // Image par défaut
    }
  };

  // Obtenir l'image appropriée
  const displayImage = mapDestinationToNewImage(from, to);

  // Determine button status based on seats availability
  const reservationButtonClass = seats <= 0 || isReserving
    ? "px-6 py-3 bg-gray-500/50 text-white/70 rounded-full cursor-not-allowed"
    : "px-6 py-3 bg-[#FEC6A1]/50 text-white rounded-full hover:bg-[#FEC6A1]/60 transition-all duration-300 hover:shadow-lg hover:scale-105";

  return (
    <div className="bg-[#FDE1D3]/40 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] animate-fade-up">
      {/* Section image */}
      <div className="w-full h-[300px] overflow-hidden relative group">
        <img 
          src={displayImage} 
          alt={`${from} to ${to}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Section d'informations */}
      <div className="p-8">
        {/* Ligne d'itinéraire */}
        <div className="flex items-center gap-3 text-white mb-6">
          <MapPin className="w-5 h-5" />
          <span className="text-base font-medium tracking-wide">{from} → {to}</span>
        </div>
        
        {/* Ligne date et heure */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-white" />
            <span className="text-base text-white">{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-white" />
            <span className="text-base text-white">{time}</span>
          </div>
        </div>

        {/* Ligne places disponibles */}
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-white" />
          <span className={`text-base ${seats <= 0 ? 'text-red-300' : 'text-white/90'}`}>
            {seats <= 0 ? 'Complet' : `${seats} places disponibles`}
          </span>
        </div>
        
        {/* Ligne prix et bouton */}
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-white">{price} DZD</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleReservation();
            }}
            className={reservationButtonClass}
            disabled={seats <= 0 || isReserving}
          >
            {isReserving ? "En cours..." : seats <= 0 ? "Complet" : "Réserver"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
