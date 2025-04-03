import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, ChevronLeft, ChevronRight, Heart, Package, PawPrint, Scissors, Activity, Award, ChevronDown, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Plane, Globe, Compass, Hotel, Map, Umbrella, Calendar } from 'lucide-react';
import bg from "../../assets/images/bg.png"
import bg3 from "../../assets/images/bg3.png"
import bg2 from '../../assets/images/bg2.png'
import HeroSection from './Hero';
import { Link } from 'react-router-dom';

const PetFriendlyTravelLanding = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
    };

    // Simulated travel package data
    const travelPackages = [
        {
            id: 1,
            name: "San Andres y Providencia",
            category: "Nacional",
            description: "Recorre las ciudades más amigables con mascotas en Europa con alojamientos y transportes especializados.",
            price: 1200000,
            rating: 5,
            image: "https://s3.amazonaws.com/rtvc-assets-senalcolombia.gov.co/s3fs-public/styles/amp_1200x675_16_9/public/field/image/San-andres-RTVC.jpg?itok=FVTxBlMN",
            tag: "Destacado",
            tagColor: "bg-yellow-500"
        },
        {
            id: 2,
            name: "Playa Blanca, Santa Marta",
            category: "Nacional",
            description: "Descubre las mejores playas donde tu mascota es bienvenida, con hoteles y actividades especiales.",
            price: 850000,
            oldPrice: 999900,
            rating: 5,
            image: "https://content.r9cdn.net/rimg/dimg/78/70/001b704a-city-15939-163e0a462f2.jpg?crop=true&width=1366&height=768&xhint=1556&yhint=1231",
            tag: "Oferta",
            tagColor: "bg-red-500"
        },
        {
            id: 3,
            name: "Ciudad Amurallada, Cartagena",
            category: "Nacional",
            description: "Aventuras en la montaña con rutas especiales para mascotas y alojamientos rurales equipados.",
            price: 950000,
            rating: 5,
            image: "https://mlqfmr3rpryd.i.optimole.com/cb:JBSP.a525/w:auto/h:auto/q:100/ig:avif/https://cartagena-tours.co/wp-content/uploads/2023/12/Travelocity-Cartagena-Destacada.Galeria.jpg",
            tag: "Eco",
            tagColor: "bg-green-500"
        },
        {
            id: 4,
            name: "Comuna 13, Medellin",
            category: "Nacional",
            description: "Explora las ciudades más pet-friendly con guías especializados y acceso a todas las atracciones.",
            price: 1500000,
            rating: 5,
            image: "https://cdn.getyourguide.com/img/tour/5fe95e65e3ee2e21.jpeg/146.jpg",
            tag: "Nuevo",
            tagColor: "bg-purple-500"
        }
    ];

    // Testimonials data
    const testimonials = [
        {
            id: 1,
            name: "María Rodríguez",
            petName: "Max",
            petType: "Labrador de 3 años",
            comment: "¡Increíble experiencia volando con Max! Todo el proceso fue sencillo, desde la reserva hasta el embarque. El personal de la aerolínea fue muy atento con nosotros y con Max.",
            rating: 5,
            avatar: "https://media.istockphoto.com/id/1432226243/es/foto/feliz-joven-de-color-sonriendo-a-la-c%C3%A1mara-en-un-estudio.jpg?s=612x612&w=0&k=20&c=WZ13cFaGQF7Y062lW5RqoKSp47kdqmvb3EJvy5NZhV8=",
            petImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Labrador_Retriever_%281210559%29.jpg/1200px-Labrador_Retriever_%281210559%29.jpg"
        },
        {
            id: 2,
            name: "Carlos Sánchez",
            petName: "Luna",
            petType: "Gato Persa de 2 años",
            comment: "Viajar con gatos suele ser estresante, pero gracias a PetTravel todo fue mucho más fácil. Los hoteles tenían todo lo necesario para Luna y el vuelo fue tranquilo.",
            rating: 5,
            avatar: "https://img.freepik.com/fotos-premium/concepto-felicidad-emociones-personas-hombre-riendo_380164-89168.jpg",
            petImage: "https://www.purina.es/sites/default/files/styles/ttt_image_510/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-06Persian20Long20Hair.2.jpg?itok=qzNV_HuV"
        },
        {
            id: 3,
            name: "Laura Gómez",
            petName: "Rocky",
            petType: "Bulldog de 4 años",
            comment: "Nuestro viaje a las montañas con Rocky fue perfecto. El transporte, el alojamiento y todas las actividades estaban pensadas para incluir a nuestro perro.",
            rating: 5,
            avatar: "https://img.freepik.com/fotos-gratis/uma-garota-com-um-sorriso-positivo_53876-144770.jpg",
            petImage: "https://cdn.agenciasinc.es/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/cientificos-britanicos-piden-modificar-la-cria-del-bulldog-ingles-por-motivos-de-salud-animal/9612428-1-esl-MX/Cientificos-britanicos-piden-modificar-la-cria-del-bulldog-ingles-por-motivos-de-salud-animal.jpg"
        }
    ];

    // Hero slides data
    const heroSlides = [
        {
            title: "Viaja por el mundo con tu mejor amigo",
            description: "Vuelos, hoteles y experiencias diseñadas para ti y tu mascota",
            buttonText: "Explorar Destinos",
            icon: <Plane size={20} />,
            image: bg,
            link:"/traveler"
        },
        {
            title: "Destinos Pet-Friendly por todo el mundo",
            description: "Aventuras sin preocupaciones, con servicios especiales para mascotas",
            buttonText: "Ver Ofertas",
            icon: <Globe size={20} />,
            image: bg2,
            link:"/flights"
        },
        {
            title: "Servicios Premium para Viajeros con Mascotas",
            description: "Transporte, alojamiento y actividades que incluyen a tu compañero peludo",
            buttonText: "Reservar Ahora",
            icon: <Compass size={20} />,
            image: bg3,
            link:"/explorar"
        }
    ];

    // Categories data
    const categories = [
        {
            name: "Vuelos Pet-Friendly",
            icon: <Plane size={24} className="text-teal-600" />,
            description: "Aerolíneas que aceptan mascotas en cabina o bodega",
            bgColor: "bg-teal-100",
        },
        {
            name: "Alojamientos",
            icon: <Hotel size={24} className="text-red-500" />,
            description: "Hoteles y apartamentos que reciben mascotas",
            bgColor: "bg-red-100"
        },
        {
            name: "Experiencias",
            icon: <Map size={24} className="text-blue-500" />,
            description: "Actividades y tours donde tu mascota es bienvenida",
            bgColor: "bg-blue-100"
        },
        {
            name: "Transporte",
            icon: <Compass size={24} className="text-green-500" />,
            description: "Trenes, ferries y traslados pet-friendly",
            bgColor: "bg-green-100"
        }
    ];

    // Services data
    const services = [
        {
            name: "Gestión de Documentación Pet",
            icon: <Package size={20} className="text-blue-600" />,
            description: "Asesoramiento y gestión de toda la documentación necesaria para viajar con tu mascota internacionalmente: pasaportes, microchips, vacunas y certificados sanitarios.",
            linkText: "Consultar requisitos",
            link: "/normativas",
            image: "https://www.portafolio.co/files/article_new_multimedia/uploads/2024/08/13/66bb75e78cef8.jpeg",
            bgColor: "bg-blue-100",
            textColor: "text-blue-600"
        },
        {
            name: "Reserva de Vuelos Especiales",
            icon: <Plane size={20} className="text-green-600" />,
            description: "Servicio de búsqueda y reserva en aerolíneas pet-friendly con las mejores condiciones para tu mascota, tanto en cabina como en bodega climatizada.",
            linkText: "Buscar vuelos",
            link: "/flights",
            image: "https://images.ctfassets.net/1sv59kqumaqp/3o655w9mwQ0yMJnR1gdCsV/7fb8ecc2263eb3b61b25b2336836e9ac/perro_con_pase_de_abordar.jpg",
            bgColor: "bg-green-100",
            textColor: "text-green-600"
        },
        {
            name: "Itinerarios Personalizados",
            icon: <Calendar size={20} className="text-purple-600" />,
            description: "Creamos un plan de viaje completo adaptado a ti y tu mascota, incluyendo alojamientos, transportes, restaurantes y actividades donde ambos sean bienvenidos.",
            linkText: "Diseñar itinerario",
            link: "/asistente",
            image: "https://www.universal-assistance.com/uablog/wp-content/uploads/2023/01/como-elaborar-itinerario-de-viaje.jpg",
            bgColor: "bg-purple-100",
            textColor: "text-purple-600"
        }
    ];

    // Auto slide for hero carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroSlides.length]);

    // Rating stars component
    const RatingStars = ({ rating }) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <div key={i}>
                        {i < Math.floor(rating) ? (
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ) : rating - i > 0 && rating - i < 1 ? (
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                <path fill="rgba(255,255,255,0.5)" d="M12 17.27L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    // Travel package card component
    const TravelPackageCard = ({ product }) => {
        return (
            <div className="text-black bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg">
                <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" loading='lazy' />
                    <span className={`absolute top-2 right-2 ${product.tagColor} text-white text-xs px-2 py-1 rounded`}>
                        {product.tag}
                    </span>
                </div>
                <div className="p-4">
                    <div className="flex items-center mb-2">
                        <PawPrint size={16} className="text-teal-500 mr-2" />
                        <span className="text-sm text-gray-500">{product.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <span className="text-xl font-bold text-gray-800">{formatCurrency(product.price)} COP</span>
                            {product.oldPrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">{formatCurrency(product.oldPrice)} COP</span>
                            )}
                        </div>
                        <RatingStars rating={product.rating} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="font-sans">
            {/* Header with transparent navbar would go here */}

            {/* Hero Section */}
            <HeroSection bg={bg} heroSlides={heroSlides} />

            {/* Stats Section */}
            <section className="py-12 bg-white border-b border-gray-200">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <p className="text-4xl font-bold text-teal-500">500+</p>
                            <p className="text-gray-600">Destinos Pet-Friendly</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-teal-500">50+</p>
                            <p className="text-gray-600">Aerolíneas Asociadas</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-teal-500">1000+</p>
                            <p className="text-gray-600">Hoteles que aceptan mascotas</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-teal-500">20.000+</p>
                            <p className="text-gray-600">Mascotas viajeras felices</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Descubre nuestros servicios</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer transition transform hover:-translate-y-2 hover:shadow-lg">
                                <div className={`${category.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{category.name}</h3>
                                <p className="text-gray-600">{category.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Flight Search Banner */}
            <section className="py-12 bg-teal-500 text-white">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-8 md:mb-0 text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">BUSCA TU VUELO PET-FRIENDLY</h3>
                        <p className="text-lg">Encuentra aerolíneas que permiten viajar con tu mascota</p>
                    </div>
                    <div className="flex w-full md:w-auto">
                        <Link to="/flights" className="bg-gray-800 hover:bg-gray-900 px-6 py-2 ml-2 transition flex items-center">
                            <Search size={18} className="mr-1" />
                            <span>Buscar</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Travel Packages */}
            <section id="paquetes" className="py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Paquetes de Viaje Pet-Friendly</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Descubre nuestras experiencias de viaje diseñadas para ti y tu mascota, con todos los servicios necesarios para una aventura sin preocupaciones.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {travelPackages.map(product => (
                            <TravelPackageCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/traveler" className="bg-white hover:bg-gray-50 text-teal-500 border border-teal-500 font-bold py-3 px-8 rounded-full transition inline-flex items-center">
                            <span>Ver todos los paquetes</span>
                            <ChevronRight size={20} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="servicios" className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Servicios Especializados</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Ofrecemos soluciones completas para que viajar con tu mascota sea una experiencia sencilla y agradable.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg">
                                <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <div className="flex items-center mb-3">
                                        <div className={`${service.bgColor} p-3 rounded-full mr-4`}>
                                            {service.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                    <a href={service.link} className={`${service.textColor} font-semibold hover:underline inline-flex items-center`}>
                                        <span>{service.linkText}</span>
                                        <ChevronRight size={16} className="ml-2" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Destination Highlight */}
            <section className="py-20 bg-white text-black">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                            <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">Destino destacado</span>
                            <h2 className="text-3xl font-bold mt-2 mb-4 text-gray-800">Cartagena: Ciudad Pet-Friendly por excelencia</h2>
                            <p className="text-gray-600 mb-6">
                                Cartagena es conocida por su actitud acogedora hacia las mascotas. Con parques, cafeterías, transporte público y alojamientos que reciben a tus amigos peludos con los brazos abiertos.
                            </p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center">
                                    <PawPrint size={16} className="text-teal-500 mr-2" />
                                    <span>Más de 30 parques pet-friendly</span>
                                </li>
                                <li className="flex items-center">
                                    <PawPrint size={16} className="text-teal-500 mr-2" />
                                    <span>Hoteles de lujo que aceptan mascotas sin costo adicional</span>
                                </li>
                                <li className="flex items-center">
                                    <PawPrint size={16} className="text-teal-500 mr-2" />
                                    <span>Restaurantes y terrazas donde tu mascota es bienvenida</span>
                                </li>
                                <li className="flex items-center">
                                    <PawPrint size={16} className="text-teal-500 mr-2" />
                                    <span>Tours especiales que incluyen a tu compañero peludo</span>
                                </li>
                            </ul>
                            <Link to="/traveler" className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-8 rounded-lg transition inline-flex items-center">
                                <Globe size={18} className="mr-2" />
                                <span>Explorar paquetes a Cartagena</span>
                            </Link>
                        </div>
                        <div className="md:w-1/2">
                            <div className="grid grid-cols-2 gap-4">
                                <img src="https://www.playasdecolombia.info/wp-content/uploads/2024/03/la_playa_de_bocagrande_colombia_1.jpg" alt="Amsterdam canals" className="rounded-lg shadow-md w-full h-full object-cover" loading='lazy' />
                                <img src="https://i0.wp.com/travelandleisure-es.com/wp-content/uploads/2024/01/Cartagena_Colombia.jpg?fit=2258%2C1717&ssl=1" alt="Amsterdam park with dog" className="rounded-lg shadow-md w-full h-full object-cover mt-6" loading='lazy'/>
                                <img src="https://blog.properati.com.co/wp-content/uploads/2021/02/GettyImages-1148861090-1024x681.jpg" alt="Amsterdam cafe with pets" className="rounded-lg shadow-md w-full h-full object-cover" loading='lazy'/>
                                <img src="https://turismo.encolombia.com/wp-content/uploads/2019/12/Playas-en-Cartagena.webp" alt="Amsterdam pet-friendly hotel" className="rounded-lg shadow-md w-full h-full object-cover mt-6" loading='lazy'/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Travel Tips */}
            <section className="py-16 bg-teal-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Tips para viajar con tu mascota</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                                <Package size={24} className="text-teal-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Preparación del viaje</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2">•</span>
                                    <span>Visita al veterinario 1-2 semanas antes del viaje</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2">•</span>
                                    <span>Verifica los requisitos de documentación del destino</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2">•</span>
                                    <span>Acostumbra a tu mascota al transportín con anticipación</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                                <Plane size={24} className="text-teal-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Durante el vuelo</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2">•</span>
                                    <span>Llega al aeropuerto con tiempo extra (3 horas para vuelos internacionales)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2">•</span>
                                    <span>No alimentes a tu mascota justo antes del vuelo</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2">•</span>
                                    <span>Lleva sus premios favoritos para mantenerla tranquila</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                                <Hotel size={24} className="text-teal-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">En el destino</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2">•</span>
                                    <span>Mantén su rutina lo más parecida posible</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2">•</span>
                                    <span>Lleva su comida habitual para evitar problemas digestivos</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2">•</span>
                                    <span>Localiza veterinarios en la zona por si hubiera emergencias</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main CTA */}
            <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-700 text-white">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-8 md:mb-0 text-center md:text-left md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para viajar con tu mascota?</h2>
                        <p className="text-lg mb-6">
                            Únete a miles de viajeros que disfrutan de aventuras increíbles junto a sus mascotas. Registrate ahora y recibe un 10% de descuento en tu primera reserva.
                        </p>
                        <Link to="/traveler" className="bg-white text-teal-500 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition transform hover:scale-105 inline-flex items-center">
                            <User size={20} className="mr-2" />
                            <span>Planificar mi viaje ahora</span>
                        </Link>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img src="https://likesolidaria.com.co/generacion-like/uploads/images/2023/02/image_750x_63e5838bbc0a8.jpg" alt="Mascota viajando" className="rounded-lg shadow-lg max-w-full" loading='lazy'/>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Lo que dicen nuestros viajeros</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Experiencias reales de clientes que han viajado con sus mascotas utilizando nuestros servicios.
                    </p>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="overflow-hidden">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className={`transition-opacity duration-500 ${activeTestimonial === index ? 'opacity-100' : 'hidden opacity-0'}`}
                                >
                                    <div className="bg-white p-8 rounded-lg shadow-lg">
                                        <div className="flex flex-col md:flex-row items-center md:items-start">
                                            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                                                <div className="relative">
                                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-20 h-20 rounded-full object-cover border-4 border-teal-500" loading='lazy' />
                                                    <img src={testimonial.petImage} alt={testimonial.petName} className="w-12 h-12 rounded-full object-cover border-2 border-white absolute -bottom-2 -right-2" loading='lazy' />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center mb-2">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <p className="text-gray-600 italic mb-4">"{testimonial.comment}"</p>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <PawPrint size={14} className="mr-1 text-teal-500" />
                                                        <span>{testimonial.petName} - {testimonial.petType}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Testimonial Controls */}
                        <button
                            onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-teal-500 focus:outline-none"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-teal-500 focus:outline-none"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Testimonial Indicators */}
                        <div className="flex justify-center space-x-2 mt-6">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition ${activeTestimonial === index ? 'bg-teal-500' : 'bg-gray-300'}`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Preguntas Frecuentes</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Resolvemos tus dudas sobre viajar con mascotas
                    </p>

                    <div className="max-w-3xl mx-auto space-y-4">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">¿Qué documentación necesita mi mascota para viajar?</h3>
                            <p className="text-gray-600">
                                Los requisitos varían según el destino, pero generalmente se necesita un pasaporte para mascotas, microchip, vacuna antirrábica actualizada y certificado veterinario de buena salud. Para viajes internacionales, cada país tiene requisitos específicos que podemos ayudarte a gestionar.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">¿Todas las aerolíneas permiten viajar con mascotas?</h3>
                            <p className="text-gray-600">
                                No todas las aerolíneas aceptan mascotas, y las que lo hacen tienen diferentes políticas. Algunas permiten mascotas pequeñas en cabina, mientras que otras solo en bodega. Trabajamos con aerolíneas pet-friendly y te asesoramos sobre la mejor opción según el tamaño y necesidades de tu mascota.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">¿Cómo se prepara a una mascota para un vuelo largo?</h3>
                            <p className="text-gray-600">
                                Es importante acostumbrar a tu mascota al transportín con antelación, reducir la comida antes del vuelo, hacer ejercicio el día anterior, y consultar con tu veterinario si necesita algún suplemento para reducir el estrés. Nuestros asesores te proporcionarán una guía completa según el tipo de mascota.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">¿Qué destinos son los más recomendables para viajar con mascotas?</h3>
                            <p className="text-gray-600">
                                Europa tiene muchos destinos pet-friendly como Amsterdam, Berlín y París. En España, ciudades como Barcelona y San Sebastián cuentan con excelentes servicios para mascotas. También recomendamos Canadá y algunos destinos de playa con alojamientos que aceptan mascotas sin restricciones.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <a href="#" className="text-teal-500 font-semibold hover:underline inline-flex items-center">
                            <span>Ver todas las preguntas frecuentes</span>
                            <ChevronRight size={16} className="ml-2" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-teal-500 text-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">Mantente informado</h2>
                        <p className="text-lg mb-8">
                            Suscríbete a nuestra newsletter y recibe las mejores ofertas, consejos de viaje y novedades para viajar con tu mascota.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="flex-grow px-4 py-3 rounded-lg focus:outline-none text-gray-700 border-gray-600"
                            />
                            <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition">
                                Suscribirme
                            </button>
                        </div>
                        <p className="text-sm mt-4 opacity-80">
                            Al suscribirte, aceptas nuestra política de privacidad. No te preocupes, no enviamos spam.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PetFriendlyTravelLanding;