"use client"

import { motion } from "framer-motion"
import { Target, Shield, Clock } from "lucide-react"

const audiences = [
    {
        icon: Target,
        title: "Para el que organiza",
        text: "Dejá de perseguir gente. Automatizá la lista y los pagos."
    },
    {
        icon: Shield,
        title: "Para el que quiere jugar parejo",
        text: "Partidos nivelados. Chau a los desparejos aburridos."
    },
    {
        icon: Clock,
        title: "Para el que no quiere perder tiempo",
        text: "3 clics y estás jugando. Sin vueltas."
    }
]

export function Audience() {
    return (
        <section className="py-24 container mx-auto px-4">
            <div className="text-center mb-16">
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6 inline-block">
                    ¿Para quién es Mi Partido?
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-4">
                    Si vos sos el que mueve el partido... <br className="hidden md:block" />esta app es tuya.
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {audiences.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/20 border border-secondary/40"
                    >
                        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-foreground mb-4 shadow-sm">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
