
// =======================================================
// Page de réservation
// Description: Page permettant aux utilisateurs de finaliser leur réservation
// =======================================================

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, Calendar, Clock, MapPin, Users, CreditCard, ChevronLeft, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Interface pour le type de voyage
interface TripDetails {
  id?: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  seats: number;
  image: string;
  driverName: string;
}

const ReservationPage = () => {
  // Récupération des paramètres d'URL et initialisation de la navigation
  const location = useLocation();
  const navigate = useNavigate();
  const trip = location.state?.trip as TripDetails;
  
  // États pour le formulaire de réservation
  const [seatCount, setSeatCount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [notes, setNotes] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [reservationComplete, setReservationComplete] = useState(false);

  // Redirection si aucun voyage n'est sélectionné
  useEffect(() => {
    if (!trip) {
      navigate('/');
    }
  }, [trip, navigate]);

  // Formater la date pour l'affichage
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  };

  // Calculer le prix total
  const totalPrice = trip ? trip.price * seatCount : 0;

  // Gestionnaire pour passer à l'étape suivante
  const nextStep = () => {
    if (step === 'details') {
      setStep('payment');
    } else if (step === 'payment') {
      setIsLoading(true);
      // Simuler un temps de chargement pour le traitement du paiement
      setTimeout(() => {
        setIsLoading(false);
        setStep('confirmation');
        setReservationComplete(true);
      }, 1500);
    } else if (step === 'confirmation') {
      navigate('/');
    }
  };

  // Gestionnaire pour revenir à l'étape précédente
  const prevStep = () => {
    if (step === 'payment') {
      setStep('details');
    } else if (step === 'confirmation') {
      setStep('payment');
    }
  };

  // Gestionnaire pour retourner à la page d'accueil
  const handleBackToHome = () => {
    navigate('/');
  };

  if (!trip) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500/80 to-teal-600/90 flex flex-col">
      <Header />
      
      {/* Contenu principal */}
      <main className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        {/* En-tête de la page */}
        <div className="flex items-center mb-8">
          <button 
            onClick={handleBackToHome}
            className="text-white/80 hover:text-white flex items-center transition-colors"
          >
            <ChevronLeft size={20} className="mr-1" />
            Retour
          </button>
          <h1 className="text-3xl font-bold text-white mx-auto pr-10">
            {step === 'confirmation' ? 'Réservation Confirmée' : 'Réserver votre trajet'}
          </h1>
        </div>
        
        {/* Indicateur d'étapes */}
        {!reservationComplete && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'details' || step === 'payment' || step === 'confirmation' ? 'bg-[#FEC6A1]' : 'bg-white/20'} text-white font-bold`}>
                1
              </div>
              <div className={`w-16 h-1 ${step === 'payment' || step === 'confirmation' ? 'bg-[#FEC6A1]' : 'bg-white/20'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'payment' || step === 'confirmation' ? 'bg-[#FEC6A1]' : 'bg-white/20'} text-white font-bold`}>
                2
              </div>
              <div className={`w-16 h-1 ${step === 'confirmation' ? 'bg-[#FEC6A1]' : 'bg-white/20'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'confirmation' ? 'bg-[#FEC6A1]' : 'bg-white/20'} text-white font-bold`}>
                3
              </div>
            </div>
          </div>
        )}
        
        {/* Conteneur principal */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-12 max-w-4xl mx-auto shadow-xl animate-fade-up border border-white/20">
          {/* Détails du voyage - toujours visible */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Détails du trajet</h3>
            <div className="bg-white/5 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-48 rounded-xl overflow-hidden">
                <img src={trip.image} alt={`${trip.from} à ${trip.to}`} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center text-white">
                    <MapPin className="w-5 h-5 mr-2 text-[#FEC6A1]" />
                    <span className="text-lg font-medium">{trip.from} → {trip.to}</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Calendar className="w-5 h-5 mr-2 text-[#FEC6A1]" />
                    <span>{formatDate(trip.date)}</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Clock className="w-5 h-5 mr-2 text-[#FEC6A1]" />
                    <span>{trip.time}</span>
                  </div>
                  <div className="flex items-center text-white">
                    <User className="w-5 h-5 mr-2 text-[#FEC6A1]" />
                    <span>Chauffeur: {trip.driverName}</span>
                  </div>
                </div>
                <div className="text-white mt-2">
                  <span className="text-2xl font-bold">{trip.price} DZD</span>
                  <span className="text-white/70 ml-2">par place</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Étape 1: Détails de la réservation */}
          {step === 'details' && (
            <div className="animate-fade-up">
              <h3 className="text-xl font-semibold text-white mb-4">Informations de réservation</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="seatCount" className="text-white/90 text-sm font-medium mb-2 block">
                    Nombre de places
                  </label>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setSeatCount(Math.max(1, seatCount - 1))}
                      className="bg-white/10 text-white w-10 h-10 rounded-l-xl flex items-center justify-center hover:bg-white/20 transition-colors"
                      disabled={seatCount <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="seatCount"
                      min="1"
                      max={trip.seats}
                      value={seatCount}
                      onChange={(e) => setSeatCount(Math.min(trip.seats, Math.max(1, parseInt(e.target.value))))}
                      className="w-16 text-center bg-white/10 border-x border-white/10 text-white h-10 focus:outline-none"
                    />
                    <button 
                      onClick={() => setSeatCount(Math.min(trip.seats, seatCount + 1))}
                      className="bg-white/10 text-white w-10 h-10 rounded-r-xl flex items-center justify-center hover:bg-white/20 transition-colors"
                      disabled={seatCount >= trip.seats}
                    >
                      +
                    </button>
                    <span className="ml-3 text-white/80">
                      {trip.seats} places disponibles
                    </span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="text-white/90 text-sm font-medium mb-2 block">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    placeholder="Entrez votre numéro de téléphone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="notes" className="text-white/90 text-sm font-medium mb-2 block">
                    Notes pour le chauffeur (optionnel)
                  </label>
                  <textarea
                    id="notes"
                    placeholder="Informations supplémentaires pour le chauffeur..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between text-white mb-2">
                  <span>Prix unitaire:</span>
                  <span>{trip.price} DZD</span>
                </div>
                <div className="flex justify-between text-white mb-2">
                  <span>Nombre de places:</span>
                  <span>{seatCount}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg mt-4 pt-4 border-t border-white/10">
                  <span>Total:</span>
                  <span>{totalPrice} DZD</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Étape 2: Paiement */}
          {step === 'payment' && (
            <div className="animate-fade-up">
              <h3 className="text-xl font-semibold text-white mb-4">Méthode de paiement</h3>
              <div className="space-y-4">
                <div className="flex flex-col space-y-3">
                  <label className="flex items-center bg-white/5 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="mr-3"
                    />
                    <span className="text-white">Paiement en espèces (à bord)</span>
                  </label>
                  
                  <label className="flex items-center bg-white/5 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mr-3"
                    />
                    <span className="text-white">Paiement par carte bancaire</span>
                  </label>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="mt-4 p-4 bg-white/5 rounded-xl animate-fade-up">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="text-white/90 text-sm font-medium mb-2 block">
                          Numéro de carte
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="text-white/90 text-sm font-medium mb-2 block">
                            Date d'expiration
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            placeholder="MM/AA"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="text-white/90 text-sm font-medium mb-2 block">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            placeholder="123"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="cardHolder" className="text-white/90 text-sm font-medium mb-2 block">
                          Titulaire de la carte
                        </label>
                        <input
                          type="text"
                          id="cardHolder"
                          placeholder="Nom du titulaire"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total à payer:</span>
                  <span>{totalPrice} DZD</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Étape 3: Confirmation */}
          {step === 'confirmation' && (
            <div className="animate-fade-up text-center py-6">
              <div className="w-20 h-20 bg-gradient-to-r from-[#FEC6A1]/50 to-[#45B39D]/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Réservation confirmée !</h3>
              <p className="text-white/80 mb-6">
                Votre réservation a bien été enregistrée. Vous recevrez bientôt une confirmation par email.
              </p>
              <div className="bg-white/5 p-4 rounded-xl text-white max-w-md mx-auto">
                <p className="mb-2">Détails de la réservation :</p>
                <p className="mb-1">{trip.from} → {trip.to}</p>
                <p className="mb-1">{formatDate(trip.date)} à {trip.time}</p>
                <p className="mb-1">Nombre de places : {seatCount}</p>
                <p className="mb-1">Chauffeur : {trip.driverName}</p>
                <p className="mt-2 font-medium">Total payé : {totalPrice} DZD</p>
              </div>
              <p className="text-white mt-6">
                Vous avez été ajouté au groupe de discussion pour ce trajet. 
                Vous pouvez maintenant communiquer avec le chauffeur et les autres passagers.
              </p>
            </div>
          )}
          
          {/* Boutons de navigation */}
          {!isLoading ? (
            <div className="flex justify-between mt-8">
              {step !== 'details' && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-white/10 text-white rounded-xl transition-all duration-300 hover:bg-white/20"
                >
                  Précédent
                </button>
              )}
              
              <button
                type="button"
                onClick={nextStep}
                className={`px-8 py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg ml-auto flex items-center`}
              >
                {step === 'details' && "Continuer"}
                {step === 'payment' && "Confirmer et payer"}
                {step === 'confirmation' && "Retour à l'accueil"}
              </button>
            </div>
          ) : (
            <div className="flex justify-center mt-8">
              <div className="px-8 py-3 bg-gradient-to-r from-[#FEC6A1]/60 to-[#45B39D]/60 text-white rounded-xl flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Traitement en cours...
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReservationPage;
