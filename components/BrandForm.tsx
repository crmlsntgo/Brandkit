'use client';

import { FormEvent, useState } from 'react';
import { BrandFormInput } from '@/types/brandkit';

const INDUSTRIES = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Food & Beverage',
  'Fashion', 'Real Estate', 'Travel', 'Entertainment', 'E-commerce',
  'Consulting', 'Design', 'Manufacturing', 'Nonprofit', 'Wellness',
];

interface BrandFormProps {
  onSubmit: (input: BrandFormInput) => void;
  isLoading: boolean;
}

export default function BrandForm({ onSubmit, isLoading }: BrandFormProps) {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [audience, setAudience] = useState('');
  const [personality, setPersonality] = useState('');
  const [inspiration, setInspiration] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!businessName.trim() || !industry.trim()) return;
    onSubmit({ businessName: businessName.trim(), industry: industry.trim(), audience: audience.trim(), personality: personality.trim(), inspiration: inspiration.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="businessName" className="mb-1.5 block text-sm font-medium text-text">
            Business name <span className="text-primary">*</span>
          </label>
          <input id="businessName" type="text" required value={businessName} onChange={(e) => setBusinessName(e.target.value)} onBlur={() => { setTouched((p) => ({ ...p, businessName: true })); setFocusedField(null); }} onFocus={() => setFocusedField('businessName')} placeholder="e.g. Lumina Studio" className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-base text-text placeholder:text-text-muted/70 transition-shadow focus:shadow-glow focus:border-primary focus:outline-none" />
          {touched.businessName && !businessName.trim() && <p className="mt-1 text-sm text-red-500">Required</p>}
        </div>

        <div>
          <label htmlFor="industry" className="mb-1.5 block text-sm font-medium text-text">
            Industry <span className="text-primary">*</span>
          </label>
          <input id="industry" type="text" required value={industry} onChange={(e) => setIndustry(e.target.value)} onBlur={() => { setTouched((p) => ({ ...p, industry: true })); setFocusedField(null); }} onFocus={() => setFocusedField('industry')} list="industries" placeholder="e.g. Technology" className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-base text-text placeholder:text-text-muted/70 transition-shadow focus:shadow-glow focus:border-primary focus:outline-none" />
          <datalist id="industries">
            {INDUSTRIES.map((ind) => <option key={ind} value={ind} />)}
          </datalist>
          {touched.industry && !industry.trim() && <p className="mt-1 text-sm text-red-500">Required</p>}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="audience" className="mb-1.5 block text-sm font-medium text-text">Target audience</label>
        <textarea id="audience" value={audience} onChange={(e) => setAudience(e.target.value)} onFocus={() => setFocusedField('audience')} onBlur={() => setFocusedField(null)} rows={2} placeholder="e.g. Small business owners aged 25–45" className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-base text-text placeholder:text-text-muted/70 transition-shadow focus:shadow-glow focus:border-primary focus:outline-none" />
        {focusedField === 'audience' && <p className="mt-1 text-right text-[10px] text-text-muted">{audience.length}/500</p>}
      </div>

      <div className="mt-4">
        <label htmlFor="personality" className="mb-1.5 block text-sm font-medium text-text">Brand personality</label>
        <textarea id="personality" value={personality} onChange={(e) => setPersonality(e.target.value)} onFocus={() => setFocusedField('personality')} onBlur={() => setFocusedField(null)} rows={2} placeholder="e.g. Bold, minimalist, trustworthy" className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-base text-text placeholder:text-text-muted/70 transition-shadow focus:shadow-glow focus:border-primary focus:outline-none" />
        {focusedField === 'personality' && <p className="mt-1 text-right text-[10px] text-text-muted">{personality.length}/500</p>}
      </div>

      <div className="mt-4">
        <label htmlFor="inspiration" className="mb-1.5 block text-sm font-medium text-text">Inspiration / notes</label>
        <textarea id="inspiration" value={inspiration} onChange={(e) => setInspiration(e.target.value)} onFocus={() => setFocusedField('inspiration')} onBlur={() => setFocusedField(null)} rows={2} placeholder="e.g. Love the Apple clean look but warmer" className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-base text-text placeholder:text-text-muted/70 transition-shadow focus:shadow-glow focus:border-primary focus:outline-none" />
        {focusedField === 'inspiration' && <p className="mt-1 text-right text-[10px] text-text-muted">{inspiration.length}/500</p>}
      </div>

      <button type="submit" disabled={isLoading} className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base font-semibold text-white shadow-inner shadow-white/10 transition-all hover:shadow-glow hover:brightness-110 disabled:opacity-60">
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Generating...
          </>
        ) : (
          <>
            Generate brand kit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </>
        )}
      </button>
    </form>
  );
}
