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
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Connect</p>
              <div className="flex gap-3">
                <a href="#" aria-label="Twitter" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-primary hover:text-primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="#" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-primary hover:text-primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-primary hover:text-primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
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
