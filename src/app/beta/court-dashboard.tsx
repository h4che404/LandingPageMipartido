"use client"

import { useState } from "react"
import { Monitor, Zap, Calendar, Bell, TrendingUp, MapPin } from "lucide-react"
import { StatCard, FeatureCard } from "./components"
import { CourtLocationManager } from "@/components/features/court-location-manager"
import { Button } from "@/components/ui/button"

interface CourtDashboardProps {
    profile: any
}

export function CourtDashboard({ profile }: CourtDashboardProps) {
    const [currentTab, setCurrentTab] = useState<"overview" | "location">("overview")

    // Handle pending status
    if (profile.court_status === "pending" || !profile.court_status) {
        return (
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-yellow-500/10 rounded-full flex items-center justify-center">
                        <Monitor className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h1 className="text-3xl font-bold">¡Solicitud recibida!</h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Estamos revisando tu solicitud para <span className="font-semibold text-foreground">{profile.court_name || profile.full_name}</span>.
                        Te contactaremos por WhatsApp pronto.
                    </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <h2 className="font-bold flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" />
                        Datos de tu solicitud
                    </h2>
                    <div className="grid gap-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Cancha/Club</span>
                            <span className="font-medium">{profile.court_name || "-"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Responsable</span>
                            <span className="font-medium">{profile.full_name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Ubicación</span>
                            <span className="font-medium">{profile.court_address || profile.city}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Deporte</span>
                            <span className="font-medium">{profile.sport}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">WhatsApp</span>
                            <span className="font-medium">{profile.whatsapp}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Estado</span>
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/10 text-yellow-600 font-medium">
                                ⏳ Pendiente de aprobación
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Handle rejected status
    if (profile.court_status === "rejected") {
        return (
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
                        <Monitor className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-bold">Solicitud no aprobada</h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Lo sentimos, tu solicitud para <span className="font-semibold text-foreground">{profile.court_name}</span> no fue aprobada.
                    </p>
                    {profile.admin_notes && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-sm text-left">
                            <p className="font-medium text-red-600">Motivo:</p>
                            <p className="text-muted-foreground mt-1">{profile.admin_notes}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    // Approved - show full dashboard
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Panel de {profile.court_name || profile.full_name} 🏟️</h1>
                    <p className="text-muted-foreground">
                        Gestioná tus canchas y turnos desde acá.
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant={currentTab === "overview" ? "default" : "outline"}
                        onClick={() => setCurrentTab("overview")}
                    >
                        <Monitor className="w-4 h-4 mr-2" />
                        Vista General
                    </Button>
                    <Button
                        variant={currentTab === "location" ? "default" : "outline"}
                        onClick={() => setCurrentTab("location")}
                        className={currentTab === "location" ? "bg-[#A6FF4D] text-[#0B0F14] hover:bg-[#A6FF4D]/90" : ""}
                    >
                        <MapPin className="w-4 h-4 mr-2" />
                        Ubicación
                    </Button>
                </div>
            </div>

            {currentTab === "location" ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-[#0B0F14] border border-[#263248] rounded-xl p-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[#E7ECF6]">Configuración de Mapa</h2>
                            <p className="text-[#A8B3C7]">
                                Definí la ubicación exacta para que los jugadores puedan encontrarte.
                            </p>
                        </div>

                        <CourtLocationManager
                            onConfirm={(lat, lng, address) => {
                                console.log("Confirmed Location:", { lat, lng, address })
                                // TODO: Add server action to save this
                                alert("Ubicación capturada (Simulación): " + address)
                            }}
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-4">
                        <Monitor className="w-6 h-6 text-green-500" />
                        <div>
                            <p className="font-medium text-green-600">✅ Cancha aprobada</p>
                            <p className="text-sm text-muted-foreground">
                                Tu cancha está activa. El panel completo estará disponible pronto.
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 space-y-6">
                            <StatCard title="Turnos hoy" value="8" subtitle="3 confirmados" />
                            <StatCard title="Ocupación semanal" value="72%" subtitle="+12% vs semana pasada" />
                            <StatCard title="Ingresos del mes" value="$245.000" subtitle="Simulado" />
                        </div>

                        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Calendario de turnos (Demo)
                            </h3>
                            <div className="space-y-2">
                                {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((hour, i) => (
                                    <div key={hour} className="flex items-center gap-4">
                                        <span className="text-sm text-muted-foreground w-16">{hour}</span>
                                        <div className={`flex-1 h-10 rounded-lg ${i === 1 || i === 3 || i === 5 ? 'bg-green-500/20 border border-green-500/30' : 'bg-muted/50 border border-border'} flex items-center px-3`}>
                                            {(i === 1 || i === 3 || i === 5) && (
                                                <span className="text-sm font-medium text-green-600">
                                                    {i === 1 ? 'Fútbol 5 - Juan P.' : i === 3 ? 'Pádel - Grupo Martes' : 'Fútbol 7 - Liga Amateur'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Funcionalidades que vas a tener</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <FeatureCard icon={<Calendar className="w-5 h-5" />} title="Gestión de turnos" description="Agenda visual, reservas online y confirmaciones automáticas." status="En desarrollo" />
                            <FeatureCard icon={<Bell className="w-5 h-5" />} title="Recordatorios" description="Avisos automáticos a jugadores. Menos plantones." status="Próximamente" />
                            <FeatureCard icon={<TrendingUp className="w-5 h-5" />} title="Reportes" description="Ingresos, ocupación y métricas de tu cancha." status="Próximamente" />
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                        <h2 className="font-bold">Tu perfil de cancha</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <span className="text-muted-foreground">Nombre</span>
                                <p className="font-medium">{profile.court_name || profile.full_name}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Ciudad</span>
                                <p className="font-medium">{profile.city}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Deporte</span>
                                <p className="font-medium">{profile.sport}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Visible en landing</span>
                                <p className="font-medium">{profile.allow_public ? 'Sí' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
