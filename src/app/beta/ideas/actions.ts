"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Create a new idea with optional image
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
    if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `ideas/${user.id}/${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from("ideas-images")
            .upload(fileName, imageFile, {
                cacheControl: '3600',
                upsert: false
            })

        if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
                .from("ideas-images")
                .getPublicUrl(fileName)
            imageUrl = publicUrl
        } else {
            console.error("Upload error:", uploadError)
        }
    }

    const { error } = await supabase.from("beta_ideas").insert({
        user_id: user.id,
        title,
        description,
        category,
        votes: 0,
        status: "pending"
    })

    if (error) {
        console.error("Insert error:", error)
        throw new Error(`Error: ${error.message}`)
    }

    revalidatePath("/beta/ideas")
}

// Vote for an idea
export async function voteIdea(ideaId: string, action: "up" | "down") {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const { data: existingVote } = await supabase
        .from("beta_idea_votes")
        .select("*")
        .eq("idea_id", ideaId)
        .eq("user_id", user.id)
        .single()

    const { data: idea } = await supabase
        .from("beta_ideas")
        .select("votes")
        .eq("id", ideaId)
        .single()

    if (!idea) return

    if (existingVote) {
        if (existingVote.vote_type === action) {
            await supabase.from("beta_idea_votes").delete().eq("id", existingVote.id)
            const newVotes = action === "up" ? idea.votes - 1 : idea.votes + 1
            await supabase.from("beta_ideas").update({ votes: newVotes }).eq("id", ideaId)
        } else {
            await supabase.from("beta_idea_votes").update({ vote_type: action }).eq("id", existingVote.id)
            const newVotes = action === "up" ? idea.votes + 2 : idea.votes - 2
            await supabase.from("beta_ideas").update({ votes: newVotes }).eq("id", ideaId)
        }
    } else {
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

// Add a comment with optional image
export async function addComment(ideaId: string, content: string, imageFile?: File) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    let imageUrl = null

    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `comments/${user.id}/${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from("ideas-images")
            .upload(fileName, imageFile)

        if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
                .from("ideas-images")
                .getPublicUrl(fileName)
            imageUrl = publicUrl
        }
    }

    const { error } = await supabase.from("beta_idea_comments").insert({
        idea_id: ideaId,
        user_id: user.id,
        content,
        image_url: imageUrl
    })

    if (error) throw error

    revalidatePath("/beta/ideas")
}

// Delete an idea
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
