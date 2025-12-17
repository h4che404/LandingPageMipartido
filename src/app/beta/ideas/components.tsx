"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    ArrowLeft, Plus, ThumbsUp, ThumbsDown, MessageSquare,
    Image as ImageIcon, X, Send, Lightbulb, Sparkles, Bug, Zap, Trash2
} from "lucide-react"
import Link from "next/link"
import { createIdea, voteIdea, addComment, deleteIdea } from "./actions"
import { createClient } from "@/lib/supabase/client"

interface Idea {
    id: string
    user_id: string
    title: string
    description: string
    category: string
    image_url: string | null
    votes: number
    status: string
    created_at: string
}

interface Comment {
    id: string
    idea_id: string
    user_id: string
    content: string
    image_url?: string | null
    created_at: string
}

interface Member {
    user_id: string
    full_name: string
    avatar_url: string | null
    city: string
}

interface IdeasForumProps {
    initialIdeas: Idea[]
    initialUserVotes: { idea_id: string, vote_type: string }[]
    initialComments: Comment[]
    members: Member[]
    currentUserId: string
    profile: any
}

const categories = [
    { id: "feature", label: "Nueva función", icon: Sparkles, color: "text-purple-500 bg-purple-500/10" },
    { id: "improvement", label: "Mejora", icon: Zap, color: "text-blue-500 bg-blue-500/10" },
    { id: "bug", label: "Bug/Problema", icon: Bug, color: "text-red-500 bg-red-500/10" },
    { id: "other", label: "Otro", icon: Lightbulb, color: "text-yellow-500 bg-yellow-500/10" },
]

export function IdeasForum({ initialIdeas, initialUserVotes, initialComments, members, currentUserId, profile }: IdeasForumProps) {
    const [ideas, setIdeas] = useState<Idea[]>(initialIdeas)
    const [comments, setComments] = useState<Comment[]>(initialComments)
    const [userVotes, setUserVotes] = useState(initialUserVotes)
    const [showNewForm, setShowNewForm] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("feature")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [expandedIdea, setExpandedIdea] = useState<string | null>(null)
    const [newComment, setNewComment] = useState("")
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [ideaToDelete, setIdeaToDelete] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const getAuthor = (userId: string) => {
        return members.find(m => m.user_id === userId) || { full_name: "Usuario", avatar_url: null, city: "Mendoza" }
    }

    useEffect(() => {
        const supabase = createClient()

        const ideasChannel = supabase
            .channel('ideas-realtime')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'beta_ideas' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setIdeas(prev => [payload.new as Idea, ...prev])
                    } else if (payload.eventType === 'UPDATE') {
                        setIdeas(prev => prev.map(i => i.id === payload.new.id ? payload.new as Idea : i))
                    } else if (payload.eventType === 'DELETE') {
                        setIdeas(prev => prev.filter(i => i.id !== payload.old.id))
                    }
                }
            )
            .subscribe()

        const commentsChannel = supabase
            .channel('comments-realtime')
            .on('postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'beta_idea_comments' },
                (payload) => {
                    setComments(prev => [...prev, payload.new as Comment])
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(ideasChannel)
            supabase.removeChannel(commentsChannel)
        }
    }, [])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => setPreviewImage(e.target?.result as string)
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true)
        formData.set("category", selectedCategory)

        try {
            // Upload image client-side first
            const imageFile = fileInputRef.current?.files?.[0]
            let imageUrl = null

            if (imageFile && imageFile.size > 0) {
                const supabase = createClient()
                const fileExt = imageFile.name.split('.').pop() || 'png'
                const fileName = `${currentUserId}/${Date.now()}.${fileExt}`

                const { error: uploadError } = await supabase.storage
                    .from("ideas-images")
                    .upload(fileName, imageFile, {
                        cacheControl: '3600'
                    })

                if (!uploadError) {
                    const { data: { publicUrl } } = supabase.storage
                        .from("ideas-images")
                        .getPublicUrl(fileName)
                    imageUrl = publicUrl
                } else {
                    console.error("Upload error:", uploadError.message)
                }
            }

            // Pass the image URL to the server action and REMOVE the file
            formData.delete("image") // Remove the file to avoid 1MB limit
            formData.set("imageUrl", imageUrl || "")

            await createIdea(formData)
            setShowNewForm(false)
            setSelectedCategory("feature")
            setPreviewImage(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
        } catch (error: any) {
            console.error(error)
            alert(error.message || "Error al crear la idea")
        }
        setIsSubmitting(false)
    }

    const handleVote = async (ideaId: string, action: "up" | "down") => {
        const currentVote = userVotes.find(v => v.idea_id === ideaId)?.vote_type

        setIdeas(prev => prev.map(idea => {
            if (idea.id !== ideaId) return idea
            let newVotes = idea.votes
            if (currentVote === action) {
                newVotes = action === "up" ? idea.votes - 1 : idea.votes + 1
            } else if (currentVote) {
                newVotes = action === "up" ? idea.votes + 2 : idea.votes - 2
            } else {
                newVotes = action === "up" ? idea.votes + 1 : idea.votes - 1
            }
            return { ...idea, votes: newVotes }
        }))

        if (currentVote === action) {
            setUserVotes(prev => prev.filter(v => v.idea_id !== ideaId))
        } else {
            setUserVotes(prev => {
                const filtered = prev.filter(v => v.idea_id !== ideaId)
                return [...filtered, { idea_id: ideaId, vote_type: action }]
            })
        }

        try {
            await voteIdea(ideaId, action)
        } catch (error) {
            console.error(error)
        }
    }

    const handleComment = async (ideaId: string) => {
        if (!newComment.trim()) return
        const commentText = newComment
        setNewComment("")
        try {
            await addComment(ideaId, commentText)
        } catch (error) {
            console.error(error)
            setNewComment(commentText)
        }
    }

    const handleDeleteIdea = async () => {
        if (!ideaToDelete) return
        setIsDeleting(true)
        try {
            await deleteIdea(ideaToDelete)
            setIdeas(prev => prev.filter(i => i.id !== ideaToDelete))
            setIdeaToDelete(null)
        } catch (e) {
            console.error(e)
        }
        setIsDeleting(false)
    }

    const getIdeaComments = (ideaId: string) => comments.filter(c => c.idea_id === ideaId)
    const getUserVote = (ideaId: string) => userVotes.find(v => v.idea_id === ideaId)?.vote_type

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/beta" className="text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold">Ideas & Feedback</h1>
                            <p className="text-xs text-muted-foreground">💬 Chat en tiempo real</p>
                        </div>
                    </div>
                    <Button onClick={() => setShowNewForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Nueva idea
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-3xl">
                {/* Delete Confirmation Modal */}
                {ideaToDelete && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm space-y-4 animate-in fade-in zoom-in-95">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <Trash2 className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold">Eliminar idea</h2>
                                    <p className="text-sm text-muted-foreground">Esta acción no se puede deshacer</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                ¿Estás seguro que querés eliminar esta idea? Se borrarán también todos los votos y comentarios.
                            </p>
                            <div className="flex gap-2 pt-2">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setIdeaToDelete(null)}
                                    disabled={isDeleting}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                                    onClick={handleDeleteIdea}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? "Eliminando..." : "Eliminar"}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* New Idea Modal */}
                {showNewForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-card border border-border rounded-xl p-6 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">Compartí tu idea</h2>
                                <button onClick={() => { setShowNewForm(false); setPreviewImage(null) }}>
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form action={handleSubmit} className="space-y-4">
                                <div>
                                    <Label>Categoría</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {categories.map(cat => (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => setSelectedCategory(cat.id)}
                                                className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${selectedCategory === cat.id ? "border-primary bg-primary/5" : "border-border"
                                                    }`}
                                            >
                                                <cat.icon className={`w-4 h-4 ${cat.color.split(' ')[0]}`} />
                                                <span className="text-sm">{cat.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="title">Título</Label>
                                    <Input id="title" name="title" required placeholder="Ej: Sistema de niveles" />
                                </div>
                                <div>
                                    <Label htmlFor="description">Descripción</Label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        required
                                        rows={4}
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none"
                                        placeholder="Describí tu idea en detalle..."
                                    />
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <Label>Imagen (opcional)</Label>
                                    <input
                                        type="file"
                                        name="image"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    {previewImage ? (
                                        <div className="relative mt-2">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="w-full h-40 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPreviewImage(null)
                                                    if (fileInputRef.current) fileInputRef.current.value = ''
                                                }}
                                                className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full hover:bg-black/80"
                                            >
                                                <X className="w-4 h-4 text-white" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full mt-2 h-20 border-2 border-dashed border-border rounded-lg flex items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
                                        >
                                            <ImageIcon className="w-5 h-5" />
                                            <span className="text-sm">Agregar imagen o screenshot</span>
                                        </button>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => { setShowNewForm(false); setPreviewImage(null) }}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button type="submit" className="flex-1" disabled={isSubmitting}>
                                        {isSubmitting ? "Publicando..." : "Publicar"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {ideas.length === 0 ? (
                    <div className="text-center py-16 space-y-4">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                            <Lightbulb className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold">Sé el primero en compartir una idea</h2>
                        <p className="text-muted-foreground">Tus ideas nos ayudan a construir la app que necesitás.</p>
                        <Button onClick={() => setShowNewForm(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Compartir idea
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {ideas.map(idea => {
                            const author = getAuthor(idea.user_id)
                            const userVote = getUserVote(idea.id)
                            const ideaComments = getIdeaComments(idea.id)
                            const category = categories.find(c => c.id === idea.category) || categories[3]

                            return (
                                <div key={idea.id} className="bg-card border border-border rounded-xl overflow-hidden">
                                    <div className="p-5">
                                        {/* Author Header */}
                                        <div className="flex items-start gap-3 mb-3">
                                            {author.avatar_url ? (
                                                <img src={author.avatar_url} alt={author.full_name} className="w-10 h-10 rounded-full" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                    {author.full_name?.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{author.full_name}</span>
                                                    <span className="text-xs text-muted-foreground">• {author.city}</span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${category.color}`}>
                                                        {category.label}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(idea.created_at).toLocaleDateString('es-AR')}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Delete button for owner */}
                                            {idea.user_id === currentUserId && (
                                                <button
                                                    onClick={() => setIdeaToDelete(idea.id)}
                                                    className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                                    title="Eliminar idea"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <h3 className="font-bold text-lg mb-2">{idea.title}</h3>
                                        <p className="text-muted-foreground text-sm whitespace-pre-wrap">{idea.description}</p>

                                        {/* Image */}
                                        {idea.image_url && (
                                            <img
                                                src={idea.image_url}
                                                alt="Imagen de la idea"
                                                className="w-full max-h-80 object-cover rounded-lg mt-4 cursor-pointer hover:opacity-90 transition-opacity"
                                                onClick={() => window.open(idea.image_url!, '_blank')}
                                            />
                                        )}

                                        {/* Actions */}
                                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => handleVote(idea.id, "up")}
                                                    className={`p-2 rounded-lg transition-colors ${userVote === "up" ? "bg-green-500/20 text-green-500" : "hover:bg-muted text-muted-foreground"}`}
                                                >
                                                    <ThumbsUp className="w-4 h-4" />
                                                </button>
                                                <span className={`font-bold text-sm min-w-[20px] text-center ${idea.votes > 0 ? "text-green-500" : idea.votes < 0 ? "text-red-500" : ""}`}>
                                                    {idea.votes}
                                                </span>
                                                <button
                                                    onClick={() => handleVote(idea.id, "down")}
                                                    className={`p-2 rounded-lg transition-colors ${userVote === "down" ? "bg-red-500/20 text-red-500" : "hover:bg-muted text-muted-foreground"}`}
                                                >
                                                    <ThumbsDown className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => setExpandedIdea(expandedIdea === idea.id ? null : idea.id)}
                                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                                {ideaComments.length} comentarios
                                            </button>
                                        </div>
                                    </div>

                                    {/* Comments Section */}
                                    {expandedIdea === idea.id && (
                                        <div className="border-t border-border bg-muted/30 p-4 space-y-4">
                                            {ideaComments.length > 0 && (
                                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                                    {ideaComments.map(comment => {
                                                        const commentAuthor = getAuthor(comment.user_id)
                                                        return (
                                                            <div key={comment.id} className="flex gap-3">
                                                                {commentAuthor.avatar_url ? (
                                                                    <img src={commentAuthor.avatar_url} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
                                                                ) : (
                                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
                                                                        {commentAuthor.full_name?.charAt(0).toUpperCase()}
                                                                    </div>
                                                                )}
                                                                <div className="flex-1 bg-background rounded-lg p-3">
                                                                    <span className="font-medium text-sm">{commentAuthor.full_name}</span>
                                                                    <p className="text-sm mt-1">{comment.content}</p>
                                                                    {comment.image_url && (
                                                                        <img
                                                                            src={comment.image_url}
                                                                            alt=""
                                                                            className="max-h-40 rounded-lg mt-2 cursor-pointer"
                                                                            onClick={() => window.open(comment.image_url!, '_blank')}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                            <div className="flex gap-2">
                                                <Input
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    placeholder="Escribí un comentario..."
                                                    className="flex-1"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' && !e.shiftKey) {
                                                            e.preventDefault()
                                                            handleComment(idea.id)
                                                        }
                                                    }}
                                                />
                                                <Button size="sm" onClick={() => handleComment(idea.id)}>
                                                    <Send className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </main>
        </div>
    )
}
