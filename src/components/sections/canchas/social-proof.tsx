"use client"

import { motion } from "framer-motion"
import { Sparkles, MapPin } from "lucide-react"

export function SocialProof() {
    return (
        <section className="py-20 bg-background border-b border-border relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
            
            <div className="container mx-auto px-4 max-w-4xl text-center">
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm">
                        <MapPin className="w-4 h-4" />
                        Hecho en Argentina, para la realidad local
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                        Software pensado para <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                            complejos reales.
                        </span>
                    </h2>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        No somos una startup genérica de Silicon Valley. Desarrollamos Mi Partido entendiendo 
                        cómo funciona una cancha acá: <strong>los horarios pico, las cancelaciones por clima, 
                        los deudores y la necesidad de cobrar las señas</strong>.
                    </p>

                    <div className="mt-8 p-6 md:p-8 rounded-2xl bg-card border border-border/50 shadow-xl w-full max-w-3xl flex flex-col items-center gap-4 relative">
                        <Sparkles className="absolute top-4 right-4 w-6 h-6 text-yellow-500/50" />
                        <p className="font-bold text-xl md:text-2xl text-foreground">
                            "Buscamos complejos piloto"
                        </p>
                        <p className="text-muted-foreground text-center">
                            Actualmente estamos abriendo el acceso para los primeros complejos deportivos. 
                            Sumate al programa piloto y obtené configuración guiada y acceso preferencial 
                            mientras mejoramos juntos el sistema.
                        </p>
                    </div>

                </motion.div>

            </div>
        </section>
    )
}
