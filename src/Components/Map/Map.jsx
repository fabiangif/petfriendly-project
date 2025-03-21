import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, PawPrint, X, Star, Hotel,
  MessageSquare, Search, Filter, Heart, ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SimplePetFriendlyMap = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyPetFriendly, setShowOnlyPetFriendly] = useState(false);
  const [selectedType, setSelectedType] = useState('todos');
  
  // Simplified places data with added veterinarios and tiendas
  const places = [
    { id: 1, name: 'Dog Park Berlin', type: 'parque', rating: 4.8, location: 'Berlín, Alemania', lat: 52.5200, lng: 13.4050, petFriendly: true, description: 'Un parque extenso con áreas exclusivas para perros sin correa.' },
    { id: 2, name: 'Cat Café Paris', type: 'restaurante', rating: 4.5, location: 'París, Francia', lat: 48.8566, lng: 2.3522, petFriendly: true, description: 'Cafetería donde se permite la entrada con gatos y hay felinos residentes para interactuar.' },
    { id: 3, name: 'Pet-friendly Hotel Barcelona', type: 'hotel', rating: 4.7, location: 'Barcelona, España', lat: 41.3851, lng: 2.1734, petFriendly: true, description: 'Hotel de lujo que acepta mascotas de todos los tamaños sin cargo adicional.' },
    { id: 4, name: 'Central Park Dog Areas', type: 'parque', rating: 4.9, location: 'Nueva York, EE.UU.', lat: 40.7812, lng: -73.9665, petFriendly: true, description: 'Áreas designadas para perros sin correa en ciertos horarios.' },
    { id: 5, name: 'Fidos Restaurant', type: 'restaurante', rating: 4.3, location: 'San Francisco, EE.UU.', lat: 37.7749, lng: -122.4194, petFriendly: true, description: 'Restaurante con menú especial para mascotas y terraza pet-friendly.' },
    { id: 6, name: 'Hotel Elegance', type: 'hotel', rating: 4.6, location: 'Madrid, España', lat: 40.4168, lng: -3.7038, petFriendly: false, description: 'Hotel de lujo en el centro de Madrid, no admite mascotas actualmente.' },
    { id: 7, name: 'Clínica Veterinaria Roma', type: 'veterinario', rating: 4.9, location: 'Roma, Italia', lat: 41.9028, lng: 12.4964, petFriendly: true, description: 'Servicio veterinario completo con especialistas en animales exóticos y servicios de emergencia 24/7.' },
    { id: 8, name: 'Pet Heaven Shop', type: 'tienda', rating: 4.7, location: 'Ámsterdam, Países Bajos', lat: 52.3676, lng: 4.9041, petFriendly: true, description: 'Tienda especializada en productos orgánicos y accesorios de alta calidad para mascotas.' },
    { id: 9, name: 'Veterinario 24h Barcelona', type: 'veterinario', rating: 4.8, location: 'Barcelona, España', lat: 41.3921, lng: 2.1774, petFriendly: true, description: 'Centro veterinario con atención de emergencias las 24 horas, equipado con tecnología avanzada.' },
    { id: 10, name: 'Petlandia Store', type: 'tienda', rating: 4.4, location: 'Berlín, Alemania', lat: 52.5100, lng: 13.3950, petFriendly: true, description: 'Tienda grande con todo tipo de suministros para mascotas, desde alimentos hasta juguetes y ropa.' },
    { id: 11, name: 'Animal Care Center', type: 'veterinario', rating: 4.5, location: 'Londres, Reino Unido', lat: 51.5074, lng: -0.1278, petFriendly: true, description: 'Centro de cuidado animal con servicios de peluquería, consulta veterinaria y rehabilitación.' },
    { id: 12, name: 'Pet Corner Shop', type: 'tienda', rating: 4.2, location: 'París, Francia', lat: 48.8606, lng: 2.3522, petFriendly: true, description: 'Boutique para mascotas con productos premium y una sección de alimentos naturales y orgánicos.' },
    { id: 13, name: 'Plaza Pet Friendly', type: 'parque', rating: 4.7, location: 'Ciudad de México, México', lat: 19.4326, lng: -99.1332, petFriendly: true, description: 'Amplio parque con zonas verdes y espacios de recreación para mascotas.' },
    { id: 14, name: 'Café Gatuno', type: 'restaurante', rating: 4.6, location: 'Buenos Aires, Argentina', lat: -34.6037, lng: -58.3816, petFriendly: true, description: 'Cafetería temática con gatos adoptables y opciones veganas.' },
    { id: 15, name: 'Pet Paradise Resort', type: 'hotel', rating: 4.8, location: 'Río de Janeiro, Brasil', lat: -22.9068, lng: -43.1729, petFriendly: true, description: 'Resort exclusivo para mascotas con actividades recreativas y spa.' },
    { id: 16, name: 'Woof Woof Park', type: 'parque', rating: 4.9, location: 'Sídney, Australia', lat: -33.8688, lng: 151.2093, petFriendly: true, description: 'Parque canino con obstáculos y zonas de juego para perros de todos los tamaños.' },
    { id: 17, name: 'Tokyo Paw Café', type: 'restaurante', rating: 4.5, location: 'Tokio, Japón', lat: 35.6762, lng: 139.6503, petFriendly: true, description: 'Café especializado en productos gourmet para mascotas y humanos.' },
    { id: 18, name: 'Safari Pet Clinic', type: 'veterinario', rating: 4.7, location: 'Nairobi, Kenia', lat: -1.286389, lng: 36.817223, petFriendly: true, description: 'Clínica veterinaria moderna con atención a animales exóticos.' },
    { id: 19, name: 'Purrfect Pet Store', type: 'tienda', rating: 4.6, location: 'Bangkok, Tailandia', lat: 13.7563, lng: 100.5018, petFriendly: true, description: 'Tienda completa con productos importados y locales para todo tipo de mascotas.' },
    { id: 20, name: 'Dog Park Berlin', type: 'parque', rating: 4.8, location: 'Berlín, Alemania', lat: 52.5200, lng: 13.4050, petFriendly: true, description: 'Un parque extenso con áreas exclusivas para perros sin correa.' },
    { id: 21, name: 'Cat Café Paris', type: 'restaurante', rating: 4.5, location: 'París, Francia', lat: 48.8566, lng: 2.3522, petFriendly: true, description: 'Cafetería donde se permite la entrada con gatos y hay felinos residentes para interactuar.' },
    { id: 22, name: 'Pet-friendly Hotel Barcelona', type: 'hotel', rating: 4.7, location: 'Barcelona, España', lat: 41.3851, lng: 2.1734, petFriendly: true, description: 'Hotel de lujo que acepta mascotas de todos los tamaños sin cargo adicional.' },
    { id: 23, name: 'Central Park Dog Areas', type: 'parque', rating: 4.9, location: 'Nueva York, EE.UU.', lat: 40.7812, lng: -73.9665, petFriendly: true, description: 'Áreas designadas para perros sin correa en ciertos horarios.' },
    { id: 24, name: 'Fidos Restaurant', type: 'restaurante', rating: 4.3, location: 'San Francisco, EE.UU.', lat: 37.7749, lng: -122.4194, petFriendly: true, description: 'Restaurante con menú especial para mascotas y terraza pet-friendly.' },
    { id: 25, name: 'Hotel Elegance', type: 'hotel', rating: 4.6, location: 'Madrid, España', lat: 40.4168, lng: -3.7038, petFriendly: false, description: 'Hotel de lujo en el centro de Madrid, no admite mascotas actualmente.' },
    { id: 26, name: 'Clínica Veterinaria Roma', type: 'veterinario', rating: 4.9, location: 'Roma, Italia', lat: 41.9028, lng: 12.4964, petFriendly: true, description: 'Servicio veterinario completo con especialistas en animales exóticos y servicios de emergencia 24/7.' },
    { id: 27, name: 'Pet Heaven Shop', type: 'tienda', rating: 4.7, location: 'Ámsterdam, Países Bajos', lat: 52.3676, lng: 4.9041, petFriendly: true, description: 'Tienda especializada en productos orgánicos y accesorios de alta calidad para mascotas.' },
    { id: 28, name: 'Veterinario 24h Barcelona', type: 'veterinario', rating: 4.8, location: 'Barcelona, España', lat: 41.3921, lng: 2.1774, petFriendly: true, description: 'Centro veterinario con atención de emergencias las 24 horas, equipado con tecnología avanzada.' },
    { id: 29, name: 'Petlandia Store', type: 'tienda', rating: 4.4, location: 'Berlín, Alemania', lat: 52.5100, lng: 13.3950, petFriendly: true, description: 'Tienda grande con todo tipo de suministros para mascotas, desde alimentos hasta juguetes y ropa.' },
    { id: 30, name: 'Animal Care Center', type: 'veterinario', rating: 4.5, location: 'Londres, Reino Unido', lat: 51.5074, lng: -0.1278, petFriendly: true, description: 'Centro de cuidado animal con servicios de peluquería, consulta veterinaria y rehabilitación.' },
    { id: 31, name: 'Pet Corner Shop', type: 'tienda', rating: 4.2, location: 'París, Francia', lat: 48.8606, lng: 2.3522, petFriendly: true, description: 'Boutique para mascotas con productos premium y una sección de alimentos naturales y orgánicos.' },
    { id: 32, name: 'Pet Paradise', type: 'parque', rating: 4.8, location: 'Buenos Aires, Argentina', lat: -34.6037, lng: -58.3816, petFriendly: true, description: 'Parque espacioso con zonas recreativas para perros y eventos comunitarios.' },
    { id: 33, name: 'Rio Pet Café', type: 'restaurante', rating: 4.7, location: 'Río de Janeiro, Brasil', lat: -22.9068, lng: -43.1729, petFriendly: true, description: 'Cafetería acogedora con menú especial para mascotas y un área de juegos para perros.' },
    { id: 34, name: 'Hotel Mascota Feliz', type: 'hotel', rating: 4.9, location: 'Ciudad de México, México', lat: 19.4326, lng: -99.1332, petFriendly: true, description: 'Hotel boutique que acepta mascotas con servicios de spa y guardería.' },
    { id: 35, name: 'Tokyo Pet Spa', type: 'veterinario', rating: 4.5, location: 'Tokio, Japón', lat: 35.6895, lng: 139.6917, petFriendly: true, description: 'Spa y clínica veterinaria con servicios premium de cuidado animal.' },
    { id: 36, name: 'Safari Pet Shop', type: 'tienda', rating: 4.6, location: 'Nairobi, Kenia', lat: -1.2864, lng: 36.8172, petFriendly: true, description: 'Tienda de mascotas con productos locales y orgánicos para animales de compañía.' },
    { id: 37, name: 'Sydney Pet Park', type: 'parque', rating: 4.7, location: 'Sídney, Australia', lat: -33.8688, lng: 151.2093, petFriendly: true, description: 'Parque con senderos amplios y zonas de agility para perros.' },
    { id: 38, name: 'Pawsome Café', type: 'restaurante', rating: 4.4, location: 'Toronto, Canadá', lat: 43.65107, lng: -79.347015, petFriendly: true, description: 'Café con ambiente amigable para perros y menú especial para mascotas.' },
    { id: 39, name: 'Pet Joy Center', type: 'veterinario', rating: 4.8, location: 'Lima, Perú', lat: -12.0464, lng: -77.0428, petFriendly: true, description: 'Centro veterinario con servicios especializados y urgencias 24/7.' },
    { id: 40, name: 'Cape Paws Resort', type: 'hotel', rating: 4.8, location: 'Ciudad del Cabo, Sudáfrica', lat: -33.9249, lng: 18.4241, petFriendly: true, description: 'Hotel de lujo para mascotas con vista al mar y servicios premium.' }
];
  
  // Get marker icon based on place type
  const getMarkerIcon = (type, isPetFriendly) => {
    if (!isPetFriendly) return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
    
    switch(type) {
      case 'hotel': return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
      case 'parque': return "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
      case 'restaurante': return "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      case 'veterinario': return "https://maps.google.com/mapfiles/ms/icons/purple-dot.png";
      case 'tienda': return "https://maps.google.com/mapfiles/ms/icons/orange-dot.png";
      default: return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
    }
  };
  
  // Get icon for place type
  const getTypeIcon = (type) => {
    switch(type) {
      case 'hotel': return <Hotel className="h-4 w-4" />;
      case 'parque': return <MapPin className="h-4 w-4" />;
      case 'restaurante': return <MessageSquare className="h-4 w-4" />;
      case 'veterinario': return <Heart className="h-4 w-4" />;
      case 'tienda': return <ShoppingBag className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };
  
  // Initialize map
  useEffect(() => {
    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      const apiKey = 'AIzaSyBhvTslaoL8fTWolQGLro_6KTKJGHrEaVg'; // Replace with your API key
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    } else {
      initMap();
    }
  }, []);
  
  // Initialize map function
  const initMap = () => {
    if (!mapContainerRef.current) return;
    
    const newMap = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 40.7128, lng: -74.0060 }, // New York as default
      zoom: 2,
      mapTypeControl: false,
      fullscreenControl: true,
      streetViewControl: false
    });
    
    setMap(newMap);
  };
  
  // Filter places based on search and filters
  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPetFilter = showOnlyPetFriendly ? place.petFriendly : true;
    
    const matchesTypeFilter = selectedType === 'todos' || place.type === selectedType;
    
    return matchesSearch && matchesPetFilter && matchesTypeFilter;
  });
  
  // Reset map view
  const resetMapView = () => {
    if (map && window.google) {
      // Create bounds with all markers
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach(marker => {
        bounds.extend(marker.getPosition());
      });
      
      // Fit map to bounds
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
      }
    }
  };
  
  // Handle closing the selected place detail
  const handleCloseDetail = () => {
    setSelectedPlace(null);
    resetMapView();
  };
  
  // Add markers when map is ready or filters change
  useEffect(() => {
    if (!map || !window.google) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers = [];
    const bounds = new window.google.maps.LatLngBounds();
    
    filteredPlaces.forEach(place => {
      // Create marker
      const marker = new window.google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: map,
        title: place.name,
        icon: getMarkerIcon(place.type, place.petFriendly)
      });
      
      // Add click listener
      marker.addListener('click', () => {
        setSelectedPlace(place);
      });
      
      newMarkers.push(marker);
      bounds.extend(marker.getPosition());
    });
    
    setMarkers(newMarkers);
    
    // Fit map to markers
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds);
    }
    
    return () => {
      newMarkers.forEach(marker => {
        if (marker) {
          window.google.maps.event.clearInstanceListeners(marker);
          marker.setMap(null);
        }
      });
    };
  }, [map, showOnlyPetFriendly, searchTerm, selectedType]);
  
  // Center map on selected place
  useEffect(() => {
    if (selectedPlace && map) {
      map.panTo({ lat: selectedPlace.lat, lng: selectedPlace.lng });
      map.setZoom(13);
    }
  }, [selectedPlace, map]);
  
  // Get type name in Spanish
  const getTypeLabel = (type) => {
    switch(type) {
      case 'hotel': return 'Hoteles';
      case 'parque': return 'Parques';
      case 'restaurante': return 'Restaurantes';
      case 'veterinario': return 'Veterinarios';
      case 'tienda': return 'Tiendas';
      case 'todos': return 'Todos';
      default: return type;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg text-black p-x-8">
      {/* Search and Filter Bar */}
      <div className="p-4 border-b">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre, ubicación o tipo..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            {/* Type filter buttons */}
            <div className="flex flex-wrap gap-2">
              {['todos', 'hotel', 'parque', 'restaurante', 'veterinario', 'tienda'].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center ${
                    selectedType === type 
                      ? 'bg-teal-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-1.5">
                    {getTypeIcon(type)}
                  </span>
                  {getTypeLabel(type)}
                </button>
              ))}
            </div>
            
            <div className="ml-auto">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={showOnlyPetFriendly}
                  onChange={() => setShowOnlyPetFriendly(!showOnlyPetFriendly)}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                <div className="ml-3 flex items-center text-sm font-medium text-gray-700">
                  <PawPrint className="h-4 w-4 mr-1" />
                  Solo Pet-Friendly
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Legend */}
      <div className="px-4 py-2 border-b text-sm">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-gray-600 font-medium">Leyenda:</span>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
            <span>Hoteles</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
            <span>Parques</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
            <span>Restaurantes</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-purple-500 mr-1"></span>
            <span>Veterinarios</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-orange-500 mr-1"></span>
            <span>Tiendas</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
            <span>No Pet-Friendly</span>
          </div>
        </div>
      </div>
      
      {/* Integrated Map and Places */}
      <div className="flex flex-col lg:flex-row p-4">
        {/* Map Column */}
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0 lg:pr-3">
          <div 
            ref={mapContainerRef} 
            className="w-full h-96 rounded-lg shadow-md"
          />
          {!map && (
            <div className="mt-2 text-center text-gray-500">
              Cargando mapa...
            </div>
          )}
        </div>
        
        {/* Places Info Column */}
        <div className="w-full lg:w-1/2 lg:pl-3">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MapPin className="mr-2 text-teal-500" />
            {selectedType === 'todos' ? (
              <span>Destinos para ti y tu mascota</span>
            ) : (
              <span>{getTypeLabel(selectedType)}</span>
            )}
            {filteredPlaces.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({filteredPlaces.length} {filteredPlaces.length === 1 ? 'resultado' : 'resultados'})
              </span>
            )}
          </h2>
          
          {selectedPlace ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{selectedPlace.name}</h3>
                  <button 
                    onClick={handleCloseDetail}
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
                  <div className={`px-2 py-1 rounded-full text-xs ${selectedPlace.petFriendly ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} flex items-center`}>
                    {selectedPlace.petFriendly ? (
                      <>
                        <PawPrint className="h-3 w-3 mr-1" />
                        <span>Pet-Friendly</span>
                      </>
                    ) : (
                      <>
                        <X className="h-3 w-3 mr-1" />
                        <span>No admite mascotas</span>
                      </>
                    )}
                  </div>
                  
                  <div className="ml-2 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 flex items-center">
                    {getTypeIcon(selectedPlace.type)}
                    <span className="ml-1">{getTypeLabel(selectedPlace.type).slice(0, -1)}</span>
                  </div>
                  
                  <div className="ml-2 flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-gray-700">{selectedPlace.rating}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-gray-600">{selectedPlace.description}</p>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center">
                    {selectedPlace.type === 'hotel' ? (
                      <Link to={`/place-info?place=${selectedPlace.name}`}>
                        <Hotel className="h-4 w-4 mr-2" />
                        Reservar
                      </Link>
                    ) : selectedPlace.type === 'veterinario' ? (
                      <>
                        <Heart className="h-4 w-4 mr-2" />
                        Pedir Cita
                      </>
                    ) : selectedPlace.type === 'tienda' ? (
                      <>
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Ver Productos
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4 mr-2" />
                        Visitar
                      </>
                    )}
                  </button>
                  
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contactar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {filteredPlaces.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
                  {filteredPlaces.map(place => (
                    <div 
                      key={place.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 cursor-pointer"
                      onClick={() => setSelectedPlace(place)}
                    >
                      <div className="p-4">
                        <h3 className="font-bold">{place.name}</h3>
                        
                        <div className="flex items-center mt-1 text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="text-sm">{place.location}</span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <div className={`px-2 py-1 rounded-full text-xs ${place.petFriendly ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} flex items-center`}>
                            {place.petFriendly ? (
                              <>
                                <PawPrint className="h-3 w-3 mr-1" />
                                <span>Pet-Friendly</span>
                              </>
                            ) : (
                              <>
                                <X className="h-3 w-3 mr-1" />
                                <span>No mascotas</span>
                              </>
                            )}
                          </div>
                          
                          <div className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 flex items-center">
                            {getTypeIcon(place.type)}
                            <span className="ml-1">{getTypeLabel(place.type).slice(0, -1)}</span>
                          </div>
                          
                          <div className="flex items-center text-yellow-500 ml-auto">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-gray-700">{place.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-2">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-700 mb-1">No se encontraron resultados</h3>
                  <p className="text-gray-500">Prueba con otros términos de búsqueda o ajusta los filtros</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimplePetFriendlyMap;