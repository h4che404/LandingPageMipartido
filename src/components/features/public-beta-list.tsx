"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin } from "lucide-react"

interface PublicCourt {
    display_name: string
    city: string
    sport: string
    avatar_url: string | null
    created_at: string
}

export function PublicBetaList() {
    const [courts, setCourts] = useState<PublicCourt[]>([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        async function fetchData() {
            const supabase = createClient()

            // Get count of courts who allow public display
            const { count } = await supabase
                .from("public_beta_members")
                .select("*", { count: "exact", head: true })
                .eq("role", "court")

            if (count !== null) setCount(count)

            // Get recent public courts
            const { data } = await supabase
                .from("public_beta_members")
                .select("*")
                .eq("role", "court")
                .order("created_at", { ascending: false })
                .limit(12)

            if (data) setCourts(data)
        }

        fetchData()
    }, [])

    if (count === 0 && courts.length === 0) {
        return null // Don't show section if no public courts
    }

    return (
        <section className="py-20 border-t border-border bg-background">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Canchas asociadas
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Ya son <span className="text-primary font-bold">{count}</span> canchas sumándose a Mi Partido.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courts.map((court, i) => (
                        <div key={i} className="flex items-center space-x-4 p-4 rounded-xl border border-border bg-card">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={court.avatar_url || undefined} alt={court.display_name} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    {court.display_name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">{court.display_name}</p>
                                <div className="flex items-center text-xs text-muted-foreground gap-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{court.city}</span>
                                    <span>•</span>
                                    <span>{court.sport}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


