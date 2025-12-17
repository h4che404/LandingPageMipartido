"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Search, MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CourtLocationManagerProps {
    onConfirm: (lat: number, lng: number, address: string) => void
    initialLat?: number
    initialLng?: number
}

// Design Tokens
const COLORS = {
    background: "#0B0F14",
    surface: "#111826",
    border: "#263248",
    primary: "#A6FF4D", // Lime Neon
    text: "#E7ECF6",
    muted: "#A8B3C7"
}

export function CourtLocationManager({ onConfirm, initialLat = -32.89084, initialLng = -68.82717 }: CourtLocationManagerProps) {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const markerRef = useRef<mapboxgl.Marker | null>(null)

    const [isLoading, setIsLoading] = useState(true)
    const [address, setAddress] = useState("Ubicando...")
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)

    // Ref to track state inside event listeners
    const isConfirmedRef = useRef(isConfirmed)
    useEffect(() => { isConfirmedRef.current = isConfirmed }, [isConfirmed])

    // Ensure Mapbox token is set
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

    useEffect(() => {
        if (!mapContainer.current) return
        if (!mapboxToken) {
            console.error("Missing NEXT_PUBLIC_MAPBOX_TOKEN")
            setIsLoading(false)
            return
        }

        mapboxgl.accessToken = mapboxToken

        if (map.current) return // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/dark-v11",
            center: [initialLng, initialLat],
            zoom: 15.5,
            pitch: 60, // 3D feel
            bearing: -17.6, // Slight rotation for depth
            attributionControl: false
        })

        const m = map.current

        m.on("load", () => {
            setIsLoading(false)
            updateAddress(initialLat, initialLng)

            // Add 3D buildings
            const layers = m.getStyle().layers
            const labelLayerId = layers?.find(
                (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
            )?.id

            m.addLayer(
                {
                    'id': 'add-3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15,
                    'paint': {
                        'fill-extrusion-color': '#162033',
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0.6
                    }
                },
                labelLayerId
            )
        })

        m.on("moveend", () => {
            if (isConfirmedRef.current) return
            const center = m.getCenter()
            updateAddress(center.lat, center.lng)
        })

        return () => {
            markerRef.current?.remove()
            m.remove()
        }
    }, [initialLat, initialLng, mapboxToken])

    const updateAddress = async (lat: number, lng: number) => {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
            const data = await res.json()
            const addr = data.address
            const formatted = [addr.road, addr.house_number, addr.suburb, addr.city].filter(Boolean).join(", ")
            setAddress(formatted || "Ubicación seleccionada")
        } catch (e) {
            setAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`)
        }
    }

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchQuery || !map.current) return

        setIsSearching(true)
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery + " Mendoza Argentina")}&format=json&limit=1`)
            const data = await res.json()

            if (data && data[0]) {
                const { lat, lon } = data[0]
                map.current.flyTo({
                    center: [parseFloat(lon), parseFloat(lat)],
                    zoom: 17,
                    essential: true
                })
            }
        } catch (error) {
            console.error("Search error", error)
        }
        setIsSearching(false)
    }

    const handleConfirm = () => {
        if (!map.current) return

        setIsConfirmed(true)
        const center = map.current.getCenter()

        // Disable interactions
        map.current.dragPan.disable()
        map.current.scrollZoom.disable()
        map.current.touchZoomRotate.disable()

        // --- Add Custom Marker ---
        const el = document.createElement('div')
        el.className = 'flex flex-col items-center'
        el.innerHTML = `
            <div class="mb-2 px-2 py-1 rounded border border-[#A6FF4D] bg-[#0B0F14] text-[#A6FF4D] text-xs font-bold whitespace-nowrap shadow-lg">
                Tu Cancha
            </div>
            <div class="relative">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" class="text-[#A6FF4D] drop-shadow-md">
                   <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#0B0F14" stroke="currentColor" stroke-width="2" />
                   <circle cx="12" cy="10" r="3" fill="currentColor" />
                </svg>
            </div>
        `

        markerRef.current = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
            .setLngLat(center)
            .addTo(map.current)

        // --- Draw Polygon (approx 40x20m court) ---
        // 0.0001 deg is roughly 11 meters
        const halfWidth = 0.0002 // ~22m
        const halfHeight = 0.0001 // ~11m

        const lng = center.lng
        const lat = center.lat

        const coordinates = [
            [
                [lng - halfWidth, lat + halfHeight], // TL
                [lng + halfWidth, lat + halfHeight], // TR
                [lng + halfWidth, lat - halfHeight], // BR
                [lng - halfWidth, lat - halfHeight], // BL
                [lng - halfWidth, lat + halfHeight]  // Close loop
            ]
        ]

        if (map.current.getSource("court-polygon")) {
            // update existing
            (map.current.getSource("court-polygon") as mapboxgl.GeoJSONSource).setData({
                type: "Feature",
                properties: {},
                geometry: { type: "Polygon", coordinates }
            })
        } else {
            map.current.addSource("court-polygon", {
                type: "geojson",
                data: {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "Polygon",
                        coordinates
                    }
                }
            })

            map.current.addLayer({
                id: "court-polygon-fill",
                type: "fill",
                source: "court-polygon",
                paint: {
                    "fill-color": COLORS.primary,
                    "fill-opacity": 0.15
                }
            })

            map.current.addLayer({
                id: "court-polygon-outline",
                type: "line",
                source: "court-polygon",
                paint: {
                    "line-color": COLORS.primary,
                    "line-width": 2
                }
            })
        }

        // Zoom in slightly to show the court details in 3D
        map.current.easeTo({ zoom: 18, pitch: 60, bearing: -17.6 })

        onConfirm(lat, lng, address)
    }

    const handleEdit = () => {
        if (!map.current) return
        setIsConfirmed(false)

        // Re-enable interactions
        map.current.dragPan.enable()
        map.current.scrollZoom.enable()
        map.current.touchZoomRotate.enable()

        // Remove Marker
        if (markerRef.current) {
            markerRef.current.remove()
            markerRef.current = null
        }

        // Remove layers
        if (map.current.getLayer("court-polygon-fill")) map.current.removeLayer("court-polygon-fill")
        if (map.current.getLayer("court-polygon-outline")) map.current.removeLayer("court-polygon-outline")
        if (map.current.getSource("court-polygon")) map.current.removeSource("court-polygon")

        map.current.easeTo({ pitch: 45, zoom: 15.5 })
    }

    if (!mapboxToken) {
        return (
            <div className="w-full h-[400px] flex flex-col items-center justify-center bg-[#0B0F14] text-[#E7ECF6] border border-[#263248] rounded-xl">
                <p>Error: Falta configuración de Mapbox (Token).</p>
                <p className="text-sm text-[#A8B3C7] mt-2">Agregá NEXT_PUBLIC_MAPBOX_TOKEN a tu .env.local</p>
            </div>
        )
    }

    return (
        <div className="w-full rounded-xl overflow-hidden border border-[#263248] bg-[#0B0F14] relative">

            {/* Top Bar: Search */}
            {!isConfirmed && (
                <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
                    <form onSubmit={handleSearch} className="flex-1 flex gap-2 shadow-xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8B3C7]" />
                            <Input
                                placeholder="Buscar calle, barrio o lugar..."
                                className="pl-10 bg-[#111826]/90 border-[#263248] text-[#E7ECF6] placeholder:text-[#A8B3C7] backdrop-blur-sm focus-visible:ring-[#A6FF4D]"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            size="icon"
                            className="bg-[#111826]/90 border border-[#263248] text-[#A6FF4D] hover:bg-[#111826] hover:text-[#A6FF4D]/80 backdrop-blur-sm"
                            disabled={isSearching}
                        >
                            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                        </Button>
                    </form>
                </div>
            )}

            {/* Map Container */}
            <div className="relative w-full h-[500px]">
                <div ref={mapContainer} className="w-full h-full" />

                {/* Fixed Center Pin (Only visible when not confirmed) */}
                {!isConfirmed && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 -mt-[20px]">
                        <div className="relative">
                            <MapPin
                                className="w-10 h-10 text-[#A6FF4D] drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                                fill="#0B0F14"
                                strokeWidth={2}
                            />
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#A6FF4D]/50 rounded-full blur-[2px]" />
                        </div>
                    </div>
                )}

                {/* Current Address Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-2">
                    <div className="bg-[#111826]/90 backdrop-blur-md border border-[#263248] p-4 rounded-xl shadow-2xl">
                        <p className="text-[10px] text-[#A6FF4D] font-bold uppercase tracking-wider mb-1">
                            {isConfirmed ? "Ubicación Confirmada" : "Ubicación seleccionada"}
                        </p>
                        <p className="text-sm font-medium text-[#E7ECF6] truncate">
                            {address}
                        </p>
                    </div>

                    {isConfirmed ? (
                        <Button
                            onClick={handleEdit}
                            variant="outline"
                            className="w-full bg-[#111826] border-[#263248] text-[#E7ECF6] hover:bg-[#111826]/80"
                        >
                            Cambiar ubicación
                        </Button>
                    ) : (
                        <Button
                            onClick={handleConfirm}
                            className="w-full bg-[#A6FF4D] text-[#0B0F14] hover:bg-[#A6FF4D]/90 font-bold shadow-[0_0_20px_rgba(166,255,77,0.2)]"
                        >
                            Confirmar Ubicación
                        </Button>
                    )}
                </div>
            </div>

            {isLoading && (
                <div className="absolute inset-0 bg-[#0B0F14] z-50 flex flex-col items-center justify-center gap-2">
                    <Loader2 className="w-8 h-8 text-[#A6FF4D] animate-spin" />
                    <p className="text-xs text-[#A8B3C7]">Cargando mapa...</p>
                </div>
            )}
        </div>
    )
}
