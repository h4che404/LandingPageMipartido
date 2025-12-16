import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center space-y-6 max-w-sm">
                <h1 className="text-2xl font-bold">Proximamente</h1>
                <p className="text-muted-foreground">
                    El panel de gestión estará disponible muy pronto para los Usuarios Fundadores.
                </p>
                <Button asChild>
                    <Link href="/">
                        Volver al inicio <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
