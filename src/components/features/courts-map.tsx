"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Loader2, MapPin } from "lucide-react"

interface Court {
    user_id: string
    display_name: string
    city: string
    sport: string
    court_lat: number
    court_lng: number
}

interface CourtsMapProps {
    courts: Court[]
    selectedCourtId?: string | null
    hoveredCourtId?: string | null
}

export function CourtsMap({ courts, selectedCourtId, hoveredCourtId }: CourtsMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({})
    const [isLoading, setIsLoading] = useState(true)

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

    useEffect(() => {
        if (!mapContainer.current || !mapboxToken) return
        if (map.current) return

        mapboxgl.accessToken = mapboxToken

        // Initial center (Mendoza default or first court)
        const centerLng = courts.length > 0 ? courts[0].court_lng : -68.82717
        const centerLat = courts.length > 0 ? courts[0].court_lat : -32.89084

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/dark-v11",
            center: [centerLng, centerLat],
            zoom: 13,
            pitch: 65, // Increased pitch for 3D feel
            bearing: -17.6,
            attributionControl: false
        })

        const m = map.current

        m.on("load", () => {
            setIsLoading(false)

            // Add 3D buildings layer
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
                    'minzoom': 14,
                    'paint': {
                        'fill-extrusion-color': '#162033',
                        'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],
                        'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']],
                        'fill-extrusion-opacity': 0.8 // Increased opacity for better visibility
                    }
                },
                labelLayerId
            )
        })

        // Cleanup
        return () => {
            Object.values(markersRef.current).forEach(marker => marker.remove())
            m.remove()
        }
    }, [mapboxToken]) // Only depend on token for init

    // Handle Markers
    useEffect(() => {
        if (!map.current || !courts.length) return

        // Clear existing
        Object.values(markersRef.current).forEach(marker => marker.remove())
        markersRef.current = {}

        courts.forEach(court => {
            if (!court.court_lat || !court.court_lng) return

            // Custom Marker Element
            const el = document.createElement('div')
            el.className = 'group cursor-pointer'
            el.innerHTML = `
                <div class="flex flex-col items-center transition-transform duration-300">
                    <div class="px-2 py-1 rounded border border-[#A6FF4D] bg-[#0B0F14] text-[#A6FF4D] text-[10px] font-bold whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity marker-label">
                        ${court.display_name}
                    </div>
                    <div class="relative mt-1">
                         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="text-[#A6FF4D] drop-shadow-md marker-icon">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#0B0F14" stroke="currentColor" stroke-width="2" />
                            <circle cx="12" cy="10" r="3" fill="currentColor" />
                         </svg>
                    </div>
                </div>
            `

            el.addEventListener('click', () => {
                // Could callback vertically if needed, but for now map is driven by props or self-interaction
            })

            const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
                .setLngLat([court.court_lng, court.court_lat])
                .addTo(map.current!)

            markersRef.current[court.user_id] = marker
        })

        // Fit bounds if no selection initially
        if (!selectedCourtId && courts.length > 1) {
            const bounds = new mapboxgl.LngLatBounds()
            courts.forEach(c => {
                if (c.court_lat && c.court_lng) bounds.extend([c.court_lng, c.court_lat])
            })
            map.current.fitBounds(bounds, { padding: 100, maxZoom: 15 })
        }

    }, [courts, selectedCourtId])

    // Handle Selection FlyTo
    useEffect(() => {
        if (!map.current || !selectedCourtId) return

        const court = courts.find(c => c.user_id === selectedCourtId)
        if (court && court.court_lat && court.court_lng) {
            map.current.flyTo({
                center: [court.court_lng, court.court_lat],
                zoom: 17.5, // High zoom for 3D view
                pitch: 65,  // Ensure pitch is high
                bearing: -20,
                essential: true,
                speed: 0.8
            })

            // Highlight marker visual could go here if we kept refs to elements
        }
    }, [selectedCourtId, courts])

    // Handle Hover visual feedback (Optional)
    useEffect(() => {
        const marker = hoveredCourtId ? markersRef.current[hoveredCourtId] : null
        if (marker) {
            const el = marker.getElement()
            el.classList.add('z-50')
            const label = el.querySelector('.marker-label') as HTMLElement
            if (label) label.style.opacity = '1'
        }

        // Cleanup previous hover
        return () => {
            if (hoveredCourtId && markersRef.current[hoveredCourtId]) {
                const el = markersRef.current[hoveredCourtId].getElement()
                el.classList.remove('z-50')
                const label = el.querySelector('.marker-label') as HTMLElement
                if (label) label.style.opacity = '' // clear inline style to revert to class
            }
        }
    }, [hoveredCourtId])

    if (!mapboxToken) return null

    return (
        <div className="w-full h-[500px] rounded-xl overflow-hidden border border-[#263248] bg-[#0B0F14] relative group">
            <div ref={mapContainer} className="w-full h-full" />

            {isLoading && (
                <div className="absolute inset-0 bg-[#0B0F14] z-50 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-[#A6FF4D] animate-spin" />
                </div>
            )}

            <div className="absolute bottom-4 right-4 bg-[#111826]/90 backdrop-blur border border-[#263248] px-3 py-1.5 rounded-lg text-xs text-[#A8B3C7]">
                {courts.length} canchas registradas
            </div>
        </div>
    )
}
