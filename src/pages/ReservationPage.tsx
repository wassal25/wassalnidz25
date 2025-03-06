// =======================================================
// Page de réservation
// Description: Page permettant aux utilisateurs de finaliser leur réservation
// =======================================================

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, Calendar, Clock, MapPin, Users, CreditCard, ChevronLeft, User, Settings, Shield, CreditCardIcon, Truck, Star, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { toast } from "sonner";

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
  const tripFromLocation = location.state?.trip as TripDetails;
  
  // Créer une copie locale du voyage pour pouvoir modifier le nombre de places
  const [trip, setTrip] = useState<TripDetails | null>(null);
  
  // États pour le formulaire de réservation
  const [seatCount, setSeatCount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [notes, setNotes] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [reservationComplete, setReservationComplete] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Options de paiement
  const [savePaymentInfo, setSavePaymentInfo] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [preferredLanguage, setPreferredLanguage] = useState("fr");
  const [theme, setTheme] = useState("light");

  // Initialiser le voyage local depuis les paramètres d'URL
  useEffect(() => {
    if (tripFromLocation) {
      setTrip(tripFromLocation);
    } else {
      navigate('/');
    }
  }, [tripFromLocation, navigate]);

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
      window.scrollTo(0, 0);
    } else if (step === 'payment') {
      setIsLoading(true);
      // Simuler un temps de chargement pour le traitement du paiement
      setTimeout(() => {
        setIsLoading(false);
        
        // Mettre à jour le nombre de places disponibles
        if (trip) {
          const updatedTrip = {
            ...trip,
            seats: Math.max(0, trip.seats - seatCount)
          };
          setTrip(updatedTrip);
          
          // Dans une vraie application, on sauvegarderait cette modification dans une base de données
          toast.success("Places réservées avec succès", {
            description: `${seatCount} place(s) réservée(s). Reste ${updatedTrip.seats} place(s) disponible(s).`
          });
        }
        
        setStep('confirmation');
        setReservationComplete(true);
        window.scrollTo(0, 0);
      }, 1500);
    } else if (step === 'confirmation') {
      navigate('/');
    }
  };

  // Gestionnaire pour revenir à l'étape précédente
  const prevStep = () => {
    if (step === 'payment') {
      setStep('details');
      window.scrollTo(0, 0);
    } else if (step === 'confirmation') {
      setStep('payment');
      window.scrollTo(0, 0);
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
        {/* En-tête de la page avec bouton paramètres */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button 
              onClick={handleBackToHome}
              className="text-white/80 hover:text-white flex items-center transition-colors"
            >
              <ChevronLeft size={20} className="mr-1" />
              Retour
            </button>
          </div>
          <h1 className="text-3xl font-bold text-white">
            {step === 'confirmation' ? 'Réservation Confirmée' : 'Réserver votre trajet'}
          </h1>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="text-white/80 hover:text-white flex items-center transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
            title="Paramètres"
          >
            <Settings size={20} />
          </button>
        </div>
        
        {/* Panneau de paramètres */}
        {showSettings && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 animate-fade-up border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Settings className="mr-2" size={18} />
              Paramètres
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-medium">Préférences générales</h4>
                
                <div className="flex items-center justify-between">
                  <label className="text-white/90">Notifications</label>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                    <input
                      type="checkbox"
                      id="notifications"
                      checked={enableNotifications}
                      onChange={() => setEnableNotifications(!enableNotifications)}
                      className="opacity-0 w-0 h-0"
                    />
                    <label 
                      htmlFor="notifications"
                      className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${enableNotifications ? 'bg-teal-500' : 'bg-gray-400'}`}
                    >
                      <span className={`absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${enableNotifications ? 'transform translate-x-6' : ''}`}></span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="text-white/90 block mb-2">Langue préférée</label>
                  <select 
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none"
                  >
                    <option value="fr">Français</option>
                    <option value="ar">Arabe</option>
                    <option value="en">Anglais</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-white/90 block mb-2">Thème</label>
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none"
                  >
                    <option value="light">Clair</option>
                    <option value="dark">Sombre</option>
                    <option value="auto">Automatique</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-white font-medium">Sécurité et paiement</h4>
                
                <div className="flex items-center justify-between">
                  <label className="text-white/90">Sauvegarder les infos de paiement</label>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                    <input
                      type="checkbox"
                      id="save-payment"
                      checked={savePaymentInfo}
                      onChange={() => setSavePaymentInfo(!savePaymentInfo)}
                      className="opacity-0 w-0 h-0"
                    />
                    <label 
                      htmlFor="save-payment"
                      className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${savePaymentInfo ? 'bg-teal-500' : 'bg-gray-400'}`}
                    >
                      <span className={`absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${savePaymentInfo ? 'transform translate-x-6' : ''}`}></span>
                    </label>
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Shield className="text-teal-400 mr-2" size={18} />
                    <span className="text-white font-medium">Sécurité des données</span>
                  </div>
                  <p className="text-white/70 text-sm">
                    Vos données personnelles et de paiement sont chiffrées et sécurisées selon les normes les plus strictes.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => setShowSettings(false)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300"
              >
                Fermer les paramètres
              </button>
            </div>
          </div>
        )}
        
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
            
            {/* Information sur le chauffeur */}
            {step !== 'confirmation' && (
              <div className="mt-4 bg-white/5 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-teal-500/30 flex items-center justify-center mr-3">
                    <User className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{trip.driverName}</h4>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 w-4 h-4" />
                      <Star className="text-yellow-400 w-4 h-4" />
                      <Star className="text-yellow-400 w-4 h-4" />
                      <Star className="text-yellow-400 w-4 h-4" />
                      <Star className="text-white/30 w-4 h-4" />
                      <span className="text-white/70 text-sm ml-1">(4.7)</span>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center">
                    <Truck className="text-white/70 mr-1" size={16} />
                    <span className="text-white/70 text-sm">Renault Symbol</span>
                  </div>
                </div>
              </div>
            )}
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
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={16} />
                    <input
                      type="tel"
                      id="phoneNumber"
                      placeholder="Entrez votre numéro de téléphone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-12 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
                    />
                  </div>
                  <p className="text-white/50 text-xs mt-1">
                    Ce numéro sera utilisé pour vous contacter en cas de besoin.
                  </p>
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
                  <label className="flex items-center bg-white/5 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-all border border-white/5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <CreditCardIcon className="text-green-400" size={20} />
                      </div>
                      <div>
                        <span className="text-white font-medium">Paiement en espèces</span>
                        <p className="text-white/60 text-sm">Payez directement au chauffeur lors du trajet</p>
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-center bg-white/5 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-all border border-white/5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <CreditCard className="text-blue-400" size={20} />
                      </div>
                      <div>
                        <span className="text-white font-medium">Paiement par carte bancaire</span>
                        <p className="text-white/60 text-sm">Payez maintenant de manière sécurisée</p>
                      </div>
                    </div>
                  </label>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="mt-4 p-4 bg-white/5 rounded-xl animate-fade-up border border-white/10">
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
                      
                      <label className="flex items-center text-white/80 text-sm cursor-pointer space-x-2">
                        <input
                          type="checkbox"
                          checked={savePaymentInfo}
                          onChange={() => setSavePaymentInfo(!savePaymentInfo)}
                          className="form-checkbox rounded text-teal-500 p-2"
                        />
                        <span>Sauvegarder les informations de paiement pour de futurs trajets</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total à payer:</span>
                  <span>{totalPrice} DZD</span>
                </div>
                <p className="text-white/60 text-sm mt-2 text-center">
                  En continuant, vous acceptez les Conditions Générales d'Utilisation et la Politique de Confidentialité.
                </p>
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
              
              {/* Ajout de la carte d'itinéraire */}
              <div className="mt-8 mb-6">
                <h4 className="text-xl text-white mb-4">Itinéraire du trajet</h4>
                <div className="h-64 rounded-xl overflow-hidden">
                  <Map origin={trip.from} destination={trip.to} showItinerary={true} />
                </div>
              </div>
              
              <p className="text-white mt-6 mb-4">
                Vous avez été ajouté au groupe de discussion pour ce trajet. 
                Vous pouvez maintenant communiquer avec le chauffeur et les autres passagers.
              </p>
              
              <div className="bg-white/5 p-4 rounded-xl max-w-md mx-auto mt-4 border border-teal-500/30">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <MessageIcon className="text-teal-400" />
                  <span>Groupe de discussion créé automatiquement</span>
                </div>
              </div>
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

// Icône de message pour éviter de réimporter Lucide
const MessageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

export default ReservationPage;
