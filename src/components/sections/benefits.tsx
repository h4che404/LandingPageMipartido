"use client"

import { CheckCircle2, Trophy, Users, CalendarCheck, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const benefits = [
    {
        title: "Confirmación de asistencia",
        description: "Olvidate de perseguir gente. Lista de espera automática y recordatorios.",
        icon: CalendarCheck,
        available: true,
    },
    {
        title: "Partidos mejor armados",
        description: "Equilibrio por nivel, edad o historial. Menos goleadas, más diversión.",
        icon: Trophy,
        available: true,
    },
    {
        title: "Organización simple",
        description: "Creá un partido, compartí el link y listo. Nosotros armamos los equipos.",
        icon: Users,
        available: true,
    },
    {
        title: "Reservas y pagos",
        description: "Encontrá, reservá y pagá tu cancha favorita sin salir de la app.",
        icon: MapPin,
        available: false,
    },
]

export function Benefits() {
    return (
        <section className="py-24 bg-card">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Todo lo que necesitás para jugar mejor
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Diseñado por jugadores, para jugadores (y organizadores cansados).
                    </p>
                    <p className="text-sm text-muted-foreground/70 mt-4">
                        Lanzamos por etapas: primero organización y partidos; después reservas y pagos.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow"
                        >
                            {!benefit.available && (
                                <Badge variant="secondary" className="absolute top-3 right-3 text-[10px] bg-yellow-500/20 text-yellow-600 border-yellow-500/30">
                                    Próximamente
                                </Badge>
                            )}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${benefit.available ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                <benefit.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">{benefit.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

