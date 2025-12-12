import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t border-border bg-background py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                        <span className="text-lg font-bold tracking-tight text-foreground">
                            Mi Partido<span className="text-primary">.</span>
                        </span>
                        <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                            La app para organizar partidos de fútbol, pádel y tenis.
                            Encontrá rivales, jugá torneos o simplemente divertite con amigos.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                        <div className="flex flex-col gap-3">
                            <h4 className="text-sm font-semibold text-foreground">Producto</h4>
                            <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cómo funciona</Link>
                            <Link href="#modes" className="text-sm text-muted-foreground hover:text-primary transition-colors">Modos de juego</Link>
                            <Link href="#organizers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Para canchas</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
                            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacidad</Link>
                            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Términos</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="text-sm font-semibold text-foreground">Contacto</h4>
                            <a href="mailto:hola@mipartido.app" className="text-sm text-muted-foreground hover:text-primary transition-colors">hola@mipartido.app</a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Mi Partido. Todos los derechos reservados.</p>
                    <div className="flex gap-4">
                        {/* Social icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    )
}
