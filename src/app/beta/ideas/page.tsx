import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { IdeasForum } from "./components"

export default async function IdeasPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/login")
    }

    // Fetch user profile
    const { data: profile } = await supabase
        .from("beta_members")
        .select("*")
        .eq("user_id", user.id)
        .single()

    if (!profile) {
        return redirect("/beta")
    }

    // Fetch all ideas with author info
    const { data: ideas } = await supabase
        .from("beta_ideas")
        .select(`
            *,
            author:beta_members!user_id(full_name, avatar_url, city)
        `)
        .order("created_at", { ascending: false })

    // Fetch user's votes
    const { data: userVotes } = await supabase
        .from("beta_idea_votes")
        .select("idea_id, vote_type")
        .eq("user_id", user.id)

    // Fetch comments count for each idea
    const { data: commentCounts } = await supabase
        .from("beta_idea_comments")
        .select("idea_id")

    return (
        <IdeasForum
            ideas={ideas || []}
            userVotes={userVotes || []}
            commentCounts={commentCounts || []}
            currentUserId={user.id}
            profile={profile}
        />
    )
}
