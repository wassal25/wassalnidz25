
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialisez la carte
    mapboxgl.accessToken = 'VOTRE_CLE_MAPBOX_PUBLIC'; // Les utilisateurs devront remplacer ceci par leur clé Mapbox
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [6.6147, 36.3650], // Coordonnées de Constantine
      zoom: 11
    });

    // Ajoutez les contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Nettoyage
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
