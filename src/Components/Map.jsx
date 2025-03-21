import React, { useState, useEffect, useRef } from 'react';
import { MapPin, PawPrint, X, Star } from 'lucide-react';

const SimplePetFriendlyMap = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Datos de lugares pet-friendly
  const petFriendlyPlaces = [
    { id: 1, name: 'Dog Park Berlin', type: 'parque', rating: 4.8, location: 'Berlín, Alemania', lat: 52.5200, lng: 13.4050, description: 'Un parque extenso con áreas exclusivas para perros sin correa.' },
    { id: 2, name: 'Cat Café Paris', type: 'restaurante', rating: 4.5, location: 'París, Francia', lat: 48.8566, lng: 2.3522, description: 'Cafetería donde se permite la entrada con gatos y hay felinos residentes para interactuar.' },
    { id: 3, name: 'Pet-friendly Hotel Barcelona', type: 'hotel', rating: 4.7, location: 'Barcelona, España', lat: 41.3851, lng: 2.1734, description: 'Hotel de lujo que acepta mascotas de todos los tamaños sin cargo adicional.' },
    { id: 4, name: 'Central Park Dog Areas', type: 'parque', rating: 4.9, location: 'Nueva York, EE.UU.', lat: 40.7812, lng: -73.9665, description: 'Áreas designadas para perros sin correa en ciertos horarios.' },
    { id: 5, name: 'Fidos Restaurant', type: 'restaurante', rating: 4.3, location: 'San Francisco, EE.UU.', lat: 37.7749, lng: -122.4194, description: 'Restaurante con menú especial para mascotas y terraza pet-friendly.' }
  ];
  
  // Cargar el script de Google Maps
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const apiKey = 'AIzaSyBhvTslaoL8fTWolQGLro_6KTKJGHrEaVg';
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.id = 'googleMapsScript';
      
      script.addEventListener('load', () => {
        setMapLoaded(true);
      });
      
      document.head.appendChild(script);
    };
    
    if (!document.getElementById('googleMapsScript') && !window.google) {
      loadGoogleMapsScript();
    } else if (window.google && window.google.maps) {
      setMapLoaded(true);
    }
  }, []);
  
  // Inicializar el mapa una vez que la API esté cargada
  useEffect(() => {
    if (mapLoaded && mapContainerRef.current) {
      initializeMap();
    }
  }, [mapLoaded]);
  
  // Inicializar el mapa
  const initializeMap = () => {
    if (!window.google || !window.google.maps) return;
    
    // Usar una ubicación predeterminada
    const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // Nueva York
    
    // Crear el mapa
    const newMap = new window.google.maps.Map(
      mapContainerRef.current,
      {
        center: defaultLocation,
        zoom: 2,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false
      }
    );
    
    setMap(newMap);
    
    // Añadir los marcadores
    petFriendlyPlaces.forEach(place => {
      const marker = new window.google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: newMap,
        title: place.name,
        icon: getMarkerIcon(place.type)
      });
      
      marker.addListener('click', () => {
        setSelectedPlace(place);
        newMap.panTo({ lat: place.lat, lng: place.lng });
        newMap.setZoom(10);
      });
    });
  };
  
  // Determinar icono basado en el tipo de lugar
  const getMarkerIcon = (type) => {
    switch(type) {
      case 'hotel': return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
      case 'parque': return "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
      case 'restaurante': return "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      default: return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-teal-500 text-white">
        <h2 className="text-xl font-bold flex items-center">
          <MapPin className="mr-2" />
          Mapa Pet-Friendly
        </h2>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* El mapa de Google */}
        <div 
          ref={mapContainerRef} 
          className="w-full md:w-2/3 h-96"
        />
        
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
                <span className="inline-block capitalize px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs mb-2">
                  {selectedPlace.type}
                </span>
                <p className="text-gray-600">
                  {selectedPlace.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center h-full">
              <MapPin className="h-12 w-12 text-teal-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">Selecciona un lugar</h3>
              <p>Haz clic en cualquier marcador del mapa para ver información detallada.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimplePetFriendlyMap;