# BrandKit AI

AI-powered brand identity kits for new businesses. Describe your business and get a color palette, font pairing, taglines, brand voice guide, and logo concept in seconds.

Built with [Next.js 14](https://nextjs.org/) (App Router), [Tailwind CSS](https://tailwindcss.com/), and [Gemini 1.5 Flash](https://ai.google.dev/).

## Features

- **Brand kit generation** — 5-field form → complete brand identity in ~15 seconds
- **Color palette** — 5 colors with WCAG-compliant contrast ratios
- **Typography pairing** — 19 curated Google Fonts
- **Taglines** — 3 industry-specific, anti-cliche taglines
- **Brand voice** — 3 tone profiles with do/don't examples
- **Logo concept** — AI-generated logo brief with optional AI sketch image
- **Section regeneration** — regenerate individual sections (palette, typography, taglines, voice, logo) without losing the rest
- **Export tokens** — CSS variables, Tailwind config, or raw JSON
- **PDF download** — brand book export via `@react-pdf/renderer`
- **History** — save kits to browser (localStorage) or cloud (Supabase)
- **Magic-link auth** — optional email-based sign in via Supabase
- **Dark mode** — system-aware with manual toggle, no SSR flash
- **Visual design** — emerald/gold palette, glass morphism, noise texture, custom animations

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3 |
| AI | Google Gemini 1.5 Flash (REST API, no SDK) |
| Auth | Supabase (email magic link) |
| Cloud history | Supabase |
| Local history | localStorage |
| PDF export | `@react-pdf/renderer` |
| Logo image | Pollinations.ai |
| Language | TypeScript |
| Fonts | 19 Google Fonts via `next/font` (self-hosted) |

## Getting started

### Prerequisites

- Node.js 18+
- A [Gemini API key](https://aistudio.google.com/app/apikey) (free, no credit card required)

### Installation

```bash
git clone <repo-url>
cd brandkit-ai
npm install
```

### Environment variables

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
GEMINI_API_KEY=your_gemini_api_key

# Optional — without these the app uses localStorage only
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### TypeScript check

```bash
npx tsc --noEmit
```

### Production build

```bash
npm run build
```

> `next/font/google` fetches font files at build time — requires outbound access to `fonts.googleapis.com`. Use `npx tsc --noEmit` for offline validation.

## Usage

1. Enter your business name, industry, target audience, brand personality, and any inspiration notes.
2. Click **Generate** — the AI creates a full brand kit in about 15 seconds.
3. Review each section: palette, typography, taglines, brand voice, logo concept.
4. Regenerate any section individually if you want a different direction.
5. Save the kit, export tokens (CSS/Tailwind/JSON), or download a PDF.
6. Access saved kits from the history drawer.

### Supabase setup (optional)

If you want cloud-synced history and email sign-in:

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/schema.sql` in the SQL Editor.
3. Copy your project URL and anon key to `.env.local`.
4. Enable **Auth > Settings > Magic Link** in the Supabase dashboard.

## Project structure

```
app/                    # Next.js App Router (pages, layouts, API routes)
├── api/generate/       # POST /api/generate — brand kit generation
├── api/regenerate/     # POST /api/regenerate — section regeneration
components/             # React UI components (13 files)
lib/                    # Utilities (Gemini client, prompts, validation, auth, etc.)
supabase/               # Database schema
types/                  # TypeScript type definitions
```

## Deployment

Deploy to [Vercel](https://vercel.com) (recommended):

1. Push to GitHub.
2. Import repo in Vercel.
3. Set `GEMINI_API_KEY` in environment variables.
4. Deploy.

## License

MIT
