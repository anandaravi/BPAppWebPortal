"use client";

import { ModuleHero } from "@/components/module/module-hero";
import { FeatureSection } from "@/components/module/feature-section";
import { WorkflowDiagram } from "@/components/module/workflow-diagram";
import { DocumentFlow } from "@/components/module/document-flow";
import { FeatureCardGrid } from "@/components/module/feature-grid";
import { IntegrationMap } from "@/components/module/integration-map";
import { CTABanner } from "@/components/sections/cta-banner";
import { ModuleData } from "@/lib/modules/data";

export function ModuleTemplate({ data }: { data: ModuleData }) {
  return (
    <>
      <ModuleHero
        tag={data.tag}
        title={data.title}
        highlight={data.highlight}
        blurb={data.blurb}
        photo={data.photo}
        accent={data.accent}
        metrics={data.metrics}
      />

      {/* Workflow + Doc flow */}
      <section className="py-20 border-b border-[#1a1a1a] bg-[#080808]">
        <div className="max-w-[1440px] mx-auto px-6 space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: data.accent }}>
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-12">
              {data.workflow.title}
            </h2>
            <WorkflowDiagram
              nodes={data.workflow.nodes}
              edges={[]}
              accent={data.accent}
            />
          </div>

          {data.documentFlow && (
            <div className="pt-6">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-6">
                {data.documentFlow.title}
              </h3>
              <DocumentFlow nodes={data.documentFlow.nodes} accent={data.accent} />
            </div>
          )}
        </div>
      </section>

      {/* Feature sections */}
      <section className="bg-[#0a0a0a]">
        {data.features.map((f) => (
          <FeatureSection
            key={f.tag}
            tag={f.tag}
            title={f.title}
            body={f.body}
            points={f.points}
            photo={f.photo}
            accent={data.accent}
            flip={f.flip}
          />
        ))}
      </section>

      {/* Capabilities grid */}
      <FeatureCardGrid
        eyebrow="Every Feature"
        title="Complete capability matrix."
        cards={data.capabilities}
        accent={data.accent}
        moduleSlug={data.slug}
      />

      {/* Integrations */}
      <IntegrationMap moduleName={data.name} integrations={data.integrations} accent={data.accent} />

      {/* CTA */}
      <CTABanner />
    </>
  );
}
