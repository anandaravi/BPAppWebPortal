import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pillars } from "@/components/sections/pillars";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { ModuleShowcase } from "@/components/sections/module-showcase";
import { DeckleSpotlight } from "@/components/sections/deckle-spotlight";
import { AISpotlight } from "@/components/sections/ai-spotlight";
import { ComplianceStrip } from "@/components/sections/compliance-strip";
import { PlatformStrip } from "@/components/sections/platform-strip";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import { CTABanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <HowItWorks />
      <Pillars />
      <ModuleShowcase />
      <FeaturesGrid />
      <DeckleSpotlight />
      <AISpotlight />
      <ComplianceStrip />
      <PlatformStrip />
      <ArchitectureDiagram />
      <CTABanner />
    </>
  );
}
