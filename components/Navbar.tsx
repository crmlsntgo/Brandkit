'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthProvider';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user, isConfigured, signOut } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY >= 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  async function handleSignOut() {
    await signOut();
    setShowMenu(false);
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-soft' : 'bg-transparent border border-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a
            href="/"
            className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest text-text"
            aria-label="BrandKit — home"
          >
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M16 2L4 10v12l12 8 12-8V10L16 2z" fill="var(--color-primary)" opacity="0.15" />
              <path d="M16 6L8 11.5v9L16 26l8-5.5v-9L16 6z" fill="var(--color-primary)" />
              <path d="M16 10l-4 3v6l4 3 4-3v-6l-4-3z" fill="var(--color-accent)" opacity="0.7" />
            </svg>
            BrandKit
          </a>

          <div className="hidden items-center gap-6 sm:flex">
            <a href="#features" className="text-xs font-medium uppercase tracking-wider text-text-muted hover:text-text">Features</a>
            <a href="#faq" className="text-xs font-medium uppercase tracking-wider text-text-muted hover:text-text">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#generate"
              className="hidden h-9 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-inner shadow-white/10 transition-all hover:shadow-glow hover:brightness-110 sm:inline-flex"
            >
              Try free
            </a>

            {isConfigured && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowMenu((v) => !v)}
                      className="flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-primary/30 text-sm font-semibold text-primary bg-primary/5"
                      aria-label="Account menu"
                      aria-expanded={showMenu}
                    >
                      {user.email?.[0]?.toUpperCase() ?? '?'}
                    </button>
                    {showMenu && (
                      <div className="absolute right-0 top-11 w-48 rounded-xl border border-border bg-surface p-2 shadow-card">
                        <p className="truncate px-3 py-2 text-xs text-text-muted">{user.email}</p>
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="w-full rounded-lg px-3 py-2 text-left text-sm text-text hover:bg-bg"
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAuth(true)}
                    className="hidden h-9 items-center rounded-lg border border-border px-4 text-sm font-medium text-text transition-colors hover:bg-bg sm:inline-flex"
                  >
                    Sign in
                  </button>
                )}
              </>
            )}

            <button
              type="button"
              onClick={toggleDark}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-all duration-300 hover:border-text-muted hover:text-text"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span className={`inline-block transition-transform duration-300 ${dark ? 'rotate-90' : 'rotate-0'}`}>
                {dark ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
