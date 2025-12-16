"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Create a new idea
export async function createIdea(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const imageFile = formData.get("image") as File | null

    let imageUrl = null

    // Upload image if provided
    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${user.id}/${Date.now()}.${fileExt}`

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("ideas-images")
            .upload(fileName, imageFile, {
                cacheControl: '3600',
                upsert: false
            })

        if (!uploadError && uploadData) {
            const { data: { publicUrl } } = supabase.storage
                .from("ideas-images")
                .getPublicUrl(fileName)
            imageUrl = publicUrl
        }
    }

    const { error } = await supabase.from("beta_ideas").insert({
        user_id: user.id,
        title,
        description,
        category,
        image_url: imageUrl,
        votes: 0,
        status: "pending",
        created_at: new Date().toISOString()
    })

    if (error) throw error

    revalidatePath("/beta/ideas")
}

// Vote for an idea
export async function voteIdea(ideaId: string, action: "up" | "down") {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    // Check if user already voted
    const { data: existingVote } = await supabase
        .from("beta_idea_votes")
        .select("*")
        .eq("idea_id", ideaId)
        .eq("user_id", user.id)
        .single()

    if (existingVote) {
        // Remove vote if clicking same action, or update if different
        if (existingVote.vote_type === action) {
            await supabase.from("beta_idea_votes").delete().eq("id", existingVote.id)
            // Update idea votes count
            const increment = action === "up" ? -1 : 1
            await supabase.rpc("increment_idea_votes", { idea_id: ideaId, amount: increment })
        } else {
            // Change vote
            await supabase.from("beta_idea_votes").update({ vote_type: action }).eq("id", existingVote.id)
            // Update by 2 (remove old vote effect, add new)
            const increment = action === "up" ? 2 : -2
            await supabase.rpc("increment_idea_votes", { idea_id: ideaId, amount: increment })
        }
    } else {
        // New vote
        await supabase.from("beta_idea_votes").insert({
            idea_id: ideaId,
            user_id: user.id,
            vote_type: action,
            created_at: new Date().toISOString()
        })
        const increment = action === "up" ? 1 : -1
        await supabase.rpc("increment_idea_votes", { idea_id: ideaId, amount: increment })
    }

    revalidatePath("/beta/ideas")
}

// Add a comment
export async function addComment(ideaId: string, content: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const { error } = await supabase.from("beta_idea_comments").insert({
        idea_id: ideaId,
        user_id: user.id,
        content,
        created_at: new Date().toISOString()
    })

    if (error) throw error

    revalidatePath("/beta/ideas")
}

// Delete an idea (only owner or admin)
export async function deleteIdea(ideaId: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    // First delete related votes and comments
    await supabase.from("beta_idea_votes").delete().eq("idea_id", ideaId)
    await supabase.from("beta_idea_comments").delete().eq("idea_id", ideaId)

    // Then delete the idea
    const { error } = await supabase
        .from("beta_ideas")
        .delete()
        .eq("id", ideaId)
        .eq("user_id", user.id) // Only owner can delete

    if (error) throw error

    revalidatePath("/beta/ideas")
}
