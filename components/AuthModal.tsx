'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthProvider';

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    const { error } = await signInWithEmail(email.trim());

    if (error) {
      setErrorMessage(error);
      setStatus('error');
    } else {
      setStatus('sent');
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />

      <div className="relative w-full max-w-sm animate-scale-in rounded-2xl border border-border/50 bg-surface/80 p-6 shadow-card backdrop-blur-xl sm:p-8 glass">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted hover:text-text"
          aria-label="Close sign in"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {status === 'sent' ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22 6 12 13 2 6" />
              </svg>
            </div>
            <h2 id="auth-modal-title" className="font-display text-lg font-semibold text-text">
              Check your inbox
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              We sent a sign-in link to <span className="font-medium text-text">{email}</span>.
              Click it to finish signing in — this window can be closed.
            </p>
          </div>
        ) : (
          <>
            <h2 id="auth-modal-title" className="font-display text-lg font-semibold text-text">
              Save your kits to the cloud
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Sign in with your email — no password needed. We&apos;ll send a one-time link.
            </p>

            <form onSubmit={handleSubmit} className="mt-5">
              <label htmlFor="auth-email" className="sr-only">Email address</label>
              <input
                id="auth-email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-base text-text placeholder:text-text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              {status === 'error' && (
                <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent text-sm font-semibold text-white shadow-inner shadow-white/10 transition-all hover:shadow-glow hover:brightness-110 disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                    Sending link…
                  </>
                ) : (
                  'Send magic link'
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-text-muted">
              Your saved kits stay private to your account.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
