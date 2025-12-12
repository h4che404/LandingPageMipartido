"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Trophy, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MatchCard } from "@/components/features/match-card"

export function Hero() {
    const [mode, setMode] = useState<"social" | "competitive">("social")

    const isSocial = mode === "social"

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-20 pb-12">

            {/* Dynamic Background Glow */}
            <motion.div
                animate={{
                    background: isSocial
                        ? "radial-gradient(circle at 50% 10%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)" // Blue
                        : "radial-gradient(circle at 50% 10%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)" // Violet
                }}
                transition={{ duration: 1 }}
                className="absolute inset-0 pointer-events-none z-0"
            />

            <div className="container px-4 md:px-6 z-10 mx-auto">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">

                    {/* Badge / Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center rounded-full border border-border bg-secondary/50 backdrop-blur-sm px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        Piloto activo en Mendoza — Sumate al acceso anticipado
                    </motion.div>

                    {/* Headline */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground text-balance">
                            Encontrá o creá <br className="hidden md:block" />
                            <span className="relative">
                                partidos cerca.
                                <motion.svg
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className={cn(
                                        "absolute -bottom-2 md:-bottom-4 left-0 w-full h-3 md:h-4 opacity-70",
                                        isSocial ? "text-primary" : "text-accent"
                                    )}
                                    fill="none"
                                    viewBox="0 0 200 10"
                                    preserveAspectRatio="none"
                                >
                                    <path d="M0 5 Q 100 10 200 5" stroke="currentColor" strokeWidth="3" />
                                </motion.svg>
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                            Confirmaciones automáticas, chat integrado y modos
                            <span className={isSocial ? "text-primary font-semibold" : ""}> Social </span>
                            o
                            <span className={!isSocial ? "text-accent font-semibold" : ""}> Competitivo </span>
                            según lo que pinte hoy. Tu ritmo, tus reglas.
                        </p>
                    </div>

                    {/* Toggle Control */}
                    <div className="flex items-center gap-4 bg-secondary/30 p-1.5 rounded-full border border-border/50 backdrop-blur-md">
                        <button
                            onClick={() => setMode("social")}
                            className={cn(
                                "relative flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                isSocial ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {isSocial && (
                                <motion.div
                                    layoutId="toggle-bg"
                                    className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/20"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                <Users className="w-4 h-4" /> Social
                            </span>
                        </button>
                        <button
                            onClick={() => setMode("competitive")}
                            className={cn(
                                "relative flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                !isSocial ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {!isSocial && (
                                <motion.div
                                    layoutId="toggle-bg"
                                    className="absolute inset-0 bg-accent rounded-full shadow-lg shadow-accent/20"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                <Trophy className="w-4 h-4" /> Competitivo
                            </span>
                        </button>
                    </div>

                    {/* Interactive Mockup Container */}
                    <div className="relative w-full max-w-md mx-auto h-[320px] md:h-[350px] flex items-center justify-center perspective-1000">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, rotateX: 20, y: 40 }}
                                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                                exit={{ opacity: 0, rotateX: -20, y: -40 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="absolute inset-0 flex items-center justify-center p-4"
                            >
                                <MatchCard mode={mode} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Main Action CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        <Button size="lg" className="h-12 px-8 rounded-full text-base shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all font-bold">
                            Sumarme a la lista <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                            Soy organizador / tengo cancha
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    )
}
