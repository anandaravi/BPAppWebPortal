export function ModuleFAQ({
  faqs,
  moduleName,
}: {
  faqs: { q: string; a: string }[];
  moduleName: string;
}) {
  return (
    <section className="bg-background py-20">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
          FAQ
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-8">
          {moduleName} — common questions
        </h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group bg-surface border border-border rounded-xl p-5 open:border-amber-500/30 transition-colors"
            >
              <summary className="cursor-pointer text-foreground font-semibold text-base flex items-center justify-between gap-3">
                <span>{f.q}</span>
                <span className="text-amber-400 text-lg group-open:rotate-45 transition-transform flex-shrink-0">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-text-2 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
