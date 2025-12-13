"use client"

import { motion } from "framer-motion"
import { LayoutDashboard, CalendarRange, Users, BarChart3 } from "lucide-react"

const features = [
    {
        icon: LayoutDashboard,
        title: "Dashboard en Tiempo Real",
        desc: "Visualizá el estado de todas tus canchas en una sola pantalla. Ocupación actual, próximas reservas y huecos disponibles."
    },
    {
        icon: CalendarRange,
        title: "Gestión de Turnos",
        desc: "Calendario intuitivo drag-and-drop. Agendá, mové o cancelá turnos en segundos. Sincronizado para evitar doble reserva."
    },
    {
        icon: BarChart3,
        title: "Métricas de Ingresos",
        desc: "Reportes detallados de facturación diaria, semanal y mensual. Sabé exactamente cuánto entra y por qué concepto."
    },
    {
        icon: Users,
        title: "Historial de Jugadores",
        desc: "Base de datos de tus clientes. Identificá a los más fieles, bloqueá a los que te fallan y personalizá la atención."
    }
]

export function OrganizersFeatures() {
    return (
        <section className="py-24 bg-card/10">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Todo lo que necesitás para operar</h2>
                    <p className="text-muted-foreground">Una suite completa de herramientas administrativas, sin la complejidad.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card border border-border/50 p-6 rounded-2xl hover:border-primary/20 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
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
