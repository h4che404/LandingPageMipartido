export function SocialProof() {
    return (
        <section className="border-y border-border/40 bg-background/50 backdrop-blur-sm py-8 overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
                    Early Access &middot; Mendoza 2024
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholders for logos or just text for MVP urgency */}
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">Club El Prado</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">Arena 5</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">Los Pinos Tenis</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">Complejo Delta</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
