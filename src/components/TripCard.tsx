
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
    <div className="bg-teal-600/10 backdrop-blur-lg border border-teal-600/20 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] animate-fade-up">
      <div className="w-full h-[300px] overflow-hidden relative group">
        <img 
          src={image} 
          alt={`${from} to ${to}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-8">
        <div className="flex items-center gap-3 text-primary mb-6">
          <MapPin className="w-5 h-5" />
          <span className="text-base font-medium tracking-wide">{from} → {to}</span>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-base">{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-base">{time}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-primary">{price} DZD</span>
          <button className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:scale-105">
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
