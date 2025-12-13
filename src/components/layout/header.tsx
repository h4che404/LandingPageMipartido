"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, Sun, Moon } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { colorScheme, setColorScheme, resolvedColorScheme } = useTheme()

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen)
    const closeMenu = () => setMobileMenuOpen(false)

    const toggleColorScheme = () => {
        if (resolvedColorScheme === "dark") {
            setColorScheme("light")
        } else {
            setColorScheme("dark")
        }
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
                    <Button asChild variant="outline" className="rounded-full px-6 border-white/20 hover:bg-white/10 text-foreground bg-transparent transition-all">
                        <Link href="/login">Acceder al panel</Link>
                    </Button>
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
                    <Button asChild variant="outline" className="w-full rounded-full border-border text-foreground" onClick={closeMenu}>
                        <Link href="/login">Acceder al panel</Link>
                    </Button>
                </div>
            )}
        </header>
    )
}
