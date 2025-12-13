"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function OrganizersCTA() {
    return (
        <section id="contact-organizer" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 -z-10" />
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto bg-card border border-white/10 p-12 rounded-3xl shadow-2xl space-y-8"
                >
                    <h2 className="text-3xl font-bold">Llevá tu administración al siguiente nivel</h2>
                    <p className="text-muted-foreground text-lg">
                        Estamos seleccionando complejos para la beta cerrada del sistema de gestión.
                        Obtené acceso anticipado y precios preferenciales.
                    </p>

                    <div className="flex flex-col gap-4 max-w-md mx-auto">
                        <Button size="lg" className="w-full rounded-xl text-lg h-14" asChild>
                            <a href="mailto:capitanes@mipartido.app">Contactar ventas</a>
                        </Button>
                        <p className="text-sm text-muted-foreground/60">
                            O escribinos a capitanes@mipartido.app
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
