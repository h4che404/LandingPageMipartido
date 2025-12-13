import { OrganizersHero } from "@/components/sections/organizers/hero"
import { OrganizersFeatures } from "@/components/sections/organizers/features"
import { OrganizersCTA } from "@/components/sections/organizers/cta"
import { Footer } from "@/components/layout/footer"

export default function OrganizersPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <OrganizersHero />
            <OrganizersFeatures />
            <OrganizersCTA />
            <Footer />
        </div>
    )
}
