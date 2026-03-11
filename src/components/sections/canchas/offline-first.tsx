"use client"

import { motion } from "framer-motion"
import { CloudOff, RefreshCw, Wifi } from "lucide-react"

export function OfflineFirst() {
    return (
        <section className="py-24 bg-background overflow-hidden relative border-b border-border">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2" />
            
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left: Explanation */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-xs font-bold tracking-widest uppercase">
                            <CloudOff className="w-4 h-4" />
                            Offline First
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold">
                            Tu complejo no se frena si se corta el internet
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Mi Partido Desktop fue pensado para operar en el día a día <strong>real</strong> de un 
                            complejo deportivo en Argentina. Podés seguir trabajando en modo local, tomando 
                            reservas y cobrando sin problemas.
                        </p>
                        <ul className="space-y-4 pt-4 text-muted-foreground">
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                La recepción sigue operando al 100%.
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                El calendario y la caja no se bloquean.
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                <strong>Sincroniza automáticamente</strong> cuando vuelve la conexión.
                            </li>
                        </ul>
                    </div>

                    {/* Right: Visual App Component */}
                    <div className="relative">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-card border border-border rounded-2xl shadow-2xl p-6 relative z-10"
                        >
                            {/* App Header Status */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                                <div className="font-bold text-lg">Mi Partido</div>
                                
                                {/* Status Toggle Indicator */}
                                <div className="relative">
                                    <motion.div 
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-3 py-1.5 rounded-full text-xs font-bold"
                                    >
                                        <CloudOff className="w-3.5 h-3.5" />
                                        Modo Local
                                    </motion.div>
                                    <motion.div 
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                                        className="absolute inset-0 flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/20 text-green-500 px-3 py-1.5 rounded-full text-xs font-bold"
                                    >
                                        <Wifi className="w-3.5 h-3.5" />
                                        Sincronizado
                                    </motion.div>
                                </div>
                            </div>

                            {/* Fake UI Content */}
                            <div className="space-y-4 opacity-50">
                                <div className="h-8 bg-muted rounded-md w-1/3" />
                                <div className="h-24 bg-muted border border-border/50 rounded-xl" />
                                <div className="flex gap-4">
                                    <div className="h-20 bg-muted rounded-xl flex-1" />
                                    <div className="h-20 bg-muted rounded-xl flex-1" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}
