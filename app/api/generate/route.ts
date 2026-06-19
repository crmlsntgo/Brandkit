import { NextRequest, NextResponse } from 'next/server';
import { BrandKit } from '@/types/brandkit';
import { buildPrompt } from '@/lib/prompt';
import { generateBrandKit } from '@/lib/gemini';
import { validateInput, validateOutput } from '@/lib/validate';
import { createClient } from '@supabase/supabase-js';

/* ── Spam rate-limiter (per-minute, all users) ─────────────── */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const ipHits = new Map<string, { count: number; resetAt: number }>();

/* ── Anonymous usage cap ───────────────────────────────────── */
const ANON_LIMIT = 2;
const anonIpUsage = new Map<string, number>();
const anonFpUsage = new Map<string, number>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipHits.get(ip);
  if (!record || now > record.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

/**
 * Verify a Supabase access token server-side.
 * Returns the authenticated user's ID, or null if invalid / missing.
 */
async function getAuthUserId(req: NextRequest): Promise<string | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;

  try {
    const supabase = createClient(url, key, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return null;
    return data.user.id;
  } catch {
    return null;
  }
}

/**
 * Returns the highest usage count across IP and fingerprint.
 * This means both signals must be clean for access to be granted —
 * changing IP (VPN) still gets caught by fingerprint, and
 * incognito still gets caught by IP.
 */
function getAnonUsage(ip: string, fp: string | null): number {
  const ipUsed = anonIpUsage.get(ip) || 0;
  const fpUsed = fp ? (anonFpUsage.get(fp) || 0) : 0;
  return Math.max(ipUsed, fpUsed);
}

function incrementAnonUsage(ip: string, fp: string | null): void {
  anonIpUsage.set(ip, (anonIpUsage.get(ip) || 0) + 1);
  if (fp) {
    anonFpUsage.set(fp, (anonFpUsage.get(fp) || 0) + 1);
  }
}

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const fingerprint = request.headers.get('x-client-id') || null;

  const userId = await getAuthUserId(request);
  if (userId) {
    return NextResponse.json({ remainingUses: null });
  }

  const used = getAnonUsage(ip, fingerprint);
  const remaining = Math.max(0, ANON_LIMIT - used);
  return NextResponse.json({ remainingUses: remaining });
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const fingerprint = request.headers.get('x-client-id') || null;

  /* 1. Spam rate-limit (applies to everyone) */
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before generating again.' },
      { status: 429 },
    );
  }

  /* 2. Authenticate (optional — only when Supabase is configured) */
  const userId = await getAuthUserId(request);

  /* 3. Anonymous usage cap — tracked by IP AND fingerprint */
  if (!userId) {
    const used = getAnonUsage(ip, fingerprint);
    if (used >= ANON_LIMIT) {
      return NextResponse.json(
        {
          error:
            "You\u2019ve used your 2 free generations. Sign in to continue generating brand kits.",
          code: 'ANON_LIMIT_REACHED',
          remainingUses: 0,
        },
        { status: 403 },
      );
    }
  }

  /* 4. Parse + validate input */
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const formInput = input as {
    businessName: string;
    industry: string;
    audience: string;
    personality: string;
    inspiration: string;
  };
  const validationError = validateInput(formInput);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  /* 5. Generate */
  try {
    const prompt = buildPrompt(formInput);
    const kit = await generateBrandKit(prompt);

    if (!validateOutput(kit)) {
      return NextResponse.json(
        { error: 'The AI returned an invalid brand kit. Please try again.' },
        { status: 502 },
      );
    }

    /* 6. Track anonymous usage AFTER successful generation */
    let remainingUses: number | undefined;
    if (!userId) {
      incrementAnonUsage(ip, fingerprint);
      const used = getAnonUsage(ip, fingerprint);
      remainingUses = Math.max(0, ANON_LIMIT - used);
    }

    return NextResponse.json({
      brandName: kit.brandName,
      taglines: kit.taglines,
      palette: kit.palette,
      typography: kit.typography,
      voice: kit.voice,
      logoConcept: kit.logoConcept,
      ...(remainingUses !== undefined ? { remainingUses } : {}),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('Generate error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
