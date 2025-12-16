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
        try {
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
        } catch (e) {
            console.error("Image upload error:", e)
            // Continue without image
        }
    }

    // Get user profile for author info
    const { data: profile } = await supabase
        .from("beta_members")
        .select("full_name, avatar_url, city")
        .eq("user_id", user.id)
        .single()

    const { error } = await supabase.from("beta_ideas").insert({
        user_id: user.id,
        title,
        description,
        category,
        image_url: imageUrl,
        votes: 0,
        status: "pending",
        author_name: profile?.full_name || "Usuario",
        author_avatar: profile?.avatar_url || null,
        author_city: profile?.city || "Mendoza"
    })

    if (error) {
        console.error("Insert error:", error)
        throw new Error(`Error creating idea: ${error.message}`)
    }

    revalidatePath("/beta/ideas")
}

// Vote for an idea (simplified - direct update)
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

    // Get current idea
    const { data: idea } = await supabase
        .from("beta_ideas")
        .select("votes")
        .eq("id", ideaId)
        .single()

    if (!idea) return

    if (existingVote) {
        if (existingVote.vote_type === action) {
            // Remove vote
            await supabase.from("beta_idea_votes").delete().eq("id", existingVote.id)
            const newVotes = action === "up" ? idea.votes - 1 : idea.votes + 1
            await supabase.from("beta_ideas").update({ votes: newVotes }).eq("id", ideaId)
        } else {
            // Change vote
            await supabase.from("beta_idea_votes").update({ vote_type: action }).eq("id", existingVote.id)
            const newVotes = action === "up" ? idea.votes + 2 : idea.votes - 2
            await supabase.from("beta_ideas").update({ votes: newVotes }).eq("id", ideaId)
        }
    } else {
        // New vote
        await supabase.from("beta_idea_votes").insert({
            idea_id: ideaId,
            user_id: user.id,
            vote_type: action
        })
        const newVotes = action === "up" ? idea.votes + 1 : idea.votes - 1
        await supabase.from("beta_ideas").update({ votes: newVotes }).eq("id", ideaId)
    }

    revalidatePath("/beta/ideas")
}

// Add a comment
export async function addComment(ideaId: string, content: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    // Get user profile
    const { data: profile } = await supabase
        .from("beta_members")
        .select("full_name, avatar_url")
        .eq("user_id", user.id)
        .single()

    const { error } = await supabase.from("beta_idea_comments").insert({
        idea_id: ideaId,
        user_id: user.id,
        content,
        author_name: profile?.full_name || "Usuario",
        author_avatar: profile?.avatar_url || null
    })

    if (error) throw error

    revalidatePath("/beta/ideas")
}

// Delete an idea (only owner)
export async function deleteIdea(ideaId: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const { error } = await supabase
        .from("beta_ideas")
        .delete()
        .eq("id", ideaId)
        .eq("user_id", user.id)

    if (error) throw error

    revalidatePath("/beta/ideas")
}
