"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Hexagon } from "lucide-react"
import { useState } from "react"

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen)
    const closeMenu = () => setMobileMenuOpen(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative flex items-center justify-center w-8 h-8">
                        <Hexagon className="w-8 h-8 text-green-500 fill-current" />
                        <span className="absolute text-[10px] font-bold text-black">⚽</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                        MiPartido
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#benefits" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Beneficios
                    </Link>
                    <Link href="/canchas" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Para Canchas
                    </Link>
                    <Link href="#contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Contacto
                    </Link>
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Button asChild variant="outline" className="rounded-full px-6 border-white/20 hover:bg-white/10 hover:text-white text-white bg-transparent">
                        <Link href="/login">Ingresar</Link>
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2 text-white" onClick={toggleMenu}>
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-white/10 bg-background px-4 py-6 shadow-2xl fixed top-20 left-0 right-0 z-40 flex flex-col gap-4">
                    <Link href="#benefits" onClick={closeMenu} className="text-lg font-medium text-gray-300 hover:text-white">
                        Beneficios
                    </Link>
                    <Link href="/canchas" onClick={closeMenu} className="text-lg font-medium text-gray-300 hover:text-white">
                        Para Canchas
                    </Link>
                    <Link href="#contact" onClick={closeMenu} className="text-lg font-medium text-gray-300 hover:text-white">
                        Contacto
                    </Link>
                    <Button asChild variant="outline" className="w-full rounded-full border-white/20 text-white" onClick={closeMenu}>
                        <Link href="/login">Ingresar</Link>
                    </Button>
                </div>
            )}
        </header>
    )
}
