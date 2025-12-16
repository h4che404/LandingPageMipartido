"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, Sun, Moon, LogOut, User } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserData {
    email: string
    avatar_url?: string
    full_name?: string
}

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [user, setUser] = useState<UserData | null>(null)
    const [showDropdown, setShowDropdown] = useState(false)
    const { colorScheme, setColorScheme, resolvedColorScheme } = useTheme()

    useEffect(() => {
        const supabase = createClient()

        // Get initial session
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                setUser({
                    email: user.email || '',
                    avatar_url: user.user_metadata?.avatar_url,
                    full_name: user.user_metadata?.full_name
                })
            }
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                setUser({
                    email: session.user.email || '',
                    avatar_url: session.user.user_metadata?.avatar_url,
                    full_name: session.user.user_metadata?.full_name
                })
            } else {
                setUser(null)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen)
    const closeMenu = () => setMobileMenuOpen(false)

    const toggleColorScheme = () => {
        if (resolvedColorScheme === "dark") {
            setColorScheme("light")
        } else {
            setColorScheme("dark")
        }
    }

    const handleSignOut = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        setUser(null)
        setShowDropdown(false)
        window.location.href = '/'
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <Image
                        src="/logo.png"
                        alt="Mi Partido"
                        width={36}
                        height={36}
                        className="rounded-lg"
                    />
                    <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        MiPartido
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/beneficios" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Beneficios
                    </Link>
                    <Link href="/canchas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Para Canchas
                    </Link>
                    <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Contacto
                    </Link>
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={toggleColorScheme}
                        className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        aria-label="Toggle theme"
                    >
                        {resolvedColorScheme === "dark" ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 p-1 rounded-full hover:bg-muted transition-colors"
                            >
                                <Avatar className="h-9 w-9 border-2 border-primary">
                                    <AvatarImage src={user.avatar_url} alt={user.full_name || 'Usuario'} />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                        {user.full_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 top-12 w-56 bg-card border border-border rounded-xl shadow-lg py-2 z-50">
                                    <div className="px-4 py-3 border-b border-border">
                                        <p className="font-medium text-sm">{user.full_name || 'Usuario'}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        href="/beta"
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-sm"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <User className="w-4 h-4" />
                                        Portal Beta
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-sm w-full text-left text-red-500"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button asChild variant="outline" className="rounded-full px-6 border-border hover:bg-muted text-foreground bg-transparent">
                            <Link href="/login">Ingresar</Link>
                        </Button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center gap-2">
                    <button
                        onClick={toggleColorScheme}
                        className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
                        aria-label="Toggle theme"
                    >
                        {resolvedColorScheme === "dark" ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>

                    {user && (
                        <Link href="/beta" className="p-1">
                            <Avatar className="h-8 w-8 border-2 border-primary">
                                <AvatarImage src={user.avatar_url} alt={user.full_name || 'Usuario'} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                    {user.full_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    )}

                    <button className="p-2 text-foreground" onClick={toggleMenu}>
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-background px-4 py-6 shadow-2xl fixed top-20 left-0 right-0 z-40 flex flex-col gap-4">
                    <Link href="/beneficios" onClick={closeMenu} className="text-lg font-medium text-muted-foreground hover:text-foreground">
                        Beneficios
                    </Link>
                    <Link href="/canchas" onClick={closeMenu} className="text-lg font-medium text-muted-foreground hover:text-foreground">
                        Para Canchas
                    </Link>
                    <Link href="#contact" onClick={closeMenu} className="text-lg font-medium text-muted-foreground hover:text-foreground">
                        Contacto
                    </Link>

                    {user ? (
                        <>
                            <hr className="border-border" />
                            <Link href="/beta" onClick={closeMenu} className="text-lg font-medium text-primary">
                                Portal Beta
                            </Link>
                            <button
                                onClick={() => { handleSignOut(); closeMenu(); }}
                                className="text-lg font-medium text-red-500 text-left"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <Button asChild variant="outline" className="w-full rounded-full border-border text-foreground" onClick={closeMenu}>
                            <Link href="/login">Ingresar</Link>
                        </Button>
                    )}
                </div>
            )}
        </header>
    )
}

