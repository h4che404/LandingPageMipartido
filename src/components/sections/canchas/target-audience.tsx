"use client"

import { motion } from "framer-motion"
import { Users, Dribbble, Building2, MessageSquareOff } from "lucide-react"

const audiences = [
    {
        icon: Building2,
        title: "Complejos de Fútbol 5",
        desc: "Optimizá tu ocupación y dejá de cruzar horarios"
    },
    {
        icon: Dribbble,
        title: "Canchas de Pádel",
        desc: "Gestioná turnos de 90 min sin huecos muertos"
    },
    {
        icon: Users,
        title: "Clubes Deportivos",
        desc: "Profesionalizá la atención a tus socios"
    },
    {
        icon: MessageSquareOff,
        title: "Negocios con WhatsApp",
        desc: "Dejá de perder tiempo respondiendo mensajes a toda hora"
    }
]

export function TargetAudience() {
    return (
        <section className="py-20 bg-background border-b border-border">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
                        Pensado para tu negocio
                    </h2>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                        Ideal para organizadores reales
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {audiences.map((audience, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card border border-border/50 p-6 rounded-2xl hover:border-primary/50 transition-colors flex flex-col items-center text-center group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <audience.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold mb-2">{audience.title}</h3>
                            <p className="text-sm text-muted-foreground">
                                {audience.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
