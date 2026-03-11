"use client"

import { motion } from "framer-motion"
import { AlertCircle, CheckCircle2 } from "lucide-react"

const pains = [
    "Perdés tiempo organizando reservas manualmente por WhatsApp.",
    "Se te cruzan horarios, anotás mal o te cancelan sobre la hora.",
    "No tenés control claro de caja, ventas o deudores.",
    "Tus canchas no se muestran bien online para atraer nuevos jugadores.",
    "No sabés realmente cuánto rinde cada cancha a fin de mes."
]

export function PainPoints() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        ¿Pasa esto en tu complejo?
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Sabemos que organizar canchas a la vieja usanza trae caos. 
                        Es momento de profesionalizar la operación.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
                    
                    {/* Left: Pain Points List */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {pains.map((pain, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-card border border-border shadow-sm">
                                <div className="shrink-0 mt-0.5">
                                    <AlertCircle className="w-5 h-5 text-red-500/80" />
                                </div>
                                <p className="text-muted-foreground font-medium">{pain}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Right: The Solution Visual */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full -z-10" />
                        
                        <div className="bg-card border border-border p-8 rounded-3xl shadow-xl space-y-6">
                            <div className="flex items-center gap-3 pb-6 border-b border-border">
                                <CheckCircle2 className="w-8 h-8 text-primary" />
                                <div>
                                    <h3 className="font-bold text-xl">Mi Partido Desktop</h3>
                                    <p className="text-sm text-muted-foreground">Te ayuda a ordenar esto en un solo lugar.</p>
                                </div>
                            </div>
                            
                            {/* Mini Agenda Mockup */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-4">
                                    <span>Hoy, 18:00hs</span>
                                    <span>Cancha 1 y 2</span>
                                </div>
                                
                                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-8 bg-primary rounded-full" />
                                        <div>
                                            <p className="font-bold text-foreground">Fútbol 5 - Norte</p>
                                            <p className="text-muted-foreground">Juan López (Señado)</p>
                                        </div>
                                    </div>
                                    <span className="font-bold">18:00</span>
                                </div>
                                
                                <div className="bg-muted border border-border rounded-lg p-3 flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-8 bg-muted-foreground/30 rounded-full" />
                                        <div className="opacity-50">
                                            <p className="font-bold text-foreground">Fútbol 5 - Sur</p>
                                            <p className="text-muted-foreground">Disponible</p>
                                        </div>
                                    </div>
                                    <span className="font-bold opacity-50">18:00</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
