import React, { useState } from 'react';
import {
    MapPin,
    Plane,
    Hotel,
    Activity,
    PawPrint,
    ChevronLeft,
    Search,
    DollarSign,
    Calendar,
    Star,
    CheckCircle,
    Heart,
    Info,
    Plus,
    ArrowRight,
    ShoppingCart,
    Send
} from 'lucide-react';
import { useCart } from '../../Context/cart';

const PlanCard = ({ plan, onSelect }) => (
    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-teal-100 transform hover:-translate-y-1">
        <div className="relative">
            <img src={plan.imagen} alt={plan.destino} className="w-full h-56 object-cover" />
            <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-2">
                <Heart className="w-5 h-5 text-teal-500" />
            </div>
            {plan.mascotasPermitidas.includes("Perros") && (
                <div className="absolute bottom-3 left-3 bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <PawPrint className="w-4 h-4 mr-1" /> Pet Friendly
                </div>
            )}
        </div>
        <div className="p-5">
            <div className="flex items-center text-gray-500 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1 text-teal-500" />
                <span>{plan.destino}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{plan.destino}</h3>
            <div className="flex justify-between items-center mb-3">
                <p className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1 text-teal-600" />
                    {plan.duracion}
                </p>
                <p className="text-xl font-bold text-teal-600">{plan.price}</p>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
                {plan.mascotasPermitidas.map((mascota, index) => (
                    <span key={index} className="inline-block bg-teal-50 text-teal-700 rounded-full px-3 py-1 text-sm font-medium">
                        {mascota}
                    </span>
                ))}
                <span className="inline-block bg-teal-50 text-teal-700 rounded-full px-3 py-1 text-sm font-medium flex items-center">
                    <Info className="w-3 h-3 mr-1" />
                    Max {plan.pesoMaximo}
                </span>
            </div>
            <button
                onClick={() => onSelect(plan.id)}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 font-semibold flex items-center justify-center"
            >
                Ver detalles
                <ArrowRight className="w-5 h-5 ml-2" />
            </button>
        </div>
    </div>
);

const PlanDetails = ({ plan, onBack }) => {

    const { addToCart } = useCart();

    const handleAddToCart = (plan) => {

        const tourPlanItem = {
            ...plan,
            type: 'tourPlan',
            // Asegúrate de que estos campos existan
            name: plan.destino,
            location: plan.destino
        };

        const added = addToCart(tourPlanItem);

        if (added) {
            // Mostrar notificación de éxito
            alert('Plan añadido al carrito');
            // O usar un sistema de notificaciones más elegante
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
            <button
                onClick={onBack}
                className="mb-6 flex items-center text-teal-600 hover:text-teal-800 transition-colors font-medium"
            >
                <ChevronLeft className="mr-1" /> Volver a todos los planes
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <div className="relative mb-6">
                        <img src={plan.imagen} alt={plan.destino} className="w-full h-80 object-cover rounded-xl shadow-md" />
                        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-lg">
                            <div className="flex items-center">
                                <MapPin className="w-5 h-5 text-teal-600 mr-2" />
                                <span className="font-semibold text-gray-800">{plan.destino}</span>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold mb-3 text-gray-800 leading-tight">{plan.destino}</h2>
                    <p className="text-gray-600 mb-3 flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-teal-600" />
                        {plan.duracion}
                    </p>
                    <p className="text-3xl font-bold mb-5 text-teal-600">{plan.price}</p>

                    <div className="p-6 rounded-xl mb-6 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200">
                        <h3 className="font-bold mb-4 text-teal-700 text-lg flex items-center">
                            <PawPrint className="w-6 h-6 mr-2" />
                            Información para mascotas
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Mascotas permitidas:</p>
                                <p className="font-medium text-gray-800">{plan.mascotasPermitidas.join(', ')}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Peso máximo:</p>
                                <p className="font-medium text-gray-800">{plan.pesoMaximo}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => handleAddToCart(plan)}
                        className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 font-semibold flex items-center justify-center"
                    >
                        Añadir al carrito
                        <ShoppingCart className="w-5 h-5 ml-2" />
                    </button>
                </div>

                <div>
                    <div className="mb-8 bg-white rounded-xl p-6 shadow-md border border-gray-100">
                        <h3 className="text-xl font-bold mb-4 text-teal-700 flex items-center border-b border-teal-100 pb-3">
                            <Plane className="w-6 h-6 mr-2" />
                            Transporte
                        </h3>

                        <div className="mb-5">
                            <h4 className="font-bold mb-2 text-gray-800 flex items-center">
                                <span className="text-teal-500 mr-2">✈</span>
                                {plan.transporte.vuelo.aerolinea}
                            </h4>
                            <p className="text-gray-600 mb-2">{plan.transporte.vuelo.politica}</p>
                            <p className="font-semibold text-teal-700">Costo adicional: {plan.transporte.vuelo.costoAdicional}</p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-2 text-gray-800 flex items-center">
                                <span className="text-teal-500 mr-2">🚕</span>
                                {plan.transporte.terrestre.tipo}
                            </h4>
                            <p className="text-gray-600 mb-2">{plan.transporte.terrestre.politica}</p>
                            <p className="font-semibold text-teal-700">Costo adicional: {plan.transporte.terrestre.costoAdicional}</p>
                        </div>
                    </div>

                    <div className="mb-8 bg-white rounded-xl p-6 shadow-md border border-gray-100">
                        <h3 className="text-xl font-bold mb-4 text-teal-700 flex items-center border-b border-teal-100 pb-3">
                            <Hotel className="w-6 h-6 mr-2" />
                            Hospedaje
                        </h3>
                        <h4 className="font-bold mb-3 text-gray-800 flex items-center text-lg">
                            {plan.hospedaje.nombre}
                            <div className="ml-2 text-amber-400 flex">
                                {Array(plan.hospedaje.estrellas).fill().map((_, i) => (
                                    <Star key={i} className="w-4 h-4" fill="currentColor" />
                                ))}
                            </div>
                        </h4>
                        <ul className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                            {plan.hospedaje.caracteristicas.map((caracteristica, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                    <CheckCircle className="w-4 h-4 mr-2 text-teal-500" />
                                    {caracteristica}
                                </li>
                            ))}
                        </ul>
                        <p className="font-semibold text-teal-700 mt-2">Costo adicional: {plan.hospedaje.costoAdicional}</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                        <h3 className="text-xl font-bold mb-4 text-teal-700 flex items-center border-b border-teal-100 pb-3">
                            <Activity className="w-6 h-6 mr-2" />
                            Actividades incluidas
                        </h3>
                        <ul className="grid grid-cols-1 gap-3">
                            {plan.actividades.map((actividad, index) => (
                                <li key={index} className="flex items-start bg-teal-50 p-3 rounded-lg">
                                    <Plus className="w-5 h-5 mr-2 text-teal-600 mt-0.5" />
                                    <span className="text-gray-700">{actividad}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

const PlanesturisticosPetFriendly = () => {
    const planesTuristicos = [
        {
            id: 1,
            destino: "Playa Blanca, Santa Marta",
            imagen: "https://content.r9cdn.net/rimg/dimg/78/70/001b704a-city-15939-163e0a462f2.jpg?crop=true&width=1366&height=768&xhint=1556&yhint=1231",
            duracion: "5 días / 4 noches",
            price: "$850.000 COP",
            mascotasPermitidas: ["Perros", "Gatos"],
            pesoMaximo: "25kg",
            transporte: {
                vuelo: {
                    aerolinea: "Pet Airways",
                    politica: "Permite mascotas en cabina hasta 8kg, en bodega especial hasta 25kg",
                    costoAdicional: "$120.000 COP por trayecto"
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
                costoAdicional: "$20.000 COP por noche por mascota"
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
            destino: "San Andres y Providencia",
            imagen: "https://s3.amazonaws.com/rtvc-assets-senalcolombia.gov.co/s3fs-public/styles/amp_1200x675_16_9/public/field/image/San-andres-RTVC.jpg?itok=FVTxBlMN",
            duracion: "7 días / 6 noches",
            price: "$1'200.000 COP",
            mascotasPermitidas: ["Perros"],
            pesoMaximo: "30kg",
            transporte: {
                vuelo: {
                    aerolinea: "American Airlines",
                    politica: "Permite mascotas en cabina hasta 9kg, en bodega hasta 30kg",
                    costoAdicional: "$150.000 COP por trayecto"
                },
                terrestre: {
                    tipo: "Alquiler de SUV pet-friendly",
                    politica: "Vehículos equipados con protectores y cinturones para mascotas",
                    costoAdicional: "$16.500 USD total"
                }
            },
            hospedaje: {
                nombre: "Aspen Mountain Lodge",
                estrellas: 5,
                caracteristicas: ["Habitaciones pet-friendly", "Servicio de paseo", "Spa para mascotas", "Kit de bienvenida para mascotas"],
                costoAdicional: "$35.000 COP por noche por mascota"
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
            destino: "Ciudad Amurallada, Cartagena",
            imagen: "https://mlqfmr3rpryd.i.optimole.com/cb:JBSP.a525/w:auto/h:auto/q:100/ig:avif/https://cartagena-tours.co/wp-content/uploads/2023/12/Travelocity-Cartagena-Destacada.Galeria.jpg",
            duracion: "6 días / 5 noches",
            price: "$950.000 COP",
            mascotasPermitidas: ["Perros", "Gatos", "Pequeños mamíferos"],
            pesoMaximo: "20kg",
            transporte: {
                vuelo: {
                    aerolinea: "KLM",
                    politica: "Permite mascotas en cabina hasta 8kg, en bodega climatizada hasta 20kg",
                    costoAdicional: "$100.000 COP por trayecto"
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
                costoAdicional: "$20.000 COP por noche por mascota"
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
            destino: "Guatapé, Antioquia",
            imagen: "https://elturismoencolombia.com/wp-content/uploads/2023/01/aerial-view-landscape-rock-guatape-piedra-del-penol-colombia.jpg",
            duracion: "3 días / 2 noches",
            price: "$600.000 COP",
            mascotasPermitidas: ["Perros", "Gatos"],
            pesoMaximo: "20kg",
            transporte: {
                vuelo: {
                    aerolinea: "Avianca",
                    politica: "Mascotas en cabina hasta 8kg, en bodega hasta 20kg",
                    costoAdicional: "$90.000 COP por trayecto"
                },
                terrestre: {
                    tipo: "Bus turístico desde Medellín",
                    politica: "Transportines requeridos",
                    costoAdicional: "Incluido en el paquete"
                }
            },
            hospedaje: {
                nombre: "Hotel Piedra del Peñol",
                estrellas: 4,
                caracteristicas: ["Áreas verdes para mascotas", "Guardería canina", "Spa para mascotas"],
                costoAdicional: "$25.000 COP por noche por mascota"
            },
            actividades: [
                "Subida a la Piedra del Peñol con áreas pet-friendly",
                "Paseo en barco por la represa",
                "Caminatas ecológicas con guías especializados"
            ]
        },
        {
            id: 5,
            destino: "Salento, Quindío",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/View_of_Salento%2C_Colombia_01.jpg/1200px-View_of_Salento%2C_Colombia_01.jpg",
            duracion: "4 días / 3 noches",
            price: "$720.000 COP",
            mascotasPermitidas: ["Perros"],
            pesoMaximo: "25kg",
            transporte: {
                vuelo: {
                    aerolinea: "Latam",
                    politica: "Mascotas en cabina hasta 10kg, en bodega hasta 25kg",
                    costoAdicional: "$110.000 COP por trayecto"
                },
                terrestre: {
                    tipo: "Jeep Willys desde Armenia",
                    politica: "Mascotas permitidas con correa",
                    costoAdicional: "Incluido en el paquete"
                }
            },
            hospedaje: {
                nombre: "Finca Hotel El Cafetal",
                estrellas: 3,
                caracteristicas: ["Senderos ecológicos", "Parque para mascotas", "Menú especial para perros"],
                costoAdicional: "$15.000 COP por noche por mascota"
            },
            actividades: [
                "Caminata por el Valle del Cocora",
                "Tour cafetero pet-friendly",
                "Paseo a caballo (para dueños y mascotas entrenadas)"
            ]
        },
        {
            id: 6,
            destino: "Barichara, Santander",
            imagen: "https://images.ctfassets.net/gkhyeghj07ak/6K8w9H4xaqe5AYBLKDw8bS/e8f285b7fca6a5de99c2893cfac19f94/viajescomfama-santander-03-barichara.jpg",
            duracion: "5 días / 4 noches",
            price: "$950.000 COP",
            mascotasPermitidas: ["Perros", "Gatos"],
            pesoMaximo: "30kg",
            transporte: {
                vuelo: {
                    aerolinea: "Viva Air",
                    politica: "Mascotas en cabina hasta 8kg, en bodega hasta 30kg",
                    costoAdicional: "$100.000 COP por trayecto"
                },
                terrestre: {
                    tipo: "Bus privado desde Bucaramanga",
                    politica: "Transportines requeridos",
                    costoAdicional: "Incluido en el paquete"
                }
            },
            hospedaje: {
                nombre: "Casa Colonial Barichara",
                estrellas: 4,
                caracteristicas: ["Terrazas pet-friendly", "Zonas verdes", "Camas especiales para mascotas"],
                costoAdicional: "$20.000 COP por noche por mascota"
            },
            actividades: [
                "Caminata por el Camino Real",
                "Taller de artesanía local pet-friendly",
                "Visita a miradores naturales"
            ]
        },

        {
            id: 7,
            destino: "Villa de Leyva, Boyacá",
            imagen: "https://content.r9cdn.net/rimg/dimg/ef/ba/4b3f1d0e-city-302758-17b1b4809b2.jpg?width=1366&height=768&xhint=2227&yhint=938&crop=true",
            duracion: "4 días / 3 noches",
            price: "$700.000 COP",
            mascotasPermitidas: ["Perros", "Gatos"],
            pesoMaximo: "20kg",
            transporte: {
                vuelo: {
                    aerolinea: "Avianca",
                    politica: "Mascotas en cabina hasta 8kg, en bodega hasta 20kg",
                    costoAdicional: "$95.000 COP por trayecto"
                },
                terrestre: {
                    tipo: "Transfer privado",
                    politica: "Con transportín para mascotas",
                    costoAdicional: "Incluido en el paquete"
                }
            },
            hospedaje: {
                nombre: "Hotel Colonial Villa de Leyva",
                estrellas: 4,
                caracteristicas: ["Jardín amplio", "Zona pet-friendly", "Desayuno especial para mascotas"],
                costoAdicional: "$20.000 COP por noche por mascota"
            },
            actividades: [
                "Recorrido por el centro histórico",
                "Visita a museos locales",
                "Taller de artesanías tradicionales"
            ]
        },
        {
            id: 8,
            destino: "Minca, Magdalena",
            imagen: "https://www.visitsantamarta.com/storage/blogs/sierra%20nevada%20de%20santa%20marta%20mirador%20minca-byvdmd.jpg",
            duracion: "3 días / 2 noches",
            price: "$500.000 COP",
            mascotasPermitidas: ["Perros"],
            pesoMaximo: "15kg",
            transporte: {
                vuelo: {
                    aerolinea: "LATAM",
                    politica: "Mascotas permitidas en cabina hasta 8kg",
                    costoAdicional: "$80.000 COP por trayecto"
                },
                terrestre: {
                    tipo: "Transporte privado",
                    politica: "Con jaula para mascotas",
                    costoAdicional: "Incluido en paquete"
                }
            },
            hospedaje: {
                nombre: "Eco Lodge Minca",
                estrellas: 3,
                caracteristicas: ["Ambiente natural", "Área pet-friendly", "Piscina natural"],
                costoAdicional: "$10.000 COP por noche por mascota"
            },
            actividades: [
                "Caminata en la selva",
                "Tour de cascadas",
                "Visita a fincas orgánicas"
            ]
        },
        {
            id: 9,
            destino: "Santa Fe de Antioquia, Antioquia",
            imagen: "https://turismounipolar.com/wp-content/uploads/2023/02/SantaFe-ppal.jpg",
            duracion: "2 días / 1 noche",
            price: "$450.000 COP",
            mascotasPermitidas: ["Perros", "Gatos"],
            pesoMaximo: "15kg",
            transporte: {
                vuelo: {
                    aerolinea: "Satena",
                    politica: "Mascotas en cabina hasta 8kg",
                    costoAdicional: "$70.000 COP por trayecto"
                },
                terrestre: {
                    tipo: "Carro privado",
                    politica: "Mascotas permitidas en el vehículo",
                    costoAdicional: "Incluido en el paquete"
                }
            },
            hospedaje: {
                nombre: "Hostal de la Hacienda",
                estrellas: 3,
                caracteristicas: ["Ambiente histórico", "Jardín para mascotas", "Desayuno campestre"],
                costoAdicional: "$15.000 COP por noche por mascota"
            },
            actividades: [
                "Paseo en carruaje",
                "Visita al Puente de Occidente",
                "Recorrido por el centro histórico"
            ]
        },
        {
            id: 10,
            destino: "Leticia, Amazonas",
            imagen: "https://encuentradestinos.com/wp-content/uploads/2024/05/que-ver-en-leticia.jpg",
            duracion: "5 días / 4 noches",
            price: "$1'000.000 COP",
            mascotasPermitidas: ["Perros"],
            pesoMaximo: "20kg",
            transporte: {
                vuelo: {
                    aerolinea: "Avianca",
                    politica: "Mascotas en cabina hasta 8kg",
                    costoAdicional: "$120.000 COP por trayecto"
                },
                terrestre: {
                    tipo: "Excursión en lancha",
                    politica: "Mascotas permitidas en áreas designadas",
                    costoAdicional: "Incluido en paquete"
                }
            },
            hospedaje: {
                nombre: "Eco Resort Amazonas",
                estrellas: 5,
                caracteristicas: ["Lodge en la selva", "Zonas de descanso para mascotas", "Guías especializados en fauna"],
                costoAdicional: "$30.000 COP por noche por mascota"
            },
            actividades: [
                "Excursión por el río Amazonas",
                "Observación de aves",
                "Visita a comunidades indígenas"
            ]
        },
        {
            id: 11,
            destino: "Popayán, Cauca",
            imagen: "https://media.traveler.es/photos/61376f8bd4923f67e298ef5b/master/w_1600%2Cc_limit/130738.jpg",
            duracion: "4 días / 3 noches",
            price: "$800.000 COP",
            mascotasPermitidas: ["Perros", "Gatos"],
            pesoMaximo: "20kg",
            transporte: {
                vuelo: {
                    aerolinea: "LATAM",
                    politica: "Mascotas en cabina hasta 8kg",
                    costoAdicional: "$100.000 COP por trayecto"
                },
                terrestre: {
                    tipo: "Bus turístico",
                    politica: "Mascotas en transportines",
                    costoAdicional: "Incluido en paquete"
                }
            },
            hospedaje: {
                nombre: "Hotel Colonial Popayán",
                estrellas: 4,
                caracteristicas: ["Arquitectura colonial", "Espacios verdes", "Servicio pet-friendly"],
                costoAdicional: "$20.000 COP por noche por mascota"
            },
            actividades: [
                "Tour histórico por la ciudad",
                "Visita a museos",
                "Caminata por parques locales"
            ]
        },
        {
            id: 12,
            destino: "Mompox, Bolívar",
            imagen: "https://www.elespectador.com/resizer/v2/AXSW2BZ6SFHVNBZRULVQAQFPOI.jpg?auth=72f1c065bf77b26fb2adede9c0a45976b337829923cc34f3d5491d542447d966&width=920&height=613&smart=true&quality=60",
            duracion: "3 días / 2 noches",
            price: "$550.000 COP",
            mascotasPermitidas: ["Perros"],
            pesoMaximo: "15kg",
            transporte: {
                vuelo: {
                    aerolinea: "Avianca",
                    politica: "Mascotas en cabina hasta 8kg",
                    costoAdicional: "$85.000 COP por trayecto"
                },
                terrestre: {
                    tipo: "Transporte privado",
                    politica: "Mascotas permitidas en el vehículo",
                    costoAdicional: "Incluido en paquete"
                }
            },
            hospedaje: {
                nombre: "Posada Colonial Mompox",
                estrellas: 3,
                caracteristicas: ["Ambiente histórico", "Jardín pet-friendly", "Cocina tradicional"],
                costoAdicional: "$10.000 COP por noche por mascota"
            },
            actividades: [
                "Recorrido por calles coloniales",
                "Tour en bote por el río Magdalena",
                "Visita a talleres artesanales"
            ]
        },
        {
            id: 13,
            destino: "Jardín, Antioquia",
            imagen: "https://www.turismoenmedellin.com/images/galeria/imagen_id_15158.jpg",
            duracion: "4 días / 3 noches",
            price: "$650.000 COP",
            mascotasPermitidas: ["Perros", "Gatos"],
            pesoMaximo: "20kg",
            transporte: {
                vuelo: {
                    aerolinea: "Viva Air",
                    politica: "Mascotas en cabina hasta 8kg",
                    costoAdicional: "$90.000 COP por trayecto"
                },
                terrestre: {
                    tipo: "Transporte privado",
                    politica: "Vehículos pet-friendly",
                    costoAdicional: "Incluido en paquete"
                }
            },
            hospedaje: {
                nombre: "Eco Hotel Jardín",
                estrellas: 4,
                caracteristicas: ["Ambiente natural", "Zonas pet-friendly", "Piscina y spa para mascotas"],
                costoAdicional: "$15.000 COP por noche por mascota"
            },
            actividades: [
                "Caminata por senderos naturales",
                "Tour de cascadas",
                "Visita a plantaciones de café"
            ]
        }
        // Resto de los planes...
    ]; // Manteniendo los primeros 3 planes para el ejemplo, pero se aplicaría a todos

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
        return (
            plan.destino.toLowerCase().includes(filtros.destino.toLowerCase()) &&
            (filtros.mascota === '' || plan.mascotasPermitidas.includes(filtros.mascota)) &&
            (filtros.precioMaximo === '' || parseFloat(plan.price.replace('$', '')) <= parseFloat(filtros.precioMaximo))
        );
    });

    return (
        <div className="bg-gradient-to-br from-teal-50 via-white to-teal-50 min-h-screen">
            <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="mb-10 rounded-2xl overflow-hidden shadow-xl">
                    <div className="bg-gradient-to-r from-teal-600 to-teal-800 p-8 md:p-12 text-white text-center relative">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full"></div>
                            <div className="absolute top-20 right-20 w-32 h-32 bg-white rounded-full"></div>
                            <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-white rounded-full"></div>
                            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-white rounded-full"></div>
                        </div>
                        <div className="relative z-10">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                                Aventuras Pet-Friendly
                            </h1>
                            <div className="flex justify-center mb-6">
                                <PawPrint className="w-12 h-12 text-white" />
                            </div>
                            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                                Descubre destinos increíbles donde tú y tu compañero peludo vivirán experiencias inolvidables
                            </p>
                        </div>
                    </div>
                </div>

                {!planSeleccionado ? (
                    <div>

                        {/* Filtros de Búsqueda */}
                        <div className="mb-10 bg-white rounded-xl shadow-md p-6 border border-teal-100">
                            <h3 className="text-2xl font-bold mb-5 text-teal-700 flex items-center">
                                <Search className="w-6 h-6 mr-2" />
                                Encuentra tu plan ideal
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 text-teal-500 w-5 h-5" />
                                    <input
                                        type="text"
                                        name="destino"
                                        placeholder="¿A dónde quieres ir?"
                                        value={filtros.destino}
                                        onChange={handleFiltroCambio}
                                        className="border border-gray-300 rounded-lg py-3 pl-10 pr-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="relative">
                                    <PawPrint className="absolute left-3 top-3 text-teal-500 w-5 h-5" />
                                    <select
                                        name="mascota"
                                        value={filtros.mascota}
                                        onChange={handleFiltroCambio}
                                        className="border border-gray-300 rounded-lg py-3 pl-10 pr-3 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    >
                                        <option value="">Selecciona tu mascota</option>
                                        <option value="Perros">Perros</option>
                                        <option value="Gatos">Gatos</option>
                                        <option value="Pequeños mamíferos">Pequeños mamíferos</option>
                                    </select>
                                </div>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 text-teal-500 w-5 h-5" />
                                    <input
                                        type="number"
                                        name="precioMaximo"
                                        placeholder="Presupuesto máximo"
                                        value={filtros.precioMaximo}
                                        onChange={handleFiltroCambio}
                                        className="border border-gray-300 rounded-lg py-3 pl-10 pr-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Lista de planes */}
                        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
                            Planes Pet-Friendly
                            <div className="ml-4 bg-teal-100 text-teal-800 text-sm font-medium py-1 px-3 rounded-full">
                                {planesFiltrados.length} destinos
                            </div>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {planesFiltrados.map((plan) => (
                                <PlanCard key={plan.id} plan={plan} onSelect={mostrarDetallePlan} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <PlanDetails plan={planSeleccionado} onBack={volverALista} />
                )}

                {/* Sección de Introducción */}
                <div className="mb-12 text-center max-w-4xl mx-auto py-24">
                    <h2 className="text-4xl font-bold mb-6 text-gray-800">Viaja sin dejar a tu mejor amigo</h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                        Viajar con tu mascota puede ser una experiencia increíblemente gratificante. No solo te permite compartir momentos inolvidables con tu compañero peludo, sino que también te brinda la oportunidad de explorar nuevos destinos juntos.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white p-6 rounded-xl shadow-md border border-teal-100">
                            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-8 h-8 text-teal-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Flexibilidad</h3>
                            <p className="text-gray-600">Adapta tus planes a las necesidades de tu mascota.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border border-teal-100">
                            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DollarSign className="w-8 h-8 text-teal-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Ahorro</h3>
                            <p className="text-gray-600">Evita costos de cuidado durante tus vacaciones.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border border-teal-100">
                            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-teal-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Vínculo</h3>
                            <p className="text-gray-600">Fortalece tu relación a través de nuevas aventuras.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlanesturisticosPetFriendly;