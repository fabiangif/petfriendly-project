import React, { useState, useEffect } from 'react';
import { useCart } from '../../Context/cart';
import {
    Plane,
    MapPin,
    Calendar,
    Users,
    ChevronDown,
    Search,
    Info
} from 'lucide-react';

const FlightSearchComponent = () => {
    const { addToCart, cart } = useCart();

    // State for search parameters
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [travelClass, setTravelClass] = useState('Economy');
    const [showFlights, setShowFlights] = useState(false);

    // Expanded flight data with multiple Colombian routes
    const flightOptions = [
        {
            id: 'flight-1',
            type: 'flight',
            airline: 'Avianca',
            origin: 'Bogotá',
            destination: 'Medellín',
            departureTime: '07:30',
            arrivalTime: '08:45',
            price: 185.500,
            availableSeats: 25,
            stops: 0
        },
        {
            id: 'flight-2',
            type: 'flight',
            airline: 'LATAM',
            origin: 'Medellín',
            destination: 'Cartagena',
            departureTime: '10:15',
            arrivalTime: '11:30',
            price: 229.750,
            availableSeats: 18,
            stops: 0
        },
        {
            id: 'flight-3',
            type: 'flight',
            airline: 'Copa Airlines',
            origin: 'Bogotá',
            destination: 'Cali',
            departureTime: '14:45',
            arrivalTime: '16:20',
            price: 155.900,
            availableSeats: 12,
            stops: 1
        },
        {
            id: 'flight-4',
            type: 'flight',
            airline: 'Viva Air',
            origin: 'Barranquilla',
            destination: 'Bogotá',
            departureTime: '16:00',
            arrivalTime: '17:15',
            price: 145.600,
            availableSeats: 20,
            stops: 0
        },
        {
            id: 'flight-5',
            type: 'flight',
            airline: 'EasyFly',
            origin: 'Cali',
            destination: 'Medellín',
            departureTime: '11:30',
            arrivalTime: '12:45',
            price: 199.900,
            availableSeats: 35,
            stops: 0
        },
        {
            id: 'flight-6',
            type: 'flight',
            airline: 'Avianca',
            origin: 'Cartagena',
            destination: 'Bucaramanga',
            departureTime: '09:00',
            arrivalTime: '10:30',
            price: 175.500,
            availableSeats: 22,
            stops: 0
        },
        {
            id: 'flight-7',
            type: 'flight',
            airline: 'LATAM',
            origin: 'Bogotá',
            destination: 'San Andrés',
            departureTime: '13:45',
            arrivalTime: '15:15',
            price: 265.750,
            availableSeats: 15,
            stops: 0
        },
        {
            id: 'flight-8',
            type: 'flight',
            airline: 'Viva Air',
            origin: 'Medellín',
            destination: 'Pereira',
            departureTime: '08:15',
            arrivalTime: '09:30',
            price: 135.400,
            availableSeats: 28,
            stops: 0
        }
    ];

    // Filter flights based on search criteria
    const filteredFlights = flightOptions.filter(flight =>
        (!origin || flight.origin === origin) &&
        (!destination || flight.destination === destination)
    );

    // Handle flight selection and add to cart
    const handleFlightSelect = (flight) => {
        const flightWithDetails = {
            ...flight,
            departureDate: departureDate,
            passengers: passengers,
            travelClass: travelClass
        };

        const result = addToCart(flightWithDetails);

        if (result) {
            alert(`Vuelo a ${flight.destination} añadido al carrito`);
        } else {
            // Mostrar mensaje de error basado en las reglas del carrito
            const hasFlights = cart.some(cartItem => cartItem.type === 'flight');
            if (hasFlights) {
                alert('Ya existe un vuelo en el carrito.');
            } else {
                alert('No se pudo añadir el vuelo al carrito.');
            }
        }
    };

    // Handle search submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Only show flights if a date is selected
        if (departureDate) {
            setShowFlights(true);
        } else {
            alert('Por favor, selecciona una fecha de viaje');
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
            <div className="mb-6 bg-[#00baa8] text-white p-4 rounded-lg flex items-center">
                <Plane className="mr-3 w-8 h-8" />
                <h2 className="text-2xl font-bold">Busca tu Vuelo Perfecto en Colombia</h2>
            </div>

            {/* Date Selection First */}
            <form onSubmit={handleSearchSubmit} className="mb-6">
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="col-span-2 flex flex-col">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <Calendar className="mr-2 w-4 h-4 text-[#00baa8]" />
                            Fecha de Viaje
                        </label>
                        <input
                            type="date"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-[#00baa8]/50"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <Users className="mr-2 w-4 h-4 text-[#00baa8]" />
                            Pasajeros
                        </label>
                        <input
                            type="number"
                            value={passengers}
                            onChange={(e) => setPassengers(parseInt(e.target.value))}
                            min="1"
                            max="10"
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-[#00baa8]/50"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="w-full bg-[#00baa8] text-white p-3 rounded-lg hover:bg-[#00baa8]/90 transition-colors"
                        >
                            Buscar Vuelos
                        </button>
                    </div>
                </div>
            </form>

            {/* Flight Filters - Show only after date selection */}
            {showFlights && (
                <div className="grid md:grid-cols-5 gap-4 mb-6">
                    <div className="col-span-2 flex flex-col">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <MapPin className="mr-2 w-4 h-4 text-[#00baa8]" />
                            Origen
                        </label>
                        <select
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-[#00baa8]/50"
                        >
                            <option value="">Todos los orígenes</option>
                            <option value="Bogotá">Bogotá</option>
                            <option value="Medellín">Medellín</option>
                            <option value="Cartagena">Cartagena</option>
                            <option value="Cali">Cali</option>
                            <option value="Barranquilla">Barranquilla</option>
                            <option value="Bucaramanga">Bucaramanga</option>
                            <option value="San Andrés">San Andrés</option>
                            <option value="Pereira">Pereira</option>
                        </select>
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <MapPin className="mr-2 w-4 h-4 text-[#00baa8]" />
                            Destino
                        </label>
                        <select
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-[#00baa8]/50"
                        >
                            <option value="">Todos los destinos</option>
                            <option value="Bogotá">Bogotá</option>
                            <option value="Medellín">Medellín</option>
                            <option value="Cartagena">Cartagena</option>
                            <option value="Cali">Cali</option>
                            <option value="Barranquilla">Barranquilla</option>
                            <option value="Bucaramanga">Bucaramanga</option>
                            <option value="San Andrés">San Andrés</option>
                            <option value="Pereira">Pereira</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Flight Results */}
            {showFlights && (
                <div className="flex justify-center items-center flex-col space-y-4">
                    {filteredFlights.map((flight) => (
                        <div
                            key={flight.id}
                            className="border rounded-lg p-4 hover:shadow-lg transition-all group w-full flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6"
                        >
                            {/* Airline Logo Placeholder - Responsive */}
                            <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-lg shrink-0">
                                <Plane className="text-[#00baa8] w-12 h-12" />
                            </div>

                            {/* Flight Details - Responsive */}
                            <div className="flex-grow w-full grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                                {/* Origin Details */}
                                <div className="text-center md:text-left">
                                    <h3 className="font-bold text-xl">{flight.origin}</h3>
                                    <p className="text-gray-600">{flight.departureTime}</p>
                                </div>

                                {/* Flight Path Indicator - Responsive */}
                                <div className="flex items-center justify-center col-span-1 md:col-span-2 relative">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-[#00baa8] rounded-full mr-2"></div>
                                        <div className="w-32 md:w-48 h-0.5 bg-gray-300"></div>
                                        <div className="w-3 h-3 bg-[#00baa8] rounded-full ml-2"></div>
                                    </div>
                                    <div className="absolute bg-white px-2 text-gray-500 text-sm top-full md:top-1/2 md:-translate-y-1/2">
                                        {flight.stops === 0 ? 'Directo' : `${flight.stops} escala(s)`}
                                    </div>
                                </div>

                                {/* Destination Details */}
                                <div className="text-center md:text-right">
                                    <h3 className="font-bold text-xl">{flight.destination}</h3>
                                    <p className="text-gray-600">{flight.arrivalTime}</p>
                                </div>
                            </div>

                            {/* Flight Additional Info - Responsive */}
                            <div className="flex flex-col items-center md:items-end space-y-2 w-full md:w-auto">
                                <div className="flex items-center space-x-2">
                                    <Users className="text-[#00baa8] w-5 h-5" />
                                    <span className="text-gray-700">{flight.availableSeats} asientos</span>
                                </div>

                                <div className="text-2xl font-bold text-green-600">
                                    ${flight.price.toFixed(0)} COP
                                </div>

                                <button
                                    onClick={() => handleFlightSelect(flight)}
                                    className="bg-[#00baa8] text-white px-6 py-2 rounded-lg hover:bg-[#00baa8]/90 transition-colors w-full md:w-auto"
                                >
                                    Seleccionar Vuelo
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Additional Info */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg flex items-start">
                <Info className="mr-3 mt-1 w-6 h-6 text-blue-500" />
                <div>
                    <h3 className="font-bold text-blue-800 mb-2">Consejos para tu reserva</h3>
                    <ul className="list-disc list-inside text-sm text-blue-700">
                        <li>Reserva con anticipación para mejores precios</li>
                        <li>Verifica las políticas de equipaje de cada aerolínea colombiana</li>
                        <li>Considera un seguro de viaje para tus vuelos nacionales</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FlightSearchComponent;