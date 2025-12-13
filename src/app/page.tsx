import { Hero } from "@/components/sections/hero";
import { PainPoints } from "@/components/sections/pain-points";
import { Audience } from "@/components/sections/audience";
import { Incentive } from "@/components/sections/incentive";
import { WaitlistForm } from "@/components/features/waitlist-form";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <PainPoints />
      <Audience />
      <WaitlistForm />
      <Incentive />
      <Footer />
    </div>
  );
}
