"use client"

import { motion } from "framer-motion"
import { Users, Calendar, CreditCard, Trophy, MapPin, Bell, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const benefits = [
    {
        icon: Users,
        title: "Encontrá jugadores",
        desc: "Nunca más te quedes sin equipo. Conectá con jugadores de tu nivel cerca tuyo."
    },
    {
        icon: Calendar,
        title: "Organizá en minutos",
        desc: "Creá partidos, armá equipos y confirmá asistencia. Todo desde la app."
    },
    {
        icon: CreditCard,
        title: "Pagos claros",
        desc: "Dividí gastos automáticamente. Sabé quién pagó y quién debe."
    },
    {
        icon: Trophy,
        title: "Partidos parejos",
        desc: "Sistema de niveles para que los partidos sean equilibrados y competitivos."
    },
    {
        icon: MapPin,
        title: "Canchas cerca",
        desc: "Descubrí canchas disponibles en tu zona y reservá al instante."
    },
    {
        icon: Bell,
        title: "Notificaciones",
        desc: "Te avisamos cuando hay lugar, cuando alguien se baja, o cuando hay partido."
    },
    {
        icon: Shield,
        title: "Perfiles verificados",
        desc: "Jugá con gente real. Reputación y valoraciones para cada jugador."
    },
    {
        icon: Zap,
        title: "Sin vueltas",
        desc: "3 clics y estás adentro. Nada de grupos de WhatsApp interminables."
    }
]

export default function BeneficiosPage() {
    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6"
                    >
                        Todo lo que necesitás <br />
                        <span className="text-primary">para jugar más.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-400"
                    >
                        Mi Partido te simplifica la vida. Armá partidos, encontrá jugadores y reservá canchas en un solo lugar.
                    </motion.p>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {benefits.map((b, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="bg-[#111827] border border-white/5 p-6 rounded-2xl hover:border-primary/30 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                                <b.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg text-white mb-2">{b.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{b.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-10 h-14 font-bold text-base">
                        <Link href="/#waitlist">Sumarme a la beta</Link>
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}
