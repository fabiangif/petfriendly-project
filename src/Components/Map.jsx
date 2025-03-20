import React, { useState, useEffect, useRef } from 'react';
import { MapPin, PawPrint, X, Star, Hotel, Heart, Settings, MessageSquare, Compass } from 'lucide-react';

const PetFriendlyGoogleMap = () => {
  // Referencia al contenedor del mapa
  const mapContainerRef = useRef(null);
  
  // Estados
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Datos de lugares pet-friendly (simulación para tener datos iniciales)
  const petFriendlyPlaces = [
    // Europa
    { id: 1, name: 'Dog Park Berlin', type: 'parque', petFriendly: true, rating: 4.8, location: 'Berlín, Alemania', lat: 52.5200, lng: 13.4050, description: 'Un parque extenso con áreas exclusivas para perros sin correa.' },
    { id: 2, name: 'Cat Café Paris', type: 'restaurante', petFriendly: true, rating: 4.5, location: 'París, Francia', lat: 48.8566, lng: 2.3522, description: 'Cafetería donde se permite la entrada con gatos y hay felinos residentes para interactuar.' },
    { id: 3, name: 'Pet-friendly Hotel Barcelona', type: 'hotel', petFriendly: true, rating: 4.7, location: 'Barcelona, España', lat: 41.3851, lng: 2.1734, description: 'Hotel de lujo que acepta mascotas de todos los tamaños sin cargo adicional.' },
    
    // América
    { id: 4, name: 'Central Park Dog Areas', type: 'parque', petFriendly: true, rating: 4.9, location: 'Nueva York, EE.UU.', lat: 40.7812, lng: -73.9665, description: 'Áreas designadas para perros sin correa en ciertos horarios.' },
    { id: 5, name: 'Fidos Restaurant', type: 'restaurante', petFriendly: true, rating: 4.3, location: 'San Francisco, EE.UU.', lat: 37.7749, lng: -122.4194, description: 'Restaurante con menú especial para mascotas y terraza pet-friendly.' },
    { id: 6, name: 'Pet Palace Hotel', type: 'hotel', petFriendly: true, rating: 4.6, location: 'Miami, EE.UU.', lat: 25.7617, lng: -80.1918, description: 'Alojamiento de lujo con servicios especiales para mascotas.' },
    
    // Asia
    { id: 7, name: 'Dog Park Tokyo', type: 'parque', petFriendly: true, rating: 4.5, location: 'Tokio, Japón', lat: 35.6762, lng: 139.6503, description: 'Espacio reservado para mascotas en el centro de la ciudad.' },
    { id: 8, name: 'Pet Café Bangkok', type: 'restaurante', petFriendly: true, rating: 4.2, location: 'Bangkok, Tailandia', lat: 13.7563, lng: 100.5018, description: 'Café con áreas exteriores donde se permiten mascotas.' },
    
    // Australia
    { id: 9, name: 'Bondi Beach Dog Zone', type: 'parque', petFriendly: true, rating: 4.7, location: 'Sídney, Australia', lat: -33.8915, lng: 151.2767, description: 'Zona de playa permitida para perros en horarios específicos.' },
    
    // África
    { id: 10, name: 'Cape Town Pet Hotel', type: 'hotel', petFriendly: true, rating: 4.4, location: 'Ciudad del Cabo, Sudáfrica', lat: -33.9249, lng: 18.4241, description: 'Hotel que ofrece alojamiento para huéspedes con sus mascotas.' }
  ];
  
  // Cargar el script de Google Maps de forma dinámica
  useEffect(() => {
    setLoading(true);
    
    // Función para cargar Google Maps API
    const loadGoogleMapsScript = () => {
      // Usar la API key que ya has proporcionado
      const apiKey = 'AIzaSyBhvTslaoL8fTWolQGLro_6KTKJGHrEaVg';
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.id = 'googleMapsScript';
      
      googleMapsScript.addEventListener('load', () => {
        setMapLoaded(true);
      });
      
      googleMapsScript.addEventListener('error', () => {
        setError("No se pudo cargar Google Maps. Por favor, inténtalo más tarde.");
        setLoading(false);
      });
      
      document.head.appendChild(googleMapsScript);
    };
    
    // Verificar si el script ya está cargado
    if (!document.getElementById('googleMapsScript') && !window.google) {
      loadGoogleMapsScript();
    } else if (window.google && window.google.maps) {
      setMapLoaded(true);
    }
    
    return () => {
      // Eliminar los marcadores cuando el componente se desmonte
      if (markers.length > 0) {
        markers.forEach(marker => marker.setMap(null));
      }
    };
  }, []);
  
  // Efecto para inicializar el mapa una vez que la API esté cargada y el DOM esté listo
  useEffect(() => {
    if (mapLoaded && mapContainerRef.current) {
      initializeMap();
    }
  }, [mapLoaded]);
  
  // Inicializar el mapa
  const initializeMap = () => {
    if (!window.google || !window.google.maps) {
      setError("Google Maps no está disponible. Comprueba tu conexión a internet.");
      setLoading(false);
      return;
    }
    
    // Intentar obtener la ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          
          // Crear el mapa centrado en la ubicación del usuario
          createMap(userPos);
        },
        () => {
          // En caso de error o rechazo de permisos, usar una ubicación predeterminada
          const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // Nueva York como fallback
          setUserLocation(defaultLocation);
          createMap(defaultLocation);
        }
      );
    } else {
      // Navegador sin soporte para geolocalización
      const defaultLocation = { lat: 40.7128, lng: -74.0060 };
      setUserLocation(defaultLocation);
      createMap(defaultLocation);
    }
  };
  
  // Crear mapa y marcadores
  const createMap = (center) => {
    // Asegurarse de que el contenedor del mapa existe
    if (!mapContainerRef.current) {
      setError("No se pudo encontrar el contenedor del mapa");
      setLoading(false);
      return;
    }
    
    const mapOptions = {
      center: center,
      zoom: 10,
      mapTypeControl: true,
      fullscreenControl: true,
      streetViewControl: false,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU
      }
    };
    
    try {
      // Crear la instancia del mapa
      const newMap = new window.google.maps.Map(
        mapContainerRef.current,
        mapOptions
      );
      
      setMap(newMap);
      
      // Añadir los marcadores iniciales
      const newMarkers = addMarkersToMap(newMap, petFriendlyPlaces);
      setMarkers(newMarkers);
      
      // Añadir el marcador del usuario
      new window.google.maps.Marker({
        position: center,
        map: newMap,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2
        },
        title: "Tu ubicación"
      });
      
      // Configurar el evento de cambio de viewport para cargar lugares cercanos
      newMap.addListener('idle', () => {
        // En una aplicación real, aquí harías una llamada a un API para obtener lugares cercanos
        // basándote en los límites actuales del mapa (newMap.getBounds())
      });
      
      setLoading(false);
    } catch (err) {
      console.error("Error al crear el mapa:", err);
      setError("Error al inicializar el mapa: " + err.message);
      setLoading(false);
    }
  };
  
  // Función para añadir marcadores al mapa
  const addMarkersToMap = (map, places) => {
    if (!window.google || !window.google.maps) return [];
    
    return places.map(place => {
      const marker = new window.google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: map,
        title: place.name,
        icon: {
          url: getMarkerIcon(place.type),
          scaledSize: new window.google.maps.Size(32, 32)
        },
        animation: window.google.maps.Animation.DROP
      });
      
      // Añadir evento de clic al marcador
      marker.addListener('click', () => {
        setSelectedPlace(place);
        map.panTo({ lat: place.lat, lng: place.lng });
      });
      
      return marker;
    });
  };
  
  // Determinar icono basado en el tipo de lugar
  const getMarkerIcon = (type) => {
    // Usar los iconos estándar de Google Maps
    switch(type) {
      case 'hotel': return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
      case 'parque': return "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
      case 'restaurante': return "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      case 'servicios': return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
      default: return "https://maps.google.com/mapfiles/ms/icons/purple-dot.png";
    }
  };
  
  // Función para ir a la ubicación del usuario
  const goToUserLocation = () => {
    if (map && userLocation) {
      map.panTo(userLocation);
      map.setZoom(14);
    }
  };
  
  // Función para obtener color basado en el tipo
  const getTypeColor = (type) => {
    switch(type) {
      case 'hotel': return 'text-blue-500 bg-blue-100';
      case 'parque': return 'text-green-500 bg-green-100';
      case 'restaurante': return 'text-yellow-500 bg-yellow-100';
      case 'servicios': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };
  
  // Función para obtener el icono basado en el tipo
  const getTypeIcon = (type) => {
    switch(type) {
      case 'hotel': return <Hotel className="h-4 w-4" />;
      case 'parque': return <PawPrint className="h-4 w-4" />;
      case 'restaurante': return <Heart className="h-4 w-4" />;
      case 'servicios': return <Settings className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-teal-500 text-white">
        <h2 className="text-xl font-bold flex items-center">
          <MapPin className="mr-2" />
          Mapa Mundial Pet-Friendly
        </h2>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* El mapa de Google */}
        <div className="relative w-full md:w-2/3 h-96">
          
          {/* Botón para centrar en la ubicación del usuario */}
          {!loading && !error && (
            <button 
              onClick={goToUserLocation}
              className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
              title="Ir a mi ubicación"
            >
              <Compass className="h-5 w-5 text-teal-500" />
            </button>
          )}
          
          {/* Leyenda */}
          {!loading && !error && (
            <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md text-sm z-10">
              <h4 className="font-medium mb-1">Leyenda:</h4>
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Hoteles</span>
              </div>
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Parques</span>
              </div>
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span>Restaurantes</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Servicios</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Panel de información */}
        <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l">
          {selectedPlace ? (
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{selectedPlace.name}</h3>
                <button 
                  onClick={() => setSelectedPlace(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{selectedPlace.location}</span>
              </div>
              
              <div className="flex items-center mt-2">
                <div className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 flex items-center">
                  <PawPrint className="h-3 w-3 mr-1" />
                  <span>Pet-Friendly</span>
                </div>
                
                <div className="ml-2 flex items-center text-yellow-500">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(selectedPlace.rating) ? 'fill-current' : 'stroke-current fill-none'}`} 
                    />
                  ))}
                  <span className="ml-1 text-gray-700">{selectedPlace.rating}</span>
                </div>
              </div>
              
              <div className="mt-3">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getTypeColor(selectedPlace.type)} mb-2`}>
                  {getTypeIcon(selectedPlace.type)}
                  <span className="ml-1 capitalize">{selectedPlace.type}</span>
                </div>
                <p className="text-gray-600">
                  {selectedPlace.description}
                </p>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center">
                  {selectedPlace.type === 'hotel' ? (
                    <>
                      <Hotel className="h-4 w-4 mr-2" />
                      Reservar
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 mr-2" />
                      Ver ruta
                    </>
                  )}
                </button>
                
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contactar
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center h-full">
              <MapPin className="h-12 w-12 text-teal-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">Selecciona un lugar</h3>
              <p>Haz clic en cualquier marcador del mapa para ver información detallada.</p>
              <p className="mt-2 text-sm">El mapa muestra lugares pet-friendly cercanos automáticamente a medida que exploras.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t p-4 bg-gray-50">
        <h3 className="font-medium text-gray-700 mb-2">Filtros rápidos:</h3>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 border border-teal-500 text-teal-600 rounded-full text-sm hover:bg-teal-50 flex items-center">
            <Hotel className="h-3 w-3 mr-1" /> Hoteles
          </button>
          <button className="px-3 py-1 border border-teal-500 text-teal-600 rounded-full text-sm hover:bg-teal-50 flex items-center">
            <PawPrint className="h-3 w-3 mr-1" /> Parques
          </button>
          <button className="px-3 py-1 border border-teal-500 text-teal-600 rounded-full text-sm hover:bg-teal-50 flex items-center">
            <Heart className="h-3 w-3 mr-1" /> Restaurantes
          </button>
          <button className="px-3 py-1 border border-teal-500 text-teal-600 rounded-full text-sm hover:bg-teal-50 flex items-center">
            <Settings className="h-3 w-3 mr-1" /> Servicios
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetFriendlyGoogleMap;