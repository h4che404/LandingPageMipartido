"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export function OrganizersHero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 -z-10" />
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto space-y-8"
                >
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                        Tu complejo, bajo control. <br />
                        <span className="text-primary">Desde tu escritorio.</span>
                    </h1>

                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Olvidate del papel y el Excel. Gestioná turnos, visualizá ingresos y conocé a tus jugadores con nuestra aplicación de escritorio diseñada para dueños de canchas.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button asChild size="lg" className="rounded-full px-8 text-lg">
                            <Link href="#contact-organizer">Solicitar Demo</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
