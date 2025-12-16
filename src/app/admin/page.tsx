import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Users, LayoutDashboard, Settings, BarChart3, Home, Eye, EyeOff, Trash2 } from "lucide-react"
import Link from "next/link"

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

    // Stats
    const playerCount = members?.filter(m => m.role === 'player').length || 0
    const courtCount = members?.filter(m => m.role === 'court').length || 0
    const publicCount = members?.filter(m => m.allow_public).length || 0

    return (
        <div className="min-h-screen bg-background">
            {/* Admin Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-xl font-bold text-primary">Mi Partido</Link>
                        <span className="text-xs bg-red-500/10 text-red-500 px-2 py-1 rounded-full font-bold uppercase">
                            Admin
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/beta" className="text-sm text-muted-foreground hover:text-foreground">
                            Portal Beta
                        </Link>
                        <form action="/auth/signout" method="post">
                            <Button variant="ghost" size="sm">
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Title */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Panel de Administración</h1>
                        <p className="text-muted-foreground">
                            Gestión de usuarios beta y configuración de la landing page.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard
                            title="Total Usuarios"
                            value={count || 0}
                            icon={<Users className="w-5 h-5" />}
                        />
                        <StatCard
                            title="Jugadores"
                            value={playerCount}
                            icon={<Users className="w-5 h-5" />}
                            color="blue"
                        />
                        <StatCard
                            title="Canchas"
                            value={courtCount}
                            icon={<LayoutDashboard className="w-5 h-5" />}
                            color="yellow"
                        />
                        <StatCard
                            title="Visibles Públicos"
                            value={publicCount}
                            icon={<Eye className="w-5 h-5" />}
                            color="green"
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="outline">
                            <Link href="/" target="_blank">
                                <Home className="w-4 h-4 mr-2" />
                                Ver Landing
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/canchas" target="_blank">
                                Ver /canchas
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
                                <Settings className="w-4 h-4 mr-2" />
                                Supabase Dashboard
                            </a>
                        </Button>
                    </div>

                    {/* Members Table */}
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <h2 className="font-bold text-lg">Usuarios Beta ({count})</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted/50">
                                    <tr className="text-left text-xs text-muted-foreground uppercase">
                                        <th className="p-4">Usuario</th>
                                        <th className="p-4">Ciudad</th>
                                        <th className="p-4">Deporte</th>
                                        <th className="p-4">Rol</th>
                                        <th className="p-4">WhatsApp</th>
                                        <th className="p-4">Público</th>
                                        <th className="p-4">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {members?.map((member) => (
                                        <tr key={member.id} className="hover:bg-muted/30 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    {member.avatar_url ? (
                                                        <img
                                                            src={member.avatar_url}
                                                            alt={member.full_name}
                                                            className="w-8 h-8 rounded-full"
                                                        />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                                                            {member.full_name?.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-sm">{member.full_name}</p>
                                                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                            {member.user_id?.slice(0, 8)}...
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm">{member.city}</td>
                                            <td className="p-4 text-sm">{member.sport}</td>
                                            <td className="p-4">
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${member.role === 'court'
                                                    ? 'bg-yellow-500/10 text-yellow-600'
                                                    : 'bg-blue-500/10 text-blue-600'
                                                    }`}>
                                                    {member.role === 'court' ? 'Cancha' : 'Jugador'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-muted-foreground">
                                                {member.whatsapp || '-'}
                                            </td>
                                            <td className="p-4">
                                                {member.allow_public ? (
                                                    <Eye className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                                                )}
                                            </td>
                                            <td className="p-4 text-xs text-muted-foreground">
                                                {new Date(member.created_at).toLocaleDateString('es-AR')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {(!members || members.length === 0) && (
                            <div className="p-8 text-center text-muted-foreground">
                                No hay usuarios registrados todavía.
                            </div>
                        )}
                    </div>

                    {/* Export / Actions */}
                    <div className="text-sm text-muted-foreground">
                        💡 Para acciones avanzadas (eliminar usuarios, cambiar roles), usá el dashboard de Supabase directamente.
                    </div>

                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, icon, color = "primary" }: {
    title: string
    value: number
    icon: React.ReactNode
    color?: "primary" | "blue" | "yellow" | "green"
}) {
    const colors = {
        primary: "bg-primary/10 text-primary",
        blue: "bg-blue-500/10 text-blue-500",
        yellow: "bg-yellow-500/10 text-yellow-500",
        green: "bg-green-500/10 text-green-500",
    }

    return (
        <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${colors[color]} flex items-center justify-center`}>
                    {icon}
                </div>
                <div>
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-xs text-muted-foreground">{title}</p>
                </div>
            </div>
        </div>
    )
}
