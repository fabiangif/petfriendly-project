import React, { useState } from 'react';
import { MapPin, Plane, Hotel, Activity, PawPrint, ChevronLeft } from 'lucide-react';

const PlanCard = ({ plan, onSelect }) => (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <img src={plan.imagen} alt={plan.destino} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{plan.destino}</h3>
            <p className="text-gray-600 mb-2">{plan.duracion}</p>
            <p className="text-lg font-bold mb-3 text-teal-600">{plan.precio}</p>
            <div className="mb-3">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                    {plan.mascotasPermitidas.join(', ')}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold">
                    Hasta {plan.pesoMaximo}
                </span>
            </div>
            <button
                onClick={() => onSelect(plan.id)}
                className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-300"
            >
                Ver detalles
            </button>
        </div>
    </div>
);

const PlanDetails = ({ plan, onBack }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
        <button
            onClick={onBack}
            className="mb-4 flex items-center text-sm text-teal-600 hover:underline"
        >
            <ChevronLeft className="mr-2" /> Volver a todos los planes
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <img src={plan.imagen} alt={plan.destino} className="w-full h-64 object-cover rounded-lg mb-4" />
                <h2 className="text-3xl font-bold mb-2">{plan.destino}</h2>
                <p className="text-gray-600 mb-2">{plan.duracion}</p>
                <p className="text-2xl font-bold mb-4 text-teal-600">{plan.precio}</p>

                <div className="p-4 rounded-lg mb-4 bg-teal-50">
                    <h3 className="font-semibold mb-2 text-teal-600">
                        <PawPrint className="inline-block mr-2" />
                        Mascotas permitidas:
                    </h3>
                    <p>{plan.mascotasPermitidas.join(', ')}</p>
                    <p>Peso máximo: {plan.pesoMaximo}</p>
                </div>

                <button className="w-full py-3 bg-teal-500 text-white rounded-lg text-lg font-semibold hover:bg-teal-600 mb-6 transition-colors duration-300">
                    Reservar ahora
                </button>
            </div>

            <div>
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 border-b pb-2 text-teal-600">
                        <Plane className="inline-block mr-2" />
                        Transporte
                    </h3>

                    <div className="mb-4">
                        <h4 className="font-semibold mb-1">
                            {plan.transporte.vuelo.aerolinea}
                        </h4>
                        <p className="text-sm mb-1">{plan.transporte.vuelo.politica}</p>
                        <p className="text-sm font-semibold">Costo adicional: {plan.transporte.vuelo.costoAdicional}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-1">
                            {plan.transporte.terrestre.tipo}
                        </h4>
                        <p className="text-sm mb-1">{plan.transporte.terrestre.politica}</p>
                        <p className="text-sm font-semibold">Costo adicional: {plan.transporte.terrestre.costoAdicional}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 border-b pb-2 text-teal-600">
                        <Hotel className="inline-block mr-2" />
                        Hospedaje
                    </h3>
                    <h4 className="font-semibold mb-1">
                        {plan.hospedaje.nombre} ({'★'.repeat(plan.hospedaje.estrellas)})
                    </h4>
                    <ul className="mb-2">
                        {plan.hospedaje.caracteristicas.map((caracteristica, index) => (
                            <li key={index} className="text-sm flex items-center mb-1">
                                <span className="mr-2">✓</span> {caracteristica}
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm font-semibold">Costo adicional: {plan.hospedaje.costoAdicional}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-3 border-b pb-2 text-teal-600">
                        <Activity className="inline-block mr-2" />
                        Actividades incluidas
                    </h3>
                    <ul>
                        {plan.actividades.map((actividad, index) => (
                            <li key={index} className="mb-2 text-sm flex items-start">
                                <span className="mr-2 mt-1 text-xs text-teal-600">●</span>
                                {actividad}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

const PlanesturisticosPetFriendly = () => {
    const planesTuristicos = [
        {
            id: 1,
            destino: "Playa del Carmen, México",
            imagen: "/api/placeholder/400/250",
            duracion: "5 días / 4 noches",
            precio: "$850 USD",
            mascotasPermitidas: ["Perros", "Gatos"],
            pesoMaximo: "25kg",
            transporte: {
                vuelo: {
                    aerolinea: "Pet Airways",
                    politica: "Permite mascotas en cabina hasta 8kg, en bodega especial hasta 25kg",
                    costoAdicional: "$120 USD por trayecto"
                },
                terrestre: {
                    tipo: "Shuttle privado desde aeropuerto",
                    politica: "Permite transportines y correas",
                    costoAdicional: "Incluido en el paquete"
                }
            },
            hospedaje: {
                nombre: "Hotel Playa Azul & Pets",
                estrellas: 4,
                caracteristicas: ["Camas para mascotas", "Área de juegos", "Pet sitter disponible", "Menú especial para mascotas"],
                costoAdicional: "$25 USD por noche por mascota"
            },
            actividades: [
                "Tour por la playa canina exclusiva",
                "Paseo en catamarán pet-friendly",
                "Visita a ruinas arqueológicas que permiten mascotas",
                "Sesión de yoga con mascotas"
            ]
        },
        {
            id: 2,
            destino: "Aspen, Colorado",
            imagen: "/api/placeholder/400/250",
            duracion: "7 días / 6 noches",
            precio: "$1200 USD",
            mascotasPermitidas: ["Perros"],
            pesoMaximo: "30kg",
            transporte: {
                vuelo: {
                    aerolinea: "American Airlines",
                    politica: "Permite mascotas en cabina hasta 9kg, en bodega hasta 30kg",
                    costoAdicional: "$150 USD por trayecto"
                },
                terrestre: {
                    tipo: "Alquiler de SUV pet-friendly",
                    politica: "Vehículos equipados con protectores y cinturones para mascotas",
                    costoAdicional: "$80 USD total"
                }
            },
            hospedaje: {
                nombre: "Aspen Mountain Lodge",
                estrellas: 5,
                caracteristicas: ["Habitaciones pet-friendly", "Servicio de paseo", "Spa para mascotas", "Kit de bienvenida para mascotas"],
                costoAdicional: "$35 USD por noche por mascota"
            },
            actividades: [
                "Senderismo en rutas dog-friendly",
                "Clases de esquí con tu mascota",
                "Tour por la ciudad en carruaje",
                "Restaurantes con menú especial para mascotas"
            ]
        },
        {
            id: 3,
            destino: "Ámsterdam, Holanda",
            imagen: "/api/placeholder/400/250",
            duracion: "6 días / 5 noches",
            precio: "$950 USD",
            mascotasPermitidas: ["Perros", "Gatos", "Pequeños mamíferos"],
            pesoMaximo: "20kg",
            transporte: {
                vuelo: {
                    aerolinea: "KLM",
                    politica: "Permite mascotas en cabina hasta 8kg, en bodega climatizada hasta 20kg",
                    costoAdicional: "$100 USD por trayecto"
                },
                terrestre: {
                    tipo: "Trenes y tranvías locales",
                    politica: "Mascotas permitidas con bozal o transportín",
                    costoAdicional: "Gratis para mascotas pequeñas, €5 para mascotas grandes"
                }
            },
            hospedaje: {
                nombre: "Canal View Pet Hotel",
                estrellas: 4,
                caracteristicas: ["Terraza pet-friendly", "Parque privado", "Guardería canina", "Servicio veterinario de emergencia"],
                costoAdicional: "$20 USD por noche por mascota"
            },
            actividades: [
                "Tour en barco por los canales pet-friendly",
                "Visita a parques caninos",
                "Tour a granjas rurales donde admiten mascotas",
                "Cafeterías y restaurantes pet-friendly"
            ]
        },
        {
            id: 4,
            destino: "Ámsterdam, Holanda",
            imagen: "/api/placeholder/400/250",
            duracion: "6 días / 5 noches",
            precio: "$950 USD",
            mascotasPermitidas: ["Perros", "Gatos", "Pequeños mamíferos"],
            pesoMaximo: "20kg",
            transporte: {
                vuelo: {
                    aerolinea: "KLM",
                    politica: "Permite mascotas en cabina hasta 8kg, en bodega climatizada hasta 20kg",
                    costoAdicional: "$100 USD por trayecto"
                },
                terrestre: {
                    tipo: "Trenes y tranvías locales",
                    politica: "Mascotas permitidas con bozal o transportín",
                    costoAdicional: "Gratis para mascotas pequeñas, €5 para mascotas grandes"
                }
            },
            hospedaje: {
                nombre: "Canal View Pet Hotel",
                estrellas: 4,
                caracteristicas: ["Terraza pet-friendly", "Parque privado", "Guardería canina", "Servicio veterinario de emergencia"],
                costoAdicional: "$20 USD por noche por mascota"
            },
            actividades: [
                "Tour en barco por los canales pet-friendly",
                "Visita a parques caninos",
                "Tour a granjas rurales donde admiten mascotas",
                "Cafeterías y restaurantes pet-friendly"
            ]
        },
        {
            id: 5,
            destino: "Ámsterdam, Holanda",
            imagen: "/api/placeholder/400/250",
            duracion: "6 días / 5 noches",
            precio: "$950 USD",
            mascotasPermitidas: ["Perros", "Gatos", "Pequeños mamíferos"],
            pesoMaximo: "20kg",
            transporte: {
                vuelo: {
                    aerolinea: "KLM",
                    politica: "Permite mascotas en cabina hasta 8kg, en bodega climatizada hasta 20kg",
                    costoAdicional: "$100 USD por trayecto"
                },
                terrestre: {
                    tipo: "Trenes y tranvías locales",
                    politica: "Mascotas permitidas con bozal o transportín",
                    costoAdicional: "Gratis para mascotas pequeñas, €5 para mascotas grandes"
                }
            },
            hospedaje: {
                nombre: "Canal View Pet Hotel",
                estrellas: 4,
                caracteristicas: ["Terraza pet-friendly", "Parque privado", "Guardería canina", "Servicio veterinario de emergencia"],
                costoAdicional: "$20 USD por noche por mascota"
            },
            actividades: [
                "Tour en barco por los canales pet-friendly",
                "Visita a parques caninos",
                "Tour a granjas rurales donde admiten mascotas",
                "Cafeterías y restaurantes pet-friendly"
            ]
        },
        {
            id: 6,
            destino: "Ámsterdam, Holanda",
            imagen: "/api/placeholder/400/250",
            duracion: "6 días / 5 noches",
            precio: "$950 USD",
            mascotasPermitidas: ["Perros", "Gatos", "Pequeños mamíferos"],
            pesoMaximo: "20kg",
            transporte: {
                vuelo: {
                    aerolinea: "KLM",
                    politica: "Permite mascotas en cabina hasta 8kg, en bodega climatizada hasta 20kg",
                    costoAdicional: "$100 USD por trayecto"
                },
                terrestre: {
                    tipo: "Trenes y tranvías locales",
                    politica: "Mascotas permitidas con bozal o transportín",
                    costoAdicional: "Gratis para mascotas pequeñas, €5 para mascotas grandes"
                }
            },
            hospedaje: {
                nombre: "Canal View Pet Hotel",
                estrellas: 4,
                caracteristicas: ["Terraza pet-friendly", "Parque privado", "Guardería canina", "Servicio veterinario de emergencia"],
                costoAdicional: "$20 USD por noche por mascota"
            },
            actividades: [
                "Tour en barco por los canales pet-friendly",
                "Visita a parques caninos",
                "Tour a granjas rurales donde admiten mascotas",
                "Cafeterías y restaurantes pet-friendly"
            ]
        },
        {
            id: 7,
            destino: "Ámsterdam, Holanda",
            imagen: "/api/placeholder/400/250",
            duracion: "6 días / 5 noches",
            precio: "$950 USD",
            mascotasPermitidas: ["Perros", "Gatos", "Pequeños mamíferos"],
            pesoMaximo: "20kg",
            transporte: {
                vuelo: {
                    aerolinea: "KLM",
                    politica: "Permite mascotas en cabina hasta 8kg, en bodega climatizada hasta 20kg",
                    costoAdicional: "$100 USD por trayecto"
                },
                terrestre: {
                    tipo: "Trenes y tranvías locales",
                    politica: "Mascotas permitidas con bozal o transportín",
                    costoAdicional: "Gratis para mascotas pequeñas, €5 para mascotas grandes"
                }
            },
            hospedaje: {
                nombre: "Canal View Pet Hotel",
                estrellas: 4,
                caracteristicas: ["Terraza pet-friendly", "Parque privado", "Guardería canina", "Servicio veterinario de emergencia"],
                costoAdicional: "$20 USD por noche por mascota"
            },
            actividades: [
                "Tour en barco por los canales pet-friendly",
                "Visita a parques caninos",
                "Tour a granjas rurales donde admiten mascotas",
                "Cafeterías y restaurantes pet-friendly"
            ]
        },
        {
            id: 8,
            destino: "Ámsterdam, Holanda",
            imagen: "/api/placeholder/400/250",
            duracion: "6 días / 5 noches",
            precio: "$950 USD",
            mascotasPermitidas: ["Perros", "Gatos", "Pequeños mamíferos"],
            pesoMaximo: "20kg",
            transporte: {
                vuelo: {
                    aerolinea: "KLM",
                    politica: "Permite mascotas en cabina hasta 8kg, en bodega climatizada hasta 20kg",
                    costoAdicional: "$100 USD por trayecto"
                },
                terrestre: {
                    tipo: "Trenes y tranvías locales",
                    politica: "Mascotas permitidas con bozal o transportín",
                    costoAdicional: "Gratis para mascotas pequeñas, €5 para mascotas grandes"
                }
            },
            hospedaje: {
                nombre: "Canal View Pet Hotel",
                estrellas: 4,
                caracteristicas: ["Terraza pet-friendly", "Parque privado", "Guardería canina", "Servicio veterinario de emergencia"],
                costoAdicional: "$20 USD por noche por mascota"
            },
            actividades: [
                "Tour en barco por los canales pet-friendly",
                "Visita a parques caninos",
                "Tour a granjas rurales donde admiten mascotas",
                "Cafeterías y restaurantes pet-friendly"
            ]
        },
        {
            id: 9,
            destino: "Ámsterdam, Holanda",
            imagen: "/api/placeholder/400/250",
            duracion: "6 días / 5 noches",
            precio: "$950 USD",
            mascotasPermitidas: ["Perros", "Gatos", "Pequeños mamíferos"],
            pesoMaximo: "20kg",
            transporte: {
                vuelo: {
                    aerolinea: "KLM",
                    politica: "Permite mascotas en cabina hasta 8kg, en bodega climatizada hasta 20kg",
                    costoAdicional: "$100 USD por trayecto"
                },
                terrestre: {
                    tipo: "Trenes y tranvías locales",
                    politica: "Mascotas permitidas con bozal o transportín",
                    costoAdicional: "Gratis para mascotas pequeñas, €5 para mascotas grandes"
                }
            },
            hospedaje: {
                nombre: "Canal View Pet Hotel",
                estrellas: 4,
                caracteristicas: ["Terraza pet-friendly", "Parque privado", "Guardería canina", "Servicio veterinario de emergencia"],
                costoAdicional: "$20 USD por noche por mascota"
            },
            actividades: [
                "Tour en barco por los canales pet-friendly",
                "Visita a parques caninos",
                "Tour a granjas rurales donde admiten mascotas",
                "Cafeterías y restaurantes pet-friendly"
            ]
        },
        {
            id: 10,
            destino: "Ámsterdam, Holanda",
            imagen: "/api/placeholder/400/250",
            duracion: "6 días / 5 noches",
            precio: "$950 USD",
            mascotasPermitidas: ["Perros", "Gatos", "Pequeños mamíferos"],
            pesoMaximo: "20kg",
            transporte: {
                vuelo: {
                    aerolinea: "KLM",
                    politica: "Permite mascotas en cabina hasta 8kg, en bodega climatizada hasta 20kg",
                    costoAdicional: "$100 USD por trayecto"
                },
                terrestre: {
                    tipo: "Trenes y tranvías locales",
                    politica: "Mascotas permitidas con bozal o transportín",
                    costoAdicional: "Gratis para mascotas pequeñas, €5 para mascotas grandes"
                }
            },
            hospedaje: {
                nombre: "Canal View Pet Hotel",
                estrellas: 4,
                caracteristicas: ["Terraza pet-friendly", "Parque privado", "Guardería canina", "Servicio veterinario de emergencia"],
                costoAdicional: "$20 USD por noche por mascota"
            },
            actividades: [
                "Tour en barco por los canales pet-friendly",
                "Visita a parques caninos",
                "Tour a granjas rurales donde admiten mascotas",
                "Cafeterías y restaurantes pet-friendly"
            ]
        }
    ]; // Tus datos de planes turísticos
    const [planSeleccionado, setPlanSeleccionado] = useState(null);
    const [filtros, setFiltros] = useState({
        destino: '',
        mascota: '',
        precioMaximo: '',
    });

    const mostrarDetallePlan = (id) => {
        setPlanSeleccionado(planesTuristicos.find((plan) => plan.id === id));
    };

    const volverALista = () => {
        setPlanSeleccionado(null);
    };

    const handleFiltroCambio = (e) => {
        setFiltros({ ...filtros, [e.target.name]: e.target.value });
    };

    const planesFiltrados = planesTuristicos.filter((plan) => {
        // Lógica de filtrado basada en los filtros
        return (
            plan.destino.toLowerCase().includes(filtros.destino.toLowerCase()) &&
            (filtros.mascota === '' || plan.mascotasPermitidas.includes(filtros.mascota)) &&
            (filtros.precioMaximo === '' || parseFloat(plan.precio.replace('$', '')) <= parseFloat(filtros.precioMaximo))
        );
    });

    return (
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 min-h-screen">
            <main className="container mx-auto p-4">
                <div className="mb-8 rounded-lg p-8 text-white text-center bg-gradient-to-r from-teal-500 to-teal-700">
                    <h2 className="text-4xl font-bold mb-2">
                        <PawPrint className="inline-block mr-2" />
                        Viaja con tu mejor amigo
                    </h2>
                    <p className="text-xl">Descubre los mejores destinos pet-friendly para unas vacaciones inolvidables</p>
                </div>

                {!planSeleccionado ? (
                    <div>
                        {/* Sección de Introducción */}
                        <div className="mb-8">
                            <p className="text-gray-700">
                                Viajar con tu mascota puede ser una experiencia increíblemente gratificante. No solo te permite compartir momentos inolvidables con tu compañero peludo, sino que también te brinda la oportunidad de explorar nuevos destinos juntos.
                            </p>
                            <ul className="list-disc list-inside mt-4">
                                <li>Flexibilidad para adaptar tus planes a las necesidades de tu mascota.</li>
                                <li>Ahorro en costos de cuidado de mascotas durante tus vacaciones.</li>
                                <li>Fortalecimiento del vínculo con tu mascota a través de nuevas experiencias.</li>
                            </ul>
                        </div>

                        {/* Filtros de Búsqueda */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3 text-teal-600">Encuentra tu plan ideal</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    name="destino"
                                    placeholder="Destino"
                                    value={filtros.destino}
                                    onChange={handleFiltroCambio}
                                    className="border rounded-md p-2"
                                />
                                <select
                                    name="mascota"
                                    value={filtros.mascota}
                                    onChange={handleFiltroCambio}
                                    className="border rounded-md p-2"
                                >
                                    <option value="">Cualquier mascota</option>
                                    <option value="Perros">Perros</option>
                                    <option value="Gatos">Gatos</option>
                                    <option value="Pequeños mamíferos">Pequeños mamíferos</option>
                                </select>
                                <input
                                    type="number"
                                    name="precioMaximo"
                                    placeholder="Precio máximo"
                                    value={filtros.precioMaximo}
                                    onChange={handleFiltroCambio}
                                    className="border rounded-md p-2"
                                />
                            </div>
                        </div>

                        {/* Lista de planes */}
                        <h2 className="text-2xl font-bold mb-6 text-teal-600">Planes Turísticos Pet-Friendly</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {planesFiltrados.map((plan) => (
                                <PlanCard key={plan.id} plan={plan} onSelect={mostrarDetallePlan} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <PlanDetails plan={planSeleccionado} onBack={volverALista} />
                )}
            </main>
        </div>
    );
};

export default PlanesturisticosPetFriendly;