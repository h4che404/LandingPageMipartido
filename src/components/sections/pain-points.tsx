"use client"

import { motion } from "framer-motion"
import { Users, CreditCard, CalendarX } from "lucide-react"

const pains = [
    {
        icon: Users,
        title: "¿Tu jugador se baja 1 hora antes?",
        desc: "Y te deja colgado buscando reemplazo desesperado en grupos de WhatsApp."
    },
    {
        icon: CreditCard,
        title: "¿No sabés quién pagó?",
        desc: "Siempre falta uno que se hace el distraído o te transfiere de menos."
    },
    {
        icon: CalendarX,
        title: "¿Llamás a 5 canchas y no hay lugar?",
        desc: "Perdés tiempo llamando y mensajeando solo para que te digan 'está ocupado'."
    }
]

export function PainPoints() {
    return (
        <section id="problems" className="py-24 bg-card/20 relative">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Organizar no debería ser un trabajo extra
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Solución: Mi Partido. Confirmaciones reales. Pagos claros. Canchas al toque.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {pains.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-card border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <p.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {p.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
