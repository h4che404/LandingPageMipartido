"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const features = [
    {
        title: "Gestión del complejo",
        description: "Cargá el nombre, dirección, contacto, fotos y datos comerciales de tu complejo en un solo lugar.",
        benefits: ["Mostrás tu negocio de forma profesional", "Listo para recibir reservas"],
        image: "/images/canchas/feature-complejo.png",
        callouts: [
            { top: "20%", left: "-5%", text: "Fotos que venden" },
            { top: "60%", right: "-5%", text: "Perfil listo en minutos" }
        ],
        reversed: false
    },
    {
        title: "Administración de canchas",
        description: "Creá tus canchas asignando deporte, superficie, iluminación y precios diferenciados.",
        benefits: ["Cada cancha queda bien presentada", "Se venden mejor y más rápido"],
        image: "/images/canchas/feature-canchas.png",
        callouts: [
            { top: "30%", right: "-10%", text: "Precios por cancha" },
            { top: "70%", left: "-10%", text: "Fútbol 5, 7 o Pádel" }
        ],
        reversed: true
    },
    {
        title: "Reservas sin solapes",
        description: "Gestioná disponibilidad real por horario. El sistema evita automáticamente dobles reservas.",
        benefits: ["Menos conflictos y enojos", "Más orden en la recepción", "Mostrás solo horarios válidos"],
        image: "/images/canchas/feature-reservas.png",
        callouts: [
            { top: "25%", left: "-10%", text: "Sin dobles reservas" },
            { top: "65%", right: "-5%", text: "Disponibilidad real" }
        ],
        reversed: false
    },
    {
        title: "Caja, ventas y stock",
        description: "Controlá cobros de señas, productos tipo kiosco, inventario y todos los movimientos diarios.",
        benefits: ["Orden financiero total", "Menos pérdidas de caja", "Control de deudores"],
        image: "/images/canchas/feature-caja.png",
        callouts: [
            { top: "40%", right: "-10%", text: "Caja controlada" },
            { top: "80%", left: "-5%", text: "Cobro de señas" }
        ],
        reversed: true
    },
    {
        title: "Reportes automatizados",
        description: "Visualizá ocupación, ingresos y rendimiento por cancha de manera gráfica y simple.",
        benefits: ["Detectá horarios pico", "Compará qué rinde más", "Tomá decisiones con datos"],
        image: "/images/canchas/feature-reportes.png",
        callouts: [
            { top: "15%", right: "-5%", text: "Rendimiento mensual" },
            { top: "55%", left: "-10%", text: "Ocupación por hora" }
        ],
        reversed: false
    }
]

export function CoreFeatures() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 max-w-6xl space-y-32">
                
                {features.map((feature, idx) => (
                    <div 
                        key={idx} 
                        className={`flex flex-col ${feature.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}
                    >
                        {/* Text Block */}
                        <div className="w-full lg:w-1/2 space-y-6">
                            <h2 className="text-3xl lg:text-4xl font-bold">{feature.title}</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                            
                            <div className="space-y-3 pt-4">
                                <p className="text-sm font-bold text-primary uppercase tracking-wider">Beneficios para vos:</p>
                                {feature.benefits.map((benefit, bIdx) => (
                                    <div key={bIdx} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="font-medium text-foreground">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image Block with Callouts */}
                        <div className="w-full lg:w-1/2 relative">
                            {/* Decorative background glow */}
                            <div className="absolute inset-0 bg-primary/5 blur-[50px] rounded-[30px] -z-10" />
                            
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="relative rounded-2xl border border-border/50 bg-card p-2 shadow-2xl"
                            >
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-auto rounded-xl object-cover bg-muted min-h-[250px]"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                                <div className="hidden absolute inset-0 m-2 bg-muted rounded-xl border border-border flex items-center justify-center">
                                    <span className="text-muted-foreground font-bold font-mono">
                                        Mockup: {feature.title}
                                    </span>
                                </div>

                                {/* Floating Callouts */}
                                {feature.callouts.map((callout, cIdx) => (
                                    <motion.div
                                        key={cIdx}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + (cIdx * 0.2) }}
                                        viewport={{ once: true }}
                                        className="absolute bg-background border border-primary/30 shadow-lg px-4 py-2 rounded-lg text-sm font-bold text-primary z-20 whitespace-nowrap lg:flex hidden items-center gap-2"
                                        style={{ top: callout.top, left: callout.left, right: callout.right }}
                                    >
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        {callout.text}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                    </div>
                ))}

            </div>
        </section>
    )
}
