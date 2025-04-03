import React, { useState } from 'react';
import { Plane, Bus, Train, Car, Ship, ChevronDown, PawPrint, Info, Award, AlertTriangle, MapPin, Search } from 'lucide-react';

const NormativasMascotasColombia = () => {
  const [activeTab, setActiveTab] = useState('aereo');
  const [activeAccordion, setActiveAccordion] = useState('');

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  // Colores principales modernizados
  const mainColor = '#00baa8'; // Cyan-600
  const accentColor = '#00baa8'; // Sky-700

  const transportModes = [
    { id: 'aereo', name: 'Aéreo', icon: <Plane className="w-5 h-5" /> },
    { id: 'terrestre', name: 'Terrestre', icon: <Bus className="w-5 h-5" /> },
    { id: 'ferroviario', name: 'Ferroviario', icon: <Train className="w-5 h-5" /> },
    { id: 'particular', name: 'Particular', icon: <Car className="w-5 h-5" /> },
    { id: 'maritimo', name: 'Marítimo', icon: <Ship className="w-5 h-5" /> },
  ];

  const accordionData = {
    aereo: [
      {
        id: 'aereo-requisitos',
        title: 'Requisitos generales',
        content: (
          <div>
            <p className="mb-2">Para viajar con mascotas en avión dentro de Colombia, debes considerar:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Certificado de vacunación vigente (especialmente la antirrábica para perros y gatos)</li>
              <li>Certificado de salud expedido por un veterinario con no más de 5 días de anterioridad</li>
              <li>Guacal o contenedor adecuado que cumpla con las regulaciones de la aerolínea</li>
              <li>Reserva anticipada, ya que hay cupos limitados para mascotas por vuelo</li>
            </ul>
          </div>
        )
      },
      {
        id: 'aereo-cabina',
        title: 'Mascotas en cabina',
        content: (
          <div>
            <p className="mb-2">Para llevar a tu mascota en cabina:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Peso máximo (mascota + guacal): generalmente 8-10 kg según la aerolínea</li>
              <li>El guacal debe caber debajo del asiento frente a ti</li>
              <li>La mascota debe permanecer dentro del guacal durante todo el vuelo</li>
              <li>Costo adicional: entre $50,000 y $150,000 COP dependiendo de la aerolínea y ruta</li>
            </ul>
          </div>
        )
      },
      {
        id: 'aereo-bodega',
        title: 'Mascotas en bodega',
        content: (
          <div>
            <p className="mb-2">Para mascotas que viajan en bodega:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Guacal rígido con ventilación adecuada</li>
              <li>Tamaño del guacal: la mascota debe poder pararse, girar y acostarse cómodamente</li>
              <li>Recipientes para agua y comida fijados a la puerta del guacal</li>
              <li>Restricciones en temporadas de calor extremo o frío</li>
              <li>Costo: entre $100,000 y $250,000 COP según peso y aerolínea</li>
            </ul>
          </div>
        )
      },
      {
        id: 'aereo-aerolineas',
        title: 'Políticas por aerolíneas',
        content: (
          <div>
            <p className="font-medium mb-2">Avianca:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Mascotas hasta 8 kg pueden viajar en cabina</li>
              <li>Para mascotas más grandes, deben viajar en bodega</li>
              <li>Se debe reservar el servicio con mínimo 24 horas de anticipación</li>
            </ul>
            
            <p className="font-medium mb-2">LATAM:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Mascotas hasta 7 kg (incluido el contenedor) pueden viajar en cabina</li>
              <li>Máximo una mascota por pasajero</li>
              <li>Reserva con mínimo 48 horas de anticipación</li>
            </ul>
            
            <p className="font-medium mb-2">Viva Air / Viva Colombia:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Solo permite mascotas en cabina hasta 10 kg (mascota + guacal)</li>
              <li>No ofrece servicio de transporte de mascotas en bodega</li>
              <li>Se recomienda reservar con anticipación por cupos limitados</li>
            </ul>
          </div>
        )
      }
    ],
    terrestre: [
      {
        id: 'terrestre-normativa',
        title: 'Normativa general',
        content: (
          <div>
            <p className="mb-2">Para viajar con mascotas en buses intermunicipales en Colombia:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Las políticas varían según la empresa transportadora</li>
              <li>La mayoría de empresas permiten mascotas pequeñas en guacal bajo el asiento</li>
              <li>Algunas empresas transportan mascotas en compartimentos especiales</li>
              <li>Es obligatorio presentar carné de vacunación vigente</li>
            </ul>
          </div>
        )
      },
      {
        id: 'terrestre-empresas',
        title: 'Empresas transportadoras',
        content: (
          <div>
            <p className="mb-2">Políticas de las principales empresas:</p>
            
            <p className="font-medium mb-2">Bolivariano / Expreso Palmira:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Permiten mascotas pequeñas en guacal que quepa bajo el asiento</li>
              <li>Tarifa adicional aproximada: $20,000 - $40,000 COP</li>
            </ul>
            
            <p className="font-medium mb-2">Copetran:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Mascotas pequeñas en guacal en la zona de equipaje especial</li>
              <li>Reserva anticipada obligatoria</li>
            </ul>
            
            <p className="font-medium mb-2">Rápido Ochoa / Flota Magdalena:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Políticas restrictivas, consultar directamente con la empresa</li>
              <li>Generalmente solo permiten mascotas pequeñas con guacal</li>
            </ul>
          </div>
        )
      },
      {
        id: 'terrestre-requisitos',
        title: 'Requisitos y recomendaciones',
        content: (
          <div>
            <p className="mb-2">Para un viaje terrestre con tu mascota:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Lleva el carné de vacunación vigente</li>
              <li>Guacal cómodo y resistente de tamaño adecuado</li>
              <li>Lleva agua y alimento para el viaje</li>
              <li>Realiza paradas cada 2-3 horas si es posible</li>
              <li>Consulta y reserva con la empresa de transporte con mínimo 24 horas de anticipación</li>
              <li>Lleva toallas o paños húmedos para limpiar posibles accidentes</li>
            </ul>
          </div>
        )
      }
    ],
    ferroviario: [
      {
        id: 'ferroviario-info',
        title: 'Información general',
        content: (
          <div>
            <p className="mb-2">El sistema ferroviario de pasajeros en Colombia es limitado. En el servicio turístico Tren de la Sabana:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Se permite el ingreso de mascotas pequeñas en guacal</li>
              <li>La mascota debe permanecer en el guacal durante todo el recorrido</li>
              <li>Es necesario presentar carné de vacunación</li>
              <li>Se recomienda verificar directamente con el operador las políticas actuales</li>
            </ul>
          </div>
        )
      }
    ],
    particular: [
      {
        id: 'particular-normativa',
        title: 'Normativa legal',
        content: (
          <div>
            <p className="mb-2">Para transportar mascotas en vehículos particulares:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Según el Código Nacional de Tránsito, las mascotas deben viajar de manera segura sin interferir con la conducción</li>
              <li>Se recomienda utilizar arneses de seguridad, transportines o barreras divisorias</li>
              <li>Las mascotas no deben viajar en el asiento delantero</li>
              <li>No deben ir con la cabeza fuera de la ventana por riesgo de accidentes</li>
            </ul>
          </div>
        )
      },
      {
        id: 'particular-recomendaciones',
        title: 'Recomendaciones de seguridad',
        content: (
          <div>
            <p className="mb-2">Para viajes seguros en carro:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Utiliza arnés de seguridad con enganche al cinturón del carro</li>
              <li>Transportín o guacal asegurado con el cinturón de seguridad</li>
              <li>Barrera divisoria para la zona de carga en camionetas</li>
              <li>Nunca dejes a tu mascota sola dentro del vehículo, especialmente con altas temperaturas</li>
              <li>Realiza paradas cada 2 horas para que tu mascota pueda estirar las patas, beber agua y hacer sus necesidades</li>
            </ul>
          </div>
        )
      },
      {
        id: 'particular-documentos',
        title: 'Documentos necesarios',
        content: (
          <div>
            <p className="mb-2">Para viajes intermunicipales o largos trayectos:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Carné de vacunación al día</li>
              <li>Microchip o collar con identificación</li>
              <li>Para viajes a zonas fronterizas, consulta requisitos adicionales</li>
              <li>Certificado de salud expedido por veterinario (recomendado para viajes largos)</li>
            </ul>
          </div>
        )
      }
    ],
    maritimo: [
      {
        id: 'maritimo-fluvial',
        title: 'Transporte fluvial',
        content: (
          <div>
            <p className="mb-2">Para servicios fluviales en Colombia (ríos Magdalena, Amazonas, etc.):</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Las políticas varían según el operador del servicio</li>
              <li>En general, se permiten mascotas pequeñas en transportines</li>
              <li>Para embarcaciones grandes, consulta espacios designados para mascotas</li>
              <li>Se recomienda contactar directamente al operador antes de comprar los boletos</li>
            </ul>
          </div>
        )
      },
      {
        id: 'maritimo-cruceros',
        title: 'Cruceros y catamaranes',
        content: (
          <div>
            <p className="mb-2">Para servicios turísticos en Cartagena, Santa Marta y San Andrés:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>La mayoría de cruceros y catamaranes turísticos no permiten mascotas</li>
              <li>Excepción para perros de asistencia o servicio con documentación apropiada</li>
              <li>Para servicios privados, consulta directamente con el operador las políticas específicas</li>
            </ul>
          </div>
        )
      }
    ],
  };

  // Preguntas frecuentes
  const faqs = [
    {
      id: 'faq-1',
      question: '¿Qué vacunas debe tener mi mascota para viajar dentro de Colombia?',
      answer: 'Para perros y gatos, es obligatorio tener la vacuna antirrábica vigente. Adicionalmente, para perros se recomienda tener el esquema completo que incluye: parvovirus, distemper, hepatitis, leptospirosis y parainfluenza. Para gatos: panleucopenia, calicivirus y rinotraqueitis. Todas las vacunas deben estar registradas en el carné de vacunación firmado por un médico veterinario.'
    },
    {
      id: 'faq-2',
      question: '¿Necesito algún permiso especial para viajar con mi mascota entre ciudades?',
      answer: 'Para viajes dentro de Colombia no se requiere un permiso especial, pero sí es obligatorio llevar el carné de vacunación vigente. Para algunas zonas con controles sanitarios específicos (como San Andrés), puede requerirse un certificado de salud reciente expedido por un veterinario.'
    },
    {
      id: 'faq-3',
      question: '¿Los perros de asistencia tienen regulaciones diferentes?',
      answer: 'Sí. Según la legislación colombiana, los perros de asistencia o de servicio tienen acceso permitido a todos los medios de transporte sin restricciones adicionales. Se debe presentar la documentación que acredite que es un perro de asistencia y debe llevar el chaleco o arnés identificativo. No aplican tarifas adicionales para estos animales.'
    },
    {
      id: 'faq-4',
      question: '¿Cuáles son las razas de perros que tienen restricciones para viajar?',
      answer: 'Las razas consideradas potencialmente peligrosas según la legislación colombiana (Pit Bull Terrier, American Staffordshire Terrier, Bullmastiff, Dóberman, Rottweiler, entre otros) tienen restricciones adicionales. En transporte público deben usar bozal y estar con correa en todo momento. Algunas aerolíneas pueden tener restricciones adicionales o negarse a transportar estas razas.'
    },
    {
      id: 'faq-5',
      question: '¿Qué debo hacer si mi mascota necesita medicación durante el viaje?',
      answer: 'Lleva contigo una copia de la prescripción veterinaria y las medicinas en su envase original. Para viajes largos, consulta con tu veterinario sobre la administración durante el trayecto. No se recomienda sedar a las mascotas para viajar sin supervisión veterinaria, ya que puede ser peligroso especialmente en aviones.'
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredFaqs(faqs);
    } else {
      const filtered = faqs.filter(
        faq => 
          faq.question.toLowerCase().includes(term) || 
          faq.answer.toLowerCase().includes(term)
      );
      setFilteredFaqs(filtered);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 font-sans bg-gray-50">
      {/* Header - Diseño más moderno y minimalista */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl p-8 mb-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Viajar con Mascotas en Colombia
            </h1>
            <p className="text-white text-lg opacity-90 max-w-2xl">
              Guía completa con normativas y requisitos para todos los medios de transporte
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center bg-white/20 p-4 rounded-full">
            <PawPrint className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>

      {/* Intro - Diseño más limpio */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border-l-4 border-cyan-600">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-700 flex items-center">
          <Info className="w-6 h-6 mr-2" />
          Información General
        </h2>
        <p className="text-gray-700 mb-5 leading-relaxed">
          Viajar con mascotas en Colombia requiere preparación y conocimiento de las normativas específicas según el medio de transporte. Cada compañía puede tener políticas diferentes, por lo que siempre es recomendable verificar con antelación.
        </p>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-600 mr-3 mt-1 flex-shrink-0" />
            <p className="text-amber-800 text-sm">
              <span className="font-medium">Importante:</span> Recuerda que estas normativas pueden cambiar. Te recomendamos confirmar directamente con la empresa de transporte antes de tu viaje.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs for transport modes - Diseño más moderno */}
      <div className="mb-8">
        <div className="flex overflow-x-auto pb-3 space-x-2 md:space-x-3 scrollbar-hide">
          {transportModes.map((mode) => (
            <button
              key={mode.id}
              className={`flex items-center px-5 py-3 rounded-lg transition-all duration-200 font-medium whitespace-nowrap ${
                activeTab === mode.id 
                  ? 'bg-cyan-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              onClick={() => setActiveTab(mode.id)}
            >
              <span className={`mr-2 ${activeTab === mode.id ? 'text-white' : 'text-cyan-600'}`}>{mode.icon}</span>
              {mode.name}
            </button>
          ))}
        </div>

        {/* Content for the active tab - Diseño más elegante */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          {accordionData[activeTab] && accordionData[activeTab].map((item) => (
            <div key={item.id} className="mb-4 border border-gray-200 rounded-lg overflow-hidden last:mb-0">
              <button
                className="w-full p-4 text-left font-medium flex justify-between items-center transition-colors"
                style={{
                  backgroundColor: activeAccordion === item.id ? 'rgba(8, 145, 178, 0.05)' : 'white', 
                  color: mainColor
                }}
                onClick={() => toggleAccordion(item.id)}
              >
                <span className="text-lg">{item.title}</span>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform duration-200 ${activeAccordion === item.id ? 'transform rotate-180' : ''}`} 
                />
              </button>
              {activeAccordion === item.id && (
                <div className="p-5 bg-white border-t border-gray-100">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Preguntas Frecuentes - Diseño mejorado */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold mb-5 text-cyan-700 flex items-center">
          <Award className="w-6 h-6 mr-2" />
          Preguntas Frecuentes
        </h2>

        {/* Search - Diseño más limpio */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
            placeholder="Buscar en preguntas frecuentes..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No se encontraron resultados para "{searchTerm}"
          </div>
        ) : (
          <div className="space-y-5">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="border-b border-gray-100 pb-5 last:border-0">
                <h3 
                  className="font-medium text-lg mb-3 cursor-pointer hover:text-cyan-600 transition-colors flex items-start"
                  onClick={() => toggleAccordion(faq.id)}
                >
                  <span className="text-cyan-600 mr-2">Q.</span>
                  {faq.question}
                </h3>
                {(activeAccordion === faq.id || searchTerm) && (
                  <div className="pl-6 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer - Diseño más profesional */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Contacto y Recursos
            </h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center">
                <span className="w-40">Ministerio de Transporte:</span>
                <span className="text-cyan-300">mintransporte.gov.co</span>
              </li>
              <li className="flex items-center">
                <span className="w-40">Aeronáutica Civil:</span>
                <span className="text-cyan-300">aerocivil.gov.co</span>
              </li>
              <li className="flex items-center">
                <span className="w-40">ICA (certificados):</span>
                <span className="text-cyan-300">ica.gov.co</span>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm mb-2">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Actualizado: Marzo 2025
            </div>
            <p className="text-gray-400 text-sm">
              Verifica siempre la información más reciente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormativasMascotasColombia;