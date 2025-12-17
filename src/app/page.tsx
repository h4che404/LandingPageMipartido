import { Hero } from "@/components/sections/hero";
import { ForCourts } from "@/components/sections/for-courts";
import { Benefits } from "@/components/sections/benefits";
import { PainPoints } from "@/components/sections/pain-points";
import { PublicBetaList } from "@/components/features/public-beta-list";
import { CourtsExplorer } from "@/components/sections/courts-explorer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ForCourts />
      <Benefits />
      <PainPoints />
      <CourtsExplorer />
      <PublicBetaList />
    </div>
  );
}



