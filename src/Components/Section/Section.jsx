import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Star, PawPrint, Coffee, Building, SquareParkingIcon, ShoppingBag, Stethoscope, Phone, Clock, DollarSign, CalendarRange, Check, X } from 'lucide-react';

// Datos adicionales ficticios para cada tipo de lugar
const getAdditionalInfo = (place) => {
    if (!place || !place.name) return {}; // Verifica que el lugar exista y tenga nombre
    
    const baseInfo = {
        contacto: `+${Math.floor(Math.random() * 900000000) + 100000000}`,
        horario: ['Lun-Vie: 9:00-20:00', 'Sáb-Dom: 10:00-18:00'],
        web: `https://www.${place.name.toLowerCase().replace(/\s+/g, '')}.com`,
    };

    switch (place.type) {
        case 'hotel':
            return {
                ...baseInfo,
                precioNoche: Math.floor(Math.random() * 150) + 50,
                servicios: ['Wi-Fi gratis', 'Desayuno incluido', 'Estacionamiento', 'Área para mascotas'],
                tamañosMascotasPermitidos: place.petFriendly ? ['Pequeño', 'Mediano', 'Grande'] : [],
                cargoAdicionalMascota: place.petFriendly ? Math.floor(Math.random() * 30) : 'No admite mascotas',
                reservaOnline: true
            };
        case 'restaurante':
            return {
                ...baseInfo,
                precioPromedio: Math.floor(Math.random() * 40) + 10,
                cocina: ['Local', 'Internacional', 'Opciones vegetarianas'],
                menuMascotas: place.petFriendly ? ['Snacks caseros', 'Agua fresca', 'Galletas premium'] : [],
                terraza: true,
                reservaciones: true
            };
        case 'parque':
            return {
                ...baseInfo,
                horario: ['Abierto 24/7'],
                instalaciones: ['Áreas de juego', 'Bebederos', 'Zonas sin correa', 'Bolsas para excrementos'],
                normas: ['Recoger excrementos', 'Control de comportamiento', 'Vacunas al día'],
                entradaGratuita: true,
                eventosMascotas: ['Fin de semana: Encuentros sociales', 'Mensual: Competencias amistosas']
            };
        case 'tienda':
            return {
                ...baseInfo,
                categorias: ['Alimentos', 'Accesorios', 'Juguetes', 'Higiene', 'Ropa'],
                marcasDestacadas: ['Royal Canin', 'Purina', 'Hills', 'Advance', 'Pedigree'],
                serviciosAdicionales: ['Asesoramiento nutricional', 'Envío a domicilio', 'Programa de fidelidad'],
                descuentoOnline: '10%'
            };
        case 'veterinario':
            return {
                ...baseInfo,
                especialidades: ['Medicina general', 'Cirugía', 'Dermatología', 'Odontología', 'Cardiología'],
                servicios: ['Consultas', 'Vacunación', 'Emergencias 24h', 'Análisis clínicos', 'Radiografías'],
                precioConsulta: Math.floor(Math.random() * 80) + 40,
                citaOnline: true
            };
        default:
            return baseInfo;
    }
};

const PlaceDetail = () => {
    const [searchParams] = useSearchParams()
    const place = searchParams.get('place')
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState({});
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    // Datos del array proporcionado
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

    useEffect(() => {
        if (place) {
            const foundPlace = places.find(p => 
                p.name.toLowerCase().includes(place.toLowerCase())
            );
            
            if (foundPlace) {
                setSelectedPlace(foundPlace);
                setSearchTerm(foundPlace.name);
            }
        }
    }, [place]);

    useEffect(() => {
        if (searchTerm.length > 1) {
            const filtered = places.filter(p => {
                if (!place || !p.name) return false; // Verifica que ambos existan
                return p.name.toLowerCase().includes(place.toLowerCase());
            });
            setFilteredPlaces(filtered);
        } else {
            setFilteredPlaces([]);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (selectedPlace) {
            setAdditionalInfo(getAdditionalInfo(selectedPlace));
        }
    }, [selectedPlace]);

    const handleSelectPlace = (place) => {
        setSelectedPlace(place);
        setSearchTerm(place.name);
        setFilteredPlaces([]);
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'hotel': return <Building className="w-6 h-6" />;
            case 'restaurante': return <Coffee className="w-6 h-6" />;
            case 'parque': return <SquareParkingIcon className="w-6 h-6" />;
            case 'tienda': return <ShoppingBag className="w-6 h-6" />;
            case 'veterinario': return <Stethoscope className="w-6 h-6" />;
            default: return <PawPrint className="w-6 h-6" />;
        }
    };

    const renderDetails = () => {
        if (!selectedPlace) return null;

        return (
            <div className="text-black mt-6 bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Imagen representativa */}
                    <div className="w-full md:w-1/3 rounded-lg overflow-hidden bg-gray-200 h-64 flex items-center justify-center">
                        <img
                            src={`/api/placeholder/400/320`}
                            alt={selectedPlace.name}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Información principal */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            {getTypeIcon(selectedPlace.type)}
                            <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                                {selectedPlace.type}
                            </span>
                            <div className="ml-auto flex items-center">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                <span className="ml-1 font-medium">{selectedPlace.rating}</span>
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold mb-2">{selectedPlace.name}</h1>

                        <div className="flex items-start gap-1 text-gray-600 mb-3">
                            <MapPin className="w-5 h-5 mt-0.5 text-gray-500 flex-shrink-0" />
                            <span>{selectedPlace.location}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <div className={`flex items-center gap-1 ${selectedPlace.petFriendly ? 'text-green-600' : 'text-red-600'}`}>
                                {selectedPlace.petFriendly ? (
                                    <>
                                        <Check className="w-5 h-5" />
                                        <span className="font-medium">Pet Friendly</span>
                                    </>
                                ) : (
                                    <>
                                        <X className="w-5 h-5" />
                                        <span className="font-medium">No acepta mascotas</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-700 mb-4">{selectedPlace.description}</p>

                        <div className="flex flex-wrap gap-3 mb-4">
                            <div className="flex items-center gap-1 text-gray-700">
                                <Phone className="w-4 h-4" />
                                <span>{additionalInfo.contacto}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-700">
                                <Clock className="w-4 h-4" />
                                <span>{additionalInfo.horario && additionalInfo.horario[0]}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Información específica según tipo */}
                <div className="mt-8 border-t pt-6">
                    {renderTypeSpecificInfo()}
                </div>
            </div>
        );
    };

    const renderTypeSpecificInfo = () => {
        if (!selectedPlace) return null;

        switch (selectedPlace.type) {
            case 'hotel':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Información del Hotel</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                        Precio por noche
                                    </h3>
                                    <p className="text-2xl font-bold text-green-600">€{additionalInfo.precioNoche}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Servicios incluidos</h3>
                                    <ul className="grid grid-cols-2 gap-2">
                                        {additionalInfo.servicios?.map((servicio, idx) => (
                                            <li key={idx} className="flex items-center gap-1">
                                                <Check className="w-4 h-4 text-green-500" />
                                                <span>{servicio}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Política de mascotas</h3>
                                    {selectedPlace.petFriendly ? (
                                        <>
                                            <p className="mb-2">
                                                Cargo adicional: <span className="font-medium">€{additionalInfo.cargoAdicionalMascota}</span>
                                            </p>
                                            <p className="mb-2">Tamaños permitidos:</p>
                                            <div className="flex gap-2">
                                                {additionalInfo.tamañosMascotasPermitidos?.map((tamaño, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                        {tamaño}
                                                    </span>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-red-600">Este hotel no admite mascotas.</p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                        <CalendarRange className="w-5 h-5 text-blue-600" />
                                        Reservaciones
                                    </h3>
                                    {additionalInfo.reservaOnline && (
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                            Reservar ahora
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'restaurante':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Información del Restaurante</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                        Precio promedio
                                    </h3>
                                    <p className="text-2xl font-bold text-green-600">€{additionalInfo.precioPromedio}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Tipo de cocina</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {additionalInfo.cocina?.map((tipo, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                                {tipo}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Para tu mascota</h3>
                                    {selectedPlace.petFriendly && additionalInfo.menuMascotas?.length > 0 ? (
                                        <>
                                            <p className="mb-2">Menú para mascotas:</p>
                                            <ul className="space-y-1">
                                                {additionalInfo.menuMascotas?.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-1">
                                                        <Paw className="w-4 h-4 text-orange-500" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            {additionalInfo.terraza && (
                                                <p className="mt-2 flex items-center gap-1 text-green-600">
                                                    <Check className="w-4 h-4" />
                                                    <span>Terraza pet-friendly disponible</span>
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-red-600">No hay opciones específicas para mascotas.</p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                        <CalendarRange className="w-5 h-5 text-blue-600" />
                                        Reservaciones
                                    </h3>
                                    {additionalInfo.reservaciones && (
                                        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                                            Reservar mesa
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'parque':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Información del Parque</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Instalaciones</h3>
                                    <ul className="grid grid-cols-2 gap-2">
                                        {additionalInfo.instalaciones?.map((instalacion, idx) => (
                                            <li key={idx} className="flex items-center gap-1">
                                                <Check className="w-4 h-4 text-green-500" />
                                                <span>{instalacion}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Normas</h3>
                                    <ul className="space-y-1">
                                        {additionalInfo.normas?.map((norma, idx) => (
                                            <li key={idx} className="flex items-start gap-1">
                                                <span className="text-blue-600 mt-0.5">•</span>
                                                <span>{norma}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Eventos para mascotas</h3>
                                    <ul className="space-y-1">
                                        {additionalInfo.eventosMascotas?.map((evento, idx) => (
                                            <li key={idx} className="flex items-center gap-1">
                                                <CalendarRange className="w-4 h-4 text-purple-500" />
                                                <span>{evento}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Acceso</h3>
                                    {additionalInfo.entradaGratuita ? (
                                        <p className="flex items-center gap-1 text-green-600 font-medium">
                                            <Check className="w-4 h-4" />
                                            <span>Entrada gratuita</span>
                                        </p>
                                    ) : (
                                        <p>Entrada de pago</p>
                                    )}

                                    <p className="mt-2">
                                        Horario: <span className="font-medium">{additionalInfo.horario?.[0]}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'tienda':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Información de la Tienda</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Categorías de productos</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {additionalInfo.categorias?.map((categoria, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                                                {categoria}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Marcas destacadas</h3>
                                    <ul className="grid grid-cols-2 gap-2">
                                        {additionalInfo.marcasDestacadas?.map((marca, idx) => (
                                            <li key={idx} className="flex items-center gap-1">
                                                <Check className="w-4 h-4 text-purple-500" />
                                                <span>{marca}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Servicios adicionales</h3>
                                    <ul className="space-y-1">
                                        {additionalInfo.serviciosAdicionales?.map((servicio, idx) => (
                                            <li key={idx} className="flex items-center gap-1">
                                                <Check className="w-4 h-4 text-green-500" />
                                                <span>{servicio}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                        Promociones
                                    </h3>
                                    {additionalInfo.descuentoOnline && (
                                        <div className="flex items-center gap-2">
                                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                                                {additionalInfo.descuentoOnline} de descuento en compras online
                                            </span>
                                        </div>
                                    )}

                                    <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                                        Visitar tienda online
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'veterinario':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Información del Centro Veterinario</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Especialidades</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {additionalInfo.especialidades?.map((especialidad, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                                                {especialidad}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Servicios disponibles</h3>
                                    <ul className="grid grid-cols-2 gap-2">
                                        {additionalInfo.servicios?.map((servicio, idx) => (
                                            <li key={idx} className="flex items-center gap-1">
                                                <Check className="w-4 h-4 text-teal-500" />
                                                <span>{servicio}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                        Precio consulta básica
                                    </h3>
                                    <p className="text-2xl font-bold text-green-600">€{additionalInfo.precioConsulta}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                        <CalendarRange className="w-5 h-5 text-blue-600" />
                                        Citas
                                    </h3>
                                    {additionalInfo.citaOnline && (
                                        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                                            Reservar cita online
                                        </button>
                                    )}

                                    <p className="mt-3">
                                        Horario de atención: <span className="font-medium">{additionalInfo.horario?.[0]}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="text-black max-w-6xl mx-auto p-4 md:p-6">
            <div className="relative">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar lugar por nombre..."
                        className="flex-1 px-4 py-3 outline-none"
                    />
                    <div className="px-4">
                        <Search className="w-5 h-5 text-gray-500" />
                    </div>
                </div>

                {/* Resultados de búsqueda */}
                {filteredPlaces.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredPlaces.map(place => (
                            <div
                                key={place.id}
                                onClick={() => handleSelectPlace(place)}
                                className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 flex items-center gap-2"
                            >
                                {getTypeIcon(place.type)}
                                <div>
                                    <div className="font-medium">{place.name}</div>
                                    <div className="text-sm text-gray-600">{place.location}</div>
                                </div>
                                <div className="ml-auto flex items-center">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="ml-1">{place.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Detalles del lugar seleccionado */}
            {renderDetails()}
        </div>
    );
};

export default PlaceDetail;