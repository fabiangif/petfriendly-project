import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PawPrint, MapPin, Info, MessageSquare, Menu, X, HouseIcon, PaperclipIcon } from "lucide-react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const primaryColor = "bg-teal-500";
    const hoverColor = "hover:bg-teal-400";
    const activeTextColor = "text-teal-600";

    return (
        <>
            <header className={`${primaryColor} text-white shadow-md sticky top-0 z-50`}>
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <PawPrint className="h-8 w-8" />
                            <h1 className="text-2xl font-bold">PetTraveler</h1>
                        </div>

                        {/* Navegación de escritorio */}
                        <nav className="hidden md:flex items-center space-x-6">

                            <Link
                                to="/"
                                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${hoverColor}`}
                            >
                                <HouseIcon className="h-5 w-5" />
                                <span>Inicio</span>
                            </Link>

                            <Link
                                to="/explorar"
                                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${hoverColor}`}
                            >
                                <MapPin className="h-5 w-5" />
                                <span>Explorar</span>
                            </Link>

                            <Link
                                to="/normativas"
                                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${hoverColor}`}
                            >
                                <Info className="h-5 w-5" />
                                <span>Normativas</span>
                            </Link>

                            <Link
                                to="/traveler"
                                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${hoverColor}`}
                            >
                                <PaperclipIcon className="h-5 w-5" />
                                <span>Planes</span>
                            </Link>

                            <Link
                                to="/asistente"
                                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${hoverColor}`}
                            >
                                <MessageSquare className="h-5 w-5" />
                                <span>Asistente</span>
                            </Link>
                        </nav>

                        {/* Botón de menú móvil */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden text-white p-2 rounded-lg hover:bg-teal-400 transition-colors duration-200"
                            aria-expanded={menuOpen}
                            aria-label="Menú principal"
                        >
                            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Menú móvil con animación */}
            <div
                className={`fixed inset-0 bg-teal-500 bg-opacity-95 z-40 md:hidden transition-transform duration-300 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="container mx-auto p-4 pt-20">
                    <nav className="flex flex-col space-y-4">

                        <Link
                            to="/"
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center space-x-3 p-4 rounded-lg shadow transition-colors duration-200 bg-teal-400 text-white`}
                        >
                            <HouseIcon className="h-6 w-6" />
                            <span className="text-lg font-medium">Inicio</span>
                        </Link>

                        <Link
                            to="/explorar"
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center space-x-3 p-4 rounded-lg shadow transition-colors duration-200 bg-teal-400 text-white`}
                        >
                            <MapPin className="h-6 w-6" />
                            <span className="text-lg font-medium">Explorar destinos</span>
                        </Link>

                        <Link
                            to="/normativas"
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center space-x-3 p-4 rounded-lg shadow transition-colors duration-200 bg-teal-400 text-white`}
                        >
                            <Info className="h-6 w-6" />
                            <span className="text-lg font-medium">Normativas</span>
                        </Link>

                        <Link
                            to="/traveler"
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center space-x-3 p-4 rounded-lg shadow transition-colors duration-200 bg-teal-400 text-white`}
                        >
                            <PaperclipIcon className="h-6 w-6" />
                            <span className="text-lg font-medium">Planes</span>
                        </Link>

                        <Link
                            to="/asistente"
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center space-x-3 p-4 rounded-lg shadow transition-colors duration-200 bg-teal-400 text-white`}
                        >
                            <MessageSquare className="h-6 w-6" />
                            <span className="text-lg font-medium">Asistente Buddy</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
}
