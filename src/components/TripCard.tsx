
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
  id?: string;         // Identifiant unique du trajet
  from: string;         // Lieu de départ
  to: string;           // Destination
  date: string;         // Date du trajet
  time: string;         // Heure de départ
  price: number;        // Prix en DZD
  image: string;        // URL de l'image
  seats: number;        // Nombre de places disponibles
  driverName?: string;  // Nom du chauffeur
  onReserve?: () => void; // Fonction de callback pour la réservation
}

/**
 * Composant TripCard - Affiche les détails d'un trajet
 * 
 * Ce composant présente les informations d'un trajet disponible
 * sous forme de carte avec une image, des détails et un bouton de réservation.
 */
const TripCard = ({ id, from, to, date, time, price, image, seats, driverName, onReserve }: TripCardProps) => {
  return (
    <div className="bg-[#FDE1D3]/40 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] animate-fade-up">
      {/* Section image */}
      <div className="w-full h-[300px] overflow-hidden relative group">
        <img 
          src={image} 
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
            className={`px-6 py-3 ${seats > 0 ? 'bg-[#FEC6A1]/50 text-white hover:bg-[#FEC6A1]/60 hover:shadow-lg hover:scale-105' : 'bg-gray-400/50 text-white/70 cursor-not-allowed'} rounded-full transition-all duration-300`}
            disabled={seats <= 0}
          >
            {seats > 0 ? 'Réserver' : 'Complet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
