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
    // Check if user is admin
    if (!ADMIN_EMAILS.includes(user.email || '')) {
        return redirect("/beta")
    }

    let users: any[] | null = []
    try {
        // Use admin client to fetch all auth users (to get emails)
        // This might fail if SUPABASE_SERVICE_ROLE_KEY is missing
        const adminClient = createAdminClient()
        const { data: authData, error: usersError } = await adminClient.auth.admin.listUsers()
        if (usersError) throw usersError
        users = authData.users
    } catch (error) {
        console.error("Error fetching admin users (likely missing SERVICE_ROLE_KEY):", error)
        // Continue without emails if this fails
    }

    // Fetch beta members (standard client)
    const { data: members, count } = await supabase
        .from("beta_members")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })

    // Map emails to members
    const membersWithEmail = members?.map(member => {
        const authUser = users?.find((u: any) => u.id === member.user_id)
        return {
            ...member,
            email: authUser?.email || (member.user_id.startsWith('manual_') ? 'Manual' : 'No encontrado')
        }
    }) || []

    return <AdminDashboard members={membersWithEmail} count={count || 0} userEmail={user.email || ''} />
}
