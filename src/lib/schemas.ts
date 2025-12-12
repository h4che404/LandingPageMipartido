import { z } from "zod"

export const waitlistSchema = z.object({
    contactType: z.enum(["email", "whatsapp"]),
    contactValue: z.string().min(3, "Contacto requerido"),
    city: z.string().min(2, "Ciudad requerida"),
    sports: z.array(z.string()).optional(),
    moodInterest: z.enum(["social", "competitive", "both"]).optional(),
    consentMarketing: z.boolean().refine(val => val === true, {
        message: "Debés aceptar para continuar"
    }),
    _hp: z.string().max(0).optional(),
})

export type WaitlistSchema = z.infer<typeof waitlistSchema>
