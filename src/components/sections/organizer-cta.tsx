import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"

export function OrganizerCTA() {
    return (
        <section id="organizers" className="py-20 bg-secondary/20 border-y border-border/50">
            <div className="container mx-auto px-4 text-center max-w-3xl">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border border-border mb-8 shadow-sm">
                    <Building2 className="w-8 h-8 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                    ¿Tenés un complejo deportivo?
                </h2>
                <p className="text-muted-foreground text-lg mb-8 text-balance">
                    Dejá de pelear con WhatsApp y Excel. Gestioná reservas, señas y clientes desde un solo lugar.
                    Sumate al piloto y obtené 3 meses bonificados.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="outline" className="bg-background">
                        Más información
                    </Button>
                    <Button size="lg">
                        Registrar mi complejo
                    </Button>
                </div>
            </div>
        </section>
    )
}
