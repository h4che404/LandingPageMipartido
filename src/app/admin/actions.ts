"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

import { createAdminClient } from "@/lib/supabase/admin"

// Delete a member
export async function deleteMember(userId: string) {
    const supabase = await createClient()

    try {
        // If it's a manual user (starts with manual_), just delete from table
        if (userId.startsWith("manual_")) {
            const { error } = await supabase
                .from("beta_members")
                .delete()
                .eq("user_id", userId)

            if (error) return { success: false, error: error.message }
        } else {
            // If it's a real user, delete from Auth (which cascades to table)
            // We need service_role key to delete from Auth
            try {
                const adminClient = createAdminClient()
                const { error } = await adminClient.auth.admin.deleteUser(userId)

                if (error) {
                    console.error("Error deleting auth user:", error)
                    return { success: false, error: error.message }
                }
            } catch (err: any) {
                // If createAdminClient fails (missing key), try deleting just from the table as fallback
                // or return a specific error
                console.error("Admin client error:", err)
                return {
                    success: false,
                    error: "Falta configuración de admin (Key). Asegurate de agregar SUPABASE_SERVICE_ROLE_KEY."
                }
            }
        }

        revalidatePath("/admin")
        revalidatePath("/")
        return { success: true }
    } catch (error: any) {
        return { success: false, error: error.message || "Error desconocido" }
    }
}

// Update a member
export async function updateMember(userId: string, data: {
    full_name?: string
    city?: string
    sport?: string
    role?: string
    whatsapp?: string
    allow_public?: boolean
}) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("beta_members")
        .update({
            ...data,
            updated_at: new Date().toISOString()
        })
        .eq("user_id", userId)

    if (error) throw error

    revalidatePath("/admin")
    revalidatePath("/")
}

// Add a new member (manual)
export async function addMember(data: {
    full_name: string
    city: string
    sport: string
    role: string
    whatsapp?: string
    allow_public: boolean
}) {
    const supabase = await createClient()

    // Generate a placeholder user_id for manual entries
    const manualUserId = `manual_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

    const { error } = await supabase
        .from("beta_members")
        .insert({
            user_id: manualUserId,
            full_name: data.full_name,
            city: data.city,
            sport: data.sport,
            role: data.role,
            whatsapp: data.whatsapp || null,
            allow_public: data.allow_public,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        })

    if (error) throw error

    revalidatePath("/admin")
    revalidatePath("/")
}

// Toggle public visibility
export async function togglePublicVisibility(userId: string, currentValue: boolean) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("beta_members")
        .update({
            allow_public: !currentValue,
            updated_at: new Date().toISOString()
        })
        .eq("user_id", userId)

    if (error) throw error

    revalidatePath("/admin")
    revalidatePath("/")
}

// Change role
export async function changeRole(userId: string, newRole: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("beta_members")
        .update({
            role: newRole,
            updated_at: new Date().toISOString()
        })
        .eq("user_id", userId)

    if (error) throw error

    revalidatePath("/admin")
    revalidatePath("/")
}

// Admin action to approve/reject courts
// Admin action to approve/reject courts
export async function updateCourtStatus(userId: string, status: "approved" | "rejected", notes?: string) {
    try {
        const supabase = createAdminClient()

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
            return { success: false, error: error.message }
        }

        revalidatePath("/admin")
        revalidatePath("/beta")
        return { success: true }
    } catch (error: any) {
        console.error("Admin client error:", error)
        return {
            success: false,
            error: error.message.includes("SUPABASE_SERVICE_ROLE_KEY")
                ? "Falta la Service Role Key en las variables de entorno."
                : "Error al actualizar estado"
        }
    }
}
