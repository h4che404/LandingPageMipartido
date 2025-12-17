"use client"

import { useState, useRef } from "react"
import { CourtsMap } from "@/components/features/courts-map"
import { MapPin, Trophy, ArrowRight } from "lucide-react"

interface Court {
    user_id: string
    display_name: string
    city: string
    sport: string
    court_lat: number
    court_lng: number
}

interface CourtsExplorerClientProps {
    courts: Court[]
}

export function CourtsExplorerClient({ courts }: CourtsExplorerClientProps) {
    const [selectedCourtId, setSelectedCourtId] = useState<string | null>(null)
    const [hoveredCourtId, setHoveredCourtId] = useState<string | null>(null)

    const handleCourtClick = (courtId: string) => {
        setSelectedCourtId(courtId)
    }

    // Sort courts to put the selected one first if needed, or just highlight it
    // For now we just pass the ID down

    return (
        <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Map Column */}
            <div className="w-full h-[500px]">
                <CourtsMap
                    courts={courts}
                    selectedCourtId={selectedCourtId}
                    hoveredCourtId={hoveredCourtId}
                />
            </div>

            {/* List Column */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {courts.map((court) => (
                    <div
                        key={court.user_id}
                        onClick={() => handleCourtClick(court.user_id)}
                        onMouseEnter={() => setHoveredCourtId(court.user_id)}
                        onMouseLeave={() => setHoveredCourtId(null)}
                        className={`group cursor-pointer relative bg-[#111826] border rounded-xl p-5 transition-all
                            ${selectedCourtId === court.user_id
                                ? 'border-[#A6FF4D] shadow-[0_0_20px_rgba(166,255,77,0.1)]'
                                : 'border-[#263248] hover:border-[#A6FF4D]/50'
                            }
                        `}
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <h3 className={`font-bold transition-colors ${selectedCourtId === court.user_id ? 'text-[#A6FF4D]' : 'text-[#E7ECF6] group-hover:text-[#A6FF4D]'}`}>
                                    {court.display_name}
                                </h3>
                                <div className="flex items-center text-sm text-[#A8B3C7]">
                                    <MapPin className="w-3.5 h-3.5 mr-1 text-[#A6FF4D]" />
                                    {court.city}
                                </div>
                                <div className="flex items-center text-sm text-[#A8B3C7]">
                                    <Trophy className="w-3.5 h-3.5 mr-1 text-yellow-500" />
                                    {court.sport}
                                </div>
                            </div>
                            <div className={`w-10 h-10 rounded-full bg-[#111826] border flex items-center justify-center transition-all
                                ${selectedCourtId === court.user_id
                                    ? 'border-[#A6FF4D] scale-110'
                                    : 'border-[#263248] group-hover:border-[#A6FF4D] group-hover:scale-110'
                                }
                            `}>
                                <ArrowRight className={`w-4 h-4 ${selectedCourtId === court.user_id ? 'text-[#A6FF4D]' : 'text-[#A8B3C7] group-hover:text-[#A6FF4D]'}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
