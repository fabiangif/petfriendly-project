import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, PawPrint, Map, Heart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = ({ heroSlides }) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto rotate slides
    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setActiveSlide((prev) => (prev + 1) % heroSlides.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, heroSlides.length]);

    // Pause autoplay when user interacts
    const handleManualChange = (index) => {
        setIsAutoPlaying(false);
        setActiveSlide(index);
        // Resume autoplay after 10 seconds of inactivity
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const slideVariants = {
        enter: { opacity: 0, y: 20 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    const backgroundVariants = {
        enter: { opacity: 0, scale: 1.1 },
        center: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 }
    };

    return (
        <div className="relative h-[100vh] w-full overflow-hidden bg-gradient-to-br from-teal-500 to-cyan-600">
            {/* Background image for each slide with transitions */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bg-${activeSlide}`}
                    className="absolute inset-0 z-0"
                    variants={backgroundVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 1 }}
                >
                    <div className="absolute inset-0 bg-black/30 z-10" /> {/* Overlay for better contrast */}
                    <img
                        src={heroSlides[activeSlide].image}
                        alt={`Slide ${activeSlide + 1} background`}
                        className="w-full h-full object-cover"
                        loading='eager'
                    />
                </motion.div>
            </AnimatePresence>

            {/* Floating paw prints */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {[...Array(15)].map((_, i) => {
                    const size = Math.random() * 24 + 12;
                    const startX = Math.random() * 100 + "%";
                    const startY = Math.random() * 100 + "%";

                    return (
                        <motion.div
                            key={i}
                            className="absolute text-white/20"
                            initial={{
                                x: startX,
                                y: startY,
                                rotate: Math.random() * 360,
                                scale: Math.random() * 0.5 + 0.5
                            }}
                            animate={{
                                y: [startY, Math.random() * 100 + "%"],
                                x: [startX, Math.random() * 100 + "%"],
                                rotate: [null, Math.random() * 360]
                            }}
                            transition={{
                                duration: Math.random() * 20 + 15,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <PawPrint size={size} />
                        </motion.div>
                    );
                })}
            </div>

            {/* Content container */}
            <div className="relative z-20 h-full flex items-center justify-center">
                <div className="container mx-auto px-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${activeSlide}`}
                            className="text-center max-w-4xl mx-auto"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                        >
                            {/* Badge */}
                            <motion.div
                                className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full mb-6 border border-white/30"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="text-white font-medium text-sm flex items-center">
                                    <PawPrint size={14} className="mr-2" strokeWidth={3} />
                                    Pet Friendly Adventures
                                </span>
                            </motion.div>

                            {/* Title with highlight */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {heroSlides[activeSlide].title.split(' ').map((word, i) => (
                                        <span key={i} className={i === 1 ? "text-yellow-300 relative" : ""}>
                                            {word}{' '}
                                            {i === 1 && (
                                                <motion.svg
                                                    className="absolute bottom-0 left-0 w-full h-2 -z-10"
                                                    viewBox="0 0 100 10"
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ delay: 0.8, duration: 0.8 }}
                                                >
                                                    <path d="M0,5 Q25,10 50,5 Q75,0 100,5" stroke="rgba(253, 224, 71, 0.6)" strokeWidth="8" fill="none" />
                                                </motion.svg>
                                            )}
                                        </span>
                                    ))}
                                </motion.span>
                            </h1>

                            {/* Description */}
                            <motion.p
                                className="text-xl mb-8 text-white/90 max-w-2xl mx-auto"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                {heroSlides[activeSlide].description}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <motion.button
                                    className="bg-white text-teal-600 font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 hover:shadow-xl hover:bg-yellow-50 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {heroSlides[activeSlide].icon}
                                    <span>{heroSlides[activeSlide].buttonText}</span>
                                    <ArrowRight size={16} />
                                </motion.button>

                                <button className="text-white border border-white/50 hover:bg-white/10 font-medium py-3 px-6 rounded-full transition-all backdrop-blur-sm">
                                    Más Información
                                </button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation controls with improved style */}
            <div className="absolute z-30 bottom-16 left-0 right-0 flex flex-col items-center gap-6">
                {/* Slide indicators */}
                <div className="flex items-center gap-2">
                    {heroSlides.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => handleManualChange(index)}
                            className={`relative h-3 transition-all ${activeSlide === index ? "w-10" : "w-3"} rounded-full overflow-hidden`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className={`absolute inset-0 ${activeSlide === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
                                }`}></span>
                        </motion.button>
                    ))}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-3">
                    <motion.button
                        onClick={() => handleManualChange(activeSlide === 0 ? heroSlides.length - 1 : activeSlide - 1)}
                        className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full border border-white/30"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronLeft size={20} />
                    </motion.button>

                    <motion.button
                        onClick={() => handleManualChange((activeSlide + 1) % heroSlides.length)}
                        className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full border border-white/30"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronRight size={20} />
                    </motion.button>
                </div>
            </div>

            {/* Feature preview cards */}
            <div className="absolute z-20 -bottom-6 left-0 right-0 hidden md:flex justify-center gap-4">
                {[
                    {
                        icon: <Map size={20} />,
                        title: "Destinos Pet-Friendly",
                        desc: "Encuentra el escape perfecto"
                    },
                    {
                        icon: <Heart size={20} />,
                        title: "Servicios para Mascotas",
                        desc: "Cuidados de primera mientras viajas"
                    },
                    {
                        icon: <PawPrint size={20} />,
                        title: "Consejos de Viaje",
                        desc: "Viajes sin estrés con tu mascota"
                    }
                ].map((feature, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg w-64 cursor-pointer hover:bg-white/20 transition-all"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1 + idx * 0.2 }}
                        whileHover={{ y: -5, scale: 1.03 }}
                    >
                        <div className="flex items-start gap-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                {feature.icon}
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-white text-sm">{feature.title}</p>
                                <p className="text-white/80 text-xs">{feature.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;