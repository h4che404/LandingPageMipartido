"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarDays, LayoutDashboard, LayoutGrid, Wallet, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, img: "/images/canchas/gallery-dashboard.png" },
    { id: "reservas", label: "Reservas", icon: CalendarDays, img: "/images/canchas/gallery-reservas.png" },
    { id: "canchas", label: "Canchas", icon: LayoutGrid, img: "/images/canchas/gallery-canchas.png" },
    { id: "caja", label: "Caja", icon: Wallet, img: "/images/canchas/gallery-caja.png" },
    { id: "reportes", label: "Reportes", icon: BarChart, img: "/images/canchas/gallery-reportes.png" },
]

export function SystemGallery() {
    const [activeTab, setActiveTab] = useState(tabs[0].id)

    const activeImg = tabs.find(t => t.id === activeTab)?.img || tabs[0].img

    return (
        <section className="py-24 bg-background border-b border-border">
            <div className="container mx-auto px-4 max-w-7xl">
                
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Mirá el sistema por dentro
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Explorá las pantallas principales de Mi Partido Desktop.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-8">
                    
                    {/* Tabs Navigation */}
                    <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-muted rounded-xl border border-border max-w-fit">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                                        isActive 
                                            ? "bg-background text-foreground shadow-sm ring-1 ring-border" 
                                            : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                    )}
                                >
                                    <tab.icon className={cn("w-4 h-4", isActive ? "text-primary" : "opacity-70")} />
                                    {tab.label}
                                </button>
                            )
                        })}
                    </div>

                    {/* Image Viewer */}
                    <div className="w-full relative rounded-2xl bg-card border border-border/80 shadow-2xl overflow-hidden min-h-[300px] md:min-h-[500px]">
                        {/* Fake Mac Window Header */}
                        <div className="h-8 bg-[#181825] flex items-center px-4 gap-2 border-b border-white/5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full bg-[#1e1e2e]"
                            >
                                <img 
                                    src={activeImg} 
                                    alt={`Vista de ${activeTab}`} 
                                    className="w-full h-auto object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                                <div className="hidden absolute inset-0 top-8 flex items-center justify-center bg-muted">
                                    <p className="text-muted-foreground font-mono">Mockup: {activeTab}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

            </div>
        </section>
    )
}
