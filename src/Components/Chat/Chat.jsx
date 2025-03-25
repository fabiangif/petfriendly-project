import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Dog, Send, Image, Link } from 'lucide-react';

const ChatMessage = ({ msg, primaryColor }) => (
  <div className={`flex ${msg.isBot ? '' : 'justify-end'}`}>
    <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.isBot ? 'bg-gray-100 text-gray-800' : `${primaryColor} text-white`}`}>
      {msg.isBot && (
        <div className="flex items-center mb-1">
          <Dog className="h-4 w-4 mr-1 text-teal-500" />
          <span className="text-xs font-medium text-teal-500">Buddy</span>
        </div>
      )}
      <p className="whitespace-pre-line">{msg.text}</p>
      {msg.image && <img src={msg.image} alt="Imagen relacionada" className="mt-2 rounded-lg" />}
      {msg.link && (
        <a href={msg.link} target="_blank" rel="noopener noreferrer" className="mt-2 text-blue-500 hover:underline flex items-center">
          <Link className="h-4 w-4 mr-1" />
          Ver más
        </a>
      )}
    </div>
  </div>
);

const PetFriendlyChatbot = ({ primaryColor = 'bg-teal-500' }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      isBot: true,
      text: '¡Hola! Soy Buddy, tu asistente de viajes pet-friendly. ¿En qué puedo ayudarte hoy?',
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const petTravelColombia = {
    hotel: [
      {
        text: 'Hotel Canino de Lujo en Cartagena acepta mascotas de todos los tamaños sin cargo adicional y está ubicado frente al mar.',
        image: 'URL_imagen_hotel_cartagena',
        link: 'URL_informacion_hotel_cartagena',
      },
      {
        text: 'Hotel Pet Paradise en Santa Marta es un resort exclusivo para mascotas con actividades recreativas y spa cerca de la playa.',
        image: 'URL_imagen_hotel_santa_marta',
        link: 'URL_informacion_hotel_santa_marta',
      },
      {
        text: 'Hotel Mascota Feliz en San Andrés es un hotel boutique en la isla que acepta mascotas con servicios de spa y guardería.',
        image: 'URL_imagen_hotel_san_andres',
        link: 'URL_informacion_hotel_san_andres',
      },
      {
        text: 'Eco-Hotel Mascotas Bienvenidas en Salento es un hotel ecológico en el eje cafetero donde las mascotas pueden disfrutar de senderos naturales.',
        image: 'URL_imagen_hotel_salento',
        link: 'URL_informacion_hotel_salento',
      },
      {
        text: 'Hotel Canino Palmas en Medellín es un hotel boutique en El Poblado con camas especiales para mascotas y servicio de paseo.',
        image: 'URL_imagen_hotel_medellin',
        link: 'URL_informacion_hotel_medellin',
      },
    ],
    restaurante: [
      {
        text: 'Café Patitas Felices en Medellín es una cafetería que permite la entrada con mascotas y ofrece snacks especiales para perros.',
        image: 'URL_imagen_cafe_medellin',
        link: 'URL_informacion_cafe_medellin',
      },
      {
        text: 'Restaurante El Perro Andaluz en Cali cuenta con terraza pet-friendly y menú especial para mascotas.',
        image: 'URL_imagen_restaurante_cali',
        link: 'URL_informacion_restaurante_cali',
      },
      {
        text: 'Café Peludo en Bogotá es una cafetería temática con gatos adoptables y opciones vegetarianas.',
        image: 'URL_imagen_cafe_bogota',
        link: 'URL_informacion_cafe_bogota',
      },
      {
        text: 'Cat Café Bogotá es una cafetería donde se permite la entrada con gatos y hay felinos residentes para interactuar.',
        image: 'URL_imagen_cat_cafe_bogota',
        link: 'URL_informacion_cat_cafe_bogota',
      },
      {
        text: 'Brunch & Pets en Bogotá es un restaurante especializado en brunch con mesas adaptadas para que las mascotas estén cómodas.',
        image: 'URL_imagen_brunch_bogota',
        link: 'URL_informacion_brunch_bogota',
      },
    ],
    parque: [
      {
        text: 'Parque Canino Bogotá es un parque exclusivo para perros con áreas cercadas y obstáculos para entrenamiento.',
        image: 'URL_imagen_parque_bogota',
        link: 'URL_informacion_parque_bogota',
      },
      {
        text: 'Parque Simón Bolívar - Área Canina en Bogotá tiene una zona especial para perros dentro del parque más grande de la ciudad.',
        image: 'URL_imagen_simon_bolivar',
        link: 'URL_informacion_simon_bolivar',
      },
      {
        text: 'Parque Canino El Poblado en Medellín es un amplio parque con zonas verdes y espacios de recreación para mascotas en el barrio El Poblado.',
        image: 'URL_imagen_parque_poblado',
        link: 'URL_informacion_parque_poblado',
      },
      {
        text: 'Parque Canino Villa del Río en Cali tiene obstáculos y zonas de juego para perros de todos los tamaños.',
        image: 'URL_imagen_parque_cali',
        link: 'URL_informacion_parque_cali',
      },
      {
        text: 'Parque Canino El Virrey en Bogotá es un parque espacioso cerca al Parque El Virrey con zonas recreativas para perros y eventos comunitarios.',
        image: 'URL_imagen_parque_virrey',
        link: 'URL_informacion_parque_virrey',
      },
    ],
    playa: [
      {
        text: 'En Santa Marta hay áreas designadas en algunas playas donde las mascotas son permitidas durante ciertas horas.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSXO83jDzsm9NIsceXmHsCNVgdeqaKhLdBtg&s',
        link: 'URL_informacion_playas_santa_marta',
      },
      {
        text: 'En San Andrés, algunas playas menos concurridas permiten mascotas. Consulta las regulaciones locales antes de visitar.',
        image: 'https://playasdecolombia.co/wp-content/uploads/2024/02/isla-de-san-andres-playas-de-colombia-2.webp',
        link: 'URL_informacion_playas_san_andres',
      },
      {
        text: 'Playa Blanca en Cartagena tiene algunas áreas donde los perros son permitidos en temporada baja y horas específicas.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROft2NExhJVQiFDjwesPJwTa3z10AClHIZQw&s',
        link: 'URL_informacion_playa_blanca',
      },
    ],
    // Separar los diferentes medios de transporte
    avion: [
      {
        text: 'Avianca permite mascotas pequeñas en cabina y mascotas más grandes en bodega con restricciones específicas.',
        image: 'URL_imagen_avianca',
        link: 'URL_informacion_avianca_mascotas',
      },
      {
        text: 'Latam permite mascotas pequeñas en cabina y mascotas más grandes en bodega con restricciones específicas.',
        image: 'URL_imagen_latam',
        link: 'URL_informacion_latam_mascotas',
      },
      {
        text: 'Wingo permite mascotas pequeñas en cabina y mascotas más grandes en bodega con restricciones específicas.',
        image: 'URL_imagen_wingo',
        link: 'URL_informacion_wingo_mascotas',
      },
      {
        text: 'Jetsmart permite mascotas pequeñas en cabina y mascotas más grandes en bodega con restricciones específicas.',
        image: 'URL_imagen_jetsmart',
        link: 'URL_informacion_jetsmart_mascotas',
      },
    ],
    coche: [
      {
        text: 'Para viajar en coche con tu mascota en Colombia, es recomendable usar un arnés de seguridad o transportadora adecuada que se pueda asegurar con el cinturón de seguridad.',
        image: 'URL_imagen_coche_seguridad',
        link: 'URL_informacion_coche_seguridad',
      },
      {
        text: 'Durante viajes largos en coche, haz paradas cada 2 horas para que tu mascota pueda estirar las patas, hidratarse y hacer sus necesidades.',
        image: 'URL_imagen_paradas_coche',
        link: 'URL_informacion_paradas_coche',
      },
      {
        text: 'No dejes nunca a tu mascota sola dentro del vehículo, especialmente en ciudades calurosas como Cartagena o Barranquilla, ya que la temperatura dentro puede subir rápidamente.',
        image: 'URL_imagen_coche_temperatura',
        link: 'URL_informacion_coche_temperatura',
      },
    ],
    transporte_publico: [
      {
        text: 'Los taxis en Colombia generalmente aceptan mascotas, pero es mejor confirmar con el conductor antes de abordar.',
        image: 'URL_imagen_taxi',
        link: 'URL_informacion_taxi_mascotas',
      },
      {
        text: 'TransMilenio en Bogotá permite mascotas pequeñas en transportadoras. Verifica las últimas normativas antes de viajar.',
        image: 'URL_imagen_transmilenio',
        link: 'URL_informacion_transmilenio_mascotas',
      },
      {
        text: 'Los buses intermunicipales suelen permitir mascotas pequeñas en transportadoras colocadas bajo el asiento. Algunas empresas cobran extra.',
        image: 'URL_imagen_bus',
        link: 'URL_informacion_buses_mascotas',
      },
    ],
    veterinario: [
      {
        text: 'Clínica Veterinaria Bogotá ofrece servicio veterinario completo con especialistas en animales exóticos y servicios de emergencia 24/7.',
        image: 'URL_imagen_veterinario_bogota',
        link: 'URL_informacion_veterinario_bogota',
      },
      {
        text: 'Veterinario 24h Medellín es un centro veterinario con atención de emergencias las 24 horas, equipado con tecnología avanzada.',
        image: 'URL_imagen_veterinario_medellin',
        link: 'URL_informacion_veterinario_medellin',
      },
      {
        text: 'Clínica Veterinaria del Caribe en Barranquilla ofrece servicio veterinario completo con especialistas en animales exóticos y servicios de emergencia 24/7.',
        image: 'URL_imagen_veterinario_barranquilla',
        link: 'URL_informacion_veterinario_barranquilla',
      },
      {
        text: 'Hospital Veterinario Central en Bogotá es el mayor hospital veterinario de la ciudad con todas las especialidades médicas.',
        image: 'URL_imagen_hospital_veterinario',
        link: 'URL_informacion_hospital_veterinario',
      },
    ],
    tienda: [
      {
        text: 'Mascotas & Más en Barranquilla es una tienda especializada en productos orgánicos y accesorios de alta calidad para mascotas.',
        image: 'URL_imagen_tienda_barranquilla',
        link: 'URL_informacion_tienda_barranquilla',
      },
      {
        text: 'PetColombia Store en Bogotá es una tienda grande con todo tipo de suministros para mascotas, desde alimentos hasta juguetes y ropa.',
        image: 'URL_imagen_tienda_bogota',
        link: 'URL_informacion_tienda_bogota',
      },
      {
        text: 'Pet Corner Colombiano en Pereira es una boutique para mascotas con productos premium y una sección de alimentos naturales y orgánicos.',
        image: 'URL_imagen_tienda_pereira',
        link: 'URL_informacion_tienda_pereira',
      },
      {
        text: 'Mundo Animal Store en Cartagena es una tienda completa con productos importados y locales para todo tipo de mascotas en el centro de la ciudad.',
        image: 'URL_imagen_tienda_cartagena',
        link: 'URL_informacion_tienda_cartagena',
      },
      {
        text: 'Pet Boutique Premium en Villavicencio es una boutique exclusiva con ropa, accesorios y productos gourmet para mascotas.',
        image: 'URL_imagen_tienda_villavicencio',
        link: 'URL_informacion_tienda_villavicencio',
      },
    ],
    documentos: [
      {
        text: 'Para viajar con mascotas dentro de Colombia se requiere un certificado de salud veterinario reciente (no mayor a 5 días) y carnet de vacunación.',
        image: 'URL_imagen_documentos_nacionales',
        link: 'URL_informacion_documentos_nacionales',
      },
      {
        text: 'Para viajar en avión dentro de Colombia, cada aerolínea tiene requisitos específicos. Generalmente necesitarás certificado de salud, carnet de vacunación y reserva previa para la mascota.',
        image: 'URL_imagen_requisitos_aereos',
        link: 'URL_informacion_requisitos_aereos',
      },
      {
        text: 'Para cruzar fronteras terrestres desde Colombia hacia países vecinos, necesitarás certificado internacional de exportación emitido por el ICA.',
        image: 'URL_imagen_documentos_internacionales',
        link: 'URL_informacion_documentos_internacionales',
      },
    ],
    consejos: [
      {
        text: 'Antes de viajar por Colombia con tu mascota, investiga si tu alojamiento realmente acepta mascotas y si tienen restricciones de tamaño o raza.',
        image: 'URL_imagen_consejo_alojamiento',
      },
      {
        text: 'En las ciudades principales de Colombia (Bogotá, Medellín, Cali), existen aplicaciones móviles que te indican los lugares pet-friendly cercanos.',
        image: 'URL_imagen_apps_mascotas',
      },
      {
        text: 'Lleva siempre contigo una botella de agua y un recipiente plegable, especialmente en ciudades con clima caluroso como Cartagena o Barranquilla.',
        image: 'URL_imagen_agua_mascota',
      },
      {
        text: 'En Colombia, muchos centros comerciales permiten mascotas. Verifica en la entrada o en el sitio web del establecimiento antes de visitar.',
        image: 'URL_imagen_centro_comercial',
      },
      {
        text: 'Ten en cuenta que en temporada alta turística (diciembre-enero, Semana Santa), muchos alojamientos pet-friendly pueden estar completos. Reserva con anticipación.',
        image: 'URL_imagen_reserva_anticipada',
      },
    ],
    ciudades_principales: [
      {
        ciudad: 'Bogotá',
        destacados: [
          'Parque Canino El Virrey',
          'Parque Simón Bolívar - Área Canina',
          'Café Peludo',
          'Hospital Veterinario Central',
          'PetColombia Store'
        ]
      },
      {
        ciudad: 'Medellín',
        destacados: [
          'Parque Canino El Poblado',
          'Parque Canino Laureles',
          'Café Patitas Felices',
          'Hotel Canino Palmas',
          'Veterinario 24h Medellín'
        ]
      },
      {
        ciudad: 'Cali',
        destacados: [
          'Parque Canino Villa del Río',
          'Parque Canino La Flora',
          'Restaurante El Perro Andaluz',
          'Veterinaria El Bosque',
          'Centro Veterinario 24h Cali'
        ]
      },
      {
        ciudad: 'Cartagena',
        destacados: [
          'Hotel Canino de Lujo',
          'Café Patitas',
          'Mundo Animal Store',
          'Centro Veterinario Especializado',
          'Playa Blanca (zonas específicas)'
        ]
      },
      {
        ciudad: 'Barranquilla',
        destacados: [
          'Parque Canino del Viento',
          'Restaurante El Perro Feliz',
          'Mascotas & Más',
          'Clínica Veterinaria del Caribe',
          'Centro Médico Animal del Norte'
        ]
      }
    ],
    // Nuevas categorías
    actividades: [
      {
        text: 'Paseo en Barco para Mascotas en Cartagena - Excursiones especiales que permiten llevar mascotas para disfrutar del mar.',
        image: 'URL_imagen_barco_mascotas',
        link: 'URL_informacion_barco_mascotas'
      },
      {
        text: 'Senderismo Pet-Friendly en el Valle del Cocora - Rutas adaptadas donde puedes llevar a tu mascota para disfrutar de los paisajes naturales.',
        image: 'URL_imagen_senderismo_mascotas',
        link: 'URL_informacion_senderismo_mascotas'
      },
      {
        text: 'Yoga con Mascotas en Medellín - Clases especiales donde puedes practicar yoga junto a tu mascota en parques de la ciudad.',
        image: 'URL_imagen_yoga_mascotas',
        link: 'URL_informacion_yoga_mascotas'
      }
    ],
    eventos: [
      {
        text: 'Festival Canino de Bogotá - Evento anual con concursos, exposiciones y actividades para perros y sus dueños.',
        image: 'URL_imagen_festival_canino',
        link: 'URL_informacion_festival_canino'
      },
      {
        text: 'Feria de Adopción de Mascotas en Cali - Evento mensual donde puedes adoptar mascotas y comprar productos especializados.',
        image: 'URL_imagen_feria_adopcion',
        link: 'URL_informacion_feria_adopcion'
      }
    ],
    internacional: [
      {
        text: 'Para viajar desde Colombia a países de la Unión Europea, tu mascota necesitará microchip, vacuna antirrábica con al menos 21 días de antelación, pasaporte europeo y certificado zoosanitario.',
        image: 'URL_imagen_viaje_europa',
        link: 'URL_informacion_viaje_europa'
      },
      {
        text: 'Para viajar desde Colombia a Estados Unidos, tu mascota requerirá certificado de salud emitido por un veterinario acreditado por el ICA y vacuna antirrábica vigente.',
        image: 'URL_imagen_viaje_usa',
        link: 'URL_informacion_viaje_usa'
      }
    ],
    emergencias: [
      {
        text: 'Si tu mascota sufre una emergencia durante el viaje, comunícate con el servicio de emergencias veterinarias más cercano. En muchas ciudades hay clínicas 24/7.',
        image: 'URL_imagen_emergencia_vet',
        link: 'URL_informacion_emergencia_vet'
      },
      {
        text: 'Es recomendable llevar un botiquín básico para mascotas durante tus viajes con elementos como vendas, antiséptico y medicamentos recetados por tu veterinario.',
        image: 'URL_imagen_botiquin',
        link: 'URL_informacion_botiquin'
      }
    ],
    alergias: [
      {
        text: 'Si tu mascota sufre de alergias, consulta con un veterinario antes de viajar para obtener recomendaciones específicas para el clima y ambiente del destino.',
        image: 'URL_imagen_alergias',
        link: 'URL_informacion_alergias'
      }
    ],
    seguros: [
      {
        text: 'Existen seguros de viaje que cubren a mascotas en Colombia, ofreciendo cobertura médica, responsabilidad civil y asistencia en caso de pérdida.',
        image: 'URL_imagen_seguro_mascotas',
        link: 'URL_informacion_seguro_mascotas'
      }
    ]
  };

  // Función normalizar texto (eliminar tildes, convertir a minúsculas)
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  // Mapa de sinónimos y categorías
  const categoryMap = {
    // Categoría hoteles
    alojamiento: 'hotel', hospedaje: 'hotel', hostal: 'hotel', posada: 'hotel', 
    cabana: 'hotel', cabaña: 'hotel', resort: 'hotel', apartamento: 'hotel',
    airbnb: 'hotel', habitacion: 'hotel', habitación: 'hotel', hospedar: 'hotel',
    dormir: 'hotel', estadia: 'hotel', estancia: 'hotel', quedarme: 'hotel',
    
    // Categoría restaurantes
    restaurante: 'restaurante', comida: 'restaurante', comer: 'restaurante', 
    cafeteria: 'restaurante', cafetería: 'restaurante', cafe: 'restaurante', café: 'restaurante',
    bar: 'restaurante', terraza: 'restaurante', almorzar: 'restaurante', cenar: 'restaurante',
    desayunar: 'restaurante', menu: 'restaurante', alimentacion: 'restaurante',
    
    // Categoría parques
    parque: 'parque', pasear: 'parque', caminar: 'parque', jugar: 'parque',
    correr: 'parque', ejercicio: 'parque', jardin: 'parque', jardín: 'parque',
    verde: 'parque', aire: 'parque', recreacion: 'parque', recreación: 'parque',
    espacio: 'parque',
    
    // Categoría playas
    playa: 'playa', mar: 'playa', arena: 'playa', costa: 'playa',
    oceano: 'playa', océano: 'playa', maritimo: 'playa', marítimo: 'playa',
    bahia: 'playa', bahía: 'playa', nadar: 'playa', balneario: 'playa',
    
    // Categoría avión
    avion: 'avion', avión: 'avion', aerolinea: 'avion', aerolínea: 'avion',
    volar: 'avion', vuelo: 'avion', aereo: 'avion', aéreo: 'avion',
    aeropuerto: 'avion', avianca: 'avion', latam: 'avion', wingo: 'avion',
    
    // Categoría coche
    coche: 'coche', auto: 'coche', carro: 'coche', automovil: 'coche',
    automóvil: 'coche', conducir: 'coche', manejar: 'coche', conduccion: 'coche',
    conducción: 'coche', carretera: 'coche', vehiculo: 'coche', vehículo: 'coche',
    viaje: 'coche', ruta: 'coche',
    
    // Categoría transporte público
    taxi: 'transporte_publico', bus: 'transporte_publico', buseta: 'transporte_publico',
    transmilenio: 'transporte_publico', metro: 'transporte_publico', tranvia: 'transporte_publico',
    tranvía: 'transporte_publico', colectivo: 'transporte_publico', transporte: 'transporte_publico',
    publico: 'transporte_publico', público: 'transporte_publico', uber: 'transporte_publico',
    didi: 'transporte_publico', cabify: 'transporte_publico', beat: 'transporte_publico',
    
    // Categoría veterinarios
    veterinario: 'veterinario', vet: 'veterinario', clinica: 'veterinario',
    clínica: 'veterinario', hospital: 'veterinario', médico: 'veterinario',
    medico: 'veterinario', salud: 'veterinario', emergencia: 'veterinario',
    enfermedad: 'veterinario', dolor: 'veterinario', tratamiento: 'veterinario',
    
    // Categoría tiendas
    tienda: 'tienda', comprar: 'tienda', accesorios: 'tienda', comida: 'tienda',
    alimento: 'tienda', productos: 'tienda', juguetes: 'tienda', collar: 'tienda',
    correa: 'tienda', ropa: 'tienda', cama: 'tienda', boutique: 'tienda',
    supermercado: 'tienda', petshop: 'tienda', shopping: 'tienda', 
    
    // Categoría documentos
    documentos: 'documentos', papeles: 'documentos', requisitos: 'documentos',
    carnet: 'documentos', vacunas: 'documentos', certificado: 'documentos',
    pasaporte: 'documentos', permiso: 'documentos', aduana: 'documentos',
    legal: 'documentos', registros: 'documentos', frontera: 'documentos',
    migracion: 'documentos', migración: 'documentos', normas: 'documentos',
    regulacion: 'documentos', regulación: 'documentos',
    
    // Categoría consejos
    consejos: 'consejos', recomendaciones: 'consejos', tips: 'consejos',
    sugerencia: 'consejos', idea: 'consejos', ayuda: 'consejos', guia: 'consejos',
    guía: 'consejos', información: 'consejos', informacion: 'consejos', tutorial: 'consejos',
    
    // Categoría ciudades
    ciudad: 'ciudades_principales', bogota: 'ciudades_principales', bogotá: 'ciudades_principales',
    medellin: 'ciudades_principales', medellín: 'ciudades_principales', cali: 'ciudades_principales',
    cartagena: 'ciudades_principales', barranquilla: 'ciudades_principales', santa: 'ciudades_principales',
    marta: 'ciudades_principales', pereira: 'ciudades_principales', manizales: 'ciudades_principales',
    bucaramanga: 'ciudades_principales', villavicencio: 'ciudades_principales', destino: 'ciudades_principales',
    
    // Categoría actividades
    actividad: 'actividades', actividades: 'actividades', hacer: 'actividades',
    diversion: 'actividades', diversión: 'actividades', juego: 'actividades',
    entretenimiento: 'actividades', ocio: 'actividades', excursión: 'actividades',
    excursion: 'actividades', tour: 'actividades', paseo: 'actividades', senderismo: 'actividades',
    hiking: 'actividades', caminata: 'actividades', kayak: 'actividades', barco: 'actividades',
    
    // Categoría eventos
    evento: 'eventos', eventos: 'eventos', festival: 'eventos', feria: 'eventos',
    exposicion: 'eventos', exposición: 'eventos', concurso: 'eventos', muestra: 'eventos',
    exhibicion: 'eventos', exhibición: 'eventos', celebracion: 'eventos', celebración: 'eventos',
    
    // Categoría internacional
    internacional: 'internacional', extranjero: 'internacional', europa: 'internacional',
    usa: 'internacional', estados: 'internacional', unidos: 'internacional', paises: 'internacional',
    países: 'internacional', exterior: 'internacional', fuera: 'internacional', otro: 'internacional',
    otros: 'internacional', canada: 'internacional', canadá: 'internacional', mexico: 'internacional',
    méxico: 'internacional', peru: 'internacional', perú: 'internacional', ecuador: 'internacional',
    brasil: 'internacional', argentina: 'internacional', venezuela: 'internacional', panama: 'internacional',
    panamá: 'internacional',
    
    // Categoría emergencias
    emergencia: 'emergencias', emergencias: 'emergencias', urgencia: 'emergencias',
    // Categoría emergencias (continued)
    urgencia: 'emergencias', accidente: 'emergencias', herida: 'emergencias',
    ayuda: 'emergencias', ambulancia: 'emergencias', hospital: 'emergencias', 
    problema: 'emergencias', peligro: 'emergencias', socorro: 'emergencias',
    
    // Categoría alergias
    alergia: 'alergias', alergias: 'alergias', reacción: 'alergias', 
    reaccion: 'alergias', sensibilidad: 'alergias', intolerancia: 'alergias',
    sintoma: 'alergias', síntoma: 'alergias', picazón: 'alergias', picazon: 'alergias',
    
    // Categoría seguros
    seguro: 'seguros', seguros: 'seguros', cobertura: 'seguros', póliza: 'seguros',
    poliza: 'seguros', aseguradora: 'seguros', protección: 'seguros', proteccion: 'seguros',
    asistencia: 'seguros', beneficio: 'seguros'
  };

  const handleSendMessage = () => {
    if (chatInput.trim() === '') return;

    // Agregar mensaje del usuario al chat
    setChatMessages([...chatMessages, { isBot: false, text: chatInput }]);

    // Procesar respuesta
    processUserInput(chatInput);

    // Limpiar el input
    setChatInput('');
  };

  const processUserInput = (input) => {
    // Normalizar el texto del usuario
    const normalizedInput = normalizeText(input);
    
    // Detectar categorías en el input del usuario
    const detectedCategories = new Set();
    
    // Recorrer el mapa de categorías para detectar coincidencias
    Object.keys(categoryMap).forEach(keyword => {
      if (normalizedInput.includes(keyword)) {
        detectedCategories.add(categoryMap[keyword]);
      }
    });
    
    // Si no se detectaron categorías específicas pero hay palabras clave generales
    if (detectedCategories.size === 0) {
      if (normalizedInput.includes('viajar') || 
          normalizedInput.includes('viaje') || 
          normalizedInput.includes('turismo') ||
          normalizedInput.includes('vacaciones')) {
        // Proporcionar respuesta general sobre viajes con mascotas
        setTimeout(() => {
          setChatMessages(prevMessages => [
            ...prevMessages,
            {
              isBot: true,
              text: 'Para viajar con mascotas en Colombia, hay varias opciones. ¿Te interesa saber más sobre hoteles pet-friendly, restaurantes, parques, transporte, o tienes alguna pregunta específica?'
            }
          ]);
        }, 1000);
        return;
      }
      
      // Si el usuario saluda o inicia conversación
      if (normalizedInput.includes('hola') || 
          normalizedInput.includes('buenos') || 
          normalizedInput.includes('buenas') ||
          normalizedInput.includes('saludos')) {
        setTimeout(() => {
          setChatMessages(prevMessages => [
            ...prevMessages,
            {
              isBot: true,
              text: '¡Hola! Soy Buddy, tu asistente para viajes pet-friendly en Colombia. Puedo ayudarte con información sobre hoteles, restaurantes, parques, playas, transporte y más para viajar con tu mascota. ¿En qué puedo ayudarte hoy?'
            }
          ]);
        }, 1000);
        return;
      }
      
      // Si ninguna de las anteriores condiciones se cumple
      setTimeout(() => {
        setChatMessages(prevMessages => [
          ...prevMessages,
          {
            isBot: true,
            text: 'No estoy seguro de entender tu consulta. ¿Podrías especificar si necesitas información sobre hoteles pet-friendly, restaurantes, parques, playas, transporte, requisitos o algún otro aspecto de viajar con mascotas en Colombia?'
          }
        ]);
      }, 1000);
      return;
    }
    
    // Convertir el Set a Array para poder trabajar con él
    const categoryArray = Array.from(detectedCategories);
    
    // Procesar cada categoría detectada y enviar respuestas
    categoryArray.forEach((category, index) => {
      setTimeout(() => {
        // Si la categoría existe en nuestros datos
        if (petTravelColombia[category]) {
          // Si es la categoría de ciudades principales, dar respuesta específica
          if (category === 'ciudades_principales') {
            // Buscar si se menciona alguna ciudad específica
            const ciudades = petTravelColombia.ciudades_principales.map(c => c.ciudad.toLowerCase());
            let ciudadMencionada = null;
            
            for (const ciudad of ciudades) {
              if (normalizedInput.includes(normalizeText(ciudad))) {
                ciudadMencionada = petTravelColombia.ciudades_principales.find(
                  c => normalizeText(c.ciudad) === normalizeText(ciudad)
                );
                break;
              }
            }
            
            if (ciudadMencionada) {
              // Respuesta específica para la ciudad mencionada
              setChatMessages(prevMessages => [
                ...prevMessages,
                {
                  isBot: true,
                  text: `En ${ciudadMencionada.ciudad}, los lugares destacados pet-friendly son:\n\n${ciudadMencionada.destacados.map(d => '• ' + d).join('\n')}\n\n¿Te gustaría información más detallada sobre alguno de estos lugares?`
                }
              ]);
            } else {
              // Respuesta general sobre ciudades
              setChatMessages(prevMessages => [
                ...prevMessages,
                {
                  isBot: true,
                  text: 'Colombia tiene varias ciudades pet-friendly. Las principales son Bogotá, Medellín, Cali, Cartagena y Barranquilla. ¿Sobre cuál te gustaría recibir información específica?'
                }
              ]);
            }
          } else {
            // Para otras categorías, seleccionar aleatoriamente 2 recomendaciones
            const randomSelection = [...petTravelColombia[category]].sort(() => 0.5 - Math.random()).slice(0, 2);
            
            let responseText = `Aquí tienes algunas recomendaciones de ${category.replace('_', ' ')} pet-friendly:\n\n`;
            
            randomSelection.forEach(item => {
              responseText += `• ${item.text}\n`;
            });
            
            responseText += `\n¿Te gustaría más información sobre ${category.replace('_', ' ')} pet-friendly?`;
            
            setChatMessages(prevMessages => [
              ...prevMessages,
              {
                isBot: true,
                text: responseText,
                image: randomSelection[0].image && randomSelection[0].image.startsWith('http') ? randomSelection[0].image : null,
                link: randomSelection[0].link || null
              }
            ]);
          }
        } else {
          // Si la categoría no existe en nuestros datos
          setChatMessages(prevMessages => [
            ...prevMessages,
            {
              isBot: true,
              text: `Parece que buscas información sobre ${category.replace('_', ' ')} pet-friendly, pero no tengo datos específicos sobre eso. ¿Puedo ayudarte con información sobre hoteles, restaurantes, parques, playas, transporte o requisitos para viajar con mascotas en Colombia?`
            }
          ]);
        }
      }, 1000 * (index + 1)); // Añadir retraso para que las respuestas aparezcan secuencialmente
    });
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white rounded-lg shadow p-4">
      <div className="flex items-center border-b pb-2 mb-4">
        <MessageSquare className="h-6 w-6 mr-2 text-teal-500" />
        <h1 className="text-lg font-semibold text-gray-800">Chat Pet-Friendly</h1>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {chatMessages.map((msg, index) => (
          <ChatMessage key={index} msg={msg} primaryColor={primaryColor} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center border rounded-lg overflow-hidden">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Pregunta sobre viajes pet-friendly..."
          className="flex-1 px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className={`${primaryColor} text-white p-2 rounded-r`}
          aria-label="Enviar mensaje"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default PetFriendlyChatbot;