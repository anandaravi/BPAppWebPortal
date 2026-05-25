import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { Pillars } from "@/components/sections/pillars";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { ModuleShowcase } from "@/components/sections/module-showcase";
import { DeckleSpotlight } from "@/components/sections/deckle-spotlight";
import { AISpotlight } from "@/components/sections/ai-spotlight";
import { PlatformStrip } from "@/components/sections/platform-strip";
import { CTABanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Pillars />
      <FeaturesGrid />
      <ModuleShowcase />
      <DeckleSpotlight />
      <AISpotlight />
      <PlatformStrip />
      <CTABanner />
    </>
  );
}
