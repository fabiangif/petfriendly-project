import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { Calendar, DollarSign } from 'lucide-react';

registerLocale('es', es);

const HotelDatePicker = ({ selectedPlace, addToCart }) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    console.log(selectedPlace)

    const calculateNights = () => {
        if (startDate && endDate) {
            const nights = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
            return nights > 0 ? nights : 0;
        }
        return 0;
    };

    const handleReserve = () => {
        if (startDate && endDate) {
            const bookingDetails = {
                ...selectedPlace,
                type: 'hotel',
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
                nights: calculateNights(),
                price: selectedPlace.precioNoche * calculateNights()
            };

            addToCart(bookingDetails);
            const newDateRange = [null, null];
            setDateRange(newDateRange);
        } else {
            alert('Por favor, selecciona fechas de inicio y fin');
        }
    };

    return (
        <div className="hotel-date-picker bg-white shadow-lg rounded-lg p-6 border border-gray-100">
            <div className="mb-4">
                <label className="flex items-center gap-2 mb-2 text-gray-600">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    Selecciona tus fechas de estancia
                </label>
                <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => setDateRange(update)}
                    minDate={new Date()}
                    locale="es"
                    dateFormat="dd/MM/yyyy"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-200 transition"
                    placeholderText="Selecciona fechas"
                />
            </div>

            {startDate && endDate && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Calendar className="text-blue-600" />
                        <span className="text-gray-700">Noches</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <DollarSign className="text-green-600" />
                        <span className="font-bold text-gray-800">
                        {calculateNights()} noches x €{selectedPlace.precioNoche || 0} = 
                        €{calculateNights() * (selectedPlace.precioNoche || 0)}
                        </span>
                    </div>
                </div>
            )}

            <button
                onClick={handleReserve}
                disabled={!startDate || !endDate}
                className={`w-full p-3 rounded-lg text-white transition ${startDate && endDate
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
            >
                Reservar
            </button>
        </div>
    );
};

export default HotelDatePicker;