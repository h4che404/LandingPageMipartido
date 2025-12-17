"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Loader2 } from "lucide-react"

interface MapLocationPickerProps {
    onLocationSelect: (lat: number, lng: number, address: string) => void
    initialLat?: number
    initialLng?: number
}

export function MapLocationPicker({ onLocationSelect, initialLat = -32.8895, initialLng = -68.8458 }: MapLocationPickerProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<any>(null)
    const markerRef = useRef<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [address, setAddress] = useState("")

    useEffect(() => {
        // Dynamic import for Leaflet (SSR-safe)
        const initMap = async () => {
            const L = (await import("leaflet")).default

            if (!mapRef.current || mapInstanceRef.current) return

            // Create map centered on Mendoza
            const map = L.map(mapRef.current).setView([initialLat, initialLng], 13)
            mapInstanceRef.current = map

            // Add OpenStreetMap tiles
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map)

            // Custom marker icon
            const customIcon = L.divIcon({
                html: `<div style="background: #22c55e; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
                className: "custom-marker",
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            })

            // Create draggable marker
            const marker = L.marker([initialLat, initialLng], {
                draggable: true,
                icon: customIcon
            }).addTo(map)
            markerRef.current = marker

            // Handle marker drag end
            marker.on("dragend", async () => {
                const pos = marker.getLatLng()
                await reverseGeocode(pos.lat, pos.lng)
            })

            // Handle map click to move marker
            map.on("click", async (e: any) => {
                marker.setLatLng(e.latlng)
                await reverseGeocode(e.latlng.lat, e.latlng.lng)
            })

            setIsLoading(false)

            // Try to get user's location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords
                        map.setView([latitude, longitude], 15)
                        marker.setLatLng([latitude, longitude])
                        await reverseGeocode(latitude, longitude)
                    },
                    () => {
                        // Use default location (Mendoza)
                        reverseGeocode(initialLat, initialLng)
                    }
                )
            }
        }

        initMap()

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove()
                mapInstanceRef.current = null
            }
        }
    }, [])

    const reverseGeocode = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
            )
            const data = await response.json()

            // Build address string
            const addr = data.address
            const addressStr = [
                addr.road,
                addr.house_number,
                addr.suburb || addr.neighbourhood,
                addr.city || addr.town || addr.village
            ].filter(Boolean).join(", ")

            setAddress(addressStr || data.display_name?.split(",").slice(0, 3).join(",") || "")
            onLocationSelect(lat, lng, addressStr || data.display_name || "")
        } catch (error) {
            console.error("Geocoding error:", error)
            onLocationSelect(lat, lng, "")
        }
    }

    return (
        <div className="space-y-2">
            <div className="relative w-full h-64 rounded-lg overflow-hidden border border-input">
                {isLoading && (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center z-10">
                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                )}
                <div ref={mapRef} className="w-full h-full" />
            </div>
            {address && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="truncate">{address}</span>
                </div>
            )}
            <p className="text-[10px] text-muted-foreground">
                Hacé click en el mapa o arrastrá el marcador para ubicar tu cancha
            </p>
        </div>
    )
}
