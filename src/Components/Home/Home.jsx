import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, ChevronLeft, ChevronRight, Heart, Package, PawPrint, Scissors, Activity, Award, ChevronDown, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const PetFriendlyLanding = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Simulated product data
  const products = [
    {
      id: 1,
      name: "Premium Dry Dog Food",
      category: "Perros",
      description: "Nutrición completa y balanceada para perros de todas las edades.",
      price: 24.99,
      rating: 4.5,
      image: "/api/placeholder/300/300",
      tag: "Destacado",
      tagColor: "bg-yellow-500"
    },
    {
      id: 2,
      name: "Cama Acolchada Luxury",
      category: "Gatos",
      description: "Cama super cómoda y acogedora para gatos exigentes.",
      price: 19.99,
      oldPrice: 29.99,
      rating: 5,
      image: "/api/placeholder/300/300",
      tag: "Oferta",
      tagColor: "bg-red-500"
    },
    {
      id: 3,
      name: "Collar Ajustable Premium",
      category: "Accesorios",
      description: "Collar resistente y ajustable con materiales sostenibles.",
      price: 14.99,
      rating: 4,
      image: "/api/placeholder/300/300",
      tag: "Eco",
      tagColor: "bg-green-500"
    },
    {
      id: 4,
      name: "Juguete Interactivo Dispensador",
      category: "Juguetes",
      description: "Mantén a tu mascota entretenida y estimula su inteligencia.",
      price: 18.99,
      rating: 4.5,
      image: "/api/placeholder/300/300",
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
      comment: "Desde que descubrí PetLovers, mi perro Max está más feliz y saludable. La calidad de sus productos y el trato personal hacen toda la diferencia.",
      rating: 5,
      avatar: "/api/placeholder/60/60",
      petImage: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Carlos Sánchez",
      petName: "Luna",
      petType: "Gato Persa de 2 años",
      comment: "Excelentes productos y el servicio de entrega es muy rápido. Mi gata Luna ama sus nuevos juguetes y su cama.",
      rating: 5,
      avatar: "/api/placeholder/60/60",
      petImage: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Laura Gómez",
      petName: "Rocky",
      petType: "Bulldog de 4 años",
      comment: "El servicio veterinario es increíble. Han ayudado mucho a mi Rocky con sus problemas de salud y siempre con mucho cariño.",
      rating: 5,
      avatar: "/api/placeholder/60/60",
      petImage: "/api/placeholder/80/80"
    }
  ];
  
  // Hero slides data
  const heroSlides = [
    {
      title: "Bienvenido al paraíso de tus mascotas",
      description: "Todo lo que necesitan tus compañeros peludos en un solo lugar",
      buttonText: "Explorar Productos",
      icon: <PawPrint size={20} />,
    },
    {
      title: "Productos Premium para Mascotas Felices",
      description: "Calidad y variedad en alimentos, juguetes y accesorios",
      buttonText: "Ver Ofertas",
      icon: <Package size={20} />,
    },
    {
      title: "Servicios Especializados para tu Mascota",
      description: "Peluquería, veterinaria y más servicios profesionales",
      buttonText: "Reservar Cita",
      icon: <Scissors size={20} />,
    }
  ];
  
  // Categories data
  const categories = [
    {
      name: "Alimentos",
      icon: <Package size={24} className="text-teal-600" />,
      description: "Nutrición de calidad para todo tipo de mascotas",
      bgColor: "bg-teal-100"
    },
    {
      name: "Juguetes",
      icon: <PawPrint size={24} className="text-red-500" />,
      description: "Diversión garantizada para tus compañeros",
      bgColor: "bg-red-100"
    },
    {
      name: "Higiene",
      icon: <Scissors size={24} className="text-blue-500" />,
      description: "Productos para el cuidado y limpieza",
      bgColor: "bg-blue-100"
    },
    {
      name: "Accesorios",
      icon: <Heart size={24} className="text-green-500" />,
      description: "Todo para la comodidad de tu mascota",
      bgColor: "bg-green-100"
    }
  ];
  
  // Services data
  const services = [
    {
      name: "Peluquería Canina y Felina",
      icon: <Scissors size={20} className="text-blue-600" />,
      description: "Servicio profesional de baño, corte, cepillado y cuidado estético para tu mascota. Usamos productos orgánicos y de alta calidad.",
      linkText: "Reservar una cita",
      image: "/api/placeholder/400/250",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      name: "Atención Veterinaria",
      icon: <Activity size={20} className="text-green-600" />,
      description: "Consultas, vacunaciones, desparasitaciones y servicios médicos completos. Cuidamos la salud de tu mascota con profesionales dedicados.",
      linkText: "Consultar servicios",
      image: "/api/placeholder/400/250",
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      name: "Entrenamiento Canino",
      icon: <Award size={20} className="text-purple-600" />,
      description: "Sesiones personalizadas para mejorar el comportamiento y la obediencia de tu perro. Entrenadores certificados y métodos positivos.",
      linkText: "Más información",
      image: "/api/placeholder/400/250",
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
  
  // Product card component
  const ProductCard = ({ product }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg">
        <div className="relative">
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
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
              <span className="text-xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>
            <RatingStars rating={product.rating} />
          </div>
          <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg transition flex items-center justify-center">
            <ShoppingCart size={18} className="mr-2" />
            Añadir al carrito
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="font-sans">

      {/* Hero Section */}
      <div className="pt-16 bg-gradient-to-r from-teal-500 to-teal-700 text-white relative h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img src="/api/placeholder/1920/1080" alt="Hero background" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{heroSlides[activeSlide].title}</h1>
            <p className="text-xl mb-8">{heroSlides[activeSlide].description}</p>
            <button className="bg-white text-teal-500 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition transform hover:scale-105 flex items-center mx-auto">
              {heroSlides[activeSlide].icon}
              <span className="ml-2">{heroSlides[activeSlide].buttonText}</span>
            </button>
          </div>
        </div>
        
        {/* Hero Controls */}
        <button 
          onClick={() => setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-teal-500"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-teal-500"
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Hero Indicators */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full ${activeSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Explora nuestras categorías</h2>
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

      {/* Newsletter Banner */}
      <section className="py-12 bg-teal-500 text-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">10% DE DESCUENTO EN TU PRIMERA COMPRA</h3>
            <p className="text-lg">Suscríbete a nuestro newsletter y recibe un cupón exclusivo</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input type="email" placeholder="Tu correo electrónico" className="px-4 py-2 w-full md:w-64 rounded-l-lg focus:outline-none text-gray-700" />
            <button className="bg-gray-800 hover:bg-gray-900 px-6 py-2 rounded-r-lg transition">Suscribirse</button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="productos" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Productos Destacados</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Descubre nuestra selección de los mejores productos para tus mascotas, elegidos cuidadosamente para garantizar calidad y satisfacción.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="#" className="bg-white hover:bg-gray-50 text-teal-500 border border-teal-500 font-bold py-3 px-8 rounded-full transition inline-flex items-center">
              <span>Ver todos los productos</span>
              <ChevronRight size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Nuestros Servicios</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Ofrecemos una amplia variedad de servicios profesionales para mantener a tu mascota feliz y saludable.
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
                  <a href="#" className={`${service.textColor} font-semibold hover:underline inline-flex items-center`}>
                    <span>{service.linkText}</span>
                    <ChevronRight size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-700 text-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 text-center md:text-left md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para consentir a tu mascota?</h2>
            <p className="text-lg mb-6">
              Únete a miles de dueños de mascotas satisfechos. Registrate ahora y recibe un cupón de 15% de descuento en tu primera compra.
            </p>
            <button className="bg-white text-teal-500 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition transform hover:scale-105 inline-flex items-center">
              <User size={20} className="mr-2" />
              <span>Crear cuenta gratis</span>
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="/api/placeholder/500/300" alt="Mascota feliz" className="rounded-lg shadow-lg max-w-full" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes y sus mascotas es nuestra mayor recompensa. Descubre por qué tantas personas confían en nosotros.
          </p>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-8/12 bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center mb-4">
                    <img src={testimonials[activeTestimonial].avatar} alt={testimonials[activeTestimonial].name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonials[activeTestimonial].name}</h4>
                      <RatingStars rating={testimonials[activeTestimonial].rating} />
                    </div>
                  </div>
                  <p className="text-gray-600 italic">{testimonials[activeTestimonial].comment}</p>
                  <div className="mt-4 flex items-center">
                    <img src={testimonials[activeTestimonial].petImage} alt={testimonials[activeTestimonial].petName} className="w-16 h-16 rounded-full border-2 border-teal-500" />
                    <span className="ml-3 text-sm text-gray-500">{testimonials[activeTestimonial].petName}, {testimonials[activeTestimonial].petType}</span>
                  </div>
                </div>
                
                <div className="w-full md:w-4/12 mt-6 md:mt-0 md:pl-6">
                  <h4 className="text-lg font-semibold mb-4 text-center md:text-left text-gray-800">Más testimonios</h4>
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={testimonial.id}
                      className={`p-4 rounded-lg cursor-pointer mb-3 transition ${
                        activeTestimonial === index ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 hover:bg-teal-100'
                      }`}
                      onClick={() => setActiveTestimonial(index)}
                    >
                      <div className="flex items-center">
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full mr-3" />
                        <div>
                          <h5 className="font-medium">{testimonial.name}</h5>
                          <p className={`text-sm ${activeTestimonial === index ? 'text-teal-100' : 'text-gray-500'}`}>
                            {testimonial.petName}, {testimonial.petType}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetFriendlyLanding;