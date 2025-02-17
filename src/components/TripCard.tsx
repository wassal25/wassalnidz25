
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, MapPin } from "lucide-react";

interface TripCardProps {
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  image: string;
}

const TripCard = ({ from, to, date, time, price, image }: TripCardProps) => {
  return (
    <div className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-up">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={`${from} to ${to}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-primary mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">{from} → {to}</span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm">{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm">{time}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">{price} DZD</span>
          <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
