import { createClient } from "@/lib/supabase/server"
import { CourtsMap } from "@/components/features/courts-map"
import { MapPin, Trophy, ArrowRight } from "lucide-react"
import Link from "next/link"

export async function CourtsExplorer() {
    const supabase = await createClient()

    // Fetch public courts with location data
    // Note: We use the View which filters by allow_public=true
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
            <div className="container px-4 md:px-6">
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

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Map Column */}
                    <div>
                        <CourtsMap courts={courts as any[]} />
                    </div>

                    {/* List Column */}
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {courts.map((court) => (
                            <div key={court.user_id} className="group relative bg-[#111826] border border-[#263248] rounded-xl p-5 hover:border-[#A6FF4D]/50 transition-all hover:shadow-[0_0_20px_rgba(166,255,77,0.1)]">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-[#E7ECF6] group-hover:text-[#A6FF4D] transition-colors">
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
                                    <div className="w-10 h-10 rounded-full bg-[#111826] border border-[#263248] flex items-center justify-center group-hover:border-[#A6FF4D] group-hover:scale-110 transition-all">
                                        <ArrowRight className="w-4 h-4 text-[#A8B3C7] group-hover:text-[#A6FF4D]" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/beta?role=court">
                        <button className="inline-flex h-11 animate-shimmer items-center justify-center rounded-md border border-[#A6FF4D] bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-[#A6FF4D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A6FF4D] focus:ring-offset-2 focus:ring-offset-slate-50">
                            Registrá tu cancha gratis
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
