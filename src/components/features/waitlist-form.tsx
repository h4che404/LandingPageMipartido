"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Loader2, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { waitlistSchema, type WaitlistSchema } from "@/lib/schemas"

export function WaitlistForm() {
    const [success, setSuccess] = useState(false)

    const form = useForm<WaitlistSchema>({
        resolver: zodResolver(waitlistSchema),
        defaultValues: {
            name: "",
            contact: "",
            city: "",
            sport: undefined,
            _hp: ""
        }
    })

    const onSubmit = async (data: WaitlistSchema) => {
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

            if (!res.ok) {
                console.error("Error submitting")
            }
            setSuccess(true)
        } catch (error) {
            console.error("Submission error", error)
        }
    }

    if (success) {
        return (
            <section id="waitlist" className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-md text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mx-auto w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4"
                    >
                        <Check className="w-10 h-10" />
                    </motion.div>
                    <h2 className="text-3xl font-bold">¡Estás dentro!</h2>
                    <p className="text-muted-foreground text-lg">
                        Te avisaremos en cuanto habilitemos cupos en tu zona. <br />
                        Serás parte de los <strong>Usuarios Fundadores</strong>.
                    </p>
                    <Button variant="outline" onClick={() => { form.reset(); setSuccess(false) }} className="mt-4">
                        Anotar a un amigo
                    </Button>
                </div>
            </section>
        )
    }

    return (
        <section id="waitlist" className="py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-primary/5 blur-[100px] -z-10" />

            <div className="container mx-auto px-4 relative z-10 max-w-lg">
                <div className="text-center mb-10 space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Quiero entrar a la beta privada
                    </h2>
                    <p className="text-muted-foreground">
                        Sumate hoy y asegurá tu lugar como usuario fundador.
                    </p>
                </div>

                <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        {/* Honeypot */}
                        <input type="text" {...form.register("_hp")} className="hidden" tabIndex={-1} autoComplete="off" />

                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">Nombre completo</label>
                                <input
                                    {...form.register("name")}
                                    className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:bg-background"
                                    placeholder="Tu nombre"
                                />
                                {form.formState.errors.name && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 ml-1">
                                        {form.formState.errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">Ciudad / Zona</label>
                                <input
                                    {...form.register("city")}
                                    className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:bg-background"
                                    placeholder="Ej: Mendoza, Palermo, Godoy Cruz"
                                />
                                {form.formState.errors.city && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 ml-1">
                                        {form.formState.errors.city.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">Deporte principal</label>
                                <select
                                    {...form.register("sport")}
                                    className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:bg-background appearance-none"
                                >
                                    <option value="" disabled>Seleccioná un deporte</option>
                                    <option value="padel">Pádel</option>
                                    <option value="futbol">Fútbol</option>
                                    <option value="tenis">Tenis</option>
                                    <option value="basket">Basket</option>
                                    <option value="otro">Otro</option>
                                </select>
                                {form.formState.errors.sport && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 ml-1">
                                        {form.formState.errors.sport.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">WhatsApp o Email</label>
                                <input
                                    {...form.register("contact")}
                                    className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:bg-background"
                                    placeholder="+54 9... o tu@email.com"
                                />
                                {form.formState.errors.contact && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 ml-1">
                                        {form.formState.errors.contact.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-12 text-base rounded-xl mt-2" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Quiero entrar a la beta <ArrowRight className="w-4 h-4" />
                                </span>
                            )}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground/60">
                            Tus datos están seguros. No spam, solo partido.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}
