"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail } from "lucide-react"

// TikTok icon custom if needed, or use Lucide if available. 
// Lucide doesn't have TikTok, using a simple svg or text placeholder.
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
)

export function Footer() {
    return (
        <footer id="contact" className="bg-black/40 border-t border-white/5 py-12 mt-12">
            <div className="container mx-auto px-4 flex flex-col items-center text-center gap-6">

                {/* Logo Round */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shadow-xl">
                    <Image
                        src="/logo.png"
                        alt="Mi Partido Logo"
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="flex gap-6 text-muted-foreground">
                    <Link href="https://instagram.com" target="_blank" className="hover:text-white transition-colors">
                        <Instagram className="w-6 h-6" />
                        <span className="sr-only">Instagram</span>
                    </Link>
                    <Link href="https://tiktok.com" target="_blank" className="hover:text-white transition-colors">
                        <TikTokIcon className="w-6 h-6" />
                        <span className="sr-only">TikTok</span>
                    </Link>
                    <Link href="mailto:capitanes@mipartido.app" className="hover:text-white transition-colors">
                        <Mail className="w-6 h-6" />
                        <span className="sr-only">Email</span>
                    </Link>
                </div>

                <div className="text-sm text-muted-foreground/60">
                    <p>capitanes@mipartido.app</p>
                    <p className="mt-2">&copy; {new Date().getFullYear()} Mi Partido App. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
