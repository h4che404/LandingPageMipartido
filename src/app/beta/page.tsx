import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Home, Monitor, MessageSquare, Zap, Calendar, Users, TrendingUp, Bell } from "lucide-react"
import Link from "next/link"
import { BetaProfileForm, StatCard, FeatureCard } from "./components"
import { CourtDashboard } from "./court-dashboard"

export default async function BetaPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/")
    }

    // Fetch existing profile
    const { data: profile } = await supabase
        .from("beta_members")
        .select("*")
        .eq("user_id", user.id)
        .single()

    // If profile exists, show the portal based on role
    if (profile) {
        return (
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-xl font-bold text-primary">Mi Partido</Link>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                                Beta Tester
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground hidden sm:block">
                                {user.email}
                            </span>
                            <form action="/auth/signout" method="post">
                                <Button variant="ghost" size="sm">
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-8">
                    {profile.role === 'court' ? (
                        <CourtDashboard profile={profile} />
                    ) : (
                        <PlayerPortal profile={profile} userName={profile.full_name || user.user_metadata?.full_name} />
                    )}
                </main>
            </div>
        )
    }

    // If no profile, show the onboarding form
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">¡Estás adentro!</h1>
                    <p className="text-muted-foreground">
                        Completá tu perfil para acceder al portal beta.
                    </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <BetaProfileForm defaultName={user.user_metadata.full_name || ""} />
                </div>

                <div className="text-center">
                    <form action="/auth/signout" method="post">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <LogOut className="w-4 h-4 mr-2" />
                            Cerrar sesión
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

// Player Portal Component
function PlayerPortal({ profile, userName }: { profile: any, userName: string }) {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Welcome */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Hola, {userName?.split(' ')[0] || 'Jugador'} 👋</h1>
                <p className="text-muted-foreground">
                    Bienvenido al portal beta de Mi Partido. Acá vas a ver novedades del desarrollo.
                </p>
            </div>

            {/* Status Card */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Estado del desarrollo</h3>
                        <p className="text-sm text-muted-foreground">
                            Estamos construyendo la app. Próximamente podrás crear y unirte a partidos.
                        </p>
                    </div>
                </div>
            </div>

            {/* Ideas Forum CTA */}
            <Link href="/beta/ideas" className="block">
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6 hover:from-purple-500/20 hover:to-blue-500/20 transition-all group">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-purple-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">Ideas & Feedback</h3>
                                <p className="text-sm text-muted-foreground">
                                    Compartí tus ideas para la app. Votá las mejores propuestas.
                                </p>
                            </div>
                        </div>
                        <span className="text-purple-500 font-bold">→</span>
                    </div>
                </div>
            </Link>

            {/* Coming Features */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Lo que viene</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <FeatureCard
                        icon={<Calendar className="w-5 h-5" />}
                        title="Crear partidos"
                        description="Armá un partido, elegí cancha y horario. Compartí el link."
                        status="En desarrollo"
                    />
                    <FeatureCard
                        icon={<Users className="w-5 h-5" />}
                        title="Unirte a partidos"
                        description="Encontrá partidos cerca tuyo y sumate con un click."
                        status="Próximamente"
                    />
                    <FeatureCard
                        icon={<Bell className="w-5 h-5" />}
                        title="Confirmaciones automáticas"
                        description="Recordatorios 24hs antes. Lista de espera si se llena."
                        status="Próximamente"
                    />
                    <FeatureCard
                        icon={<TrendingUp className="w-5 h-5" />}
                        title="Tu historial"
                        description="Estadísticas de partidos jugados, equipos y más."
                        status="Próximamente"
                    />
                </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="font-bold">Tu perfil</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-muted-foreground">Nombre</span>
                        <p className="font-medium">{profile.full_name}</p>
                    </div>
                    <div>
                        <span className="text-muted-foreground">Ciudad</span>
                        <p className="font-medium">{profile.city}</p>
                    </div>
                    <div>
                        <span className="text-muted-foreground">Deporte</span>
                        <p className="font-medium">{profile.sport}</p>
                    </div>
                    <div>
                        <span className="text-muted-foreground">En lista pública</span>
                        <p className="font-medium">{profile.allow_public ? 'Sí' : 'No'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


