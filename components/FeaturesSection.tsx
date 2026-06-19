'use client';

const FEATURES = [
  {
    title: 'Color palette',
    desc: 'Five harmonious colors with WCAG-compliant contrast, ready for your design system.',
    icon: 'palette',
  },
  {
    title: 'Font pairing',
    desc: 'Curated display + body font combinations from a hand-picked selection of 19 typefaces.',
    icon: 'type',
  },
  {
    title: 'Taglines',
    desc: 'Three unique, memorable taglines tailored to your business and industry.',
    icon: 'quote',
  },
  {
    title: 'Brand voice',
    desc: 'Tone guidelines with real do/don\'t examples so your team stays consistent.',
    icon: 'message',
  },
  {
    title: 'Logo direction',
    desc: 'A creative brief with style, mood, and typographic details for your designer.',
    icon: 'diamond',
  },
  {
    title: 'Export tokens',
    desc: 'Copy CSS variables, Tailwind config, or raw JSON — one click to your clipboard.',
    icon: 'code',
  },
];

const icons: Record<string, JSX.Element> = {
  palette: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="10.5" r="2.5" /><circle cx="8.5" cy="10.5" r="2.5" /><circle cx="6" cy="16" r="2.5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 3-1 3-2.5 0-.7-.3-1.3-.7-1.8-.4-.5-.6-1-.6-1.7 0-1.4 1.1-2 2.5-2h.5c3.3 0 6-2.7 6-6 0-4.2-3.7-7.5-8-7.5z" />
    </svg>
  ),
  type: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
  quote: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  ),
  message: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  diamond: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  code: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
};

export default function FeaturesSection() {
  return (
    <section id="features" className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
      <h2 className="text-center font-display text-2xl font-bold text-text sm:text-3xl">
        What you&apos;ll get
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-text-muted">
        A complete starter brand identity in under a minute — no design experience required.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <div
            key={i}
            style={{ animation: `fadeUp 0.5s ease-out ${i * 80}ms both` }}
          >
            <div className="h-full rounded-xl border border-border bg-surface p-5 transition-all duration-300 transform hover:-translate-y-2 hover:border-primary/20 hover:shadow-elevated">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
                {icons[f.icon]}
              </div>
              <h3 className="font-display text-base font-semibold text-text">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
