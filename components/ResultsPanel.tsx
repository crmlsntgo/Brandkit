'use client';

import { useState } from 'react';
import { BrandKit } from '@/types/brandkit';
import PaletteSwatches from './PaletteSwatches';
import ExportModal from './ExportModal';
import BrandKitPDF from './BrandKitPDF';
import { FONT_VAR_MAP } from '@/lib/fonts';
import { pdf } from '@react-pdf/renderer';

interface ResultsPanelProps {
  brandKit: BrandKit;
  onSave: (kit: BrandKit) => void;
  savedJustNow: boolean;
  onRegenerate: (section: string) => Promise<void>;
}

function SectionHeader({ title, section, onRegenerate, loading }: { title: string; section: string; onRegenerate: (s: string) => Promise<void>; loading: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-display text-lg font-semibold text-text">{title}</h2>
      <button
        type="button"
        onClick={() => onRegenerate(section)}
        disabled={loading}
        className="inline-flex h-7 items-center gap-1 rounded-md border border-border px-2 text-xs font-medium text-text-muted transition-colors hover:bg-bg hover:text-text disabled:opacity-50"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={loading ? 'animate-spin' : ''}>
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
        {loading ? 'Regenerating...' : 'Regenerate'}
      </button>
    </div>
  );
}

export default function ResultsPanel({ brandKit: kit, onSave, savedJustNow, onRegenerate }: ResultsPanelProps) {
  const [showExport, setShowExport] = useState(false);
  const [logoImageUrl, setLogoImageUrl] = useState<string | null>(null);
  const [logoLoading, setLogoLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);

  const displayFont = FONT_VAR_MAP[kit.typography.display] || 'var(--font-sora)';
  const bodyFont = FONT_VAR_MAP[kit.typography.body] || 'var(--font-inter)';

  async function handleRegenerate(section: string) {
    setRegeneratingSection(section);
    try {
      await onRegenerate(section);
    } finally {
      setRegeneratingSection(null);
    }
  }

  function generateLogoImage() {
    setLogoLoading(true);
    const seed = Math.floor(Math.random() * 9999);
    const prompt = encodeURIComponent(
      `Minimal logo design, ${kit.logoConcept.style}, ${kit.logoConcept.description}, white background, vector style, brand identity`
    );
    setLogoImageUrl(`https://image.pollinations.ai/prompt/${prompt}&width=512&height=512&nologo=true&seed=${seed}`);
  }

  async function downloadPDF() {
    setPdfLoading(true);
    try {
      const blob = await pdf(<BrandKitPDF kit={kit} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${kit.brandName.replace(/\s+/g, '-').toLowerCase()}-brand-kit.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.print();
    } finally {
      setPdfLoading(false);
    }
  }

  return (
    <div className="mt-8 animate-fade-up space-y-8">
      {/* Sticky header bar */}
      <div className="sticky top-16 z-30 -mx-4 rounded-none border-b border-border bg-surface/70 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-xl sm:border sm:px-6 glass">
        <div className="flex flex-wrap items-center gap-3">
          <p className="flex-1 text-sm font-medium text-text">
            Brand kit for <span className="font-display text-lg">{kit.brandName}</span>
          </p>
          <button type="button" onClick={() => onSave(kit)} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-inner shadow-white/10 transition-all hover:shadow-glow hover:brightness-110">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            {savedJustNow ? 'Saved!' : 'Save kit'}
          </button>
          <button type="button" onClick={() => setShowExport(true)} className="h-9 rounded-lg border border-border px-4 text-sm font-medium text-text transition-colors hover:bg-bg">Export</button>
          <button type="button" onClick={downloadPDF} disabled={pdfLoading} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-4 text-sm font-medium text-text transition-colors hover:bg-bg disabled:opacity-60">
            {pdfLoading ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-text/30 border-t-text" />
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
            )}
            {pdfLoading ? 'Creating PDF...' : 'PDF'}
          </button>
        </div>
      </div>

      {/* Taglines */}
      <section>
        <SectionHeader title="Taglines" section="taglines" onRegenerate={handleRegenerate} loading={regeneratingSection === 'taglines'} />
        <div className="mt-3 space-y-2">
          {kit.taglines.map((t, i) => (
            <p key={i} className="border-l-4 border-primary bg-surface p-4 text-base leading-relaxed text-text" style={{ fontFamily: displayFont, fontStyle: 'italic' }}>"{t}"</p>
          ))}
        </div>
      </section>

      {/* Color palette */}
      <section>
        <SectionHeader title="Color palette" section="palette" onRegenerate={handleRegenerate} loading={regeneratingSection === 'palette'} />
        <div className="mt-3">
          <PaletteSwatches palette={kit.palette} />
        </div>
        <div className="mt-3 grid grid-cols-5 gap-3 text-xs">
          {kit.palette.map((c, i) => (
            <div key={i} className="text-center">
              <p className="font-medium text-text">{c.name}</p>
              <p className="text-text-muted">{c.hex}</p>
              <p className="hidden text-text-muted sm:block">{c.usage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <SectionHeader title="Typography" section="typography" onRegenerate={handleRegenerate} loading={regeneratingSection === 'typography'} />
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Display · {kit.typography.display}</p>
            <p className="mt-3 text-3xl font-bold text-text" style={{ fontFamily: displayFont }}>Aa Bb Cc</p>
            <p className="mt-2 text-lg text-text/70" style={{ fontFamily: displayFont }}>The quick brown fox jumps over the lazy dog.</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Body · {kit.typography.body}</p>
            <p className="mt-3 text-xl text-text" style={{ fontFamily: bodyFont }}>Aa Bb Cc</p>
            <p className="mt-2 text-sm leading-relaxed text-text/70" style={{ fontFamily: bodyFont }}>
              The quick brown fox jumps over the lazy dog. Body text set in {kit.typography.body} for comfortable reading at small sizes.
            </p>
          </div>
        </div>
      </section>

      {/* Voice */}
      <section>
        <SectionHeader title="Brand voice" section="voice" onRegenerate={handleRegenerate} loading={regeneratingSection === 'voice'} />
        <div className="mt-3 space-y-3">
          {kit.voice.map((v, i) => (
            <div key={i} className="rounded-xl border border-border bg-surface p-4">
              <p className="mb-2 font-display text-base font-semibold text-text">{v.tone}</p>
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-900 dark:bg-emerald-950/20">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Do</p>
                  <p className="text-emerald-800 dark:text-emerald-300">{v.doExample}</p>
                </div>
                <div className="rounded-lg border border-rose-200 bg-rose-50/50 p-3 dark:border-rose-900 dark:bg-rose-950/20">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">Don&apos;t</p>
                  <p className="text-rose-700 dark:text-rose-300">{v.dontExample}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logo concept */}
      <section>
        <SectionHeader title="Logo concept" section="logo" onRegenerate={handleRegenerate} loading={regeneratingSection === 'logo'} />
        <div className="mt-3 space-y-4">
          <div className="rounded-xl border-2 border-dashed border-border bg-surface p-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted" style={{ fontFamily: displayFont }}>{kit.logoConcept.style}</p>
            <p className="text-text leading-relaxed">{kit.logoConcept.description}</p>
          </div>

          {!logoImageUrl ? (
            <button type="button" onClick={generateLogoImage} disabled={logoLoading} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-4 text-sm font-medium text-text transition-colors hover:bg-bg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              Generate logo sketch (AI)
            </button>
          ) : (
            <div className="space-y-2">
              <div className="relative inline-block">
                {logoLoading && <div className="skeleton absolute inset-0 rounded-xl" />}
                <img
                  src={logoImageUrl}
                  onLoad={() => setLogoLoading(false)}
                  onError={() => { setLogoLoading(false); setLogoImageUrl(null); }}
                  className="w-full max-w-sm rounded-xl border border-border"
                  alt="AI-generated logo concept sketch"
                />
              </div>
              <p className="text-xs text-text-muted">AI concept sketch — not production-ready</p>
            </div>
          )}
        </div>
      </section>

      {/* Brand preview */}
      <section className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="h-3" style={{ background: `linear-gradient(90deg, ${kit.palette.map(c => c.hex).join(', ')})` }} />
        <div className="p-6">
          <h3 className="font-display text-2xl font-bold text-text" style={{ fontFamily: displayFont }}>{kit.brandName}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted" style={{ fontFamily: bodyFont }}>
            {kit.taglines[0]} — A brand identity built for {kit.typography.display} and {kit.typography.body}, anchored by {kit.palette.length} distinctive colors.
          </p>
          <div className="mt-4 flex gap-2">
            {kit.palette.map((c, i) => (
              <span key={i} className="h-4 w-4 rounded-full border border-border" style={{ backgroundColor: c.hex }} />
            ))}
          </div>
        </div>
      </section>

      {showExport && <ExportModal kit={kit} onClose={() => setShowExport(false)} />}
    </div>
  );
}
