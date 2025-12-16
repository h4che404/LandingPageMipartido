"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function BetaSuccessPage() {
    const router = useRouter()
    const [countdown, setCountdown] = useState(5)

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    router.push("/")
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [router])

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md text-center space-y-8"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center"
                >
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                </motion.div>

                <div className="space-y-3">
                    <h1 className="text-3xl font-bold tracking-tight">
                        ¡Tu lugar está asegurado!
                    </h1>
                    <p className="text-muted-foreground">
                        Ya estás en la lista de espera de Mi Partido en Mendoza.
                        Te avisaremos cuando la app esté lista para vos.
                    </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <p className="text-sm text-muted-foreground">
                        ¿Querés ayudarnos a crecer? Compartí Mi Partido con tus amigos y armá partidos más rápido.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Button variant="outline" size="sm">
                            Compartir en WhatsApp
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <Button
                        onClick={() => router.push("/")}
                        className="w-full"
                    >
                        Volver al inicio
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>

                    <p className="text-xs text-muted-foreground">
                        Redirigiendo automáticamente en {countdown} segundos...
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
