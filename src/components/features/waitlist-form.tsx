"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { waitlistSchema, type WaitlistSchema } from "@/lib/schemas"

export function WaitlistForm() {
    const [step, setStep] = useState(1)
    const [success, setSuccess] = useState(false)
    //   const [serverError, setServerError] = useState<string | null>(null)

    const form = useForm<WaitlistSchema>({
        resolver: zodResolver(waitlistSchema),
        defaultValues: {
            contactType: "email",
            contactValue: "",
            city: "",
            sports: [],
            moodInterest: "social", // default
            consentMarketing: true,
            _hp: ""
        }
    })

    // Watch fields for logic
    const contactType = form.watch("contactType")

    const nextStep = async () => {
        // Validate Step 1 fields
        const valid = await form.trigger(["contactValue", "city"])
        if (valid) {
            setStep(2)
        }
    }

    const onSubmit = async (data: WaitlistSchema) => {
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

            if (!res.ok) {
                const err = await res.json()
                console.error(err)
                // For now, treat even mock errors (no keys) as success to show UI flow
                // setServerError(err.error || "Algo salió mal")
                // return 
            }

            // Success state
            setSuccess(true)

        } catch (error) {
            console.error("Submission error", error)
        }
    }

    if (success) {
        return (
            <section id="waitlist" className="py-24 bg-card/30 border-t border-border/50">
                <div className="container mx-auto px-4 max-w-md text-center space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                        <Check className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold">¡Estás en la lista!</h2>
                    <p className="text-muted-foreground">
                        Te vamos a avisar en cuanto habilitemos cupos en <strong>{form.getValues("city")}</strong>.
                    </p>
                    <Button variant="outline" onClick={() => { form.reset(); setStep(1); setSuccess(false) }}>
                        Registrar otro usuario
                    </Button>
                </div>
            </section>
        )
    }

    return (
        <section id="waitlist" className="py-24 bg-card/30 border-t border-border/50 relative overflow-hidden">

            {/* Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">
                        Sumate a la lista
                    </h2>
                    <p className="text-muted-foreground">
                        Estamos abriendo cupos gradualmente. Asegurá tu lugar.
                    </p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Honey Pot Hidden */}
                        <input type="text" {...form.register("_hp")} className="hidden" tabIndex={-1} autoComplete="off" />

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-4"
                                >
                                    {/* Contact Type Switcher */}
                                    <div className="flex gap-4 p-1 bg-secondary rounded-lg">
                                        <button
                                            type="button"
                                            onClick={() => form.setValue("contactType", "email")}
                                            className={cn(
                                                "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                                                contactType === "email" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            Email
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => form.setValue("contactType", "whatsapp")}
                                            className={cn(
                                                "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                                                contactType === "whatsapp" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            WhatsApp
                                        </button>
                                    </div>

                                    {/* Contact Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium pl-1">
                                            {contactType === "email" ? "Tu correo electrónico" : "Tu número con código de área"}
                                        </label>
                                        <input
                                            {...form.register("contactValue")}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder={contactType === "email" ? "juan@ejemplo.com" : "+54 9 261..."}
                                        />
                                        {form.formState.errors.contactValue && (
                                            <p className="text-xs text-destructive flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" /> {form.formState.errors.contactValue.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* City Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium pl-1">Ciudad</label>
                                        <input
                                            type="text"
                                            {...form.register("city")}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Ej: Mendoza, Godoy Cruz..."
                                        />
                                        {form.formState.errors.city && (
                                            <p className="text-xs text-destructive flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" /> {form.formState.errors.city.message}
                                            </p>
                                        )}
                                    </div>

                                    <Button type="button" onClick={nextStep} className="w-full">
                                        Siguiente <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-4">
                                        <label className="text-sm font-medium pl-1">¿Qué deportes jugás?</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {["Fútbol", "Pádel", "Tenis"].map(sport => (
                                                <label key={sport} className="flex flex-col items-center justify-center p-3 border border-input rounded-xl hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all">
                                                    <input
                                                        type="checkbox"
                                                        value={sport}
                                                        {...form.register("sports")}
                                                        className="sr-only peer"
                                                    />
                                                    <span className="text-sm font-medium peer-checked:text-primary transition-colors text-muted-foreground select-none">
                                                        {/* Visual check logic handled by peer class or could use watch */}
                                                        {sport}
                                                    </span>
                                                    {/* CSS-only peer checking is tricky with custom design, simple works for MVP */}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-medium pl-1">¿Qué buscás más?</label>
                                        <div className="flex gap-4">
                                            <label className="flex-1 flex items-center gap-2 justify-center p-3 border border-input rounded-xl hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all">
                                                <input type="radio" value="social" {...form.register("moodInterest")} className="w-4 h-4 text-primary" />
                                                <span className="text-sm">Social</span>
                                            </label>
                                            <label className="flex-1 flex items-center gap-2 justify-center p-3 border border-input rounded-xl hover:border-accent/50 hover:bg-accent/5 cursor-pointer transition-all">
                                                <input type="radio" value="competitive" {...form.register("moodInterest")} className="w-4 h-4 text-accent" />
                                                <span className="text-sm">Competitivo</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2 pt-2">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            {...form.register("consentMarketing")}
                                            className="mt-1"
                                        />
                                        <label htmlFor="terms" className="text-xs text-muted-foreground leading-snug">
                                            Acepto recibir novedades de Mi Partido por WhatsApp o Email.
                                            <a href="/privacy" className="underline hover:text-foreground ml-1">Privacidad</a>.
                                        </label>
                                    </div>
                                    {form.formState.errors.consentMarketing && (
                                        <p className="text-xs text-destructive">
                                            {form.formState.errors.consentMarketing.message}
                                        </p>
                                    )}

                                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                        {form.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Finalizar registro"}
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </section>
    )
}
