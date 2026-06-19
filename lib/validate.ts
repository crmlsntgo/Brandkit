import { BrandFormInput, BrandKit } from '@/types/brandkit';

const HEX_RE = /^#[0-9A-Fa-f]{6}$/;

const VALID_FONTS = new Set([
  'Sora', 'Inter', 'Playfair Display', 'DM Serif Display', 'Fraunces',
  'Plus Jakarta Sans', 'DM Sans', 'Outfit', 'Unbounded', 'Bricolage Grotesque',
  'Lexend', 'Space Grotesk', 'Archivo', 'Manrope', 'Syne', 'Chivo',
  'Epilogue', 'Barlow', 'Josefin Sans',
]);

export function validateInput(input: BrandFormInput): string | null {
  if (!input.businessName || input.businessName.trim().length < 2) {
    return 'Business name must be at least 2 characters';
  }
  if (input.businessName.length > 100) {
    return 'Business name must be under 100 characters';
  }
  if (!input.industry || input.industry.trim().length < 2) {
    return 'Industry must be at least 2 characters';
  }
  if (input.industry.length > 100) {
    return 'Industry must be under 100 characters';
  }
  if (input.audience && input.audience.length > 500) {
    return 'Target audience must be under 500 characters';
  }
  if (input.personality && input.personality.length > 500) {
    return 'Brand personality must be under 500 characters';
  }
  if (input.inspiration && input.inspiration.length > 500) {
    return 'Inspiration must be under 500 characters';
  }
  return null;
}

export function validateOutput(kit: unknown): kit is BrandKit {
  if (!kit || typeof kit !== 'object') return false;

  const k = kit as Record<string, unknown>;

  if (typeof k.brandName !== 'string') return false;
  if (!Array.isArray(k.taglines) || k.taglines.length !== 3) return false;
  if (!Array.isArray(k.palette) || k.palette.length !== 5) return false;

  for (const swatch of k.palette) {
    if (!swatch || typeof swatch !== 'object') return false;
    const s = swatch as Record<string, unknown>;
    if (typeof s.name !== 'string') return false;
    if (typeof s.hex !== 'string' || !HEX_RE.test(s.hex)) return false;
    if (typeof s.usage !== 'string') return false;
  }

  if (!k.typography || typeof k.typography !== 'object') return false;
  const t = k.typography as Record<string, unknown>;
  if (typeof t.display !== 'string' || !VALID_FONTS.has(t.display)) return false;
  if (typeof t.body !== 'string' || !VALID_FONTS.has(t.body)) return false;

  if (!Array.isArray(k.voice) || k.voice.length !== 3) return false;
  for (const v of k.voice) {
    if (!v || typeof v !== 'object') return false;
    const vv = v as Record<string, unknown>;
    if (typeof vv.tone !== 'string') return false;
    if (typeof vv.doExample !== 'string') return false;
    if (typeof vv.dontExample !== 'string') return false;
  }

  if (!k.logoConcept || typeof k.logoConcept !== 'object') return false;
  const l = k.logoConcept as Record<string, unknown>;
  if (typeof l.style !== 'string') return false;
  if (typeof l.description !== 'string') return false;

  return true;
}
