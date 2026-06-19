'use client';

import { useEffect, useRef, useState } from 'react';
import { BrandFormInput, BrandKit, ApiErrorResponse } from '@/types/brandkit';
import BrandForm from './BrandForm';
import ResultsPanel from './ResultsPanel';
import LoadingState from './LoadingState';
import HistoryDrawer from './HistoryDrawer';
import { useCloudHistory } from '@/lib/useCloudHistory';
import { getClientFingerprint } from '@/lib/fingerprint';
import { getAccessToken } from '@/lib/supabase';
import { useAuth } from '@/lib/AuthProvider';
import AuthModal from './AuthModal';

type RequestState = 'idle' | 'loading' | 'success' | 'error';

export default function BrandKitGenerator() {
  const [state, setState] = useState<RequestState>('idle');
  const [brandKit, setBrandKit] = useState<BrandKit | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [remainingUses, setRemainingUses] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [savedJustNow, setSavedJustNow] = useState(false);
  const [lastInput, setLastInput] = useState<BrandFormInput | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  useEffect(() => {
    async function checkUsage() {
      try {
        const fp = getClientFingerprint();
        const token = await getAccessToken();
        const headers: HeadersInit = {
          'X-Client-ID': fp,
        };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await fetch('/api/generate', {
          method: 'GET',
          headers,
        });
        if (res.ok) {
          const data = await res.json();
          if ('remainingUses' in data) {
            setRemainingUses(data.remainingUses);
          }
        }
      } catch {
        // fail silently
      }
    }
    checkUsage();
  }, [user]);

  const { history, save, remove, clear, syncing, isCloud } = useCloudHistory();

  async function handleSubmit(input: BrandFormInput) {
    setState('loading');
    setErrorMessage(null);
    setErrorCode(null);
    setSavedJustNow(false);
    setLastInput(input);

    try {
      const fp = getClientFingerprint();
      const token = await getAccessToken();

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'X-Client-ID': fp,
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers,
        body: JSON.stringify(input),
      });

      const data: BrandKit | ApiErrorResponse = await res.json();

      if (!res.ok || 'error' in data) {
        setErrorMessage('error' in data ? data.error : 'Something went wrong. Please try again.');
        setErrorCode('error' in data && 'code' in data ? (data.code as string) : null);
        setState('error');
        return;
      }

      if ('remainingUses' in data) {
        setRemainingUses(data.remainingUses as number);
      } else {
        setRemainingUses(null);
      }

      setBrandKit(data);
      setState('success');

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch {
      setErrorMessage('Network error — please check your connection and try again.');
      setState('error');
    }
  }

  async function handleRegenerate(section: string): Promise<void> {
    if (!brandKit || !lastInput) return;

    try {
      const token = await getAccessToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/regenerate', {
        method: 'POST',
        headers,
        body: JSON.stringify({ section, existing: brandKit, input: lastInput }),
      });

      if (!res.ok) return;

      const partial: Partial<BrandKit> = await res.json();
      const merged = { ...brandKit, ...partial } as BrandKit;
      setBrandKit(merged);
    } catch {
      // silently fail
    }
  }

  function handleSave(kit: BrandKit) {
    save(kit);
    setSavedJustNow(true);
    setTimeout(() => setSavedJustNow(false), 2500);
  }

  function handleHistorySelect(kit: BrandKit) {
    setBrandKit(kit);
    setState('success');
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  return (
    <>
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[120px]" />
        </div>

        <div id="generate" className="mx-auto w-full max-w-3xl px-4 pb-20 pt-28 sm:px-6">
          <header className="text-center">
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-text sm:text-5xl">
              The brand identity{' '}
              <span className="gradient-text">your business deserves.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
              Tell us about your business. In 15 seconds, get a color palette,
              font pairing, taglines, voice guide, and logo direction — ready to use.
            </p>

            {history.length > 0 && (
              <button
                type="button"
                onClick={() => setShowHistory(true)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-text-muted underline-offset-2 hover:text-text hover:underline"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                </svg>
                View {history.length} saved kit{history.length > 1 ? 's' : ''}
                {syncing && (
                  <span className="ml-0.5 inline-block h-3 w-3 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                )}
                {isCloud && !syncing && (
                  <span className="ml-0.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                    synced
                  </span>
                )}
              </button>
            )}
          </header>

          {remainingUses !== null && (
            <div className="mt-6 flex justify-center animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                <span>
                  {remainingUses === 0 ? (
                    <>
                      0 of 2 free generations remaining.{' '}
                      <button
                        type="button"
                        onClick={() => setShowAuthModal(true)}
                        className="font-bold underline hover:text-primary/80"
                      >
                        Sign in
                      </button>{' '}
                      for unlimited access.
                    </>
                  ) : (
                    <>
                      {remainingUses} of 2 free {remainingUses === 1 ? 'generation' : 'generations'} remaining.
                    </>
                  )}
                </span>
              </div>
            </div>
          )}

          <div className="mt-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <BrandForm onSubmit={handleSubmit} isLoading={state === 'loading'} />
          </div>

          {state === 'error' && errorMessage && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-red-800 dark:text-red-300">
                    {errorCode === 'ANON_LIMIT_REACHED' ? 'Limit Reached' : 'Error'}
                  </h3>
                  <p className="mt-1 text-red-700/90 dark:text-red-400/90">{errorMessage}</p>
                </div>
                {errorCode === 'ANON_LIMIT_REACHED' && (
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(true)}
                    className="shrink-0 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Sign in to continue
                  </button>
                )}
              </div>
            </div>
          )}

          {remainingUses !== null && remainingUses > 0 && state === 'success' && (
            <div className="mt-4 text-center text-xs text-text-muted">
              You have <span className="font-semibold text-primary">{remainingUses}</span> free {remainingUses === 1 ? 'generation' : 'generations'} remaining.{' '}
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="text-primary underline hover:text-primary/80"
              >
                Sign in
              </button>{' '}
              for cloud saves and unlimited access.
            </div>
          )}

          {state === 'loading' && <LoadingState />}

          <div ref={resultsRef}>
            {state === 'success' && brandKit && (
              <ResultsPanel
                brandKit={brandKit}
                onSave={handleSave}
                savedJustNow={savedJustNow}
                onRegenerate={handleRegenerate}
              />
            )}
          </div>

          <footer className="mt-16 text-center text-xs text-text-muted">
            <p>
              BrandKit AI is a starting point — pair it with a designer for final logo work and
              trademark clearance.
            </p>
          </footer>
        </div>
      </div>

      {showHistory && (
        <HistoryDrawer
          history={history}
          onSelect={handleHistorySelect}
          onRemove={remove}
          onClear={clear}
          onClose={() => setShowHistory(false)}
          syncing={syncing}
        />
      )}

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
