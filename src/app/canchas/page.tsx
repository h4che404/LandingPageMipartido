import { HeroCanchas } from "@/components/sections/canchas/hero"
import { TargetAudience } from "@/components/sections/canchas/target-audience"
import { PainPoints } from "@/components/sections/canchas/pain-points"
import { AboutSystem } from "@/components/sections/canchas/about-system"
import { CoreFeatures } from "@/components/sections/canchas/core-features"
import { HowItWorks } from "@/components/sections/canchas/how-it-works"
import { OfflineFirst } from "@/components/sections/canchas/offline-first"
import { MobileIntegration } from "@/components/sections/canchas/mobile-integration"
import { Benefits } from "@/components/sections/canchas/benefits"
import { SystemGallery } from "@/components/sections/canchas/system-gallery"
import { SocialProof } from "@/components/sections/canchas/social-proof"
import { FAQ } from "@/components/sections/canchas/faq"
import { FinalCTA } from "@/components/sections/canchas/final-cta"

export default function OrganizersPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <HeroCanchas />
            <TargetAudience />
            <PainPoints />
            <AboutSystem />
            <CoreFeatures />
            <HowItWorks />
            <OfflineFirst />
            <MobileIntegration />
            <Benefits />
            <SystemGallery />
            <SocialProof />
            <FAQ />
            <FinalCTA />
        </div>
    )
}
