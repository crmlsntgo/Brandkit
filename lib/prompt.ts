import { BrandKit } from '@/types/brandkit';

const FONT_LIST = 'Sora, Inter, Playfair Display, DM Serif Display, Fraunces, Plus Jakarta Sans, DM Sans, Outfit, Unbounded, Bricolage Grotesque, Lexend, Space Grotesk, Archivo, Manrope, Syne, Chivo, Epilogue, Barlow, Josefin Sans';

function baseContext(input: { businessName: string; industry: string; audience: string; personality: string; inspiration: string }): string {
  return `Business name: ${input.businessName}
Industry: ${input.industry}
Target audience: ${input.audience}
Brand personality: ${input.personality}
Inspiration / notes: ${input.inspiration}`;
}

function jsonStructure(): string {
  return `{
  "brandName": "...",
  "taglines": ["tagline1", "tagline2", "tagline3"],
  "palette": [
    { "name": "Primary", "hex": "#...", "usage": "Headings, buttons" },
    { "name": "Secondary", "hex": "#...", "usage": "Accents, links" },
    { "name": "Background", "hex": "#...", "usage": "Page background" },
    { "name": "Text", "hex": "#...", "usage": "Body text" },
    { "name": "Accent", "hex": "#...", "usage": "Highlights, calls-to-action" }
  ],
  "typography": {
    "display": "Font name for headings",
    "body": "Font name for body text"
  },
  "voice": [
    { "tone": "Tone name", "doExample": "Example of what to do", "dontExample": "Example of what to avoid" },
    { "tone": "Tone name", "doExample": "Example of what to do", "dontExample": "Example of what to avoid" },
    { "tone": "Tone name", "doExample": "Example of what to do", "dontExample": "Example of what to avoid" }
  ],
  "logoConcept": {
    "style": "Logo style description",
    "description": "Detailed logo concept"
  }
}`;
}

export function buildPrompt(input: {
  businessName: string;
  industry: string;
  audience: string;
  personality: string;
  inspiration: string;
}): string {
  return `You are a brand identity designer. Generate a complete brand kit for the following business.

${baseContext(input)}

Respond with valid JSON only. No markdown fences, no explanation. Use exactly this structure:
${jsonStructure()}

Rules:
- Choose display and body fonts from this list: ${FONT_LIST}
- Palette must have exactly 5 colors with valid 6-digit hex codes. Ensure the Background and Text colors have a WCAG contrast ratio of at least 7:1
- Taglines: 3 unique, memorable taglines specific to ${input.industry}. Avoid combining two generic nouns with "meets". Never use the word "value"
- Voice: exactly 3 entries with do/don't examples specific to ${input.industry}, not generic copy advice
- Logo concept: reference specific typographic details — letterform shape, counter shape, descender treatment, or a specific iconographic element. Avoid vague descriptions like "modern and clean"
- Make all content specific to ${input.industry} industry`;
}

export function buildSectionPrompt(
  section: string,
  existing: BrandKit,
  input: { businessName: string; industry: string; audience: string; personality: string; inspiration: string }
): string {
  const sectionFields: Record<string, string> = {
    taglines: `"taglines": ["tagline1", "tagline2", "tagline3"]`,
    palette: `"palette": [
    { "name": "Primary", "hex": "#...", "usage": "Headings, buttons" },
    { "name": "Secondary", "hex": "#...", "usage": "Accents, links" },
    { "name": "Background", "hex": "#...", "usage": "Page background" },
    { "name": "Text", "hex": "#...", "usage": "Body text" },
    { "name": "Accent", "hex": "#...", "usage": "Highlights, calls-to-action" }
  ]`,
    typography: `"typography": { "display": "Font name", "body": "Font name" }`,
    voice: `"voice": [
    { "tone": "Tone name", "doExample": "Example of what to do", "dontExample": "Example of what to avoid" },
    { "tone": "Tone name", "doExample": "Example of what to do", "dontExample": "Example of what to avoid" },
    { "tone": "Tone name", "doExample": "Example of what to do", "dontExample": "Example of what to avoid" }
  ]`,
    logo: `"logoConcept": { "style": "Logo style description", "description": "Detailed logo concept" }`,
  };

  const existingStr = `Existing brand kit (keep everything else, only change the ${section} section):
Brand: ${existing.brandName}
Typography: ${existing.typography.display} / ${existing.typography.body}
Palette: ${existing.palette.map((c) => c.hex).join(', ')}`;

  const avoidStr = section === 'palette'
    ? `\nAvoid using these exact hex values: ${existing.palette.map((c) => c.hex).join(', ')}`
    : '';

  return `You are a brand identity designer. Regenerate only the "${section}" section of an existing brand kit.

${baseContext(input)}

${existingStr}${avoidStr}

Respond with valid JSON containing ALL fields (brandName, taglines, palette, typography, voice, logoConcept), but only change the ${section} section. Keep everything else identical to the existing kit.

${jsonStructure()}

Rules:
- Choose display and body fonts from this list: ${FONT_LIST}
- Palette must have exactly 5 colors with valid 6-digit hex codes
- Taglines: 3 unique, memorable taglines. Avoid "where quality meets value" or using "value"
- Voice examples must be specific to ${input.industry}
- Logo concept must reference specific visual or typographic details`;
}
