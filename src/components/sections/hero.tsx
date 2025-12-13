"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Trophy, Zap } from "lucide-react"
import { PhoneMockup } from "@/components/ui/phone-mockup"
import Link from "next/link"

export function Hero() {
    const scrollToForm = () => {
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text */}
                    <div className="space-y-8 text-left">

                        {/* Toggle Pill */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center bg-[#111827] rounded-full p-1 border border-white/5"
                        >
                            <span className="px-4 py-1.5 rounded-full bg-[#1E293B] text-blue-400 text-xs font-bold tracking-wide shadow-sm">
                                Amistoso
                            </span>
                            <span className="px-4 py-1.5 text-gray-400 text-xs font-medium hover:text-white transition-colors cursor-pointer">
                                Competitivo
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
                                Encontrá o creá <br />
                                partidos cerca.
                            </h1>
                            <p className="mt-6 text-lg text-gray-400 max-w-lg leading-relaxed">
                                Para jugadores y canchas. Sumate al acceso anticipado.
                                <span className="text-gray-300 block mt-1">Piloto en Mendoza — acceso anticipado.</span>
                            </p>
                        </motion.div>

                        {/* Sports Tags */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-2"
                        >
                            {["FÚTBOL", "PÁDEL", "TENIS"].map((sport, i) => (
                                <span key={sport} className="flex items-center gap-1.5 px-3 py-1 bg-[#1E293B] border border-white/5 rounded-lg text-[10px] font-bold text-gray-300 tracking-wider">
                                    <Trophy className="w-3 h-3 text-yellow-500" />
                                    {sport}
                                </span>
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
                                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 h-14 font-bold text-base shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                            >
                                Entrar como Capitán Fundador
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="border-[#1E293B] bg-transparent text-white hover:bg-[#1E293B] hover:text-white rounded-xl h-14 px-8 text-base"
                            >
                                <Link href="/canchas">Soy Cancha / Organizador</Link>
                            </Button>
                        </motion.div>

                        {/* Trust Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="border-t border-white/5 pt-6 space-y-4"
                        >
                            <p className="flex items-center text-sm text-green-400 font-medium">
                                <Zap className="w-4 h-4 mr-2 fill-current" />
                                Jugadores que organizan partidos tienen prioridad en la beta.
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {/* Simple Avatar placeholders */}
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#090C14] bg-gray-700 overflow-hidden">
                                            <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-600" />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm text-gray-400">
                                    <strong className="text-white">+428</strong> jugadores en espera
                                </div>
                            </div>

                            <div className="text-xs text-gray-600">
                                No publicamos nada sin tu permiso. Podés darte de baja cuando quieras. <br />
                                <span className="underline cursor-pointer hover:text-gray-400">Términos</span> / <span className="underline cursor-pointer hover:text-gray-400">Privacidad</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Phone */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center lg:justify-end relative"
                    >
                        {/* Glow behind phone */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[600px] bg-primary/10 blur-[80px] rounded-full -z-10" />

                        <PhoneMockup />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
