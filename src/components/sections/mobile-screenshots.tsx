import Image from "next/image"

const screenshots = [
    {
        src: "/images/mobile/Screenshot_20260408_201953.png",
        alt: "Pantalla de inicio con complejos cercanos",
        title: "1. Inicio inteligente",
        caption: "Descubrí complejos cerca tuyo por modo de juego, distancia y precio.",
    },
    {
        src: "/images/mobile/Screenshot_20260408_204711.png",
        alt: "Pantalla de reserva con detalle de canchas disponibles",
        title: "2. Reserva en segundos",
        caption: "Entrá al complejo, compará canchas y elegí horario desde la misma vista.",
    },
    {
        src: "/images/mobile/Screenshot_20260408_204657.png",
        alt: "Pantalla de perfil del jugador con estadísticas",
        title: "3. Perfil del jugador",
        caption: "Mostrá tu nivel, deportes favoritos y disponibilidad para próximos partidos.",
    },
    {
        src: "/images/mobile/Screenshot_20260408_204638.png",
        alt: "Menú lateral con accesos a reservas, pagos y ajustes",
        title: "4. Gestión desde menú",
        caption: "Accedé rápido a reservas, pagos, amigos, notificaciones y configuración.",
    },
]

export function MobileScreenshots() {
    return (
        <section className="py-24 bg-background border-y border-border/60">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Mirá la app mobile por dentro
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Estas son capturas reales de la experiencia dentro de Mi Partido.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {screenshots.map((screenshot) => (
                        <div key={screenshot.src} className="mx-auto w-full max-w-[280px]">
                            <figure className="rounded-[2.4rem] border-[8px] border-zinc-900 bg-zinc-950 shadow-2xl overflow-hidden">
                                <div className="h-7 bg-black flex items-center justify-center">
                                    <div className="w-20 h-4 rounded-b-xl bg-zinc-800" />
                                </div>
                                <Image
                                    src={screenshot.src}
                                    alt={screenshot.alt}
                                    width={1080}
                                    height={2340}
                                    className="w-full h-auto object-cover"
                                    priority={false}
                                />
                            </figure>
                            <figcaption className="mt-4 px-1 text-center">
                                <p className="font-semibold text-foreground">{screenshot.title}</p>
                                <p className="text-sm text-muted-foreground mt-1">{screenshot.caption}</p>
                            </figcaption>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
