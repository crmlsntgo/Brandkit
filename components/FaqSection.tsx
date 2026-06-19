'use client';

import { useState } from 'react';

const FAQS = [
  { q: 'How does BrandKit AI work?', a: 'Describe your business — name, industry, audience, personality — and our AI generates a color palette, font pairing, taglines, voice guide, and logo concept in about 15 seconds.' },
  { q: 'Is it really free?', a: 'Yes, it\'s completely free to use. There are no hidden charges, no credit card required, and no usage limits on the free tier.' },
  { q: 'Can I export my brand kit?', a: 'Absolutely. You can copy CSS variables, Tailwind config, or raw JSON. You can also save kits to your browser or cloud account, and download a PDF.' },
  { q: 'What fonts are available?', a: 'We curated 19 Google Fonts including Sora, Inter, Playfair Display, DM Serif Display, Fraunces, and more. Each pairing is designed to work well together.' },
  { q: 'Can I use the generated logo concept?', a: 'The logo concept is a creative brief — a starting point for your designer. We recommend working with a professional for final logo production and trademark clearance.' },
  { q: 'Do I need an account?', a: 'No account needed. You can generate brand kits immediately. Sign in with email (optional) to sync your saved kits across devices.' },
];

export default function FaqSection() {
  return (
    <section id="faq" className="mx-auto mt-24 max-w-2xl px-4 pb-20 sm:px-6">
      <h2 className="mb-8 text-center font-display text-2xl font-bold text-text sm:text-3xl">
        Questions &amp; answers
      </h2>
      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <FaqItem key={i} faq={faq} index={i} />
        ))}
      </div>
    </section>
  );
}

function FaqItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${isOpen ? 'border-primary/30 bg-surface' : 'border-border bg-surface'}`}
      style={{ borderLeft: isOpen ? '2px solid var(--color-primary)' : '2px solid transparent' }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-sm font-semibold text-text">{faq.q}</span>
        <svg
          className={`h-4 w-4 flex-shrink-0 text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        className="grid transition-all duration-300"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="border-t border-border px-4 pb-4 pt-3 text-sm leading-relaxed text-text-muted">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}
