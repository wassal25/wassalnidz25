
declare namespace google {
  namespace maps {
    class Map {
      constructor(
        mapDiv: Element | null,
        opts?: MapOptions
      );
      setCenter(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      setOptions(options: MapOptions): void;
      fitBounds(bounds: LatLngBounds): void;
    }
    
    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latLng: LatLng | LatLngLiteral): void;
      setAnimation(animation: any): void;
    }
    
    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      open(map: Map, anchor?: Marker): void;
      setContent(content: string | Element): void;
    }
    
    class DirectionsService {
      route(
        request: DirectionsRequest,
        callback: (
          result: DirectionsResult | null,
          status: DirectionsStatus
        ) => void
      ): void;
    }
    
    class DirectionsRenderer {
      constructor(opts?: DirectionsRendererOptions);
      setMap(map: Map | null): void;
      setDirections(directions: DirectionsResult): void;
      setOptions(options: DirectionsRendererOptions): void;
    }
    
    class LatLng {
      constructor(lat: number, lng: number, noWrap?: boolean);
      lat(): number;
      lng(): number;
    }
    
    class LatLngBounds {
      constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral);
      extend(latLng: LatLng | LatLngLiteral): LatLngBounds;
      getCenter(): LatLng;
      getNorthEast(): LatLng;
      getSouthWest(): LatLng;
    }
    
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    
    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: string;
      fullscreenControl?: boolean;
      mapTypeControl?: boolean;
      streetViewControl?: boolean;
      styles?: Array<MapTypeStyle>;
      [key: string]: any;
    }
    
    interface MarkerOptions {
      position?: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      icon?: string | Icon | Symbol;
      animation?: any;
    }
    
    interface InfoWindowOptions {
      content?: string | Element;
      position?: LatLng | LatLngLiteral;
    }
    
    interface DirectionsRequest {
      origin: string | LatLng | LatLngLiteral | Place;
      destination: string | LatLng | LatLngLiteral | Place;
      travelMode: TravelMode;
      transitOptions?: TransitOptions;
      drivingOptions?: DrivingOptions;
      unitSystem?: UnitSystem;
      waypoints?: DirectionsWaypoint[];
      optimizeWaypoints?: boolean;
      provideRouteAlternatives?: boolean;
      avoidFerries?: boolean;
      avoidHighways?: boolean;
      avoidTolls?: boolean;
      region?: string;
    }
    
    interface DirectionsWaypoint {
      location: string | LatLng | LatLngLiteral | Place;
      stopover?: boolean;
    }
    
    interface DirectionsRendererOptions {
      map?: Map;
      directions?: DirectionsResult;
      panel?: Element;
      suppressMarkers?: boolean;
      suppressInfoWindows?: boolean;
      polylineOptions?: PolylineOptions;
    }
    
    interface PolylineOptions {
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
    }
    
    interface TransitOptions {
      arrivalTime?: Date;
      departureTime?: Date;
      modes?: TransitMode[];
      routingPreference?: TransitRoutePreference;
    }
    
    interface DrivingOptions {
      departureTime?: Date;
      trafficModel?: TrafficModel;
    }
    
    type TrafficModel = 'bestguess' | 'optimistic' | 'pessimistic';
    type TransitMode = 'bus' | 'rail' | 'subway' | 'train' | 'tram';
    type TransitRoutePreference = 'fewer_transfers' | 'less_walking';
    
    enum UnitSystem {
      IMPERIAL,
      METRIC
    }

    enum TravelMode {
      BICYCLING,
      DRIVING,
      TRANSIT,
      WALKING
    }
    
    enum DirectionsStatus {
      OK,
      NOT_FOUND,
      ZERO_RESULTS,
      MAX_WAYPOINTS_EXCEEDED,
      INVALID_REQUEST,
      OVER_QUERY_LIMIT,
      REQUEST_DENIED,
      UNKNOWN_ERROR
    }
    
    interface DirectionsResult {
      routes: DirectionsRoute[];
    }
    
    interface DirectionsRoute {
      bounds: LatLngBounds;
      legs: DirectionsLeg[];
      overview_path: LatLng[];
      overview_polyline: string;
      warnings: string[];
      waypoint_order: number[];
    }
    
    interface DirectionsLeg {
      arrival_time?: Time;
      departure_time?: Time;
      distance?: Distance;
      duration?: Duration;
      duration_in_traffic?: Duration;
      end_address: string;
      end_location: LatLng;
      start_address: string;
      start_location: LatLng;
      steps: DirectionsStep[];
    }
    
    interface DirectionsStep {
      distance: Distance;
      duration: Duration;
      end_location: LatLng;
      instructions: string;
      path: LatLng[];
      start_location: LatLng;
      travel_mode: TravelMode;
    }
    
    interface Distance {
      text: string;
      value: number;
    }
    
    interface Duration {
      text: string;
      value: number;
    }
    
    interface Time {
      text: string;
      time_zone: string;
      value: Date;
    }
    
    interface Place {}
    
    interface Icon {
      url?: string;
      path?: string;
      fillColor?: string;
      fillOpacity?: number;
      strokeWeight?: number;
      strokeColor?: string;
      scale?: number;
    }
    
    interface Symbol {
      path: string | number;
      fillColor?: string;
      fillOpacity?: number;
      strokeWeight?: number;
      strokeColor?: string;
      scale?: number;
    }
    
    interface MapTypeStyle {
      featureType?: string;
      elementType?: string;
      stylers: Array<Styler>;
    }
    
    interface Styler {
      [key: string]: any;
    }
    
    const MapTypeId: {
      ROADMAP: string;
      SATELLITE: string;
      HYBRID: string;
      TERRAIN: string;
    };
    
    const Animation: {
      DROP: number;
      BOUNCE: number;
    };
    
    const SymbolPath: {
      CIRCLE: number;
      FORWARD_CLOSED_ARROW: number;
      FORWARD_OPEN_ARROW: number;
      BACKWARD_CLOSED_ARROW: number;
      BACKWARD_OPEN_ARROW: number;
    };
  }
}
