import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"
import { AdminDashboard } from "./components"

// Lista de emails con acceso de administrador
const ADMIN_EMAILS = [
    "eliasjuancruz54@gmail.com",
]

export default async function AdminPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/login")
    }

    if (!ADMIN_EMAILS.includes(user.email || '')) {
        return redirect("/beta")
    }

    // Use admin client to fetch all auth users (to get emails)
    const adminClient = createAdminClient()
    const { data: { users }, error: usersError } = await adminClient.auth.admin.listUsers()

    if (usersError) {
        console.error("Error fetching users:", usersError)
    }

    // Also use admin client to fetch beta_members to bypass RLS policies if they are restrictive
    // (This fixes the issue where admins couldn't see other users data)
    const { data: members, count } = await adminClient
        .from("beta_members")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })

    // Map emails to members
    const membersWithEmail = members?.map(member => {
        const authUser = users?.find(u => u.id === member.user_id)
        return {
            ...member,
            email: authUser?.email || (member.user_id.startsWith('manual_') ? 'Manual' : 'No encontrado')
        }
    }) || []

    return <AdminDashboard members={membersWithEmail} count={count || 0} userEmail={user.email || ''} />
}
