import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { upsertBetaProfile } from "./actions"
import { LogOut, Home, Monitor, MessageSquare, Zap, Calendar, Users, TrendingUp, Bell } from "lucide-react"
import Link from "next/link"

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
                    <form action={upsertBetaProfile} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Nombre completo</Label>
                            <Input
                                id="full_name"
                                name="full_name"
                                defaultValue={user.user_metadata.full_name || ""}
                                placeholder="Juan Pérez"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">Ciudad</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    defaultValue="Mendoza"
                                    placeholder="Godoy Cruz"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sport">Deporte</Label>
                                <Input
                                    id="sport"
                                    name="sport"
                                    placeholder="Fútbol / Pádel"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="whatsapp">WhatsApp (Opcional)</Label>
                            <Input
                                id="whatsapp"
                                name="whatsapp"
                                placeholder="+54 9 261 ..."
                            />
                            <p className="text-[10px] text-muted-foreground">
                                Solo para notificarte cuando la app esté lista. No spam.
                            </p>
                        </div>

                        <div className="flex items-start space-x-3 pt-2">
                            <Checkbox
                                id="allow_public"
                                name="allow_public"
                                defaultChecked={true}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <Label
                                    htmlFor="allow_public"
                                    className="text-sm font-medium leading-none"
                                >
                                    Aparecer en la lista pública
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Tu nombre y ciudad aparecerán en la landing page.
                                </p>
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Acceder al portal beta
                        </Button>
                    </form>
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

// Court Dashboard Preview Component
function CourtDashboard({ profile }: { profile: any }) {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Welcome */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Panel de {profile.full_name} 🏟️</h1>
                <p className="text-muted-foreground">
                    Vista previa del dashboard que vas a tener para gestionar tu cancha.
                </p>
            </div>

            {/* Demo Banner */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-center gap-4">
                <Monitor className="w-6 h-6 text-yellow-500" />
                <div>
                    <p className="font-medium text-yellow-600">Esto es una vista previa</p>
                    <p className="text-sm text-muted-foreground">
                        Estamos desarrollando el panel. Esta es una simulación de cómo se verá.
                    </p>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <StatCard title="Turnos hoy" value="8" subtitle="3 confirmados" />
                    <StatCard title="Ocupación semanal" value="72%" subtitle="+12% vs semana pasada" />
                    <StatCard title="Ingresos del mes" value="$245.000" subtitle="Simulado" />
                </div>

                {/* Right Column - Calendar Preview */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Calendario de turnos (Demo)
                    </h3>
                    <div className="space-y-2">
                        {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((hour, i) => (
                            <div key={hour} className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground w-16">{hour}</span>
                                <div className={`flex-1 h-10 rounded-lg ${i === 1 || i === 3 || i === 5
                                        ? 'bg-green-500/20 border border-green-500/30'
                                        : 'bg-muted/50 border border-border'
                                    } flex items-center px-3`}>
                                    {(i === 1 || i === 3 || i === 5) && (
                                        <span className="text-sm font-medium text-green-600">
                                            {i === 1 ? 'Fútbol 5 - Juan P.' : i === 3 ? 'Pádel - Grupo Martes' : 'Fútbol 7 - Liga Amateur'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Coming */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Funcionalidades que vas a tener</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <FeatureCard
                        icon={<Calendar className="w-5 h-5" />}
                        title="Gestión de turnos"
                        description="Agenda visual, reservas online y confirmaciones automáticas."
                        status="En desarrollo"
                    />
                    <FeatureCard
                        icon={<Bell className="w-5 h-5" />}
                        title="Recordatorios"
                        description="Avisos automáticos a jugadores. Menos plantones."
                        status="Próximamente"
                    />
                    <FeatureCard
                        icon={<TrendingUp className="w-5 h-5" />}
                        title="Reportes"
                        description="Ingresos, ocupación y métricas de tu cancha."
                        status="Próximamente"
                    />
                </div>
            </div>

            {/* Profile */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="font-bold">Tu perfil de cancha</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                        <span className="text-muted-foreground">Visible en landing</span>
                        <p className="font-medium">{profile.allow_public ? 'Sí' : 'No'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Reusable Feature Card
function FeatureCard({ icon, title, description, status }: {
    icon: React.ReactNode,
    title: string,
    description: string,
    status: string
}) {
    const statusColors = status === 'En desarrollo'
        ? 'bg-blue-500/10 text-blue-500 border-blue-500/30'
        : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30'

    return (
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {icon}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${statusColors}`}>
                    {status}
                </span>
            </div>
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    )
}

// Reusable Stat Card
function StatCard({ title, value, subtitle }: { title: string, value: string, subtitle: string }) {
    return (
        <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
    )
}
