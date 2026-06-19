'use client';

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Column 1: Brand Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest text-text">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 2L4 10v12l12 8 12-8V10L16 2z" fill="var(--color-primary)" opacity="0.15" />
                <path d="M16 6L8 11.5v9L16 26l8-5.5v-9L16 6z" fill="var(--color-primary)" />
                <path d="M16 10l-4 3v6l4 3 4-3v-6l-4-3z" fill="var(--color-accent)" opacity="0.7" />
              </svg>
              <span>BrandKit</span>
            </div>
            <p className="text-xs leading-relaxed text-text-muted">
              AI-powered brand identity kits — colors, fonts, voice, and logo concepts in seconds. Free for everyone.
            </p>
            <div>
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Connect</p>
              <div className="flex gap-3">
                <a href="#" aria-label="Twitter" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-primary hover:text-primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="#" aria-label="GitHub" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-primary hover:text-primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Product Links */}
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Product</p>
            <nav className="flex flex-col gap-2 text-xs text-text-muted" aria-label="Product">
              <a href="#generate" className="transition-colors hover:text-text">Generate kit</a>
              <a href="#features" className="transition-colors hover:text-text">Features</a>
              <a href="#faq" className="transition-colors hover:text-text">FAQ & Support</a>
            </nav>
          </div>

          {/* Column 3: Legal Links */}
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Legal</p>
            <nav className="flex flex-col gap-2 text-xs text-text-muted" aria-label="Legal">
              <a href="#" className="transition-colors hover:text-text">Privacy Policy</a>
              <a href="#" className="transition-colors hover:text-text">Terms of Service</a>
              <a href="#" className="transition-colors hover:text-text">Cookie Settings</a>
            </nav>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Newsletter</p>
            <p className="text-xs leading-relaxed text-text-muted">
              Subscribe for design guidelines and brand inspiration.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-1.5">
              <input
                type="email"
                placeholder="you@domain.com"
                required
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-xs text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition-all hover:brightness-110 shadow-sm"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-text-muted">
          &copy; {new Date().getFullYear()} BrandKit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
