import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { AdminDashboard } from "./components"

// Lista de emails con acceso de administrador
const ADMIN_EMAILS = [
    "eliasjuancruz54@gmail.com",
    // Agregar más emails de admins aquí
]

export default async function AdminPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Redirect if not logged in
    if (!user) {
        return redirect("/login")
    }

    // Check if user is admin
    if (!ADMIN_EMAILS.includes(user.email || '')) {
        return redirect("/beta")
    }

    // Fetch all beta members
    const { data: members, count } = await supabase
        .from("beta_members")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })

    return <AdminDashboard members={members || []} count={count || 0} userEmail={user.email || ''} />
}
