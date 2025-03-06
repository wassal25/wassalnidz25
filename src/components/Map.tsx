
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
const Map = ({ destination = null, origin = null, showItinerary = false }) => {
  // Référence pour l'élément DOM qui contiendra la carte
  const mapContainer = useRef<HTMLDivElement>(null);
  // État pour stocker l'instance de la carte Google Maps
  const [map, setMap] = useState<google.maps.Map | null>(null);
  // État pour stocker le marqueur de position de l'utilisateur
  const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
  // État pour stocker si le chargement de la position est en cours
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);
  // État pour vérifier si l'API Google Maps est chargée
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  // État pour stocker l'itinéraire
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  // Clé API Google Maps (intégrée directement)
  const googleMapsApiKey = "AIzaSyAShg04o1uyNHkCNwWLwrEuV7jxZ8xiIU8";
  
  // Coordonnées de Constantine
  const constantineCoordinates = { lat: 36.3650, lng: 6.6147 };

  // Fonction pour charger l'API Google Maps
  const loadGoogleMapsApi = () => {
    if (window.google?.maps) {
      setIsApiLoaded(true);
      return;
    }

    // Éviter de recharger le script si déjà présent
    if (document.querySelector(`script[src*="maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}"]`)) {
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsApiLoaded(true);
    };
    
    script.onerror = () => {
      toast.error("Erreur de chargement de Google Maps API", {
        description: "Veuillez vérifier que la facturation est activée sur votre compte Google Cloud",
      });
    };
    
    document.head.appendChild(script);
  };

  // Effet pour charger l'API Google Maps au montage du composant
  useEffect(() => {
    loadGoogleMapsApi();
  }, []);

  // Effet pour initialiser la carte une fois l'API chargée
  useEffect(() => {
    if (!isApiLoaded || !mapContainer.current) return;

    const initializeMap = () => {
      const newMap = new google.maps.Map(mapContainer.current!, {
        center: constantineCoordinates,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        // Style clair pour la carte
        styles: [
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [{"visibility": "on"}]
          },
          {
            "featureType": "poi",
            "stylers": [{"visibility": "off"}]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{"visibility": "on"}]
          },
          {
            "featureType": "transit",
            "stylers": [{"visibility": "on"}]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#a0d6d1"}]
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
      
      // Créer le renderer d'itinéraire si nécessaire
      if (showItinerary) {
        const directionsService = new google.maps.DirectionsService();
        const newDirectionsRenderer = new google.maps.DirectionsRenderer({
          map: newMap,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: "#45B39D",
            strokeWeight: 5
          }
        });
        setDirectionsRenderer(newDirectionsRenderer);
      }
    };

    initializeMap();
  }, [isApiLoaded, showItinerary]);

  // Effet pour afficher l'itinéraire si les points d'origine et de destination sont définis
  useEffect(() => {
    if (!map || !directionsRenderer || !origin || !destination) return;

    const directionsService = new google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
          
          // Ajuster le zoom pour voir tout l'itinéraire
          if (result?.routes[0]?.bounds) {
            map.fitBounds(result.routes[0].bounds);
          }
          
          toast.success("Itinéraire calculé avec succès", {
            description: `Distance: ${result?.routes[0]?.legs[0]?.distance?.text || "N/A"}`,
          });
        } else {
          toast.error("Erreur lors du calcul de l'itinéraire", {
            description: "Veuillez vérifier les adresses saisies",
          });
        }
      }
    );
  }, [map, directionsRenderer, origin, destination]);

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

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <button
        onClick={locateUser}
        disabled={isLoadingPosition || !isApiLoaded}
        className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg z-10 transition-all"
        title="Localiser ma position"
      >
        <Locate size={20} className={`${isLoadingPosition ? 'animate-spin text-gray-400' : 'text-teal-600'}`} />
      </button>
    </div>
  );
};

export default Map;
