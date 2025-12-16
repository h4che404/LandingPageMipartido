"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Delete a member
export async function deleteMember(userId: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("beta_members")
        .delete()
        .eq("user_id", userId)

    if (error) throw error

    revalidatePath("/admin")
    revalidatePath("/")
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
