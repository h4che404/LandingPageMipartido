import { Hero } from "@/components/sections/hero";
import { ForCourts } from "@/components/sections/for-courts";
import { Benefits } from "@/components/sections/benefits";
import { PainPoints } from "@/components/sections/pain-points";
import { Audience } from "@/components/sections/audience";
import { WaitlistForm } from "@/components/features/waitlist-form";
import { Footer } from "@/components/layout/footer";
import { PublicBetaList } from "@/components/features/public-beta-list";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ForCourts />
      <Benefits />
      <PainPoints />
      <Audience />
      <WaitlistForm />
      <PublicBetaList />
    </div>
  );
}


