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

  const petTravelKnowledge = {
    hotel: [
      {
        text: 'Muchas cadenas como Kimpton Hotels, La Quinta y Best Western aceptan mascotas. Busca hoteles con "pet-friendly" en sus filtros de búsqueda.',
        image: 'URL_de_la_imagen_de_hotel',
        link: 'URL_de_la_informacion_de_hotel',
      },
      {
        text: 'Airbnb tiene un filtro específico para alojamientos que aceptan mascotas. Asegúrate de leer las reseñas para ver si otros viajeros tuvieron buenas experiencias.',
        link: 'URL_de_airbnb',
      },
      {
        text: 'En Europa, ciudades como Amsterdam, Berlín y Viena tienen muchos hoteles pet-friendly. Busca hoteles con jardines o parques cercanos para que tu mascota pueda pasear.',
        image: 'URL_de_la_imagen_de_europa',
      },
      // ... más información sobre hoteles
    ],
    restaurante: [
      {
        text: 'En París, muchos cafés permiten mascotas en las terrazas exteriores. Busca restaurantes con patios o terrazas.',
        image: 'URL_de_la_imagen_de_paris',
      },
      {
        text: 'Barcelona tiene varios restaurantes con áreas designadas para mascotas. Busca restaurantes con "pet-friendly" en sus filtros de búsqueda.',
        link: 'URL_de_restaurantes_en_barcelona',
      },
      // ... más información sobre restaurantes
    ],
    parque: [
      {
        text: 'Central Park en Nueva York tiene áreas designadas donde los perros pueden estar sin correa en ciertos horarios. Busca parques con áreas cercadas para perros.',
        image: 'URL_de_la_imagen_de_central_park',
      },
      {
        text: 'El Tiergarten en Berlín es un gran parque en el centro de la ciudad donde puedes pasear con tu mascota. Busca parques con senderos para caminar y áreas verdes.',
        link: 'URL_de_tiergarten',
      },
      // ... más información sobre parques
    ],
    playa: [
      {
        text: 'En Barcelona, la Playa de Llevant es una playa para perros popular. Busca playas con áreas designadas para mascotas.',
        image: 'URL_de_la_imagen_de_playa_barcelona',
        link: 'URL_de_playas_para_perros_barcelona',
      },
      {
        text: 'En Italia, Bau Beach en Maccarese es completamente para perros. Busca playas con servicios para mascotas, como duchas y bebederos.',
        image: 'URL_de_la_imagen_de_bau_beach',
        link: 'URL_de_bau_beach',
      },
      // ... más información sobre playas
    ],
    transporte: [
      {
        text: 'La mayoría de las aerolíneas permiten mascotas pequeñas en cabina y mascotas más grandes en bodega con restricciones. Consulta las políticas de la aerolínea antes de reservar.',
        image: 'URL_de_la_imagen_de_avion',
        link: 'URL_de_informacion_de_aerolineas',
      },
      {
        text: 'Los trenes europeos generalmente permiten mascotas pequeñas, a veces con un boleto adicional. Busca trenes con compartimentos para mascotas.',
        image: 'URL_de_la_imagen_de_tren',
        link: 'URL_de_informacion_de_trenes_europa',
      },
      // ... más información sobre transporte
    ],
    documentos: [
      {
        text: 'Para viajes internacionales, se necesita un certificado de salud veterinario y certificados de vacunación (especialmente rabia). Consulta los requisitos específicos del país antes de viajar.',
        image: 'URL_de_la_imagen_de_documentos',
        link: 'URL_de_informacion_de_documentos_viaje',
      },
      {
        text: 'La Unión Europea requiere un pasaporte para mascotas para viajar entre países miembros. Infórmate sobre los requisitos específicos de cada país.',
        image: 'URL_de_la_imagen_de_pasaporte_mascota',
        link: 'URL_de_pasaporte_mascota_europa',
      },
      // ... más información sobre documentos
    ],
    consejos: [
      {
        text: 'Visita al veterinario antes del viaje para asegurarte de que tu mascota esté en buenas condiciones. Lleva contigo su historial médico y certificados de vacunación.',
        image: 'URL_de_la_imagen_de_veterinario',
      },
      {
        text: 'Lleva siempre agua fresca y comida para tu mascota, especialmente en viajes largos. Haz paradas frecuentes para que pueda estirar las piernas y hacer sus necesidades.',
        image: 'URL_de_la_imagen_de_comida_para_mascotas',
      },
      // ... más consejos
    ],
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let response = {
      isBot: true,
      text: 'Lo siento, no tengo información específica sobre eso. ¿Puedes preguntarme sobre hoteles, restaurantes, parques, playas, transporte, documentos o consejos para viajar con mascotas?',
    };

    // Reconocimiento de palabras clave y patrones
    if (input.includes('hotel') || input.includes('alojamiento') || input.includes('hospedaje')) {
      const categoryInfo = petTravelKnowledge.hotel;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre hoteles?` };
    } else if (input.includes('restaurante') || input.includes('comida') || input.includes('comer')) {
      const categoryInfo = petTravelKnowledge.restaurante;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre restaurantes?` };
    } else if (input.includes('parque') || input.includes('pasear') || input.includes('caminar')) {
      const categoryInfo = petTravelKnowledge.parque;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre parques?` };
    } else if (input.includes('playa') || input.includes('mar') || input.includes('arena')) {
      const categoryInfo = petTravelKnowledge.playa;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre playas?` };
    } else if (input.includes('transporte') || input.includes('viajar') || input.includes('avión') || input.includes('tren') || input.includes('metro')) {
      const categoryInfo = petTravelKnowledge.transporte;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre transporte?` };
    } else if (input.includes('documentos') || input.includes('papeles') || input.includes('requisitos')) {
      const categoryInfo = petTravelKnowledge.documentos;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas información más específica sobre documentos?` };
    } else if (input.includes('consejos') || input.includes('recomendaciones') || input.includes('tips')) {
      const categoryInfo = petTravelKnowledge.consejos;
      const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
      response = { ...randomInfo, isBot: true, text: `${randomInfo.text}\n\n¿Necesitas más consejos para viajar con tu mascota?` };
    }

    return response;
  };

  const suggestionQuestions = [
    '¿Dónde puedo encontrar hoteles pet-friendly en Europa?',
    '¿Qué documentos necesita mi mascota para viajar internacionalmente?',
    '¿Cuáles son los mejores restaurantes para ir con mi perro en Barcelona?',
    '¿Qué parques en Nueva York permiten perros sin correa?',
    '¿Cómo puedo viajar en avión con mi gato?',
    '¿Qué consejos me das para viajar con mi mascota en coche?',
    '¿Dónde puedo encontrar playas para perros en España?',
    '¿Qué requisitos necesito para viajar con mi mascota a Japón?',
    '¿Qué restaurantes de paris son los mas recomendados para ir con mi mascota?',
    '¿Existen lugares para viajar a suramerica con mi mascota?'
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