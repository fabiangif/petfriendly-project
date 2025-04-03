import React from 'react';
import { useCart } from '../../Context/cart';
import {
    Hotel,
    Plane,
    Package,
    MapPin,
    CalendarDays,
    DollarSign,
    PawPrint,
    ShoppingCart,
    CheckCircle,
    Trash2,
    X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PurchaseSummary = () => {
    const {
        cart,
        removeFromCart,
        getTotalPrice
    } = useCart();

    // Formateador de precios 
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price || 0);
    };

    // Calcular subtotales y desglose de precios
    const calculatePriceBreakdown = () => {
        const breakdown = {
            subtotal: 0,
            iva: 0,
            total: 0
        };

        cart.forEach(item => {
            const price = item.price || 0;
            breakdown.subtotal += price;
        });

        breakdown.iva = breakdown.subtotal * 0.21;
        breakdown.total = breakdown.subtotal + breakdown.iva;

        return breakdown;
    };

    const renderDetailsColumn = () => {
        return (
            <div className="space-y-4">
                {cart.map(item => {
                    switch (item.type) {
                        case 'hotel':
                            return (
                                <div key={item.id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg p-5 relative group">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                                    >
                                        <X size={18} />
                                    </button>
                                    <div className="flex items-center mb-3">
                                        <div className="bg-emerald-50 p-2 rounded-full mr-3">
                                            <Hotel className="text-emerald-500 w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin className="text-gray-400 mr-2 w-4 h-4 flex-shrink-0" />
                                            <span>{item.location}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CalendarDays className="text-blue-400 mr-2 w-4 h-4 flex-shrink-0" />
                                            <span>{item.nights} noches</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex justify-between text-xs text-gray-500">
                                        <div className="flex items-center">
                                            <CheckCircle className="text-green-400 mr-1 w-3 h-3" />
                                            <span>Check-in: {new Date(item.startDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="text-green-400 mr-1 w-3 h-3" />
                                            <span>Check-out: {new Date(item.endDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        case 'flight':
                            return (
                                <div key={item.id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg p-5 relative group">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                                    >
                                        <X size={18} />
                                    </button>
                                    <div className="flex items-center mb-3">
                                        <div className="bg-sky-50 p-2 rounded-full mr-3">
                                            <Plane className="text-sky-500 w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-800">Vuelo {item.airline}</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin className="text-gray-400 mr-2 w-4 h-4 flex-shrink-0" />
                                            <span>{item.origin} → {item.destination}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CalendarDays className="text-blue-400 mr-2 w-4 h-4 flex-shrink-0" />
                                            <span>Salida: {new Date(item.departureDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        case 'package':
                            return (
                                <div key={item.id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg p-5 relative group">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                                    >
                                        <X size={18} />
                                    </button>
                                    <div className="flex items-center mb-3">
                                        <div className="bg-violet-50 p-2 rounded-full mr-3">
                                            <Package className="text-violet-500 w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-500">Paquete completo con todos los servicios incluidos</p>
                                </div>
                            );
                        case 'tourPlan':
                            return (
                                <div key={item.id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg p-5 relative group">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                                    >
                                        <X size={18} />
                                    </button>
                                    <div className="flex items-center mb-3">
                                        <div className="bg-teal-50 p-2 rounded-full mr-3">
                                            <MapPin className="text-teal-500 w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-800">{item.destino}</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CalendarDays className="text-blue-400 mr-2 w-4 h-4 flex-shrink-0" />
                                            <span>{item.duracion}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <PawPrint className="text-amber-400 mr-2 w-4 h-4 flex-shrink-0" />
                                            <span>Mascotas: {item.mascotasPermitidas?.join(', ')}</span>
                                        </div>
                                    </div>
                                    {item.pesoMaximo && (
                                        <div className="mt-3 flex items-center text-xs text-gray-500">
                                            <CheckCircle className="text-green-400 mr-1 w-3 h-3" />
                                            <span>Peso máximo: {item.pesoMaximo}</span>
                                        </div>
                                    )}
                                </div>
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        );
    };

    const renderPriceColumn = () => {
        const priceBreakdown = calculatePriceBreakdown();

        return (
            <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 pb-4 flex items-center mb-4">
                    <div className="bg-emerald-50 p-2 rounded-full mr-3">
                        <DollarSign className="text-emerald-500 w-5 h-5" />
                    </div>
                    Desglose de Precios
                </h2>

                <div className="space-y-3">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-700">{item.name}</span>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded-full"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                            <span className="font-medium text-gray-800">{formatPrice(item.price)}</span>
                        </div>
                    ))}
                </div>

                <div className="space-y-2 text-sm mt-4 pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-gray-500">
                        <span>Subtotal</span>
                        <span>{formatPrice(priceBreakdown.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                        <span>IVA (21%)</span>
                        <span>{formatPrice(priceBreakdown.iva)}</span>
                    </div>
                </div>

                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 font-bold">
                    <span className="text-gray-800">Total a Pagar</span>
                    <span className="text-lg text-emerald-600">{formatPrice(priceBreakdown.total)}</span>
                </div>
                
                <button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 flex justify-center items-center">
                    <ShoppingCart className="mr-2 w-5 h-5" />
                    Proceder al Pago
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 flex items-center">
                        <div className="bg-sky-50 p-2 rounded-full mr-3 hidden sm:flex">
                            <ShoppingCart className="text-sky-500 w-6 h-6" />
                        </div>
                        Resumen de Compra
                    </h1>
                    {cart.length > 0 && (
                        <button
                            onClick={() => cart.forEach(item => removeFromCart(item.id))}
                            className="text-xs sm:text-sm text-gray-500 hover:text-red-500 transition-colors px-3 py-1 rounded-md flex items-center"
                        >
                            <Trash2 className="mr-1 w-4 h-4" />
                            Vaciar Carrito
                        </button>
                    )}
                </div>

                {cart.length === 0 ? (
                    <div className="bg-white shadow-sm rounded-lg p-12 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-gray-100 p-4 rounded-full">
                                <ShoppingCart className="w-12 h-12 text-gray-400" />
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Tu carrito está vacío</h3>
                        <p className="text-gray-500 mb-6">Agrega algunos productos para continuar con tu compra</p>
                        <Link to="/traveler" className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-6 rounded-lg transition-colors">
                            Explorar Productos
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3">
                            {renderDetailsColumn()}
                        </div>
                        <div className="lg:col-span-2">
                            {renderPriceColumn()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseSummary;