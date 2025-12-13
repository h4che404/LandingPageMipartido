"use client"

import { Medal } from "lucide-react"

export function Incentive() {
    return (
        <section className="py-12 bg-yellow-500/10 border-y border-yellow-500/20">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 shrink-0">
                    <Medal className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-yellow-500 mb-1">Benefit exclusivo para fundadores</h3>
                    <p className="text-yellow-200/80 max-w-xl">
                        Los primeros 50 capitanes entra como <strong>usuarios fundadores</strong> y tendrán acceso exclusivo + beneficios especiales de por vida.
                    </p>
                </div>
            </div>
        </section>
    )
}
