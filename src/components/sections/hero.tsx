"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Trophy, Zap } from "lucide-react"
import { PhoneMockup } from "@/components/ui/phone-mockup"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { useState, useEffect } from "react"
import { BetaJoinModal } from "@/components/features/beta-join-modal"
import { createClient } from "@/lib/supabase/client"

interface BetaMember {
    avatar_url: string | null
    display_name: string
}

export function Hero() {
    const { mode, setMode } = useTheme()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalRole, setModalRole] = useState<"player" | "court">("player")
    const [betaMembers, setBetaMembers] = useState<BetaMember[]>([])
    const [betaCount, setBetaCount] = useState(0)

    useEffect(() => {
        async function fetchBetaMembers() {
            const supabase = createClient()

            // Get count
            const { count } = await supabase
                .from("public_beta_members")
                .select("*", { count: "exact", head: true })

            if (count !== null) setBetaCount(count)

            // Get first 5 members with avatars
            const { data } = await supabase
                .from("public_beta_members")
                .select("avatar_url, display_name")
                .not("avatar_url", "is", null)
                .order("created_at", { ascending: false })
                .limit(5)

            if (data) setBetaMembers(data)
        }

        fetchBetaMembers()
    }, [])

    const openModal = (role: "player" | "court") => {
        console.log(`cta_join_click: ${role}`)
        setModalRole(role)
        setIsModalOpen(true)
    }

    const scrollToForm = () => {
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-secondary/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text */}
                    <div className="space-y-8 text-left">

                        {/* Mode Toggle */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center bg-card rounded-full p-1 border border-border"
                        >
                            <button
                                onClick={() => setMode("amistoso")}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${mode === "amistoso"
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                Amistoso
                            </button>
                            <button
                                onClick={() => setMode("competitivo")}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${mode === "competitivo"
                                    ? "bg-secondary text-secondary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                Competitivo
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            key={mode} // Re-animate on mode change
                            className="min-h-[180px] lg:min-h-[200px] flex flex-col justify-center"
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.05]">
                                {mode === "amistoso" ? (
                                    <>
                                        Encontrá o creá <br />
                                        partidos cerca.
                                    </>
                                ) : (
                                    <>
                                        Creá tu historia. <br />
                                        Subí de nivel.
                                    </>
                                )}
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
                                {mode === "amistoso" ? (
                                    <>
                                        Jugá más, organizá menos. La app que Mendoza estaba esperando.
                                        <span className="text-foreground/80 block mt-1 font-medium">✨ Piloto Zona Este — San Martín, Junín, Rivadavia.</span>
                                    </>
                                ) : (
                                    <>
                                        Estadísticas, rankings y torneos. Elevá tu nivel competitivo.
                                        <span className="text-foreground/80 block mt-1 font-medium">🏆 Formá parte de la élite amateur.</span>
                                    </>
                                )}
                            </p>
                        </motion.div>

                        {/* Sports Tags */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-2"
                        >
                            {["FÚTBOL", "PÁDEL", "TENIS"].map((sport) => (
                                <span key={sport} className="flex items-center gap-1.5 px-3 py-1 bg-card border border-border rounded-lg text-[10px] font-bold text-muted-foreground tracking-wider">
                                    <Trophy className="w-3 h-3 text-primary" />
                                    {sport}
                                </span>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <Button
                                size="lg"
                                onClick={() => openModal("player")}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 h-14 font-bold text-base shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                            >
                                Entrar a la beta
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => openModal("court")}
                                className="border-border bg-transparent text-foreground hover:bg-card rounded-xl h-14 px-8 text-base"
                            >
                                Sumar mi cancha
                            </Button>
                        </motion.div>

                        <BetaJoinModal
                            isOpen={isModalOpen}
                            onOpenChange={setIsModalOpen}
                            defaultRole={modalRole}
                        />

                        {/* Trust Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="border-t border-border pt-6 space-y-4"
                        >
                            <p className="flex items-center text-sm text-primary font-medium">
                                <Zap className="w-4 h-4 mr-2 fill-current" />
                                Jugadores que organizan partidos tienen prioridad en la beta.
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {betaMembers.length > 0 ? (
                                        betaMembers.slice(0, 5).map((member, i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                                                {member.avatar_url ? (
                                                    <img
                                                        src={member.avatar_url}
                                                        alt={member.display_name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/50 flex items-center justify-center text-xs font-bold text-primary-foreground">
                                                        {member.display_name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        [1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                                                <div className="w-full h-full bg-gradient-to-br from-muted-foreground/30 to-muted-foreground/50" />
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    <strong className="text-foreground">+{betaCount > 0 ? betaCount : 428}</strong> jugadores en espera
                                </div>
                            </div>

                            <div className="text-xs text-muted-foreground/60">
                                No publicamos nada sin tu permiso. Podés darte de baja cuando quieras. <br />
                                <span className="underline cursor-pointer hover:text-muted-foreground">Términos</span> / <span className="underline cursor-pointer hover:text-muted-foreground">Privacidad</span>
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
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[600px] bg-primary/10 blur-[80px] rounded-full -z-10" />

                        <PhoneMockup />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
