"use client"

import { CheckCircle2, Trophy, Users, CalendarCheck, MapPin } from "lucide-react"

const benefits = [
    {
        title: "Confirmación de asistencia",
        description: "Olvidate de perseguir gente. Lista de espera automática y recordatorios.",
        icon: CalendarCheck,
    },
    {
        title: "Partidos mejor armados",
        description: "Equilibrio por nivel, edad o historial. Menos goleadas, más diversión.",
        icon: Trophy,
    },
    {
        title: "Organización simple",
        description: "Creá un partido, compartí el link y listo. Nosotros armamos los equipos.",
        icon: Users,
    },
    {
        title: "Canchas en un solo lugar",
        description: "Encontrá, reservá y pagá tu cancha favorita sin salir de la app.",
        icon: MapPin,
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
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
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
