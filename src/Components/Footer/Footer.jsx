import React from "react";
import { PawPrint, MapPin, MessageSquare, CircleUser, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer footer className = "bg-gray-800 text-white py-8" >
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center space-x-2">
                            <PawPrint className="h-6 w-6" />
                            <h2 className="text-xl font-bold">PetTraveler</h2>
                        </div>
                        <p className="mt-2 text-gray-400 max-w-md">
                            Hacemos que viajar con tu mascota sea una experiencia inolvidable. Encuentra los mejores lugares pet-friendly.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold mb-4">Explora</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Destinos</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Hoteles</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Parques</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Servicios veterinarios</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4">Información</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Normativas por país</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Requisitos de viaje</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Consejos para viajar</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Preguntas frecuentes</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 md:mt-0">
                        <h3 className="font-bold mb-4">Contáctanos</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center text-gray-400">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                <span>soporte@pettraveler.com</span>
                            </li>
                            <li className="flex items-center text-gray-400">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>Madrid, España</span>
                            </li>
                        </ul>

                        <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Síguenos</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <CircleUser className="h-5 w-5" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <MessageSquare className="h-5 w-5" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Heart className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} PetTraveler. Todos los derechos reservados.
                    </p>

                    <div className="mt-4 md:mt-0 flex space-x-4">
                        <a href="#" className="text-gray-500 hover:text-white text-sm">Términos de servicio</a>
                        <a href="#" className="text-gray-500 hover:text-white text-sm">Política de privacidad</a>
                        <a href="#" className="text-gray-500 hover:text-white text-sm">Cookies</a>
                    </div>
                </div>
            </div>
    </footer >
    )
}