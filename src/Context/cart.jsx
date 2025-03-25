import React, { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

// Función para limpiar y convertir precios
const cleanPrice = (price) => {
  if (typeof price === 'number') return price;
  
  // Eliminar símbolo de $ y puntos de separación de miles
  const cleanedPrice = price.replace('$', '').replace(/\./g, '').trim();
  
  // Convertir a número, reemplazando la coma decimal con punto
  return parseFloat(cleanedPrice.replace(',', '.'));
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error al recuperar el carrito de localStorage:', error);
      return [];
    }
  });

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }, [cart]);

  const addToCart = (item) => {
    // Validar si ya existe un paquete completo
    const hasPackage = cart.some(cartItem => cartItem.type === 'package');
    if (hasPackage) {
      console.warn('Ya existe un paquete completo en el carrito. No se pueden agregar más items.');
      return false;
    }

    // Reglas para agregar diferentes tipos de productos
    switch (item.type) {
      case 'package':
        // Si se agrega un paquete, no debe haber otros items
        if (cart.length > 0) {
          console.warn('No se puede agregar un paquete si hay otros items en el carrito.');
          return false;
        }
        break;

      case 'flight':
        // Verificar si ya hay un vuelo
        const hasFlights = cart.some(cartItem => cartItem.type === 'flight');
        if (hasFlights) {
          console.warn('Ya existe un vuelo en el carrito.');
          return false;
        }
        break;

      case 'hotel':
        // Verificar validez del hotel
        if (!validateHotelItem(item)) {
          return false;
        }
        break;

      default:
        console.error('Tipo de item no válido');
        return false;
    }

    // Calcular precio y noches para hoteles
    const processedItem = item.type === 'hotel' 
      ? processHotelItem(item) 
      : { ...item, price: item.price || 0 };

    // Agregar al carrito
    setCart(prevCart => [...prevCart, processedItem]);
    return true;
  };

  // Procesar item de hotel con cálculos de noches y precio
  const processHotelItem = (item) => {
    const nights = item.startDate && item.endDate 
      ? Math.ceil((new Date(item.endDate) - new Date(item.startDate)) / (1000 * 60 * 60 * 24)) 
      : 1;
    
    // Limpiar y calcular precio por noche
    const pricePerNight = cleanPrice(item.precioNoche);
    const price = nights * pricePerNight;

    // Manejar cargo adicional por mascota si existe
    const petSurcharge = item.cargoAdicionalMascota 
      ? cleanPrice(item.cargoAdicionalMascota) * (item.pets || 0)
      : 0;

    return {
      ...item,
      id: item.id || `hotel-${Date.now()}`,
      type: 'hotel',
      nights,
      pricePerNight,
      price: price + petSurcharge,
      startDate: item.startDate,
      endDate: item.endDate
    };
  };

  // Validación específica para hoteles
  const validateHotelItem = (item) => {
    if (item.type !== 'hotel') {
      console.error('El item debe ser un hotel');
      return false;
    }

    if (!item.startDate || !item.endDate) {
      console.error('El hotel debe tener fechas de inicio y fin');
      return false;
    }

    if (new Date(item.startDate) >= new Date(item.endDate)) {
      console.error('La fecha de inicio debe ser antes de la fecha de fin');
      return false;
    }

    if (!item.name) {
      console.error('El hotel debe tener un nombre');
      return false;
    }

    if (!item.precioNoche || cleanPrice(item.precioNoche) <= 0) {
      console.error('El hotel debe tener un precio de noche válido');
      return false;
    }

    return true;
  };

  // Función para eliminar item del carrito
  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Función para calcular precio total
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price || 0), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};