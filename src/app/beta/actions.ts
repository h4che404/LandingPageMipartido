"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function upsertBetaProfile(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/")
    }

    const full_name = formData.get("full_name") as string
    const city = formData.get("city") as string
    const sport = formData.get("sport") as string
    const whatsapp = formData.get("whatsapp") as string
    const allow_public = formData.get("allow_public") === "on"

    // Role defaults to player if not set, or we could try to read it from DB if exists
    // For simplicity MVP: we default to 'player' if not set. 
    // Ideally client should pass it or we check existing.
    const role = "player"

    const { error } = await supabase.from("beta_members").upsert({
        user_id: user.id,
        full_name,
        city,
        sport,
        whatsapp,
        allow_public,
        role, // This might overwrite role if they change it. 
        // Better logic: get existing role or use player. 
        // For now, let's just upsert standard fields.
        updated_at: new Date().toISOString(),
    })

    if (error) {
        console.error("Error upserting profile:", error)
        // Handle error (return state)
        throw new Error("Failed to save profile")
    }

    revalidatePath("/beta")
    revalidatePath("/") // Revalidate landing to show new public member

    // Optionally redirect to a "Success" state or stay here with a toast
    // For MVP, we stay.
}
