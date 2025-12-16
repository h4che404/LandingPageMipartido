"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function OrganizersCTA() {
    const whatsappLink = "https://wa.me/5492614616717?text=" + encodeURIComponent("Hola! Tengo una cancha y me interesa sumarme al piloto de Mi Partido")

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
                    <h2 className="text-3xl font-bold">¿Tenés cancha en Zona Este?</h2>
                    <p className="text-muted-foreground text-lg">
                        Estamos sumando canchas al piloto en San Martín, Junín y Rivadavia.
                        Probá gratis y empezá a llenar tus huecos.
                    </p>

                    <div className="flex flex-col gap-4 max-w-md mx-auto">
                        <Button size="lg" className="w-full rounded-xl text-lg h-14" asChild>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Sumar mi cancha por WhatsApp
                            </a>
                        </Button>
                        <p className="text-sm text-muted-foreground/60">
                            Te respondemos en menos de 24hs
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

