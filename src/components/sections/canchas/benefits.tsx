"use client"

import { motion } from "framer-motion"
import { Clock, ShieldCheck, Wallet, Eye, BarChart3, WifiOff } from "lucide-react"

const benefits = [
    {
        icon: Clock,
        title: "Ahorrá tiempo",
        desc: "Menos horas perdidas respondiendo WhatsApps y ordenando cuadernos."
    },
    {
        icon: ShieldCheck,
        title: "Evitá errores",
        desc: "El sistema previene dobles turnos y cruces de horarios automáticamente."
    },
    {
        icon: Wallet,
        title: "Cobrá mejor",
        desc: "Llevá un control estricto de señas, pagos pendientes y cierres de caja."
    },
    {
        icon: Eye,
        title: "Mostrá mejor tus canchas",
        desc: "Un perfil profesional para que tus clientes vean tus instalaciones impecables."
    },
    {
        icon: BarChart3,
        title: "Tomá decisiones con datos",
        desc: "Entendé qué horarios rinden más y cuáles necesitan promociones."
    },
    {
        icon: WifiOff,
        title: "Cero frenos por internet",
        desc: "Tu recepción sigue operando al 100% aunque se corte la conexión."
    }
]

export function Benefits() {
    return (
        <section className="py-24 bg-muted/40">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        El resultado de usar Mi Partido
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Una cosa es lo que hace el software, y otra muy distinta es lo que ganás vos 
                        como dueño del complejo.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card border border-border/50 p-8 rounded-2xl hover:border-primary/50 transition-colors group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                <benefit.icon className="w-7 h-7" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">{benefit.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {benefit.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
