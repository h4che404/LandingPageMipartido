import { HeroCanchas } from "@/components/sections/hero-canchas"
import { OrganizersFeatures } from "@/components/sections/organizers/features"
import { OrganizersCTA } from "@/components/sections/organizers/cta"
import { Footer } from "@/components/layout/footer"

export default function OrganizersPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeroCanchas />
            <OrganizersFeatures />
            <OrganizersCTA />
            <Footer />
        </div>
    )
}
