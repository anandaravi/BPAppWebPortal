import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { StatsBar } from "@/components/sections/stats-bar";

// Below-fold sections: code-split client bundle, keep SSR for SEO
const Quiz = dynamic(() => import("@/components/sections/quiz").then((m) => ({ default: m.Quiz })));
const HowItWorks = dynamic(() => import("@/components/sections/how-it-works").then((m) => ({ default: m.HowItWorks })));
const Pillars = dynamic(() => import("@/components/sections/pillars").then((m) => ({ default: m.Pillars })));
const ProductTour = dynamic(() => import("@/components/sections/product-tour").then((m) => ({ default: m.ProductTour })));
const FeaturesGrid = dynamic(() => import("@/components/sections/features-grid").then((m) => ({ default: m.FeaturesGrid })));
const ModuleShowcase = dynamic(() => import("@/components/sections/module-showcase").then((m) => ({ default: m.ModuleShowcase })));
const DeckleSpotlight = dynamic(() => import("@/components/sections/deckle-spotlight").then((m) => ({ default: m.DeckleSpotlight })));
const AISpotlight = dynamic(() => import("@/components/sections/ai-spotlight").then((m) => ({ default: m.AISpotlight })));
const ComplianceStrip = dynamic(() => import("@/components/sections/compliance-strip").then((m) => ({ default: m.ComplianceStrip })));
const PlatformStrip = dynamic(() => import("@/components/sections/platform-strip").then((m) => ({ default: m.PlatformStrip })));
const ArchitectureDiagram = dynamic(() => import("@/components/sections/architecture-diagram").then((m) => ({ default: m.ArchitectureDiagram })));
const CTABanner = dynamic(() => import("@/components/sections/cta-banner").then((m) => ({ default: m.CTABanner })));

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <StatsBar />
      <Quiz />
      <HowItWorks />
      <Pillars />
      <ProductTour />
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
