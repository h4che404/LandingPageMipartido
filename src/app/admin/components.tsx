"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Trash2, Edit, Plus, X, Check, Search, MapPin, Building, AlertCircle, RefreshCw,
    Users, LogOut, Home, Settings, Eye, EyeOff
} from "lucide-react"
import Link from "next/link"
import { deleteMember, updateMember, addMember, togglePublicVisibility, updateCourtStatus } from "./actions"

interface Member {
    id: string
    user_id: string
    full_name: string
    city: string
    sport: string
    role: string
    whatsapp: string | null
    allow_public: boolean
    avatar_url: string | null
    created_at: string
    updated_at: string
    email?: string
    // Court specific fields
    court_name?: string
    court_address?: string
    court_status?: "pending" | "approved" | "rejected"
    admin_notes?: string
}

interface AdminDashboardProps {
    members: Member[]
    count: number
    userEmail: string
}

export function AdminDashboard({ members, count, userEmail }: AdminDashboardProps) {
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editData, setEditData] = useState<Partial<Member>>({})
    const [showAddForm, setShowAddForm] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterRole, setFilterRole] = useState<string>("all")
    const [isLoading, setIsLoading] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

    // Stats
    const playerCount = members.filter(m => m.role === 'player').length
    const courtCount = members.filter(m => m.role === 'court').length
    const pendingCourtsCount = members.filter(m => m.role === 'court' && m.court_status === 'pending').length
    const publicCount = members.filter(m => m.allow_public).length

    // Filtered members
    const filteredMembers = members.filter(m => {
        const matchesSearch = m.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.sport?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.court_name?.toLowerCase().includes(searchTerm.toLowerCase())

        let matchesRole = true
        if (filterRole === "pending") {
            matchesRole = m.role === "court" && m.court_status === "pending"
        } else if (filterRole !== "all") {
            matchesRole = m.role === filterRole
        }

        return matchesSearch && matchesRole
    })

    const handleDelete = async (userId: string) => {
        setIsLoading(true)
        try {
            const result = await deleteMember(userId)
            if (result.success) {
                setDeleteConfirm(null)
            } else {
                alert(`Error: ${result.error}`)
            }
        } catch (error) {
            console.error("Error deleting:", error)
            alert("Error inesperado al eliminar")
        }
        setIsLoading(false)
    }

    const handleEdit = (member: Member) => {
        setEditingId(member.user_id)
        setEditData({
            full_name: member.full_name,
            city: member.city,
            sport: member.sport,
            role: member.role,
            whatsapp: member.whatsapp || "",
            allow_public: member.allow_public,
            court_name: member.court_name,
            court_status: member.court_status
        })
    }

    const handleSaveEdit = async (userId: string) => {
        setIsLoading(true)
        try {
            await updateMember(userId, {
                ...editData,
                whatsapp: editData.whatsapp || undefined
            })
            setEditingId(null)
            setEditData({})
        } catch (error) {
            console.error("Error updating:", error)
            alert("Error al actualizar")
        }
        setIsLoading(false)
    }

    const handleTogglePublic = async (userId: string, currentValue: boolean) => {
        setIsLoading(true)
        try {
            await togglePublicVisibility(userId, currentValue)
        } catch (error) {
            console.error("Error toggling:", error)
        }
        setIsLoading(false)
    }

    const handleCourtStatus = async (userId: string, status: "approved" | "rejected") => {
        if (!confirm(`¿Estás seguro de ${status === 'approved' ? 'APROBAR' : 'RECHAZAR'} esta cancha?`)) return

        setIsLoading(true)
        try {
            const result = await updateCourtStatus(userId, status)
            if (!result.success) {
                alert(`Error: ${result.error}`)
            }
        } catch (error) {
            console.error("Error updating court status:", error)
            alert("Error inesperado al actualizar estado")
        }
        setIsLoading(false)
    }

    const handleAddMember = async (formData: FormData) => {
        setIsLoading(true)
        try {
            await addMember({
                full_name: formData.get("full_name") as string,
                city: formData.get("city") as string,
                sport: formData.get("sport") as string,
                role: formData.get("role") as string,
                whatsapp: formData.get("whatsapp") as string || undefined,
                allow_public: formData.get("allow_public") === "on"
            })
            setShowAddForm(false)
        } catch (error) {
            console.error("Error adding:", error)
            alert("Error al agregar")
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Admin Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 w-full">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-xl font-bold text-primary">Mi Partido</Link>
                        <span className="text-xs bg-red-500/10 text-red-500 px-2 py-1 rounded-full font-bold uppercase">
                            Admin
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground hidden md:block">{userEmail}</span>
                        <Link href="/beta" className="text-sm text-muted-foreground hover:text-foreground">
                            Portal Beta
                        </Link>
                        <form action="/auth/signout" method="post">
                            <Button variant="ghost" size="sm">
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="space-y-8">

                    {/* Title */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">Panel de Administración</h1>
                            <p className="text-muted-foreground">
                                Gestión completa de usuarios y canchas de la beta.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={filterRole === "pending" ? "default" : "outline"}
                                className={filterRole === "pending" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "border-yellow-500/50 text-yellow-600 hover:bg-yellow-500/10"}
                                onClick={() => setFilterRole("pending")}
                            >
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Solicitudes ({pendingCourtsCount})
                            </Button>
                            <Button onClick={() => window.location.reload()} variant="outline" size="sm">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Actualizar
                            </Button>
                            <Button onClick={() => setShowAddForm(true)} size="sm">
                                <Plus className="w-4 h-4 mr-2" />
                                Agregar Usuario
                            </Button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard title="Total Usuarios" value={count} icon={<Users className="w-5 h-5" />} />
                        <StatCard title="Jugadores" value={playerCount} icon={<Users className="w-5 h-5" />} color="blue" />
                        <StatCard title="Canchas" value={courtCount} icon={<Building className="w-5 h-5" />} color="yellow" />
                        <StatCard title="Visibles Públicos" value={publicCount} icon={<Eye className="w-5 h-5" />} color="green" />
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="outline" size="sm">
                            <Link href="/" target="_blank">
                                <Home className="w-4 h-4 mr-2" />
                                Ver Landing
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/canchas" target="_blank">
                                Ver /canchas
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
                                <Settings className="w-4 h-4 mr-2" />
                                Supabase
                            </a>
                        </Button>
                    </div>

                    {/* Search & Filters */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nombre, email, ciudad o deporte..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={filterRole === "all" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterRole("all")}
                            >
                                Todos
                            </Button>
                            <Button
                                variant={filterRole === "player" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterRole("player")}
                            >
                                Jugadores
                            </Button>
                            <Button
                                variant={filterRole === "court" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterRole("court")}
                            >
                                Canchas
                            </Button>
                        </div>
                    </div>

                    {/* Add Member Form Modal */}
                    {showAddForm && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                            <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md space-y-4 shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold">Agregar Usuario</h2>
                                    <button onClick={() => setShowAddForm(false)}>
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <form action={handleAddMember} className="space-y-4">
                                    <div>
                                        <Label>Nombre completo *</Label>
                                        <Input name="full_name" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Ciudad *</Label>
                                            <Input name="city" required defaultValue="Mendoza" />
                                        </div>
                                        <div>
                                            <Label>Deporte *</Label>
                                            <Input name="sport" required placeholder="Fútbol, Pádel..." />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Rol *</Label>
                                        <select name="role" className="w-full h-10 rounded-md border border-input bg-background px-3" required>
                                            <option value="player">Jugador</option>
                                            <option value="court">Cancha</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label>WhatsApp</Label>
                                        <Input name="whatsapp" placeholder="+54 9 261..." />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" name="allow_public" id="allow_public" defaultChecked />
                                        <Label htmlFor="allow_public" className="text-sm">Mostrar en lista pública</Label>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddForm(false)}>
                                            Cancelar
                                        </Button>
                                        <Button type="submit" className="flex-1" disabled={isLoading}>
                                            {isLoading ? "Guardando..." : "Agregar"}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Members Table */}
                    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/20">
                            <h2 className="font-bold text-lg">
                                {filterRole === 'pending' ? 'Solicitudes Pendientes' : 'Usuarios Beta'} ({filteredMembers.length})
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/50">
                                    <tr className="text-left text-xs text-muted-foreground uppercase">
                                        <th className="p-4">Usuario</th>
                                        <th className="p-4">Detalles</th>
                                        <th className="p-4">Rol</th>
                                        <th className="p-4">Contacto</th>
                                        <th className="p-4">Estado</th>
                                        <th className="p-4 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredMembers.map((member) => (
                                        <tr key={member.id} className="hover:bg-muted/30 transition-colors">
                                            {editingId === member.user_id ? (
                                                // Edit mode
                                                <>
                                                    <td className="p-4 col-span-6" colSpan={6}>
                                                        <div className="grid grid-cols-2 gap-4 p-2 bg-muted/20 rounded-lg">
                                                            <div className="col-span-2 font-bold mb-2">Editando: {member.full_name}</div>
                                                            <div>
                                                                <Label className="text-xs">Nombre</Label>
                                                                <Input
                                                                    value={editData.full_name || ""}
                                                                    onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                                                                    className="h-8 text-sm"
                                                                />
                                                            </div>
                                                            {member.role === 'court' && (
                                                                <div>
                                                                    <Label className="text-xs">Nombre Cancha</Label>
                                                                    <Input
                                                                        value={editData.court_name || ""}
                                                                        onChange={(e) => setEditData({ ...editData, court_name: e.target.value })}
                                                                        className="h-8 text-sm"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <Label className="text-xs">Ciudad</Label>
                                                                <Input
                                                                    value={editData.city || ""}
                                                                    onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                                                                    className="h-8 text-sm"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label className="text-xs">WhatsApp</Label>
                                                                <Input
                                                                    value={editData.whatsapp || ""}
                                                                    onChange={(e) => setEditData({ ...editData, whatsapp: e.target.value })}
                                                                    className="h-8 text-sm"
                                                                />
                                                            </div>
                                                            <div className="col-span-2 flex justify-end gap-2 mt-2">
                                                                <Button size="sm" variant="outline" onClick={() => { setEditingId(null); setEditData({}) }}>
                                                                    Cancelar
                                                                </Button>
                                                                <Button size="sm" onClick={() => handleSaveEdit(member.user_id)}>
                                                                    Guardar Cambios
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </>
                                            ) : (
                                                // View mode
                                                <>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${member.role === 'court' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-primary/10 text-primary'
                                                                }`}>
                                                                {member.role === 'court' ? <Building className="w-4 h-4" /> : member.full_name?.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">{member.full_name}</p>
                                                                <p className="text-xs text-muted-foreground truncate max-w-[150px]" title={member.email || ''}>
                                                                    {member.email || member.user_id.slice(0, 8)}
                                                                </p>
                                                                {member.role === 'court' && member.court_name && (
                                                                    <p className="text-xs text-yellow-600 font-medium">{member.court_name}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex flex-col text-xs text-muted-foreground">
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="w-3 h-3" /> {member.city}
                                                            </span>
                                                            <span>{member.sport}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`text-xs px-2 py-1 rounded-full font-medium border ${member.role === 'court'
                                                            ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                                                            : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                                                            }`}>
                                                            {member.role === 'court' ? 'Cancha' : 'Jugador'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-xs text-muted-foreground">
                                                        {member.whatsapp || '-'}
                                                    </td>
                                                    <td className="p-4">
                                                        {member.role === 'court' ? (
                                                            <div className="flex flex-col gap-1">
                                                                <span className={`text-xs font-medium ${member.court_status === 'approved' ? 'text-green-500' :
                                                                    member.court_status === 'rejected' ? 'text-red-500' :
                                                                        'text-yellow-500'
                                                                    }`}>
                                                                    {member.court_status === 'approved' ? 'Aprobada' :
                                                                        member.court_status === 'rejected' ? 'Rechazada' :
                                                                            'Pendiente'}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleTogglePublic(member.user_id, member.allow_public)}
                                                                className="hover:opacity-70 transition-opacity"
                                                                title="Click para cambiar visibilidad"
                                                            >
                                                                {member.allow_public ? (
                                                                    <Eye className="w-4 h-4 text-green-500" />
                                                                ) : (
                                                                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                                                                )}
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex gap-1 justify-end items-center">

                                                            {/* Approval Buttons for Pending Courts */}
                                                            {member.role === 'court' && member.court_status === 'pending' && (
                                                                <>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        className="h-8 w-8 border-green-500/50 text-green-500 hover:bg-green-500/20"
                                                                        onClick={() => handleCourtStatus(member.user_id, 'approved')}
                                                                        title="Aprobar Cancha"
                                                                        disabled={isLoading}
                                                                    >
                                                                        <Check className="w-4 h-4" />
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        className="h-8 w-8 border-red-500/50 text-red-500 hover:bg-red-500/20 mr-2"
                                                                        onClick={() => handleCourtStatus(member.user_id, 'rejected')}
                                                                        title="Rechazar Cancha"
                                                                        disabled={isLoading}
                                                                    >
                                                                        <X className="w-4 h-4" />
                                                                    </Button>
                                                                </>
                                                            )}

                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="h-8 w-8"
                                                                onClick={() => handleEdit(member)}
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            {deleteConfirm === member.user_id ? (
                                                                <div className="flex gap-1 animate-in fade-in zoom-in duration-200">
                                                                    <Button
                                                                        size="sm"
                                                                        variant="destructive"
                                                                        className="h-8 w-8"
                                                                        onClick={() => handleDelete(member.user_id)}
                                                                        disabled={isLoading}
                                                                    >
                                                                        <Check className="w-4 h-4" />
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        className="h-8 w-8"
                                                                        onClick={() => setDeleteConfirm(null)}
                                                                    >
                                                                        <X className="w-4 h-4" />
                                                                    </Button>
                                                                </div>
                                                            ) : (
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                                                    onClick={() => setDeleteConfirm(member.user_id)}
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredMembers.length === 0 && (
                            <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-2">
                                <Search className="w-8 h-8 opacity-20" />
                                <p>No se encontraron resultados.</p>
                            </div>
                        )}
                    </div>

                    {/* Tips */}
                    <div className="text-sm text-muted-foreground space-y-1 bg-muted/20 p-4 rounded-lg">
                        <p>💡 <strong>Solicitudes:</strong> Usá el filtro "Solicitudes" para ver canchas esperando aprobación.</p>
                        <p>✅ <strong>Aprobar:</strong> Habilita el acceso de la cancha al sistema.</p>
                        <p>❌ <strong>Rechazar:</strong> Bloquea el acceso y marca la solicitud como denegada.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, icon, color = "primary" }: {
    title: string
    value: number
    icon: React.ReactNode
    color?: "primary" | "blue" | "yellow" | "green"
}) {
    const colors = {
        primary: "bg-primary/10 text-primary",
        blue: "bg-blue-500/10 text-blue-500",
        yellow: "bg-yellow-500/10 text-yellow-600",
        green: "bg-green-500/10 text-green-500",
    }

    return (
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${colors[color]} flex items-center justify-center`}>
                    {icon}
                </div>
                <div>
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-xs text-muted-foreground">{title}</p>
                </div>
            </div>
        </div>
    )
}
