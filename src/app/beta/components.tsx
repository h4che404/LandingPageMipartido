"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Loader2, Building2, User } from "lucide-react"
import { upsertBetaProfile } from "./actions"

// Lazy load the map component
const MapLocationPicker = lazy(() => import("@/components/features/map-location-picker").then(m => ({ default: m.MapLocationPicker })))

interface BetaProfileFormProps {
    defaultName: string
}

export function BetaProfileForm({ defaultName }: BetaProfileFormProps) {
    const [role, setRole] = useState<"player" | "court">("player")
    const [city, setCity] = useState("Mendoza")
    const [isLocating, setIsLocating] = useState(false)
    const [locationError, setLocationError] = useState<string | null>(null)

    // Court-specific state
    const [courtName, setCourtName] = useState("")
    const [courtAddress, setCourtAddress] = useState("")
    const [courtLat, setCourtLat] = useState<number | null>(null)
    const [courtLng, setCourtLng] = useState<number | null>(null)

    const detectLocation = async () => {
        if (!navigator.geolocation) {
            setLocationError("Tu navegador no soporta geolocalización")
            return
        }

        setIsLocating(true)
        setLocationError(null)

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&addressdetails=1`
                    )
                    const data = await response.json()
                    const detectedCity =
                        data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        data.address.municipality ||
                        data.address.county ||
                        "Mendoza"
                    setCity(detectedCity)
                } catch (error) {
                    console.error("Geocoding error:", error)
                    setLocationError("No pudimos obtener tu ubicación")
                }
                setIsLocating(false)
            },
            (error) => {
                console.error("Geolocation error:", error)
                if (error.code === error.PERMISSION_DENIED) {
                    setLocationError("Permiso de ubicación denegado")
                } else {
                    setLocationError("Error al obtener ubicación")
                }
                setIsLocating(false)
            },
            { enableHighAccuracy: false, timeout: 10000 }
        )
    }

    useEffect(() => {
        if (role === "player") {
            detectLocation()
        }
    }, [role])

    const handleLocationSelect = (lat: number, lng: number, address: string) => {
        setCourtLat(lat)
        setCourtLng(lng)
        setCourtAddress(address)
    }

    return (
        <form action={upsertBetaProfile} className="space-y-6">
            {/* Hidden fields for court data */}
            <input type="hidden" name="role" value={role} />
            <input type="hidden" name="court_lat" value={courtLat || ""} />
            <input type="hidden" name="court_lng" value={courtLng || ""} />
            <input type="hidden" name="court_address" value={courtAddress} />

            {/* Role Selector */}
            <div className="space-y-2">
                <Label>¿Cómo querés unirte?</Label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setRole("player")}
                        className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${role === "player"
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                            }`}
                    >
                        <User className="w-5 h-5" />
                        <span className="font-medium">Jugador</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole("court")}
                        className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${role === "court"
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                            }`}
                    >
                        <Building2 className="w-5 h-5" />
                        <span className="font-medium">Cancha</span>
                    </button>
                </div>
            </div>

            {role === "player" ? (
                // PLAYER FORM
                <>
                    <div className="space-y-2">
                        <Label htmlFor="full_name">Nombre completo</Label>
                        <Input
                            id="full_name"
                            name="full_name"
                            defaultValue={defaultName}
                            placeholder="Juan Pérez"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">Ciudad</Label>
                            <div className="relative">
                                <Input
                                    id="city"
                                    name="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Godoy Cruz"
                                    required
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={detectLocation}
                                    disabled={isLocating}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted transition-colors"
                                    title="Detectar ubicación"
                                >
                                    {isLocating ? (
                                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                                    ) : (
                                        <MapPin className="w-4 h-4 text-muted-foreground hover:text-primary" />
                                    )}
                                </button>
                            </div>
                            {locationError && (
                                <p className="text-[10px] text-red-500">{locationError}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sport">Deporte</Label>
                            <select
                                id="sport"
                                name="sport"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="" disabled>Seleccioná un deporte</option>
                                <option value="Fútbol">⚽ Fútbol</option>
                                <option value="Pádel">🎾 Pádel</option>
                                <option value="Tenis">🏸 Tenis</option>
                            </select>
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
                            <Label htmlFor="allow_public" className="text-sm font-medium leading-none">
                                Aparecer en la lista pública
                            </Label>
                            <p className="text-xs text-muted-foreground">
                                Tu nombre y ciudad aparecerán en la landing page.
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                // COURT FORM
                <>
                    <div className="space-y-2">
                        <Label htmlFor="court_name">Nombre de la cancha/club</Label>
                        <Input
                            id="court_name"
                            name="court_name"
                            value={courtName}
                            onChange={(e) => setCourtName(e.target.value)}
                            placeholder="Club Deportivo Norte"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="full_name">Nombre del responsable</Label>
                        <Input
                            id="full_name"
                            name="full_name"
                            defaultValue={defaultName}
                            placeholder="Juan Pérez"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Ubicación de la cancha</Label>
                        <Suspense fallback={
                            <div className="w-full h-64 rounded-lg border border-input bg-muted flex items-center justify-center">
                                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                            </div>
                        }>
                            <MapLocationPicker onLocationSelect={handleLocationSelect} />
                        </Suspense>
                        <input type="hidden" name="city" value={courtAddress.split(",").pop()?.trim() || "Mendoza"} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="sport">Deportes disponibles</Label>
                        <select
                            id="sport"
                            name="sport"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="" disabled>Seleccioná el deporte principal</option>
                            <option value="Fútbol">⚽ Fútbol</option>
                            <option value="Pádel">🎾 Pádel</option>
                            <option value="Tenis">🏸 Tenis</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp de contacto</Label>
                        <Input
                            id="whatsapp"
                            name="whatsapp"
                            placeholder="+54 9 261 ..."
                            required
                        />
                        <p className="text-[10px] text-muted-foreground">
                            Para que podamos contactarte sobre la aprobación.
                        </p>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-sm">
                        <p className="text-yellow-600 font-medium">⏳ Requiere aprobación</p>
                        <p className="text-muted-foreground text-xs mt-1">
                            Tu solicitud será revisada por nuestro equipo. Te contactaremos por WhatsApp.
                        </p>
                    </div>
                </>
            )}

            <Button type="submit" className="w-full">
                {role === "player" ? "Acceder al portal beta" : "Enviar solicitud"}
            </Button>
        </form>
    )
}

// Reusable Feature Card
export function FeatureCard({ icon, title, description, status }: {
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
export function StatCard({ title, value, subtitle }: { title: string, value: string, subtitle: string }) {
    return (
        <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
    )
}
