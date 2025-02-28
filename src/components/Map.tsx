
// =======================================================
// Composant Map
// Description: Carte interactive affichant les trajets
// =======================================================

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * Composant Map - Affiche une carte interactive
 * 
 * Ce composant utilise Mapbox GL JS pour afficher une carte
 * centrée sur Constantine et montrer les trajets disponibles.
 */
const Map = () => {
  // Référence pour l'élément DOM qui contiendra la carte
  const mapContainer = useRef<HTMLDivElement>(null);
  // Référence pour l'instance de la carte Mapbox
  const map = useRef<mapboxgl.Map | null>(null);

  // Effet pour initialiser la carte
  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialisez la carte
    mapboxgl.accessToken = 'VOTRE_CLE_MAPBOX_PUBLIC'; // Les utilisateurs devront remplacer ceci par leur clé Mapbox
    
    // Création de l'instance de carte
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [6.6147, 36.3650], // Coordonnées de Constantine
      zoom: 11
    });

    // Ajout des contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Fonction pour ajouter des marqueurs (à implémenter avec des données réelles)
    const addMarkers = () => {
      // Exemple: ajouter un marqueur pour Constantine Centre
      if (map.current) {
        new mapboxgl.Marker({ color: '#45B39D' })
          .setLngLat([6.6147, 36.3650])
          .setPopup(new mapboxgl.Popup().setHTML("<h3>Constantine Centre</h3><p>Point de départ populaire</p>"))
          .addTo(map.current);
      }
    };

    // Attendre que la carte soit chargée pour ajouter les marqueurs
    map.current.on('load', addMarkers);

    // Nettoyage lors du démontage du composant
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;
