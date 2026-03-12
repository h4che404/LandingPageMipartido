"use client"

import { motion } from "framer-motion"

export function AboutSystem() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left: Text explanation */}
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            ¿Qué es Mi Partido Desktop?
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Es un sistema de gestión para complejos deportivos. Te permite administrar 
                            canchas, reservas, clientes, ventas, caja y toda tu operación diaria desde 
                            una sola app, <strong>incluso aunque se corte internet</strong>.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            No más cuadernos borroneados ni WhatsApps a las 2 de la mañana. 
                            Todo lo que necesitás para que tu complejo crezca ordenado, en una 
                            sola pantalla.
                        </p>
                    </div>

                    {/* Right: Collage of screens */}
                    <div className="relative h-[400px] md:h-[500px] w-full mt-10 lg:mt-0 perspective-1000">
                        {/* Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full" />
                        
                        {/* 1. Behind Screen (Canchas) */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, y: -20, rotateY: -15, scale: 0.9 }}
                            whileInView={{ opacity: 0.5, x: 40, y: -40, rotateY: -10, scale: 0.9 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="absolute top-0 right-0 w-3/4 rounded-xl border border-border/50 shadow-2xl overflow-hidden bg-card"
                        >
                            <img 
                                src="/images/canchas/Canchas.png" 
                                alt="Gestión de Canchas" 
                                className="w-full h-auto object-cover opacity-60"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                }} 
                            />
                            <div className="hidden bg-card aspect-video border border-border flex items-center justify-center p-4">
                                <span className="text-muted-foreground font-medium text-sm">Canchas UI</span>
                            </div>
                        </motion.div>

                        {/* 2. Middle Screen (Caja/Ventas) */}
                        <motion.div
                            initial={{ opacity: 0, x: -50, y: 20, rotateY: 15, scale: 0.95 }}
                            whileInView={{ opacity: 0.8, x: -30, y: 60, rotateY: 5, scale: 0.95 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="absolute bottom-10 left-0 w-3/4 rounded-xl border border-border/50 shadow-2xl overflow-hidden bg-card z-10"
                        >
                            <img 
                                src="/images/canchas/Caja.png" 
                                alt="Caja y Ventas" 
                                className="w-full h-auto object-cover opacity-80"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                }} 
                            />
                            <div className="hidden bg-muted aspect-video border border-border flex items-center justify-center p-4">
                                <span className="text-muted-foreground font-medium text-sm">Caja UI</span>
                            </div>
                        </motion.div>

                        {/* 3. Front Screen (Reservas) */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 rounded-2xl border border-border/80 shadow-2xl overflow-hidden bg-card z-20 ring-1 ring-white/10"
                        >
                            {/* Window UI Header */}
                            <div className="h-6 bg-[#181825] flex items-center px-3 gap-1.5 border-b border-border">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            </div>
                            <img 
                                src="/images/canchas/Reservas.png" 
                                alt="Agenda de Reservas" 
                                className="w-full h-auto object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                }} 
                            />
                            <div className="hidden bg-background aspect-video border border-border flex flex-col items-center justify-center p-4">
                                <span className="text-foreground font-bold">Agenda Central</span>
                                <div className="grid grid-cols-4 gap-2 w-full mt-4">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="h-10 bg-primary/20 rounded border border-primary/30" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}
