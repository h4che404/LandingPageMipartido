"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TrendingUp, BellOff, LayoutList, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ForCourts() {
    return (
        <section className="py-16 bg-card border-y border-border">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Icon */}
                        <div className="shrink-0">
                            <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                                <MapPin className="w-8 h-8" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <h2 className="text-2xl font-bold">¿Tenés cancha?</h2>
                            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                    Llená horarios valle
                                </span>
                                <span className="flex items-center gap-2">
                                    <BellOff className="w-4 h-4 text-blue-500" />
                                    Menos cancelaciones
                                </span>
                                <span className="flex items-center gap-2">
                                    <LayoutList className="w-4 h-4 text-primary" />
                                    Gestión simple
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground/70">
                                Piloto: San Martín, Junín, Rivadavia — Probá gratis
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="shrink-0">
                            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                                <Link href="/canchas">
                                    Sumar mi cancha
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
