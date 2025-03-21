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