'use client';

import { PaletteColor } from '@/types/brandkit';
import { getReadableTextColor } from '@/lib/color';
import { useState } from 'react';

interface PaletteSwatchesProps {
  palette: PaletteColor[];
}

export default function PaletteSwatches({ palette }: PaletteSwatchesProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  async function copyHex(hex: string, index: number) {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // fallback
    }
  }

  return (
    <div className="grid grid-cols-5 gap-3">
      {palette.map((c, i) => {
        const textColor = getReadableTextColor(c.hex);
        return (
          <button
            key={i}
            type="button"
            onClick={() => copyHex(c.hex, i)}
            className="group relative flex aspect-[3/4] flex-col items-center justify-center rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-elevated focus-visible:outline-2 focus-visible:outline-primary"
            style={{ backgroundColor: c.hex }}
            aria-label={`${c.name}: ${c.hex}. Click to copy`}
          >
            <span className="opacity-0 absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-text px-2 py-1 text-[10px] text-bg whitespace-nowrap transition-opacity group-hover:opacity-100">
              Click to copy
            </span>
            <span className="text-[10px] font-semibold leading-tight" style={{ color: textColor }}>
              {copiedIndex === i ? (
                <span className="inline-flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  Copied
                </span>
              ) : c.name}
            </span>
            <span className="mt-0.5 text-[9px] opacity-70" style={{ color: textColor }}>
              {c.hex}
            </span>
            <span className="sr-only">{c.usage}</span>
          </button>
        );
      })}
    </div>
  );
}
