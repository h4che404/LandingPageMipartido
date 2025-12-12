"use client"

import { MapPin, Users, Trophy, Clock, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface MatchCardProps {
    mode: "social" | "competitive"
}

export function MatchCard({ mode }: MatchCardProps) {
    const isSocial = mode === "social"

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
                "relative w-full max-w-sm rounded-2xl border bg-card p-4 shadow-xl overflow-hidden",
                isSocial ? "border-primary/20" : "border-accent/40"
            )}
        >
            {/* Top Gradient Accent */}
            <div className={cn(
                "absolute top-0 left-0 right-0 h-1",
                isSocial ? "bg-gradient-to-r from-primary to-emerald-400" : "bg-gradient-to-r from-accent to-purple-600"
            )} />

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            isSocial ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                        )}>
                            {isSocial ? "Amistoso" : "Torneo Oficial"}
                        </span>
                        {!isSocial && <Shield className="w-3 h-3 text-accent" />}
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                        {isSocial ? "Fútbol 5 - Jueves" : "Final Copa Clausura"}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-xs mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {isSocial ? "El Club, Palermo" : "Sarmiento Arena, Zona Norte"}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xl font-bold font-mono">
                        {isSocial ? "21:00" : "20:30"}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase opacity-80">
                        {isSocial ? "HS" : "PUNTUAL"}
                    </div>
                </div>
            </div>

            {/* Slots / Players */}
            <div className="space-y-3 mb-6">
                {/* Team A vs Team B visual */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[8px] font-bold text-muted-foreground">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <span className="text-xs font-bold text-muted-foreground">VS</span>
                    <div className="flex -space-x-2">
                        {[4, 5].map((i) => (
                            <div key={i} className="w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[8px] font-bold text-muted-foreground">
                                {String.fromCharCode(67 + i)}
                            </div>
                        ))}
                        <div className={cn(
                            "w-7 h-7 rounded-full border-2 border-background border-dashed flex items-center justify-center text-[10px]",
                            isSocial ? "bg-primary/20 text-primary border-primary/50" : "bg-muted text-muted-foreground"
                        )}>
                            {isSocial ? "+1" : ""}
                        </div>
                    </div>
                </div>

                {/* Message bubble */}
                <div className="bg-secondary/30 rounded-lg p-2.5 flex gap-2 items-center">
                    <div className="w-1.5 h-full rounded-full bg-muted shrink-0" />
                    <p className="text-xs text-muted-foreground line-clamp-1 italic">
                        {isSocial ? '"Falta uno y cerramos! Quién viene?"' : '"Traigan DNI. Árbitro confirmado."'}
                    </p>
                </div>
            </div>

            {/* Button */}
            <div className="flex gap-2">
                <button className={cn(
                    "flex-1 rounded-lg py-2 text-xs font-bold transition-all shadow-lg",
                    isSocial
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-accent text-accent-foreground hover:bg-accent/90"
                )}>
                    {isSocial ? "Confirmar asistencia" : "Ver formación"}
                </button>
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary text-muted-foreground">
                    <Users className="w-4 h-4" />
                </div>
            </div>
        </motion.div>
    )
}
