"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Loader2 } from "lucide-react"
import { upsertBetaProfile } from "./actions"

interface BetaProfileFormProps {
    defaultName: string
}

export function BetaProfileForm({ defaultName }: BetaProfileFormProps) {
    const [city, setCity] = useState("Mendoza")
    const [isLocating, setIsLocating] = useState(false)
    const [locationError, setLocationError] = useState<string | null>(null)

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
                    // Use OpenStreetMap Nominatim for reverse geocoding (free, no API key)
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&addressdetails=1`
                    )
                    const data = await response.json()

                    // Get city from response (try different fields)
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

    // Try to detect location on mount
    useEffect(() => {
        detectLocation()
    }, [])

    return (
        <form action={upsertBetaProfile} className="space-y-6">
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
    )
}
