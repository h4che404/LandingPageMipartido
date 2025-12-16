"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface PublicMember {
    display_name: string
    city: string
    sport: string
    role: string
    avatar_url: string | null
    created_at: string
}

export function PublicBetaList() {
    const [members, setMembers] = useState<PublicMember[]>([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        async function fetchData() {
            const supabase = createClient()

            // Get count of users who allow public display
            const { count } = await supabase
                .from("public_beta_members")
                .select("*", { count: "exact", head: true })

            if (count !== null) setCount(count)

            // Get recent public members
            const { data } = await supabase
                .from("public_beta_members")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(12)

            if (data) setMembers(data)
        }

        fetchData()
    }, [])

    if (count === 0 && members.length === 0) {
        return null // Don't show section if no public members
    }

    return (
        <section className="py-20 border-t border-border bg-background">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Gente esperando en Mendoza
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Ya somos <span className="text-primary font-bold">{count}</span> jugadores y canchas en la beta.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member, i) => (
                        <div key={i} className="flex items-center space-x-4 p-4 rounded-xl border border-border bg-card">
                            <Avatar>
                                <AvatarImage src={member.avatar_url || undefined} alt={member.display_name} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    {member.display_name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">{member.display_name}</p>
                                <div className="flex items-center text-xs text-muted-foreground gap-2">
                                    <span>{member.city}</span>
                                    <span>•</span>
                                    <span>{member.sport}</span>
                                </div>
                            </div>
                            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                                {member.role === 'court' ? 'Cancha' : 'Jugador'}
                            </Badge>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

