import { NextRequest, NextResponse } from 'next/server';
import { BrandKit } from '@/types/brandkit';
import { buildSectionPrompt } from '@/lib/prompt';
import { generateBrandKit } from '@/lib/gemini';
import { validateOutput } from '@/lib/validate';

type Section = 'palette' | 'taglines' | 'typography' | 'voice' | 'logo';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { section, existing, input } = body as {
    section: Section;
    existing: BrandKit;
    input: { businessName: string; industry: string; audience: string; personality: string; inspiration: string };
  };

  if (!section || !existing || !input) {
    return NextResponse.json({ error: 'Missing required fields: section, existing, input' }, { status: 400 });
  }

  if (!['palette', 'taglines', 'typography', 'voice', 'logo'].includes(section)) {
    return NextResponse.json({ error: 'Invalid section. Must be one of: palette, taglines, typography, voice, logo' }, { status: 400 });
  }

  try {
    const prompt = buildSectionPrompt(section, existing, input);
    const result = await generateBrandKit(prompt);

    if (!validateOutput(result)) {
      return NextResponse.json({ error: 'AI returned an invalid result. Try again.' }, { status: 502 });
    }

    const partial: Partial<BrandKit> = {};
    if (section === 'taglines') partial.taglines = result.taglines;
    if (section === 'palette') partial.palette = result.palette;
    if (section === 'typography') partial.typography = result.typography;
    if (section === 'voice') partial.voice = result.voice;
    if (section === 'logo') partial.logoConcept = result.logoConcept;

    return NextResponse.json(partial);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('Regenerate error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
