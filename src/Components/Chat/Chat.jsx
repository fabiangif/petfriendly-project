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
    ]
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let response = {
      isBot: true,
      text: 'Lo siento, no tengo información específica sobre eso. ¿Puedes preguntarme sobre hoteles, restaurantes, parques, playas, transporte, documentos o consejos para viajar con mascotas?',
    };

    // Reconocimiento de palabras clave y patrones con mejor manejo de transporte
    if (input.includes('hotel') || input.includes('alojamiento') || input.includes('hospedaje')) {
      const categoryInfo = petTravelColombia.hotel;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre hoteles?` };
    } else if (input.includes('restaurante') || input.includes('comida') || input.includes('comer')) {
      const categoryInfo = petTravelColombia.restaurante;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre restaurantes?` };
    } else if (input.includes('parque') || input.includes('pasear') || input.includes('caminar')) {
      const categoryInfo = petTravelColombia.parque;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre parques?` };
    } else if (input.includes('playa') || input.includes('mar') || input.includes('arena')) {
      const categoryInfo = petTravelColombia.playa;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre playas?` };
    } 
    // Separar los diferentes tipos de transporte
    else if (input.includes('avión') || input.includes('aerolínea') || input.includes('aéreo') || input.includes('vuelo') || input.includes('volar')) {
      const categoryInfo = petTravelColombia.avion;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre viajar en avión con tu mascota?` };
    } else if (input.includes('coche') || input.includes('auto') || input.includes('carro') || input.includes('automóvil') || input.includes('conducir')) {
      const categoryInfo = petTravelColombia.coche;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre viajar en coche con tu mascota?` };
    } else if (input.includes('taxi') || input.includes('bus') || input.includes('transmilenio') || input.includes('metro') || input.includes('transporte público')) {
      const categoryInfo = petTravelColombia.transporte_publico;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre transporte público?` };
    } 
    // Categoría genérica de transporte (solo si no especifica el tipo)
    else if (input.includes('transporte') || input.includes('viajar')) {
      // Damos una respuesta más general sobre transporte
      response = { 
        isBot: true, 
        text: `Hay varias opciones para viajar con tu mascota en Colombia. Puedes preguntar específicamente por:\n\n- Viajar en avión\n- Viajar en coche\n- Usar transporte público (taxis, buses, TransMilenio)\n\n¿Sobre cuál tipo de transporte te gustaría saber más?` 
      };
    } else if (input.includes('documentos') || input.includes('papeles') || input.includes('requisitos')) {
      const categoryInfo = petTravelColombia.documentos;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre documentos?` };
    } else if (input.includes('consejos') || input.includes('recomendaciones') || input.includes('tips')) {
      const categoryInfo = petTravelColombia.consejos;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas más consejos para viajar con tu mascota?` };
    } else if (input.includes('veterinario') || input.includes('vet') || input.includes('médico')) {
      const categoryInfo = petTravelColombia.veterinario;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre veterinarios?` };
    } else if (input.includes('tienda') || input.includes('comprar') || input.includes('accesorios')) {
      const categoryInfo = petTravelColombia.tienda;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre tiendas para mascotas?` };
    } else if (input.includes('ciudad') || input.includes('destino')) {
      const randomCity = petTravelColombia.ciudades_principales[Math.floor(Math.random() * petTravelColombia.ciudades_principales.length)];
      response = { isBot: true, text: `En ${randomCity.ciudad} puedes encontrar lugares destacados como: ${randomCity.destacados.join(', ')}.\n\n¿Necesitas información más específica sobre alguna ciudad?` };
    }

    return response;
  };

  const suggestionQuestions = [
    '¿Dónde puedo encontrar hoteles pet-friendly en Colombia?',
    '¿Qué documentos necesita mi mascota para viajar internacionalmente?',
    '¿Cuáles son los mejores restaurantes para ir con mi perro en Bogotá?',
    '¿Qué parques en Medellin permiten perros sin correa?',
    '¿Cómo puedo viajar en avión con mi gato?',
    '¿Qué consejos me das para viajar con mi mascota en coche?',
    '¿Dónde puedo encontrar playas para perros en Colombia?',
    '¿Qué requisitos necesito para viajar con mi mascota a Cartagena?',
    '¿Qué restaurantes de paris son los mas recomendados para ir con mi mascota?',
    '¿Existen lugares para viajar a Colombia con mi mascota?'
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { isBot: false, text: chatInput };
    setChatMessages([...chatMessages, userMessage]);

    const botResponse = generateResponse(chatInput);
    setTimeout(() => {
      setChatMessages(currentMessages => [...currentMessages, botResponse]);
    }, 800);

    setChatInput('');
  };

  return (
    <div className="w-full max-w-lg mx-auto text-black">
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
            <ChatMessage key={index} msg={msg} primaryColor={primaryColor} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t flex">
          <input
            type="text"
            placeholder="Escribe tu pregunta aquí..."
            className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button type="submit" className={`${primaryColor} text-white px-4 py-2 rounded-r-lg flex items-center`}>
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>

      <div className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-lg">
        <h3 className="font-medium text-teal-700 mb-2">¿Necesitas ayuda? Prueba preguntar:</h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          {suggestionQuestions.map((question, index) => (
            <div
              key={index}
              onClick={() => {
                setChatInput(question);
                setTimeout(() => handleSendMessage({ preventDefault: () => { } }), 100);
              }}
              className="bg-white border border-teal-200 p-2 rounded-lg cursor-pointer hover:bg-teal-50"
            >
              "{question}"
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetFriendlyChatbot;