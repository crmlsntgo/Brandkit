'use client';

import { useRef, useEffect } from 'react';
import { BrandKit } from '@/types/brandkit';
import { HistoryEntry } from '@/lib/useCloudHistory';

interface HistoryDrawerProps {
  history: HistoryEntry[];
  onSelect: (kit: BrandKit) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onClose: () => void;
  syncing?: boolean;
}

export default function HistoryDrawer({ history, onSelect, onRemove, onClear, onClose, syncing }: HistoryDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true" aria-label="Saved brand kits">
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" onClick={onClose} />

      <div
        ref={drawerRef}
        className="animate-slide-in-right absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-border/50 bg-surface/80 shadow-elevated backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-text">
            Saved kits
            {history.length > 0 && <span className="ml-1.5 text-sm font-normal text-text-muted">({history.length})</span>}
            {syncing && <span className="ml-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />}
          </h2>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted hover:text-text" aria-label="Close history">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {syncing && history.length === 0 ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton h-28 w-full rounded-xl" />
              ))}
            </div>
          ) : history.length === 0 ? (
            <div className="mt-12 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-bg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-text-muted"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
              </div>
              <p className="text-sm text-text-muted">No saved kits yet.</p>
              <p className="mt-1 text-xs text-text-muted/60">Generated kits will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="group relative cursor-pointer rounded-xl border border-border bg-bg p-4 transition-all hover:border-primary hover:shadow-soft"
                  onClick={() => onSelect(entry.brandKit)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') onSelect(entry.brandKit); }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <p className="font-display text-sm font-semibold text-text">{entry.brandKit.brandName}</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onRemove(entry.id); }}
                      className="ml-auto flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-red-50 hover:text-red-500 md:opacity-0 md:group-hover:opacity-100"
                      aria-label="Remove"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                    </button>
                  </div>

                  {entry.brandKit.taglines?.[0] && (
                    <p className="mb-2 text-xs text-text-muted line-clamp-1">{entry.brandKit.taglines[0]}</p>
                  )}

                  <div className="flex h-5 gap-0.5 overflow-hidden rounded-md">
                    {entry.brandKit.palette?.map((c, i) => (
                      <span key={i} className="flex-1" style={{ backgroundColor: c.hex }} />
                    ))}
                  </div>

                  <p className="mt-1.5 text-[10px] text-text-muted">
                    {new Date(entry.savedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))}

              <button type="button" onClick={onClear} className="mt-2 w-full rounded-lg border border-red-200 py-2 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30">Clear all saved kits</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
