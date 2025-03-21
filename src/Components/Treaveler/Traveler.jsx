import React, { useState } from 'react';

const PlanesturisticosPetFriendly = () => {
  // Datos de ejemplo de planes turísticos pet-friendly
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
    }
  ];

  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  // Función para mostrar los detalles de un plan
  const mostrarDetallePlan = (id) => {
    setPlanSeleccionado(planesTuristicos.find(plan => plan.id === id));
  };

  // Función para volver a la lista de planes
  const volverALista = () => {
    setPlanSeleccionado(null);
  };

  return (
    <div className="bg-white min-h-screen">

      <main className="container mx-auto p-4">
        {/* Banner */}
        <div className="mb-8 rounded-lg p-8 text-white text-center" style={{ backgroundColor: '#00baa8' }}>
          <h2 className="text-3xl font-bold mb-2">Viaja con tu mejor amigo</h2>
          <p className="text-xl">Descubre los mejores destinos pet-friendly para unas vacaciones inolvidables</p>
        </div>

        {/* Contenido principal */}
        {!planSeleccionado ? (
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#00baa8' }}>Planes Turísticos Pet-Friendly</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {planesTuristicos.map(plan => (
                <div key={plan.id} className="border rounded-lg overflow-hidden shadow-lg">
                  <img src={plan.imagen} alt={plan.destino} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{plan.destino}</h3>
                    <p className="text-gray-600 mb-2">{plan.duracion}</p>
                    <p className="text-lg font-bold mb-3" style={{ color: '#00baa8' }}>{plan.precio}</p>
                    <div className="mb-3">
                      <span className="text-sm bg-gray-100 rounded-full px-3 py-1 mr-2">
                        {plan.mascotasPermitidas.join(', ')}
                      </span>
                      <span className="text-sm bg-gray-100 rounded-full px-3 py-1">
                        Hasta {plan.pesoMaximo}
                      </span>
                    </div>
                    <button 
                      onClick={() => mostrarDetallePlan(plan.id)}
                      className="w-full py-2 text-white rounded-lg hover:bg-teal-700"
                      style={{ backgroundColor: '#00baa8' }}
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <button 
              onClick={volverALista}
              className="mb-4 flex items-center text-sm hover:underline"
              style={{ color: '#00baa8' }}
            >
              ← Volver a todos los planes
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img src={planSeleccionado.imagen} alt={planSeleccionado.destino} className="w-full h-64 object-cover rounded-lg mb-4" />
                <h2 className="text-3xl font-bold mb-2">{planSeleccionado.destino}</h2>
                <p className="text-gray-600 mb-2">{planSeleccionado.duracion}</p>
                <p className="text-2xl font-bold mb-4" style={{ color: '#00baa8' }}>{planSeleccionado.precio}</p>
                
                <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: '#e6f7f6' }}>
                  <h3 className="font-bold mb-2" style={{ color: '#00baa8' }}>Mascotas permitidas:</h3>
                  <p>{planSeleccionado.mascotasPermitidas.join(', ')}</p>
                  <p>Peso máximo: {planSeleccionado.pesoMaximo}</p>
                </div>
                
                <button 
                  className="w-full py-3 text-white rounded-lg text-lg font-bold hover:bg-teal-700 mb-6"
                  style={{ backgroundColor: '#00baa8' }}
                >
                  Reservar ahora
                </button>
              </div>

              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3 border-b pb-2" style={{ color: '#00baa8' }}>Transporte</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-bold mb-1">Vuelo - {planSeleccionado.transporte.vuelo.aerolinea}</h4>
                    <p className="text-sm mb-1">{planSeleccionado.transporte.vuelo.politica}</p>
                    <p className="text-sm font-bold">Costo adicional: {planSeleccionado.transporte.vuelo.costoAdicional}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-1">Transporte local - {planSeleccionado.transporte.terrestre.tipo}</h4>
                    <p className="text-sm mb-1">{planSeleccionado.transporte.terrestre.politica}</p>
                    <p className="text-sm font-bold">Costo adicional: {planSeleccionado.transporte.terrestre.costoAdicional}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3 border-b pb-2" style={{ color: '#00baa8' }}>Hospedaje</h3>
                  <h4 className="font-bold mb-1">{planSeleccionado.hospedaje.nombre} ({'★'.repeat(planSeleccionado.hospedaje.estrellas)})</h4>
                  <ul className="mb-2">
                    {planSeleccionado.hospedaje.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="text-sm flex items-center mb-1">
                        <span className="mr-2">✓</span> {caracteristica}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-bold">Costo adicional: {planSeleccionado.hospedaje.costoAdicional}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 border-b pb-2" style={{ color: '#00baa8' }}>Actividades incluidas</h3>
                  <ul>
                    {planSeleccionado.actividades.map((actividad, index) => (
                      <li key={index} className="mb-2 text-sm flex items-start">
                        <span className="mr-2 mt-1 text-xs" style={{ color: '#00baa8' }}>●</span>
                        {actividad}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PlanesturisticosPetFriendly;