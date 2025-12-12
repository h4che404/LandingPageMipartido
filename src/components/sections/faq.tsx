import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
    return (
        <section className="py-20 container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>¿Cuándo estará disponible la app?</AccordionTrigger>
                    <AccordionContent>
                        Estamos en fase de piloto cerrado en Mendoza. Sumate a la lista de espera para recibir acceso anticipado en cuanto abramos más cupos en tu zona.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>¿Es gratis para jugar?</AccordionTrigger>
                    <AccordionContent>
                        Sí, la app es gratuita para jugadores. Solo pagás tu parte de la cancha o el torneo directamente al organizador (o a través de la app cuando estemos habilitados).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>¿Cómo funcionan las clasificaciones?</AccordionTrigger>
                    <AccordionContent>
                        En modo Competitivo, cada partido oficial suma estadísticas (partidos ganados, goles, MVP). Tu nivel se ajusta dinámicamente para emparejarte con rivales parejos.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Soy dueño de canchas, ¿tiene costo?</AccordionTrigger>
                    <AccordionContent>
                        Para el piloto el uso es gratuito. Luego tendremos planes accesibles por cancha/mes. Contactanos para saber más.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}
