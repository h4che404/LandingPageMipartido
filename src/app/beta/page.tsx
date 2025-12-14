import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { upsertBetaProfile } from "./actions"
import { LogOut } from "lucide-react"

export default async function BetaPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/")
    }

    // Fetch existing profile if any
    const { data: profile } = await supabase
        .from("beta_members")
        .select("*")
        .eq("user_id", user.id)
        .single()

    // Determine role (from local storage on client is hard here on server, 
    // but initially we can default or let them choose if not set. 
    // Ideally we would have passed it during signup metadata, 
    // but for now we'll just show the form and let them confirm.)
    // Actually, we can't easily access localStorage here.
    // We could check if profile exists to know role.

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">¡Estás adentro!</h1>
                    <p className="text-muted-foreground">
                        Completá tu perfil para asegurar tu lugar en la lista de espera de Mendoza.
                    </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <form action={upsertBetaProfile} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Nombre completo</Label>
                            <Input
                                id="full_name"
                                name="full_name"
                                defaultValue={profile?.full_name || user.user_metadata.full_name || ""}
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
                                    defaultValue={profile?.city || "Mendoza"}
                                    placeholder="Godoy Cruz"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sport">Deporte</Label>
                                <Input
                                    id="sport"
                                    name="sport"
                                    defaultValue={profile?.sport || ""}
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
                                defaultValue={profile?.whatsapp || ""}
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
                                defaultChecked={profile?.allow_public ?? true}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <Label
                                    htmlFor="allow_public"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Aparecer en la lista pública
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Tu nombre, deporte y ciudad aparecerán en la landing page como usuario en espera.
                                </p>
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Guardar mi lugar
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

                {/* Community Links Placeholder */}
                <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                    <span>Discord</span> • <span>WhatsApp Group</span>
                </div>
            </div>
        </div>
    )
}
