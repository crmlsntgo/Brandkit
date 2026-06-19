'use client';

import { useState } from 'react';
import { BrandKit } from '@/types/brandkit';

interface ExportModalProps {
  kit: BrandKit;
  onClose: () => void;
}

type Tab = 'css' | 'tailwind' | 'json';

export default function ExportModal({ kit, onClose }: ExportModalProps) {
  const [tab, setTab] = useState<Tab>('css');

  function generateCSS() {
    let css = `/* Brand Kit: ${kit.brandName} */\n:root {\n`;
    for (const c of kit.palette) {
      const key = c.name.toLowerCase().replace(/\s+/g, '-');
      css += `  --color-${key}: ${c.hex};\n`;
    }
    css += `  --font-display: '${kit.typography.display}', serif;\n`;
    css += `  --font-body: '${kit.typography.body}', sans-serif;\n`;
    css += '}\n';
    return css;
  }

  function generateTailwind() {
    const colors: Record<string, string> = {};
    for (const c of kit.palette) {
      colors[c.name.toLowerCase().replace(/\s+/g, '-')] = c.hex;
    }
    const config = {
      theme: {
        extend: {
          colors,
          fontFamily: {
            display: [kit.typography.display, 'serif'],
            body: [kit.typography.body, 'sans-serif'],
          },
        },
      },
    };
    return JSON.stringify(config, null, 2);
  }

  function generateJSON() {
    return JSON.stringify(kit, null, 2);
  }

  const contentMap: Record<Tab, string> = {
    css: generateCSS(),
    tailwind: generateTailwind(),
    json: generateJSON(),
  };

  async function copy() {
    try {
      await navigator.clipboard.writeText(contentMap[tab]);
    } catch {
      // fallback
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="export-modal-title">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />
      <div className="relative w-full max-w-lg animate-scale-in rounded-2xl border border-border/50 bg-surface/80 p-6 shadow-card backdrop-blur-xl sm:p-8 glass">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="export-modal-title" className="font-display text-lg font-semibold text-text">Export tokens</h2>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted hover:text-text" aria-label="Close export">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="mb-4 flex gap-2" role="tablist">
          {(['css', 'tailwind', 'json'] as Tab[]).map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${tab === t ? 'bg-primary text-white shadow-sm' : 'bg-bg text-text-muted hover:text-text'}`}>
              {t === 'css' ? 'CSS Variables' : t === 'tailwind' ? 'Tailwind Config' : 'JSON'}
            </button>
          ))}
        </div>

        <pre className="max-h-60 overflow-auto rounded-xl bg-bg p-4 text-xs text-text" role="tabpanel">{contentMap[tab]}</pre>

        <div className="mt-4 flex gap-3">
          <button type="button" onClick={copy} className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent py-2.5 text-sm font-semibold text-white shadow-inner shadow-white/10 transition-all hover:shadow-glow hover:brightness-110">Copy to clipboard</button>
          <button type="button" onClick={onClose} className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-bg">Close</button>
        </div>
      </div>
    </div>
  );
}
