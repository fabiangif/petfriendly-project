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
    { id: 1, name: 'Parque Canino Bogotá', type: 'parque', rating: 4.8, location: 'Bogotá, Colombia', lat: 4.6097, lng: -74.0817, petFriendly: true, description: 'Parque exclusivo para perros con áreas cercadas y obstáculos para entrenamiento.' },
    { id: 2, name: 'Café Patitas Felices', type: 'restaurante', rating: 4.5, location: 'Medellín, Colombia', lat: 6.2476, lng: -75.5658, petFriendly: true, description: 'Cafetería que permite la entrada con mascotas y ofrece snacks especiales para perros.' },
    { id: 3, name: 'Hotel Canino de Lujo', type: 'hotel', rating: 4.7, location: 'Cartagena, Colombia', lat: 10.3932, lng: -75.4832, petFriendly: true, description: 'Hotel frente al mar que acepta mascotas de todos los tamaños sin cargo adicional.' },
    { id: 4, name: 'Parque Simón Bolívar - Área Canina', type: 'parque', rating: 4.9, location: 'Bogotá, Colombia', lat: 4.6584, lng: -74.0932, petFriendly: true, description: 'Zona especial para perros dentro del parque más grande de Bogotá.' },
    { id: 5, name: 'Restaurante El Perro Andaluz', type: 'restaurante', rating: 4.3, location: 'Cali, Colombia', lat: 3.4516, lng: -76.5320, petFriendly: true, description: 'Restaurante con terraza pet-friendly y menú especial para mascotas.' },
    { id: 6, name: 'Hotel Santa Clara', type: 'hotel', rating: 4.6, location: 'Cartagena, Colombia', lat: 10.4225, lng: -75.5511, petFriendly: false, description: 'Hotel de lujo en el centro histórico, no admite mascotas actualmente.' },
    { id: 7, name: 'Clínica Veterinaria Bogotá', type: 'veterinario', rating: 4.9, location: 'Bogotá, Colombia', lat: 4.6349, lng: -74.0653, petFriendly: true, description: 'Servicio veterinario completo con especialistas en animales exóticos y servicios de emergencia 24/7.' },
    { id: 8, name: 'Mascotas & Más', type: 'tienda', rating: 4.7, location: 'Barranquilla, Colombia', lat: 10.9639, lng: -74.7964, petFriendly: true, description: 'Tienda especializada en productos orgánicos y accesorios de alta calidad para mascotas.' },
    { id: 9, name: 'Veterinario 24h Medellín', type: 'veterinario', rating: 4.8, location: 'Medellín, Colombia', lat: 6.2332, lng: -75.5903, petFriendly: true, description: 'Centro veterinario con atención de emergencias las 24 horas, equipado con tecnología avanzada.' },
    { id: 10, name: 'PetColombia Store', type: 'tienda', rating: 4.4, location: 'Bogotá, Colombia', lat: 4.6685, lng: -74.0560, petFriendly: true, description: 'Tienda grande con todo tipo de suministros para mascotas, desde alimentos hasta juguetes y ropa.' },
    { id: 11, name: 'Centro Médico Animal', type: 'veterinario', rating: 4.5, location: 'Bucaramanga, Colombia', lat: 7.1254, lng: -73.1198, petFriendly: true, description: 'Centro de cuidado animal con servicios de peluquería, consulta veterinaria y rehabilitación.' },
    { id: 12, name: 'Pet Corner Colombiano', type: 'tienda', rating: 4.2, location: 'Pereira, Colombia', lat: 4.8133, lng: -75.6961, petFriendly: true, description: 'Boutique para mascotas con productos premium y una sección de alimentos naturales y orgánicos.' },
    { id: 13, name: 'Parque Canino El Poblado', type: 'parque', rating: 4.7, location: 'Medellín, Colombia', lat: 6.2087, lng: -75.5652, petFriendly: true, description: 'Amplio parque con zonas verdes y espacios de recreación para mascotas en el barrio El Poblado.' },
    { id: 14, name: 'Café Peludo', type: 'restaurante', rating: 4.6, location: 'Bogotá, Colombia', lat: 4.6683, lng: -74.0533, petFriendly: true, description: 'Cafetería temática con gatos adoptables y opciones vegetarianas.' },
    { id: 15, name: 'Hotel Pet Paradise', type: 'hotel', rating: 4.8, location: 'Santa Marta, Colombia', lat: 11.2404, lng: -74.2110, petFriendly: true, description: 'Resort exclusivo para mascotas con actividades recreativas y spa cerca de la playa.' },
    { id: 16, name: 'Parque Canino Villa del Río', type: 'parque', rating: 4.9, location: 'Cali, Colombia', lat: 3.4021, lng: -76.5388, petFriendly: true, description: 'Parque canino con obstáculos y zonas de juego para perros de todos los tamaños.' },
    { id: 17, name: 'Café La Mascota', type: 'restaurante', rating: 4.5, location: 'Manizales, Colombia', lat: 5.0689, lng: -75.5174, petFriendly: true, description: 'Café especializado en productos gourmet para mascotas y humanos en el centro de la ciudad.' },
    { id: 18, name: 'Clínica Veterinaria Moderna', type: 'veterinario', rating: 4.7, location: 'Pasto, Colombia', lat: 1.2136, lng: -77.2811, petFriendly: true, description: 'Clínica veterinaria moderna con atención a animales exóticos y domésticos.' },
    { id: 19, name: 'Mundo Animal Store', type: 'tienda', rating: 4.6, location: 'Cartagena, Colombia', lat: 10.4042, lng: -75.5133, petFriendly: true, description: 'Tienda completa con productos importados y locales para todo tipo de mascotas en el centro de Cartagena.' },
    { id: 20, name: 'Parque para Perros Chapinero', type: 'parque', rating: 4.8, location: 'Bogotá, Colombia', lat: 4.6453, lng: -74.0638, petFriendly: true, description: 'Un parque extenso en la localidad de Chapinero con áreas exclusivas para perros sin correa.' },
    { id: 21, name: 'Cat Café Bogotá', type: 'restaurante', rating: 4.5, location: 'Bogotá, Colombia', lat: 4.6492, lng: -74.0628, petFriendly: true, description: 'Cafetería donde se permite la entrada con gatos y hay felinos residentes para interactuar.' },
    { id: 22, name: 'Hotel Canino de Lujo Llanogrande', type: 'hotel', rating: 4.7, location: 'Rionegro, Colombia', lat: 6.1512, lng: -75.3761, petFriendly: true, description: 'Hotel de lujo en las afueras de Medellín que acepta mascotas de todos los tamaños sin cargo adicional.' },
    { id: 23, name: 'Parque Central Canino', type: 'parque', rating: 4.9, location: 'Armenia, Colombia', lat: 4.5389, lng: -75.6809, petFriendly: true, description: 'Áreas designadas para perros sin correa en ciertos horarios en el parque central.' },
    { id: 24, name: 'Restaurante Patas y Sabores', type: 'restaurante', rating: 4.3, location: 'Villavicencio, Colombia', lat: 4.1420, lng: -73.6294, petFriendly: true, description: 'Restaurante con menú especial para mascotas y terraza pet-friendly.' },
    { id: 25, name: 'Hotel Colonial', type: 'hotel', rating: 4.6, location: 'Popayán, Colombia', lat: 2.4414, lng: -76.6067, petFriendly: false, description: 'Hotel de lujo en el centro histórico de Popayán, no admite mascotas actualmente.' },
    { id: 26, name: 'Clínica Veterinaria del Caribe', type: 'veterinario', rating: 4.9, location: 'Barranquilla, Colombia', lat: 10.9878, lng: -74.7889, petFriendly: true, description: 'Servicio veterinario completo con especialistas en animales exóticos y servicios de emergencia 24/7.' },
    { id: 27, name: 'PetShop Premium', type: 'tienda', rating: 4.7, location: 'Cúcuta, Colombia', lat: 7.8939, lng: -72.5078, petFriendly: true, description: 'Tienda especializada en productos orgánicos y accesorios de alta calidad para mascotas.' },
    { id: 28, name: 'Veterinario 24h Cali', type: 'veterinario', rating: 4.8, location: 'Cali, Colombia', lat: 3.4516, lng: -76.5320, petFriendly: true, description: 'Centro veterinario con atención de emergencias las 24 horas, equipado con tecnología avanzada.' },
    { id: 29, name: 'Todo Mascotas Store', type: 'tienda', rating: 4.4, location: 'Medellín, Colombia', lat: 6.2430, lng: -75.5742, petFriendly: true, description: 'Tienda grande con todo tipo de suministros para mascotas, desde alimentos hasta juguetes y ropa.' },
    { id: 30, name: 'Centro de Bienestar Animal', type: 'veterinario', rating: 4.5, location: 'Ibagué, Colombia', lat: 4.4389, lng: -75.2322, petFriendly: true, description: 'Centro de cuidado animal con servicios de peluquería, consulta veterinaria y rehabilitación.' },
    { id: 31, name: 'Mascotas Felices Shop', type: 'tienda', rating: 4.2, location: 'Neiva, Colombia', lat: 2.9273, lng: -75.2879, petFriendly: true, description: 'Boutique para mascotas con productos premium y una sección de alimentos naturales y orgánicos.' },
    { id: 32, name: 'Parque Canino El Virrey', type: 'parque', rating: 4.8, location: 'Bogotá, Colombia', lat: 4.6721, lng: -74.0546, petFriendly: true, description: 'Parque espacioso cerca al Parque El Virrey con zonas recreativas para perros y eventos comunitarios.' },
    { id: 33, name: 'Café Patitas', type: 'restaurante', rating: 4.7, location: 'Cartagena, Colombia', lat: 10.4227, lng: -75.5477, petFriendly: true, description: 'Cafetería acogedora con menú especial para mascotas y un área de juegos para perros.' },
    { id: 34, name: 'Hotel Mascota Feliz', type: 'hotel', rating: 4.9, location: 'San Andrés, Colombia', lat: 12.5841, lng: -81.7001, petFriendly: true, description: 'Hotel boutique en la isla que acepta mascotas con servicios de spa y guardería.' },
    { id: 35, name: 'Peluquería Canina Top', type: 'veterinario', rating: 4.5, location: 'Tunja, Colombia', lat: 5.5446, lng: -73.3572, petFriendly: true, description: 'Spa y clínica veterinaria con servicios premium de cuidado animal.' },
    { id: 36, name: 'Animal Planet Shop', type: 'tienda', rating: 4.6, location: 'Montería, Colombia', lat: 8.7575, lng: -75.8878, petFriendly: true, description: 'Tienda de mascotas con productos locales y orgánicos para animales de compañía.' },
    { id: 37, name: 'Parque Canino Laureles', type: 'parque', rating: 4.7, location: 'Medellín, Colombia', lat: 6.2518, lng: -75.6024, petFriendly: true, description: 'Parque con senderos amplios y zonas de agility para perros en el barrio Laureles.' },
    { id: 38, name: 'Café Guau Miau', type: 'restaurante', rating: 4.4, location: 'Pereira, Colombia', lat: 4.8087, lng: -75.6906, petFriendly: true, description: 'Café con ambiente amigable para perros y menú especial para mascotas.' },
    { id: 39, name: 'Centro Veterinario Especializado', type: 'veterinario', rating: 4.8, location: 'Bucaramanga, Colombia', lat: 7.1191, lng: -73.1227, petFriendly: true, description: 'Centro veterinario con servicios especializados y urgencias 24/7.' },
    { id: 40, name: 'Hotel Pet Friendly Caribe', type: 'hotel', rating: 4.8, location: 'Santa Marta, Colombia', lat: 11.2408, lng: -74.2179, petFriendly: true, description: 'Hotel de lujo para mascotas con vista al mar y servicios premium en el malecón.' },
    { id: 41, name: 'Parque Canino del Viento', type: 'parque', rating: 4.6, location: 'Barranquilla, Colombia', lat: 10.9759, lng: -74.8013, petFriendly: true, description: 'Parque amplio con zonas sombreadas y bebederos para mascotas cerca al malecón.' },
    { id: 42, name: 'Restaurante Paws & Coffee', type: 'restaurante', rating: 4.7, location: 'Bogotá, Colombia', lat: 4.6943, lng: -74.0308, petFriendly: true, description: 'Restaurante con terraza exterior donde las mascotas pueden disfrutar junto a sus dueños.' },
    { id: 43, name: 'Hotel Canino Palmas', type: 'hotel', rating: 4.8, location: 'Medellín, Colombia', lat: 6.2359, lng: -75.5771, petFriendly: true, description: 'Hotel boutique en El Poblado con camas especiales para mascotas y servicio de paseo.' },
    { id: 44, name: 'Veterinaria El Bosque', type: 'veterinario', rating: 4.9, location: 'Cali, Colombia', lat: 3.4705, lng: -76.5232, petFriendly: true, description: 'Clínica veterinaria con especialistas en cirugía y rehabilitación canina y felina.' },
    { id: 45, name: 'Mundo Mascota Shop', type: 'tienda', rating: 4.5, location: 'Armenia, Colombia', lat: 4.5409, lng: -75.6704, petFriendly: true, description: 'Tienda completa con accesorios, alimentos premium y servicios de peluquería.' },
    { id: 46, name: 'Parque Canino Usaquén', type: 'parque', rating: 4.7, location: 'Bogotá, Colombia', lat: 4.7028, lng: -74.0297, petFriendly: true, description: 'Área cercada exclusiva para perros con obstáculos y juegos en la zona norte de Bogotá.' },
    { id: 47, name: 'La Parrilla Pet Friendly', type: 'restaurante', rating: 4.4, location: 'Bucaramanga, Colombia', lat: 7.1063, lng: -73.1141, petFriendly: true, description: 'Asadero tradicional con zona exterior que permite mascotas y ofrece agua fresca para ellas.' },
    { id: 48, name: 'Hostal Mascotas Bienvenidas', type: 'hotel', rating: 4.3, location: 'Villa de Leyva, Colombia', lat: 5.6339, lng: -73.5229, petFriendly: true, description: 'Hostal colonial con jardín amplio donde las mascotas pueden correr libremente.' },
    { id: 49, name: 'Centro Veterinario Moderno', type: 'veterinario', rating: 4.8, location: 'Pereira, Colombia', lat: 4.8143, lng: -75.7120, petFriendly: true, description: 'Centro médico con equipos de última generación y servicio de hospitalización 24/7.' },
    { id: 50, name: 'PetLandia Tienda', type: 'tienda', rating: 4.6, location: 'Cartagena, Colombia', lat: 10.3997, lng: -75.5144, petFriendly: true, description: 'Tienda especializada con productos importados y sección de alimentos orgánicos.' },
    { id: 51, name: 'Parque Canino El Cable', type: 'parque', rating: 4.5, location: 'Manizales, Colombia', lat: 5.0597, lng: -75.4894, petFriendly: true, description: 'Parque con vista a la ciudad y senderos especiales para caminar con mascotas.' },
    { id: 52, name: 'Café de las Mascotas', type: 'restaurante', rating: 4.6, location: 'Santa Marta, Colombia', lat: 11.2374, lng: -74.2142, petFriendly: true, description: 'Café frente al mar con menú para humanos y mascotas, y área de juegos sombreada.' },
    { id: 53, name: 'Glamping Canino', type: 'hotel', rating: 4.9, location: 'Guatapé, Colombia', lat: 6.2342, lng: -75.1644, petFriendly: true, description: 'Experiencia de glamping donde las mascotas disfrutan de la naturaleza junto a sus dueños.' },
    { id: 54, name: 'Clínica Animal del Este', type: 'veterinario', rating: 4.7, location: 'Cúcuta, Colombia', lat: 7.8891, lng: -72.4967, petFriendly: true, description: 'Centro veterinario con laboratorio propio y especialistas en animales exóticos.' },
    { id: 55, name: 'Super Pet Store', type: 'tienda', rating: 4.4, location: 'Ibagué, Colombia', lat: 4.4294, lng: -75.2131, petFriendly: true, description: 'Gran tienda con todo lo necesario para mascotas desde alimentos hasta accesorios decorativos.' },
    { id: 56, name: 'Parque Metropolitano Canino', type: 'parque', rating: 4.8, location: 'Medellín, Colombia', lat: 6.2457, lng: -75.5627, petFriendly: true, description: 'El parque canino más grande de la ciudad con zonas específicas según el tamaño del perro.' },
    { id: 57, name: 'Restaurante La Terraza Canina', type: 'restaurante', rating: 4.5, location: 'Popayán, Colombia', lat: 2.4432, lng: -76.6070, petFriendly: true, description: 'Restaurante colonial con terraza amplia donde las mascotas son bienvenidas.' },
    { id: 58, name: 'Hotel Canino de Montaña', type: 'hotel', rating: 4.7, location: 'San Gil, Colombia', lat: 6.5627, lng: -73.1345, petFriendly: true, description: 'Hotel en las montañas con senderos naturales para paseos con mascotas.' },
    { id: 59, name: 'Centro Veterinario Andino', type: 'veterinario', rating: 4.8, location: 'Tunja, Colombia', lat: 5.5386, lng: -73.3573, petFriendly: true, description: 'Clínica veterinaria especializada en tratamientos naturales y medicina alternativa.' },
    { id: 60, name: 'Pet Boutique Premium', type: 'tienda', rating: 4.6, location: 'Villavicencio, Colombia', lat: 4.1509, lng: -73.6353, petFriendly: true, description: 'Boutique exclusiva con ropa, accesorios y productos gourmet para mascotas.' },
    { id: 61, name: 'Parque Canino La Flora', type: 'parque', rating: 4.7, location: 'Cali, Colombia', lat: 3.4724, lng: -76.5200, petFriendly: true, description: 'Parque en el norte de la ciudad con juegos y obstáculos para entrenamiento canino.' },
    { id: 62, name: 'Brunch & Pets', type: 'restaurante', rating: 4.6, location: 'Bogotá, Colombia', lat: 4.6684, lng: -74.0573, petFriendly: true, description: 'Restaurante especializado en brunch con mesas adaptadas para que las mascotas estén cómodas.' },
    { id: 63, name: 'Hotel Campestre Pet Friendly', type: 'hotel', rating: 4.8, location: 'Melgar, Colombia', lat: 4.2049, lng: -74.6412, petFriendly: true, description: 'Hotel de campo con piscina para perros y amplias zonas verdes para jugar.' },
    { id: 64, name: 'Clínica Veterinaria del Norte', type: 'veterinario', rating: 4.9, location: 'Barranquilla, Colombia', lat: 11.0026, lng: -74.8090, petFriendly: true, description: 'Centro médico moderno con servicios especializados y unidad de cuidados intensivos.' },
    { id: 65, name: 'Pet Planet Colombia', type: 'tienda', rating: 4.5, location: 'Bucaramanga, Colombia', lat: 7.1312, lng: -73.1191, petFriendly: true, description: 'Megatienda con todas las marcas nacionales e importadas para el cuidado animal.' },
    { id: 66, name: 'Parque Canino Ciudad Jardín', type: 'parque', rating: 4.7, location: 'Cali, Colombia', lat: 3.3729, lng: -76.5392, petFriendly: true, description: 'Área exclusiva para perros con fuentes de agua y obstáculos para ejercicio.' },
    { id: 67, name: 'Café Peluditos', type: 'restaurante', rating: 4.4, location: 'Medellín, Colombia', lat: 6.2086, lng: -75.5795, petFriendly: true, description: 'Café temático con actividades para mascotas y menú especializado para perros y gatos.' },
    { id: 68, name: 'Hotel Mascotas Caribe', type: 'hotel', rating: 4.6, location: 'Santa Marta, Colombia', lat: 11.2270, lng: -74.1974, petFriendly: true, description: 'Hotel cercano a la playa con zonas acondicionadas para mascotas y servicio de guardería.' },
    { id: 69, name: 'Hospital Veterinario Central', type: 'veterinario', rating: 4.8, location: 'Bogotá, Colombia', lat: 4.6471, lng: -74.0906, petFriendly: true, description: 'El mayor hospital veterinario de la ciudad con todas las especialidades médicas.' },
    { id: 70, name: 'Mundo Animal Tienda', type: 'tienda', rating: 4.3, location: 'Pasto, Colombia', lat: 1.2149, lng: -77.2785, petFriendly: true, description: 'Tienda completa con alimentos, accesorios y servicios de asesoría para nuevos dueños.' },
    { id: 71, name: 'Parque Canino El Retiro', type: 'parque', rating: 4.6, location: 'Medellín, Colombia', lat: 6.2103, lng: -75.5668, petFriendly: true, description: 'Parque exclusivo para perros con áreas divididas según tamaño y carácter de las mascotas.' },
    { id: 72, name: 'Cervecería Pet Friendly', type: 'restaurante', rating: 4.7, location: 'Bogotá, Colombia', lat: 4.6585, lng: -74.0565, petFriendly: true, description: 'Cervecería artesanal que permite la entrada de mascotas con zona de juegos para perros.' },
    { id: 73, name: 'Eco-Hotel Mascotas Bienvenidas', type: 'hotel', rating: 4.9, location: 'Salento, Colombia', lat: 4.6403, lng: -75.5711, petFriendly: true, description: 'Hotel ecológico en el eje cafetero donde las mascotas pueden disfrutar de senderos naturales.' },
    { id: 74, name: 'Centro Veterinario Especializado', type: 'veterinario', rating: 4.7, location: 'Cartagena, Colombia', lat: 10.4065, lng: -75.5060, petFriendly: true, description: 'Clínica con especialistas en cardiología, neurología y oncología veterinaria.' },
    { id: 75, name: 'Petshop Premium Plaza', type: 'tienda', rating: 4.5, location: 'Armenia, Colombia', lat: 4.5492, lng: -75.6675, petFriendly: true, description: 'Tienda ubicada en centro comercial con productos exclusivos para mascotas.' },
    { id: 76, name: 'Parque Canino Versalles', type: 'parque', rating: 4.8, location: 'Cúcuta, Colombia', lat: 7.8995, lng: -72.4849, petFriendly: true, description: 'Parque moderno con fuentes, obstáculos y zonas de descanso para perros y dueños.' },
    { id: 77, name: 'Restaurante El Perro Feliz', type: 'restaurante', rating: 4.6, location: 'Barranquilla, Colombia', lat: 11.0092, lng: -74.8303, petFriendly: true, description: 'Restaurante familiar con menú especial para mascotas y áreas de juego techadas.' },
    { id: 78, name: 'Posada Pet Friendly Colonial', type: 'hotel', rating: 4.5, location: 'Mompox, Colombia', lat: 9.2413, lng: -74.4257, petFriendly: true, description: 'Posada en casa colonial con patios internos ideales para mascotas en clima caluroso.' },
    { id: 79, name: 'Veterinaria Especializada El Country', type: 'veterinario', rating: 4.8, location: 'Bogotá, Colombia', lat: 4.6914, lng: -74.0477, petFriendly: true, description: 'Clínica exclusiva con servicio personalizado y las últimas tecnologías médicas.' },
    { id: 80, name: 'MaxiPet Tienda', type: 'tienda', rating: 4.4, location: 'Neiva, Colombia', lat: 2.9447, lng: -75.2938, petFriendly: true, description: 'Tienda de gran formato con área de prueba para juguetes y accesorios para mascotas.' }
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
    <div className="bg-white rounded-lg shadow-lg text-black p-4 sm:p-26">
      <h1 className="text-center text-2xl md:text-5xl my-8 font-bold tracking-tighter uppercase">Encuentra el mejor sitio para tu viaje</h1>
      {/* Search and Filter Bar */}
      <div className="p-4 border-b border-gray-200">
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
      <div className="px-4 py-2 border-b border-gray-200 text-sm">
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
              <span className="text-sm font-normal text-gray-500">
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
                      <a href={`https://www.google.com/maps/dir/${selectedPlace.lat},${selectedPlace.lng}`} target="_blank" rel="noopener noreferrer">
                        <MapPin className="h-4 w-4 mr-2" />
                        Visitar
                      </a>
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