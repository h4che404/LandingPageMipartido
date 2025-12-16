import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
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

    // Fetch all ideas (simplified query)
    const { data: ideas } = await supabase
        .from("beta_ideas")
        .select("*")
        .order("created_at", { ascending: false })

    // Fetch user's votes
    const { data: userVotes } = await supabase
        .from("beta_idea_votes")
        .select("idea_id, vote_type")
        .eq("user_id", user.id)

    // Fetch all comments
    const { data: comments } = await supabase
        .from("beta_idea_comments")
        .select("*")
        .order("created_at", { ascending: true })

    return (
        <IdeasForum
            initialIdeas={ideas || []}
            initialUserVotes={userVotes || []}
            initialComments={comments || []}
            currentUserId={user.id}
            profile={profile}
        />
    )
}
