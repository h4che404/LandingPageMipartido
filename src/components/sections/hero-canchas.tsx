"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Bell, Sliders, TrendingUp, Monitor, Zap } from "lucide-react"

export function HeroCanchas() {
    const scrollToForm = () => {
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <section className="relative min-h-[95vh] flex items-center pt-32 pb-20 overflow-hidden mode-venue bg-[var(--venue-bg)] text-white">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-[var(--venue-cta)]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: B2B Content */}
                    <div className="space-y-8 text-left">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold tracking-widest text-[var(--venue-highlight)] uppercase"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Piloto en Mendoza
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
                                Llená tus canchas <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                                    sin dolores de cabeza.
                                </span>
                            </h1>
                            <p className="mt-6 text-xl text-gray-400 max-w-lg leading-relaxed font-medium">
                                Publicá partidos, gestioná cupos y confirmaciones. Menos plantones.
                            </p>
                        </motion.div>

                        {/* Features List */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4"
                        >
                            {[
                                { icon: TrendingUp, text: "Más ocupación", color: "text-green-400" },
                                { icon: Sliders, text: "Gestión simple", color: "text-blue-400" },
                                { icon: Bell, text: "Confirmaciones y recordatorios", color: "text-[var(--venue-cta)]" },
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className={`p-1.5 rounded-lg bg-white/5 border border-white/10 ${feature.color}`}>
                                        <feature.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold text-gray-200">{feature.text}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <Button
                                size="lg"
                                onClick={scrollToForm}
                                className="bg-[var(--venue-cta)] text-[var(--venue-cta-text)] hover:bg-[var(--venue-cta)]/90 rounded-xl px-8 h-14 font-bold text-base shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                            >
                                Quiero publicar partidos
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/20 bg-transparent text-white hover:bg-white/10 rounded-xl h-14 px-8 text-base"
                            >
                                Ver demo del panel
                                <Monitor className="ml-2 w-5 h-5 opacity-70" />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Column: Placeholder for Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        {/* Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/20 blur-[100px] rounded-full -z-10" />

                        {/* Placeholder Container */}
                        <div className="relative w-full aspect-[4/3] max-w-[600px] rounded-2xl border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center p-8 backdrop-blur-sm group hover:border-[var(--venue-cta)]/50 transition-colors">
                            <div className="p-4 rounded-full bg-white/10 mb-4 group-hover:scale-110 transition-transform">
                                <Monitor className="w-12 h-12 text-[var(--venue-cta)] opacity-50" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Aquí va el Mockup</h3>
                            <p className="text-sm text-center text-gray-400 max-w-xs">
                                Exportar imagen desde Figma: <br />
                                1. Dashboard (Laptop) + 2. App Móvil (Phone) <br />
                                compuestas en un solo PNG con fondo transparente.
                            </p>
                            <div className="absolute top-4 right-4 px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-bold rounded border border-yellow-500/30 uppercase">
                                Placeholder
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
