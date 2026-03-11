"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        q: "¿Necesito internet para usarlo?",
        a: "No obligatoriamente. El sistema puede seguir funcionando en modo local (offline) permitiéndote cargar reservas, clientes y cobrar ventas sin problemas. Cuando vuelve la conexión, todo se sincroniza automáticamente con la nube."
    },
    {
        q: "¿Puedo administrar varias canchas e instalaciones a la vez?",
        a: "Sí, podés crear y gestionar múltiples canchas desde el mismo complejo. Cada una tendrá su propio calendario, precio, características (Fútbol 5, 7, Pádel, techada, etc.) y fotos."
    },
    {
        q: "¿Sirve solo para fútbol?",
        a: "No, el sistema se adapta a otros deportes. Podés crear canchas de pádel, tenis, básquet, entre otros, configurando la duración de los turnos base según corresponda a tu negocio."
    },
    {
        q: "¿Puedo controlar caja, kiosco y ventas?",
        a: "Sí, el sistema incluye un módulo de caja que integra las reservas, el cobro de señas, ventas de productos sueltos y el flujo de caja diario para un cierre sin descuadres."
    },
    {
        q: "¿Mis canchas pueden verse desde la app mobile de jugadores?",
        a: "Sí. Una vez tengas tu complejo configurado en la PC de escritorio, vas a poder activar el perfil público. Así, los jugadores verán tus canchas y disponibilidad directamente en su celular."
    },
    {
        q: "¿Es difícil de instalar y empezar a usar?",
        a: "Para nada. El sistema incluye un onboarding guiado paso a paso para ayudarte a cargar tu complejo, tus primeras canchas y tus horarios. Además, al ser parte del piloto, tenés soporte directo."
    },
    {
        q: "¿Puedo probarlo antes de contratar?",
        a: "Sí, por supuesto. Podés acceder de forma gratuita para conocer cómo funciona, configurar tu complejo y evaluar si se adapta a tu forma de trabajar."
    }
]

export function FAQ() {
    return (
        <section className="py-24 bg-muted/20">
            <div className="container mx-auto px-4 max-w-3xl">
                
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Preguntas Frecuentes
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Resolvemos tus principales dudas sobre la plataforma.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, i) => (
                        <AccordionItem 
                            key={i} 
                            value={`item-${i}`}
                            className="bg-card border border-border px-6 py-2 rounded-xl"
                        >
                            <AccordionTrigger className="text-left font-bold text-base hover:no-underline hover:text-primary transition-colors">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

            </div>
        </section>
    )
}
