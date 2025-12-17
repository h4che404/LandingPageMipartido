"use client"

import { motion } from "framer-motion"
import { CalendarDays, BellRing, ListChecks, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const features = [
    {
        icon: CalendarDays,
        title: "Calendario de turnos simple",
        desc: "Visualizá tu semana de un vistazo. Agendá turnos en segundos, sin complicaciones.",
        available: true,
    },
    {
        icon: BellRing,
        title: "Confirmaciones y recordatorios",
        desc: "Cada jugador recibe recordatorio automático. Menos plantones, más certeza.",
        available: true,
    },
    {
        icon: ListChecks,
        title: "Lista de espera para huecos",
        desc: "¿Se liberó un horario? Avisamos automáticamente a quien esté esperando.",
        available: true,
    },
    {
        icon: Zap,
        title: "Promos último minuto",
        desc: "Llenate los huecos con ofertas flash cuando tengas cancelaciones.",
        available: false,
    }
]

export function OrganizersFeatures() {
    return (
        <section className="py-24 bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Menos WhatsApp, más orden</h2>
                    <p className="text-muted-foreground">Herramientas simples para llenar tus canchas y reducir plantones.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="relative bg-card border border-border/50 p-6 rounded-2xl hover:border-primary/20 transition-colors"
                        >
                            {!f.available && (
                                <Badge variant="secondary" className="absolute top-3 right-3 text-[10px] bg-yellow-500/20 text-yellow-600 border-yellow-500/30">
                                    Próximamente
                                </Badge>
                            )}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${f.available ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                <f.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-3">{f.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

