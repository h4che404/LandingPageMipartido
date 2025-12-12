import { BadgeCheck, Trophy, Users, Beer, Timer, ShieldAlert } from "lucide-react"

export function Features() {
    return (
        <section id="modes" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Dos modos, una misma app.
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Porque no es lo mismo jugar con amigos del laburo que jugar la final del torneo.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    {/* Social Card */}
                    <div className="group relative rounded-3xl border border-border p-8 bg-card/50 hover:bg-card transition-colors">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary" />
                        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Modo Social</h3>
                        <p className="text-muted-foreground mb-8">
                            Para divertirse, correr un rato y cortar la semana. Sin presiones, sin dramas.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Beer className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm">Ideal para amistosos y partidos casuales.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm">Confirmación simple: ¿Venís? Listo.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm">Si falta uno, invitá un suplente en 1 click.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Competitive Card */}
                    <div className="group relative rounded-3xl border border-border p-8 bg-card/50 hover:bg-card transition-colors">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/50 to-accent" />
                        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Modo Competitivo</h3>
                        <p className="text-muted-foreground mb-8">
                            Para los que juegan por los puntos. Reglas claras, niveles y estadísticas.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Trophy className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                <span className="text-sm">Torneos, ligas y rankings automáticos.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Timer className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                <span className="text-sm">Puntualidad exigida y sanciones por 'ghosting'.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ShieldAlert className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                <span className="text-sm">Nivelación de equipos por estadísticas reales.</span>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </section>
    )
}
