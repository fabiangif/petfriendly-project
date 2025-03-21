import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Dog, Send } from 'lucide-react';

const PetFriendlyChatbot = ({ primaryColor = 'bg-teal-500' }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      isBot: true,
      text: "¡Hola! Soy Buddy, tu asistente de viajes pet-friendly. Puedo ayudarte a encontrar lugares para visitar con tu mascota en todo el mundo. ¿En qué puedo ayudarte hoy?"
    }
  ]);
  
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Pet travel knowledge base
  const petTravelKnowledge = {
    'hotel': [
      'Muchas cadenas como Kimpton Hotels, La Quinta y Best Western aceptan mascotas en la mayoría de sus ubicaciones.',
      'Airbnb tiene un filtro específico para alojamientos que aceptan mascotas.',
      'En Europa, ciudades como Amsterdam, Berlín y Viena tienen muchos hoteles pet-friendly.',
      'En playas como Carmel en California y Fort De Soto Park en Florida, hay hoteles que aceptan mascotas cerca de playas donde pueden correr libremente.'
    ],
    'restaurante': [
      'En París, muchos cafés permiten mascotas en las terrazas exteriores.',
      'Barcelona tiene varios restaurantes con áreas designadas para mascotas.',
      'En Estados Unidos, cadenas como Starbucks y muchos restaurantes con patios exteriores suelen permitir mascotas.',
      'En Tokio, existen cafés específicamente diseñados para visitar con mascotas.'
    ],
    'parque': [
      'Central Park en Nueva York tiene áreas designadas donde los perros pueden estar sin correa en ciertos horarios.',
      'El Tiergarten en Berlín es un gran parque en el centro de la ciudad donde puedes pasear con tu mascota.',
      'En Londres, Hyde Park y Regent\'s Park tienen espacios para que los perros corran libremente.',
      'El Parque Ibirapuera en São Paulo permite pasear con mascotas con correa.'
    ],
    'playa': [
      'Playas para perros en Barcelona como la Playa de Llevant.',
      'En Italia, Bau Beach en Maccarese es completamente para perros.',
      'Huntington Dog Beach en California es un paraíso para mascotas.',
      'Koh Samui en Tailandia tiene varias playas que permiten mascotas.'
    ],
    'transporte': [
      'La mayoría de las aerolíneas permiten mascotas pequeñas en cabina y mascotas más grandes en bodega con restricciones.',
      'Los trenes europeos generalmente permiten mascotas pequeñas, a veces con un boleto adicional.',
      'En Japón, puedes llevar mascotas pequeñas en transportadores en la mayoría del transporte público.',
      'En ciudades como Nueva York, las mascotas deben ir en transportadores en el metro.'
    ],
    'documentos': [
      'Para viajes internacionales, se necesita un certificado de salud veterinario y certificados de vacunación (especialmente rabia).',
      'La Unión Europea requiere un pasaporte para mascotas para viajar entre países miembros.',
      'Algunos países tienen períodos de cuarentena, como Australia y Nueva Zelanda.',
      'Verifica siempre los requisitos específicos del país antes de viajar con tu mascota.'
    ]
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Add user message
    const userMessage = { isBot: false, text: chatInput };
    setChatMessages([...chatMessages, userMessage]);
    
    // Get bot response
    const botResponse = generateResponse(chatInput);
    setTimeout(() => {
      setChatMessages(currentMessages => [...currentMessages, botResponse]);
    }, 800);
    
    // Clear input
    setChatInput('');
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let response = "Lo siento, no tengo información específica sobre eso. ¿Puedes preguntarme sobre hoteles, restaurantes, parques, playas, transporte o documentos para viajar con mascotas?";
    
    // Check if input contains any keywords from our knowledge base
    Object.keys(petTravelKnowledge).forEach(category => {
      if (input.includes(category) || 
          (category === 'hotel' && (input.includes('alojamiento') || input.includes('hospedaje'))) ||
          (category === 'playa' && input.includes('mar')) ||
          (category === 'documentos' && (input.includes('papeles') || input.includes('requisitos'))) ||
          (category === 'transporte' && (input.includes('viajar') || input.includes('avión') || input.includes('tren') || input.includes('metro')))) {
        
        // Get random info from this category
        const categoryInfo = petTravelKnowledge[category];
        const randomInfo = categoryInfo[Math.floor(Math.random() * categoryInfo.length)];
        response = randomInfo + "\n\n¿Necesitas información más específica sobre este tema?";
      }
    });
    
    // Handle location-specific questions
    const locations = {
      'europa': 'En Europa, muchos países son muy pet-friendly. En particular, Alemania, Francia e Italia tienen excelentes políticas para mascotas en restaurantes y transporte público. Necesitarás un pasaporte europeo para mascotas para viajar entre países.',
      'estados unidos': 'Estados Unidos tiene muchas ciudades pet-friendly como Portland, San Diego y Austin. Recuerda que los requisitos varían según el estado y la ciudad. Muchos parques nacionales limitan el acceso de mascotas a ciertas áreas.',
      'españa': 'España tiene muchas playas que permiten perros, especialmente en la Costa Brava. Las ciudades como Barcelona y Madrid tienen cada vez más restaurantes y cafés que permiten mascotas.',
      'japón': 'Japón tiene reglas estrictas para mascotas, pero también tiene cafés y parques temáticos específicos para mascotas. El transporte público generalmente requiere que las mascotas vayan en transportadores.',
      'australia': 'Australia tiene requisitos muy estrictos, incluyendo posible cuarentena. Planifica con mucha anticipación si quieres viajar allí con tu mascota.'
    };
    
    Object.keys(locations).forEach(location => {
      if (input.includes(location)) {
        response = locations[location];
      }
    });
    
    // Handle general queries
    if (input.includes('mejores') && input.includes('lugares')) {
      response = "Los mejores lugares del mundo para viajar con mascotas incluyen:\n\n1. Amsterdam, Holanda\n2. Viena, Austria\n3. París, Francia\n4. San Francisco, EE.UU.\n5. Vancouver, Canadá\n6. Tokio, Japón (para cafés de mascotas)\n7. Barcelona, España\n8. Berlín, Alemania";
    }
    
    if (input.includes('consejos') || input.includes('recomendaciones')) {
      response = "Algunos consejos para viajar con mascotas:\n\n1. Visita al veterinario antes del viaje\n2. Lleva siempre agua fresca y comida\n3. Haz paradas frecuentes en viajes largos\n4. Lleva un botiquín de primeros auxilios para mascotas\n5. Investiga veterinarios de emergencia en tu destino\n6. Usa un arnés o transportador seguro\n7. Lleva una foto reciente de tu mascota por si se pierde";
    }
    
    return { isBot: true, text: response };
  };

  const suggestionQuestions = [
    "¿Dónde puedo encontrar playas para perros en Europa?",
    "¿Qué documentos necesita mi mascota para viajar internacionalmente?",
    "Hoteles pet-friendly en Estados Unidos"
  ];

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
            <div 
              key={index} 
              className={`flex ${msg.isBot ? '' : 'justify-end'}`}
            >
              <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                msg.isBot 
                  ? 'bg-gray-100 text-gray-800' 
                  : `${primaryColor} text-white`
              }`}>
                {msg.isBot && (
                  <div className="flex items-center mb-1">
                    <Dog className="h-4 w-4 mr-1 text-teal-500" />
                    <span className="text-xs font-medium text-teal-500">Buddy</span>
                  </div>
                )}
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
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
          <button 
            type="submit"
            className={`${primaryColor} text-white px-4 py-2 rounded-r-lg flex items-center`}
          >
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
                setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100);
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