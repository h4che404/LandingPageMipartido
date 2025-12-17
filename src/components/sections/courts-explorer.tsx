import { createClient } from "@/lib/supabase/server"
import { CourtsExplorerClient } from "@/components/features/courts-explorer-client"
import { MapPin } from "lucide-react"
import Link from "next/link"

export async function CourtsExplorer() {
    const supabase = await createClient()

    // Fetch public courts with location data
    const { data: courts } = await supabase
        .from("public_beta_members")
        .select("*")
        .eq("role", "court")
        .not("court_lat", "is", null) // Only show courts with location
        .order("created_at", { ascending: false })

    if (!courts || courts.length === 0) {
        return null // Don't show section if no courts
    }

    return (
        <section className="py-24 border-t border-border bg-[#0B0F14]/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-4 mb-12">
                    <div className="inline-flex items-center rounded-full border border-[#A6FF4D]/30 bg-[#A6FF4D]/10 px-3 py-1 text-sm font-medium text-[#A6FF4D]">
                        <MapPin className="mr-2 h-4 w-4" />
                        Explorá Canchas
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#E7ECF6]">
                        Canchas Registradas
                    </h2>
                    <p className="mx-auto max-w-[700px] text-[#A8B3C7] md:text-xl">
                        Descubrí los clubes que ya se sumaron a la revolución de Mi Partido.
                    </p>
                </div>

                <CourtsExplorerClient courts={courts as any[]} />
            </div>
        </section>
    )
}
