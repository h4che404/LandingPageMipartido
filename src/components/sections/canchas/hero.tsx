"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, MonitorPlay, ChevronRight, ChevronLeft } from "lucide-react"

const images = [
    "/images/canchas/gallery-dashboard.png",
    "/images/canchas/gallery-reservas.png",
    "/images/canchas/gallery-canchas.png",
    "/images/canchas/gallery-caja.png",
]

export function HeroCanchas() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    const handleScrollToDownload = () => {
        document.getElementById('descargar')?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <section className="relative min-h-[95vh] flex items-center pt-32 pb-20 overflow-hidden bg-[var(--venue-bg)] text-white">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-[var(--venue-cta)]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: B2B Content */}
                    <div className="space-y-8 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
                                Administrá tu <br />
                                complejo deportivo <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                    desde un solo lugar.
                                </span>
                            </h1>
                            <p className="mt-6 text-xl text-gray-300 max-w-lg leading-relaxed font-medium">
                                Reservas, canchas, clientes, caja, ventas y operación diaria en un sistema simple, profesional y pensado para dueños de canchas.
                            </p>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <Button
                                size="lg"
                                onClick={handleScrollToDownload}
                                className="bg-[var(--venue-cta)] text-black hover:bg-[var(--venue-cta)]/90 rounded-xl px-8 h-14 font-bold text-base shadow-[0_0_20px_rgba(250,204,21,0.2)] transition-all hover:scale-105"
                            >
                                Descargar app desktop
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                                className="border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-xl h-14 px-8 text-base backdrop-blur-sm"
                            >
                                Ver cómo funciona
                                <MonitorPlay className="ml-2 w-5 h-5 opacity-70" />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Column: Dashboard Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        {/* Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/20 blur-[100px] rounded-full -z-10" />

                        {/* App Window Mockup */}
                        <div className="relative w-full max-w-[650px] rounded-2xl overflow-hidden border border-white/10 bg-[#1e1e2e] shadow-2xl ring-1 ring-white/10 group">
                            {/* Window Header */}
                            <div className="h-8 bg-[#181825] flex items-center px-4 gap-2 border-b border-white/5 z-20 relative">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            
                            {/* Carousel Content */}
                            <div className="relative w-full aspect-video bg-[#1e1e2e] overflow-hidden">
                                <AnimatePresence initial={false} mode="wait">
                                    <motion.img
                                        key={currentIndex}
                                        src={images[currentIndex]}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{ duration: 0.4 }}
                                        alt="Dashboard Mi Partido Desktop"
                                        className="absolute inset-0 w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            target.nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                    {/* Fallback internal UI layout just in case the image is missing */}
                                    <div className="hidden absolute inset-0 flex">
                                        <div className="w-48 bg-[#181825] border-r border-white/5 p-4 space-y-2">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i} className="h-8 rounded bg-white/5 w-full" />
                                            ))}
                                        </div>
                                        <div className="flex-1 p-6 space-y-6">
                                            <div className="h-8 w-1/3 bg-white/10 rounded" />
                                            <div className="grid grid-cols-3 gap-4">
                                                {[...Array(3)].map((_, i) => (
                                                    <div key={i} className="h-24 rounded-lg bg-white/5 border border-white/5" />
                                                ))}
                                            </div>
                                            <div className="h-64 rounded-lg bg-white/5 border border-white/5" />
                                        </div>
                                    </div>
                                </AnimatePresence>

                                {/* Carousel Controls (appear on hover) */}
                                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <button 
                                        onClick={handlePrev}
                                        className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 hover:bg-black/80 transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={handleNext}
                                        className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 hover:bg-black/80 transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Floating Cards / KPIs styled like Desktop App */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="absolute -bottom-6 -left-6 bg-[#111827] border border-[#1f2937] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-4 hidden sm:flex z-30"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#064e3b]/30 flex items-center justify-center text-[#34d399]">
                                <span className="font-bold text-xl">24</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Turnos hoy</p>
                                <p className="text-xs text-slate-400">Agenda completa</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                            className="absolute top-12 -right-6 bg-[#111827] border border-[#1f2937] px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 hidden lg:flex z-30"
                        >
                            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                            <span className="text-sm font-bold text-white tracking-wide">Caja Abierta</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
