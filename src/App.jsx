import React, { useState } from 'react';
import { 
  Dog, 
  Cat, 
  Search, 
  MapPin, 
  MessageSquare, 
  Info, 
  Menu, 
  X, 
  Send, 
  Hotel, 
  Plane, 
  FileText,
  PawPrint,
  Heart,
  CircleUser,
  Settings,
  Star,
  Coffee
} from 'lucide-react';
import InteractivePetMap from './Components/Map';

const PetFriendlyApp = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilterType, setSelectedFilterType] = useState('todos');
  const [onlyPetFriendly, setOnlyPetFriendly] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { text: '¡Hola! Soy Buddy, tu asistente de viajes pet-friendly. ¿En qué puedo ayudarte hoy?', isBot: true }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('españa');

  // Datos simulados de lugares
  const places = [
    { id: 1, name: 'Hotel Canino Deluxe', type: 'hotel', petFriendly: true, rating: 4.8, location: 'Madrid', image: 'hotel' },
    { id: 2, name: 'Parque Central de Mascotas', type: 'parque', petFriendly: true, rating: 4.5, location: 'Barcelona', image: 'park' },
    { id: 3, name: 'Café Guau', type: 'restaurante', petFriendly: true, rating: 4.2, location: 'Valencia', image: 'cafe' },
    { id: 4, name: 'Veterinaria 24h', type: 'servicios', petFriendly: true, rating: 4.9, location: 'Sevilla', image: 'vet' },
    { id: 5, name: 'Alojamiento Patitas', type: 'hotel', petFriendly: true, rating: 4.6, location: 'Málaga', image: 'hotel' },
    { id: 6, name: 'Museo Nacional', type: 'atraccion', petFriendly: false, rating: 4.7, location: 'Madrid', image: 'museum' }
  ];

  // Normativas por país
  const regulations = {
    españa: {
      title: 'España',
      requirements: [
        'Microchip obligatorio',
        'Vacunación antirrábica vigente',
        'Pasaporte europeo para mascotas',
        'Limitación por tamaño en transporte público'
      ],
      transport: 'En España, RENFE permite mascotas pequeñas en transportín y perros medianos con bozal y correa. Consulta siempre las condiciones específicas.'
    },
    francia: {
      title: 'Francia',
      requirements: [
        'Microchip obligatorio',
        'Vacunación antirrábica (mínimo 21 días antes)',
        'Pasaporte europeo para mascotas',
        'Tratamiento contra equinococosis 24-120h antes'
      ],
      transport: 'En Francia, SNCF permite mascotas pequeñas (hasta 6kg) por €7 y perros grandes con bozal por un suplemento del 50% del billete.'
    },
    italia: {
      title: 'Italia',
      requirements: [
        'Microchip obligatorio',
        'Vacunación antirrábica vigente',
        'Pasaporte europeo para mascotas',
        'Certificado veterinario (menos de 10 días)'
      ],
      transport: 'En Italia, Trenitalia permite mascotas pequeñas gratis y perros grandes con billete reducido, siempre con bozal y correa.'
    }
  };

  // Función para filtrar lugares
  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                        place.location.toLowerCase().includes(searchValue.toLowerCase());
    const matchesType = selectedFilterType === 'todos' || place.type === selectedFilterType;
    const matchesPetFriendly = !onlyPetFriendly || place.petFriendly;
    
    return matchesSearch && matchesType && matchesPetFriendly;
  });

  // Función para enviar mensaje en el chat
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!chatInput.trim()) return;
    
    // Añadir mensaje del usuario
    setChatMessages([...chatMessages, { text: chatInput, isBot: false }]);
    
    // Respuestas preprogramadas simples
    const userMessage = chatInput.toLowerCase();
    setChatInput('');
    
    // Simular respuesta del bot
    setTimeout(() => {
      let botResponse = "Lo siento, no tengo información específica sobre eso. ¿Puedes preguntarme sobre hoteles, requisitos o transporte para mascotas?";
      
      if (userMessage.includes('hotel') || userMessage.includes('alojamiento')) {
        botResponse = "Tenemos muchos hoteles pet-friendly disponibles. Te recomiendo el Hotel Canino Deluxe en Madrid y Alojamiento Patitas en Málaga. ¿Necesitas más opciones?";
      } else if (userMessage.includes('requisito') || userMessage.includes('documento')) {
        botResponse = "Para viajar con tu mascota generalmente necesitarás: microchip, vacunación antirrábica al día y pasaporte europeo para mascotas. Cada país puede tener requisitos adicionales.";
      } else if (userMessage.includes('transporte') || userMessage.includes('tren') || userMessage.includes('avión')) {
        botResponse = "En trenes, generalmente se aceptan mascotas pequeñas en transportín y perros con bozal y correa. En aviones, cada aerolínea tiene políticas diferentes, pero casi todas aceptan mascotas en cabina o bodega según su tamaño.";
      } else if (userMessage.includes('perro') || userMessage.includes('can')) {
        botResponse = "Los perros son bienvenidos en muchos establecimientos. Recuerda llevar siempre bolsas para recoger sus deposiciones, agua y su correa.";
      } else if (userMessage.includes('gato') || userMessage.includes('felino')) {
        botResponse = "Para los gatos, te recomiendo siempre usar un transportín cómodo y llevar su arena y juguetes familiares para reducir su estrés durante el viaje.";
      } else if (userMessage.includes('hola') || userMessage.includes('buenos días') || userMessage.includes('buenas')) {
        botResponse = "¡Hola! Soy Buddy, tu asistente para viajes pet-friendly. ¿En qué puedo ayudarte hoy?";
      }
      
      setChatMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 800);
  };

  // Colores y estilos 
  const primaryColor = "bg-teal-500";
  const secondaryColor = "bg-purple-600";
  const accentColor = "text-yellow-400";

  // Icono de placeholder para las imágenes
  const getPlaceIcon = (type) => {
    switch(type) {
      case 'hotel': return <Hotel className="text-teal-500" />;
      case 'park': return <PawPrint className="text-green-500" />;
      case 'cafe': return <Coffee className="text-yellow-700" />;
      case 'vet': return <Heart className="text-red-500" />;
      case 'museum': return <FileText className="text-blue-500" />;
      default: return <MapPin className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative text-black w-full">
      {/* Header */}
      <header className={`${primaryColor} text-white shadow-md sticky top-0 z-50`}>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8" />
              <h1 className="text-2xl font-bold">PetTraveler</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setActiveTab('map')} 
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${activeTab === 'map' ? 'bg-white text-teal-600' : 'hover:bg-teal-400'}`}
              >
                <MapPin className="h-5 w-5" />
                <span>Explorar</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('regulations')} 
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${activeTab === 'regulations' ? 'bg-white text-teal-600' : 'hover:bg-teal-400'}`}
              >
                <Info className="h-5 w-5" />
                <span>Normativas</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('chat')} 
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${activeTab === 'chat' ? 'bg-white text-teal-600' : 'hover:bg-teal-400'}`}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Asistente</span>
              </button>
            </div>
            
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="md:hidden text-white p-2"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-teal-500 bg-opacity-95 z-40 pt-20 md:hidden">
          <div className="container mx-auto p-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => {setActiveTab('map'); setMenuOpen(false);}} 
                className="flex items-center space-x-3 p-4 bg-white text-teal-600 rounded-lg shadow"
              >
                <MapPin className="h-6 w-6" />
                <span className="text-lg font-medium">Explorar destinos</span>
              </button>
              
              <button 
                onClick={() => {setActiveTab('regulations'); setMenuOpen(false);}} 
                className="flex items-center space-x-3 p-4 bg-white text-teal-600 rounded-lg shadow"
              >
                <Info className="h-6 w-6" />
                <span className="text-lg font-medium">Normativas</span>
              </button>
              
              <button 
                onClick={() => {setActiveTab('chat'); setMenuOpen(false);}} 
                className="flex items-center space-x-3 p-4 bg-white text-teal-600 rounded-lg shadow"
              >
                <MessageSquare className="h-6 w-6" />
                <span className="text-lg font-medium">Asistente Buddy</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="container mx-auto p-4 mt-4">
        {/* Map/Places Tab */}
        {activeTab === 'map' && (
          <div>
            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <div className="relative flex-grow mb-4 md:mb-0">
                  <input 
                    type="text" 
                    placeholder="Buscar hoteles, parques, restaurantes..." 
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-300 focus:outline-none"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <Search className="absolute left-3 top-3 text-gray-400" />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <select 
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-300 focus:outline-none"
                    value={selectedFilterType}
                    onChange={(e) => setSelectedFilterType(e.target.value)}
                  >
                    <option value="todos">Todos los tipos</option>
                    <option value="hotel">Hoteles</option>
                    <option value="restaurante">Restaurantes</option>
                    <option value="parque">Parques</option>
                    <option value="servicios">Servicios</option>
                    <option value="atraccion">Atracciones</option>
                  </select>
                  
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
                    <input 
                      type="checkbox" 
                      id="petfriendly-filter" 
                      className="h-4 w-4 text-teal-500"
                      checked={onlyPetFriendly}
                      onChange={() => setOnlyPetFriendly(!onlyPetFriendly)}
                    />
                    <label htmlFor="petfriendly-filter" className="flex items-center space-x-1">
                      <PawPrint className="h-4 w-4 text-teal-500" />
                      <span>Solo Pet-Friendly</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Places Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <MapPin className="mr-2 text-teal-500" />
                Destinos para ti y tu mascota
              </h2>
              
              {selectedPlace ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                    
                    <div className="mt-4">
                      <p className="text-gray-600">Este {selectedPlace.type === 'hotel' ? 'alojamiento' : 'lugar'} {selectedPlace.petFriendly ? 'acepta mascotas de cualquier tamaño y ofrece servicios especiales para ellas' : 'no acepta mascotas actualmente'}.</p>
                      
                      {selectedPlace.petFriendly && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs flex items-center">
                            <Dog className="h-3 w-3 mr-1" /> Zona para perros
                          </span>
                          <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs flex items-center">
                            <Heart className="h-3 w-3 mr-1" /> Kit de bienvenida
                          </span>
                          <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs flex items-center">
                            <Settings className="h-3 w-3 mr-1" /> Servicio mascota
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <button className={`${primaryColor} text-white px-4 py-2 rounded-lg flex items-center`}>
                        <Hotel className="h-4 w-4 mr-2" />
                        Reservar
                      </button>
                      
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contactar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPlaces.length > 0 ? (
                    filteredPlaces.map(place => (
                      <div 
                        key={place.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 cursor-pointer"
                        onClick={() => setSelectedPlace(place)}
                      >
                        <div className="h-32 bg-gray-200 flex items-center justify-center">
                          <div className="h-20 w-20">
                            {getPlaceIcon(place.image)}
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-bold">{place.name}</h3>
                          
                          <div className="flex items-center mt-1 text-gray-600">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="text-sm">{place.location}</span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
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
                            
                            <div className="flex items-center text-yellow-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="ml-1 text-gray-700">{place.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 py-12 text-center text-gray-500">
                      <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg">No se encontraron lugares que coincidan con tu búsqueda.</p>
                      <p>Intenta con otros filtros o términos de búsqueda.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Regulations Tab */}
        {activeTab === 'regulations' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Info className="mr-2 text-teal-500" />
              Normativas para viajar con mascotas
            </h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex border-b">
                {Object.keys(regulations).map(country => (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className={`px-4 py-3 font-medium ${
                      selectedCountry === country 
                        ? `${primaryColor} text-white` 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {regulations[country].title}
                  </button>
                ))}
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    <FileText className="mr-2 text-teal-500" />
                    Requisitos para tu mascota
                  </h3>
                  <ul className="space-y-2">
                    {regulations[selectedCountry].requirements.map((req, i) => (
                      <li key={i} className="flex items-start">
                        <PawPrint className="h-5 w-5 mr-2 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    <Plane className="mr-2 text-teal-500" />
                    Transporte
                  </h3>
                  <p className="text-gray-700">{regulations[selectedCountry].transport}</p>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <div className="flex">
                    <Info className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-700">Esta información es orientativa. Te recomendamos consultar siempre con las autoridades oficiales antes de viajar, ya que las normativas pueden cambiar.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Chat/Assistant Tab */}
        {activeTab === 'chat' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <MessageSquare className="mr-2 text-teal-500" />
              Asistente Buddy
            </h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex items-center p-4 border-b">
                <div className="relative">
                  <Dog className="h-10 w-10 text-teal-500 p-1 bg-teal-100 rounded-full" />
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-3">
                  <p className="font-medium">Buddy</p>
                  <p className="text-xs text-gray-500">Tu asistente de viajes pet-friendly</p>
                </div>
              </div>
              
              <div className="h-96 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.isBot ? '' : 'justify-end'}`}
                  >
                    <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                      msg.isBot 
                        ? 'bg-gray-100 text-gray-800' 
                        : `${primaryColor} text-white`
                    }`}>
                      {msg.isBot && (
                        <div className="flex items-center mb-1">
                          <Dog className="h-4 w-4 mr-1 text-teal-500" />
                          <span className="text-xs font-medium text-teal-500">Buddy</span>
                        </div>
                      )}
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="p-4 border-t flex">
                <input
                  type="text"
                  placeholder="Escribe tu pregunta aquí..."
                  className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <button 
                  type="submit"
                  className={`${primaryColor} text-white px-4 py-2 rounded-r-lg flex items-center`}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
            
            <div className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-lg">
              <h3 className="font-medium text-teal-700 mb-2">¿Necesitas ayuda? Prueba preguntar:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div 
                  onClick={() => {
                    setChatInput("¿Qué documentos necesita mi perro para viajar?");
                    setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100);
                  }}
                  className="bg-white border border-teal-200 p-2 rounded-lg cursor-pointer hover:bg-teal-50"
                >
                  "¿Qué documentos necesita mi perro para viajar?"
                </div>
                <div 
                  onClick={() => {
                    setChatInput("¿Cómo puedo viajar en tren con mi mascota?");
                    setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100);
                  }}
                  className="bg-white border border-teal-200 p-2 rounded-lg cursor-pointer hover:bg-teal-50"
                >
                  "¿Cómo puedo viajar en tren con mi mascota?"
                </div>
                <div 
                  onClick={() => {
                    setChatInput("Hoteles que aceptan perros grandes");
                    setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100);
                  }}
                  className="bg-white border border-teal-200 p-2 rounded-lg cursor-pointer hover:bg-teal-50"
                >
                  "Hoteles que aceptan perros grandes"
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
        <InteractivePetMap />

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <PawPrint className="h-6 w-6" />
                <h2 className="text-xl font-bold">PetTraveler</h2>
              </div>
              <p className="mt-2 text-gray-400 max-w-md">
                Hacemos que viajar con tu mascota sea una experiencia inolvidable. Encuentra los mejores lugares pet-friendly.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-4">Explora</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Destinos</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Hoteles</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Parques</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Servicios veterinarios</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Información</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Normativas por país</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Requisitos de viaje</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Consejos para viajar</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Preguntas frecuentes</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 md:mt-0">
              <h3 className="font-bold mb-4">Contáctanos</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span>soporte@pettraveler.com</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Madrid, España</span>
                </li>
              </ul>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Síguenos</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <CircleUser className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <MessageSquare className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Heart className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} PetTraveler. Todos los derechos reservados.
            </p>
            
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-white text-sm">Términos de servicio</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm">Política de privacidad</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PetFriendlyApp;