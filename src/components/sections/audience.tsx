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

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
}

export function Audience() {
    return (
        <section id="audience" className="py-24 container mx-auto px-4">
            <div className="text-center mb-16">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6 inline-block"
                >
                    ¿Para quién es Mi Partido?
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl font-bold mt-4"
                >
                    Si vos sos el que mueve el partido... <br className="hidden md:block" />esta app es tuya.
                </motion.h2>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
                {audiences.map((item, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariant}
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/20 border border-secondary/40 hover:border-primary/50 transition-colors duration-300"
                    >
                        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-foreground mb-4 shadow-sm">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.text}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}
