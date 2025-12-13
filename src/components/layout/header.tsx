"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/10 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        Mi Partido<span className="text-primary">.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/canchas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Para canchas
                    </Link>
                    <Link href="#audience" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Para quién es
                    </Link>
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Button asChild size="sm" className="rounded-full px-6 font-semibold">
                        <Link href="#waitlist">Sumarme</Link>
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2 text-foreground" onClick={toggleMenu}>
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-background px-4 py-4 shadow-lg fixed top-16 left-0 right-0 z-40">
                    <nav className="flex flex-col space-y-4">
                        <Link
                            href="/canchas"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Para canchas
                        </Link>
                        <Link
                            href="#audience"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Para quién es
                        </Link>
                        <Button asChild className="w-full rounded-full" onClick={() => setMobileMenuOpen(false)}>
                            <Link href="#waitlist">Sumarme a la lista</Link>
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}
