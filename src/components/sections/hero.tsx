"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export function Hero() {
    const scrollToForm = () => {
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">

            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50" />

            <div className="container px-4 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]">
                        Menos WhatsApp.<br />
                        <span className="text-primary block mt-2">Más Partido.</span>
                    </h1>

                    <h2 className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        La app para organizar partidos sin caos, sin excusas y con partidos justos.
                    </h2>

                    <div className="pt-8">
                        <Button
                            size="lg"
                            className="text-lg px-8 py-6 h-auto rounded-full shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] hover:shadow-[0_0_60px_-10px_rgba(var(--primary),0.8)] transition-all duration-300 transform hover:scale-105"
                            onClick={scrollToForm}
                        >
                            Quiero ser parte de la beta
                        </Button>
                    </div>

                    <div className="pt-20 opacity-50 animate-bounce">
                        <ArrowDown className="mx-auto w-6 h-6" />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
