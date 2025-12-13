import { z } from "zod"

export const waitlistSchema = z.object({
    name: z.string().min(2, "Nombre requerido"),
    city: z.string().min(2, "Ciudad / Zona requerida"),
    sport: z.enum(["padel", "futbol", "tenis", "basket", "otro"]),
    contact: z.string().min(5, "WhatsApp o Email requerido"),
    _hp: z.string().max(0).optional(),
})

export type WaitlistSchema = z.infer<typeof waitlistSchema>
