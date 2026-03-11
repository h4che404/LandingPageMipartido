"use client"

import { motion } from "framer-motion"
import { Smartphone, MonitorPlay, ArrowRightLeft } from "lucide-react"

export function MobileIntegration() {
    return (
        <section className="py-24 bg-muted/20 border-b border-border">
            <div className="container mx-auto px-4 max-w-6xl">
                
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Conectá tu complejo con la App Mobile
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        No es solo un sistema interno. Gestionás desde el escritorio y ganás 
                        visibilidad publicando tus canchas directamente en la app de jugadores.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 relative">
                    
                    {/* Background glow connector */}
                    <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0 backdrop-blur-sm -z-10" />

                    {/* Desktop Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="w-[350px] aspect-video bg-card border border-border rounded-xl shadow-xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 right-0 h-6 bg-muted border-b border-border/50 flex items-center px-2 gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-border" />
                                <div className="w-2 h-2 rounded-full bg-border" />
                                <div className="w-2 h-2 rounded-full bg-border" />
                            </div>
                            <div className="absolute inset-0 top-6 flex items-center justify-center bg-background">
                                <MonitorPlay className="w-12 h-12 text-muted-foreground/30 mb-2" />
                            </div>
                            <img 
                                src="/images/canchas/desktop-panel.png" 
                                alt="Administración Desktop" 
                                className="w-full h-full object-cover relative z-10"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-foreground">1. Vos Administrás</p>
                            <p className="text-sm text-muted-foreground">App de escritorio para el complejo</p>
                        </div>
                    </motion.div>

                    {/* Connection Icon */}
                    <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="hidden md:flex w-16 h-16 rounded-full bg-card border-2 border-primary items-center justify-center shadow-[0_0_30px_rgba(22,163,74,0.3)] z-10"
                    >
                        <ArrowRightLeft className="w-6 h-6 text-primary" />
                    </motion.div>

                    {/* Mobile Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-6"
                    >
                        {/* Phone Mockup Frame */}
                        <div className="w-[180px] h-[360px] bg-black border-[6px] border-[#2a2a2a] rounded-[2.5rem] shadow-2xl overflow-hidden relative ring-1 ring-border/50">
                            {/* Notch */}
                            <div className="absolute top-0 inset-x-0 h-4 flex justify-center z-20">
                                <div className="w-20 h-full bg-[#2a2a2a] rounded-b-xl" />
                            </div>
                            
                            <div className="absolute inset-0 flex items-center justify-center bg-card">
                                <Smartphone className="w-10 h-10 text-muted-foreground/30" />
                            </div>
                            <img 
                                src="/images/canchas/mobile-app.png" 
                                alt="App Jugadores" 
                                className="w-full h-full object-cover relative z-10"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-foreground">2. Ellos Reservan</p>
                            <p className="text-sm text-muted-foreground">App móvil para jugadores</p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    )
}
