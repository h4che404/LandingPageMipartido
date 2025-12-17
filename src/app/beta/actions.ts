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

    const role = (formData.get("role") as string) || "player"
    const full_name = formData.get("full_name") as string
    const city = formData.get("city") as string
    const sport = formData.get("sport") as string
    const whatsapp = formData.get("whatsapp") as string
    const allow_public = formData.get("allow_public") === "on"

    // Court-specific fields
    const court_name = formData.get("court_name") as string
    const court_address = formData.get("court_address") as string
    const court_lat_str = formData.get("court_lat") as string
    const court_lng_str = formData.get("court_lng") as string
    const court_lat = court_lat_str ? parseFloat(court_lat_str) : null
    const court_lng = court_lng_str ? parseFloat(court_lng_str) : null

    // Build the profile data
    const profileData: Record<string, any> = {
        user_id: user.id,
        full_name,
        city,
        sport,
        whatsapp,
        allow_public: role === "court" ? true : allow_public, // Courts are always public
        role,
        updated_at: new Date().toISOString(),
    }

    // Add court-specific fields if role is court
    if (role === "court") {
        profileData.court_name = court_name
        profileData.court_address = court_address
        profileData.court_lat = court_lat
        profileData.court_lng = court_lng
        profileData.court_status = "pending" // New courts start as pending
    }

    const { error } = await supabase.from("beta_members").upsert(profileData)

    if (error) {
        console.error("Error upserting profile:", error)
        throw new Error("Failed to save profile")
    }

    revalidatePath("/beta")
    revalidatePath("/")

    redirect("/beta")
}

// Admin action to approve/reject courts
export async function updateCourtStatus(userId: string, status: "approved" | "rejected", notes?: string) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error("Not authenticated")

    // Check if user is admin (you should have a proper admin check)
    const { data: adminProfile } = await supabase
        .from("beta_members")
        .select("role")
        .eq("user_id", user.id)
        .single()

    // For now, allow any authenticated user to be admin (you should restrict this)
    // TODO: Add proper admin role check

    const { error } = await supabase
        .from("beta_members")
        .update({
            court_status: status,
            admin_notes: notes || null,
            updated_at: new Date().toISOString()
        })
        .eq("user_id", userId)

    if (error) {
        console.error("Error updating court status:", error)
        throw new Error("Failed to update status")
    }

    revalidatePath("/admin")
    revalidatePath("/beta")
}
