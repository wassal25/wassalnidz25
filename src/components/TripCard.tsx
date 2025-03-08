
// =======================================================
// Composant TripCard
// Description: Carte affichant les détails d'un trajet disponible
// =======================================================

import { formatDate } from "@/lib/utils";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

/**
 * Interface définissant les propriétés du composant TripCard
 */
interface TripCardProps {
  from: string;         // Lieu de départ
  to: string;           // Destination
  date: string;         // Date du trajet
  time: string;         // Heure de départ
  price: number;        // Prix en DZD
  image: string;        // URL de l'image
  seats: number;        // Nombre de places disponibles
  onReserve?: () => void; // Fonction de callback pour la réservation
}

/**
 * Composant TripCard - Affiche les détails d'un trajet
 * 
 * Ce composant présente les informations d'un trajet disponible
 * sous forme de carte avec une image, des détails et un bouton de réservation.
 */
const TripCard = ({ from, to, date, time, price, image, seats, onReserve }: TripCardProps) => {
  // Utiliser les images locales au lieu des images Unsplash
  const getLocalImage = (from: string, to: string) => {
    // Assigner une image basée sur la destination ou l'origine
    if (from.includes("Constantine") || to.includes("Constantine")) {
      return "/images/destination-1.jpg";
    } else if (from.includes("Ali Mendjeli") || to.includes("Ali Mendjeli")) {
      return "/images/destination-2.jpg";
    } else if (from.includes("El Khroub") || to.includes("El Khroub")) {
      return "/images/destination-3.jpg";
    } else if (from.includes("Didouche") || to.includes("Didouche")) {
      return "/images/destination-4.jpg";
    } else if (from.includes("Hamma") || to.includes("Hamma")) {
      return "/images/destination-5.jpg";
    } else if (from.includes("Zighoud") || to.includes("Zighoud")) {
      return "/images/destination-6.jpg";
    } else if (from.includes("Ain Smara") || to.includes("Ain Smara")) {
      return "/images/destination-7.jpg";
    } else {
      return "/images/destination-8.jpg"; // Image par défaut
    }
  };

  // Obtenir l'image appropriée
  const displayImage = getLocalImage(from, to);

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
        <div className="flex items-center gap-2 mb-6 text-white/90">
          <Users className="w-5 h-5" />
          <span className="text-base">{seats} places disponibles</span>
        </div>
        
        {/* Ligne prix et bouton */}
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-white">{price} DZD</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onReserve) onReserve();
            }}
            className="px-6 py-3 bg-[#FEC6A1]/50 text-white rounded-full hover:bg-[#FEC6A1]/60 transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
