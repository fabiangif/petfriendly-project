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

const PurchaseSummary = () => {
    const { 
        cart, 
        removeFromCart,
        getTotalPrice 
    } = useCart();

    // Calcular subtotales y desglose de precios
    const calculatePriceBreakdown = () => {
        const breakdown = {
            subtotal: 0,
            iva: 0,
            total: 0
        };

        cart.forEach(item => {
            breakdown.subtotal += item.price;
        });

        breakdown.iva = breakdown.subtotal * 0.21;
        breakdown.total = breakdown.subtotal + breakdown.iva;

        return breakdown;
    };

    const renderDetailsColumn = () => {
        return (
            <div className="space-y-6">
                {cart.map(item => {
                    switch(item.type) {
                        case 'hotel':
                            return (
                                <div key={item.id} className="bg-white border rounded-xl p-6 relative group">
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={20} />
                                    </button>
                                    <div className="flex items-center mb-4">
                                        <Hotel className="text-emerald-500 mr-3 w-8 h-8" />
                                        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex items-center">
                                            <MapPin className="text-gray-500 mr-2 w-5 h-5" />
                                            <span>{item.location}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <CalendarDays className="text-blue-500 mr-2 w-5 h-5" />
                                            <span>{item.nights} noches</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div className="flex items-center">
                                            <CheckCircle className="text-green-500 mr-2 w-5 h-5" />
                                            <span>Check-in: {new Date(item.startDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="text-green-500 mr-2 w-5 h-5" />
                                            <span>Check-out: {new Date(item.endDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        case 'flight':
                            return (
                                <div key={item.id} className="bg-white border rounded-xl p-6 relative group">
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={20} />
                                    </button>
                                    <div className="flex items-center mb-4">
                                        <Plane className="text-sky-500 mr-3 w-8 h-8" />
                                        <h3 className="text-xl font-semibold text-gray-800">Vuelo {item.airline}</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex items-center">
                                            <MapPin className="text-gray-500 mr-2 w-5 h-5" />
                                            <span>{item.origin} → {item.destination}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <CalendarDays className="text-blue-500 mr-2 w-5 h-5" />
                                            <span>Salida: {new Date(item.departureDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        case 'package':
                            return (
                                <div key={item.id} className="bg-white border rounded-xl p-6 relative group">
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={20} />
                                    </button>
                                    <div className="flex items-center mb-4">
                                        <Package className="text-violet-500 mr-3 w-8 h-8" />
                                        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                                    </div>
                                    <p className="text-gray-600">Paquete completo con todos los servicios incluidos</p>
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
            <div className="bg-white border rounded-xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 flex items-center">
                    <DollarSign className="mr-3 text-emerald-500" />
                    Desglose de Precios
                </h2>
                
                <div className="space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-700">{item.name}</span>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:bg-red-50 p-1 rounded-full"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <span className="font-semibold text-gray-900">€{item.price.toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">€{priceBreakdown.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">IVA (21%)</span>
                        <span className="font-semibold">€{priceBreakdown.iva.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex justify-between pt-4 border-t font-bold text-xl">
                    <span className="text-gray-800">Total a Pagar</span>
                    <span className="text-emerald-700">€{priceBreakdown.total.toFixed(2)}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold flex items-center">
                        <ShoppingCart className="mr-4 text-sky-600" /> 
                        Resumen de Compra
                    </h1>
                    {cart.length > 0 && (
                        <button 
                            onClick={() => cart.forEach(item => removeFromCart(item.id))}
                            className="text-sm text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg flex items-center"
                        >
                            <Trash2 className="mr-2" size={16} />
                            Limpiar Carrito
                        </button>
                    )}
                </div>
                
                {cart.length === 0 ? (
                    <div className="text-center text-gray-500">
                        El carrito está vacío
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {renderDetailsColumn()}
                        </div>
                        <div>
                            {renderPriceColumn()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseSummary;