
// =======================================================
// Composant Map
// Description: Carte interactive affichant les trajets et la position GPS
// =======================================================

import React, { useEffect, useRef, useState } from 'react';
import { toast } from "sonner";
import { Locate, MapPin } from 'lucide-react';

/**
 * Composant Map - Affiche une carte interactive Google Maps
 * 
 * Ce composant utilise Google Maps pour afficher une carte
 * centrée sur Constantine et montrer la position actuelle de l'utilisateur.
 */
const Map = () => {
  // Référence pour l'élément DOM qui contiendra la carte
  const mapContainer = useRef<HTMLDivElement>(null);
  // État pour stocker l'instance de la carte Google Maps
  const [map, setMap] = useState<google.maps.Map | null>(null);
  // État pour stocker le marqueur de position de l'utilisateur
  const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
  // État pour stocker si le chargement de la position est en cours
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);
  // État pour stocker la clé API Google Maps entrée par l'utilisateur
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('googleMapsApiKey') || '');
  // État pour vérifier si l'API Google Maps est chargée
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  // Coordonnées de Constantine
  const constantineCoordinates = { lat: 36.3650, lng: 6.6147 };

  // Fonction pour charger l'API Google Maps
  const loadGoogleMapsApi = (key: string) => {
    if (window.google?.maps) {
      setIsApiLoaded(true);
      return;
    }

    // Éviter de recharger le script si déjà présent
    if (document.querySelector(`script[src*="maps.googleapis.com/maps/api/js?key=${key}"]`)) {
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsApiLoaded(true);
    };
    
    script.onerror = () => {
      toast.error("Erreur de chargement de Google Maps API", {
        description: "Veuillez vérifier votre clé API",
      });
    };
    
    document.head.appendChild(script);
  };

  // Effet pour initialiser la carte une fois l'API chargée
  useEffect(() => {
    if (!apiKey || !isApiLoaded || !mapContainer.current) return;

    const initializeMap = () => {
      const newMap = new google.maps.Map(mapContainer.current!, {
        center: constantineCoordinates,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      // Ajouter un marqueur pour Constantine Centre
      new google.maps.Marker({
        position: constantineCoordinates,
        map: newMap,
        title: "Constantine Centre",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#45B39D",
          fillOpacity: 1,
          strokeWeight: 0,
          scale: 8
        }
      });

      setMap(newMap);
    };

    initializeMap();
  }, [apiKey, isApiLoaded]);

  // Fonction pour géolocaliser l'utilisateur
  const locateUser = () => {
    if (!map) return;
    
    setIsLoadingPosition(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          // Centre la carte sur la position de l'utilisateur
          map.setCenter(userLocation);
          map.setZoom(15);
          
          // Supprime l'ancien marqueur s'il existe
          if (userMarker) {
            userMarker.setMap(null);
          }
          
          // Crée un nouveau marqueur pour la position de l'utilisateur
          const newMarker = new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Votre position",
            animation: google.maps.Animation.DROP,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: "#4285F4", // Couleur Google Maps bleu
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: "#FFFFFF",
              scale: 10
            }
          });
          
          setUserMarker(newMarker);
          
          // Affiche un popup avec les coordonnées
          const infoWindow = new google.maps.InfoWindow({
            content: "<div><b>Votre position actuelle</b></div>"
          });
          
          infoWindow.open(map, newMarker);
          
          toast.success("Position localisée avec succès", {
            description: `Lat: ${userLocation.lat.toFixed(4)}, Lng: ${userLocation.lng.toFixed(4)}`,
          });
          
          setIsLoadingPosition(false);
        },
        (error) => {
          let errorMessage = "Impossible d'obtenir votre position";
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Vous avez refusé l'accès à votre géolocalisation";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Les informations de position ne sont pas disponibles";
              break;
            case error.TIMEOUT:
              errorMessage = "La demande de géolocalisation a expiré";
              break;
          }
          
          toast.error("Erreur de géolocalisation", {
            description: errorMessage,
          });
          
          setIsLoadingPosition(false);
        }
      );
    } else {
      toast.error("Géolocalisation non supportée", {
        description: "Votre navigateur ne supporte pas la géolocalisation",
      });
      
      setIsLoadingPosition(false);
    }
  };

  // Gestionnaire pour le changement de clé API
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    setApiKey(newKey);
    localStorage.setItem('googleMapsApiKey', newKey);
  };

  // Gestionnaire pour soumettre la clé API
  const handleApiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (apiKey) {
      loadGoogleMapsApi(apiKey);
    }
  };

  // Effet pour charger l'API Google Maps au chargement si la clé est présente
  useEffect(() => {
    if (apiKey) {
      loadGoogleMapsApi(apiKey);
    }
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
      {!apiKey || !isApiLoaded ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/10 backdrop-blur-md">
          <div className="bg-white/20 p-6 rounded-xl backdrop-blur-sm max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Configuration de Google Maps</h3>
            <form onSubmit={handleApiKeySubmit} className="space-y-4">
              <div>
                <label htmlFor="apiKey" className="block text-white text-sm mb-2">Entrez votre clé API Google Maps:</label>
                <input
                  id="apiKey"
                  type="text"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  placeholder="Votre clé API Google Maps"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                  required
                />
                <p className="text-white/70 text-xs mt-2">
                  Vous pouvez obtenir une clé API sur la 
                  <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" className="text-teal-300 ml-1 hover:underline">
                    Console Google Cloud
                  </a>
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 rounded-lg text-white transition-all"
              >
                Charger la carte
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="absolute inset-0" />
          <button
            onClick={locateUser}
            disabled={isLoadingPosition}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg z-10 transition-all"
            title="Localiser ma position"
          >
            <Locate size={20} className={`${isLoadingPosition ? 'animate-spin text-gray-400' : 'text-teal-600'}`} />
          </button>
        </>
      )}
    </div>
  );
};

export default Map;
