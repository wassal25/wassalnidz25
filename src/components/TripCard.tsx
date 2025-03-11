
// =======================================================
// Composant TripCard
// Description: Carte affichant les détails d'un trajet disponible
// =======================================================

import { formatDate } from "@/lib/utils";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

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
const TripCard = ({ id, from, to, date, time, price, image, seats, driverName, onReserve }: TripCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  // Format the date to a more readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle reservation button click
  const handleReservation = () => {
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
    
    // Proceed with reservation
    if (onReserve) {
      onReserve();
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
  const reservationButtonClass = seats <= 0 
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
            disabled={seats <= 0}
          >
            {seats <= 0 ? "Complet" : "Réserver"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
