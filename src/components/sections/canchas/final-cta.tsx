"use client"

import { motion } from "framer-motion"
import DownloadButton from "@/components/DownloadButton"
import { CheckCircle2 } from "lucide-react"

export function FinalCTA() {
    return (
        <section className="relative py-32 overflow-hidden bg-[var(--venue-bg)] text-white border-t border-white/10">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--venue-cta)]/10 blur-[150px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center space-y-8"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                        Dejá de renegar con planillas. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            Empezá a gestionar en serio.
                        </span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
                        Ordená tu complejo, evitá errores de cruce de horarios y tené el control total
                        de tu caja desde un solo lugar.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm font-semibold text-gray-300 pt-4 pb-8">
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400" /> Instalación gratuita
                        </span>
                        <span className="hidden sm:inline text-gray-600">•</span>
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400" /> Acceso al piloto
                        </span>
                        <span className="hidden sm:inline text-gray-600">•</span>
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400" /> Soporte por WhatsApp
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md max-w-2xl mx-auto">
                        <DownloadButton />
                        <p className="text-sm text-gray-400 font-medium text-center">
                            Probalo gratis. Configuración inicial en menos de 10 minutos.
                        </p>
                    </div>

                </motion.div>
            </div>
        </section>
    )
}
