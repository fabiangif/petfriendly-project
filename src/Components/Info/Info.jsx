import React from "react";

export default function Info() {

    const [activeTab, setActiveTab] = useState('map');
    const [selectedCountry, setSelectedCountry] = useState('españa');

    // Normativas por país
    const regulations = {
        españa: {
            title: 'España',
            requirements: [
                'Microchip obligatorio',
                'Vacunación antirrábica vigente',
                'Pasaporte europeo para mascotas',
                'Limitación por tamaño en transporte público'
            ],
            transport: 'En España, RENFE permite mascotas pequeñas en transportín y perros medianos con bozal y correa. Consulta siempre las condiciones específicas.'
        },
        francia: {
            title: 'Francia',
            requirements: [
                'Microchip obligatorio',
                'Vacunación antirrábica (mínimo 21 días antes)',
                'Pasaporte europeo para mascotas',
                'Tratamiento contra equinococosis 24-120h antes'
            ],
            transport: 'En Francia, SNCF permite mascotas pequeñas (hasta 6kg) por €7 y perros grandes con bozal por un suplemento del 50% del billete.'
        },
        italia: {
            title: 'Italia',
            requirements: [
                'Microchip obligatorio',
                'Vacunación antirrábica vigente',
                'Pasaporte europeo para mascotas',
                'Certificado veterinario (menos de 10 días)'
            ],
            transport: 'En Italia, Trenitalia permite mascotas pequeñas gratis y perros grandes con billete reducido, siempre con bozal y correa.'
        }
    };

    const primaryColor = "bg-teal-500";
    const secondaryColor = "bg-purple-600";
    const accentColor = "text-yellow-400";

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Info className="mr-2 text-teal-500" />
                Normativas para viajar con mascotas
            </h2>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex border-b">
                    {Object.keys(regulations).map(country => (
                        <button
                            key={country}
                            onClick={() => setSelectedCountry(country)}
                            className={`px-4 py-3 font-medium ${selectedCountry === country
                                ? `${primaryColor} text-white`
                                : 'hover:bg-gray-100'
                                }`}
                        >
                            {regulations[country].title}
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2 flex items-center">
                            <FileText className="mr-2 text-teal-500" />
                            Requisitos para tu mascota
                        </h3>
                        <ul className="space-y-2">
                            {regulations[selectedCountry].requirements.map((req, i) => (
                                <li key={i} className="flex items-start">
                                    <PawPrint className="h-5 w-5 mr-2 text-teal-500 flex-shrink-0 mt-0.5" />
                                    <span>{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-2 flex items-center">
                            <Plane className="mr-2 text-teal-500" />
                            Transporte
                        </h3>
                        <p className="text-gray-700">{regulations[selectedCountry].transport}</p>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <div className="flex">
                            <Info className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-yellow-700">Esta información es orientativa. Te recomendamos consultar siempre con las autoridades oficiales antes de viajar, ya que las normativas pueden cambiar.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}