import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { Features } from "@/components/sections/features";
import { OrganizerCTA } from "@/components/sections/organizer-cta";
import { FAQ } from "@/components/sections/faq";
import { WaitlistForm } from "@/components/features/waitlist-form";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <SocialProof />
      <Features />
      <OrganizerCTA />
      <WaitlistForm />
      <FAQ />
    </div>
  );
}
