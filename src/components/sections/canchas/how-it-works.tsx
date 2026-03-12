"use client"

import { motion } from "framer-motion"
import { Building, LayoutGrid, HandCoins, Rocket } from "lucide-react"

const steps = [
    {
        num: "01",
        icon: Building,
        title: "Cargás tu complejo",
        desc: "Configurás datos básicos, fotos y políticas de reserva.",
        img: "/images/canchas/Complejo.png"
    },
    {
        num: "02",
        icon: LayoutGrid,
        title: "Creás tus canchas",
        desc: "Definís deportes, precios, iluminación y reglas especiales.",
        img: "/images/canchas/Canchas.png"
    },
    {
        num: "03",
        icon: HandCoins,
        title: "Organizás tu operación",
        desc: "Administrás reservas, cobros, clientes y stock desde el equipo.",
        img: "/images/canchas/Reservas.png"
    },
    {
        num: "04",
        icon: Rocket,
        title: "Activás el complejo",
        desc: "Tus canchas se publican y quedan listas para recibir reservas.",
        img: "/images/canchas/Finanzas.png"
    }
]

export function HowItWorks() {
    return (
        <section className="py-24 bg-muted/40 border-y border-border">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Empezar es fácil y guiado</h2>
                    <p className="text-muted-foreground text-lg">
                        Diseñamos un proceso simple para que puedas tener tu sistema configurado
                        en menos de 10 minutos.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            {/* Connecting Line (Only LG screens) */}
                            {i < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-[28px] left-[60px] right-[-60px] h-[2px] bg-gradient-to-r from-border to-transparent -z-10" />
                            )}

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center shadow-sm group-hover:border-primary/50 group-hover:shadow-primary/5 transition-all">
                                        <step.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <span className="text-4xl font-black text-muted-foreground/20">{step.num}</span>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Mini screenshots block */}
                                <div className="w-full h-32 rounded-xl bg-card border border-border/50 overflow-hidden relative shadow-sm group-hover:border-primary/30 transition-colors">
                                    <img 
                                        src={step.img} 
                                        alt={step.title} 
                                        className="w-full h-full object-cover opacity-80"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
