import {
  Sora,
  Inter,
  Playfair_Display,
  DM_Serif_Display,
  Fraunces,
  Plus_Jakarta_Sans,
  DM_Sans,
  Outfit,
  Unbounded,
  Bricolage_Grotesque,
  Lexend,
  Space_Grotesk,
  Archivo,
  Manrope,
  Syne,
  Chivo,
  Epilogue,
  Barlow,
  Josefin_Sans,
} from 'next/font/google';

export const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
  axes: ['wdth', 'opsz'],
});

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const chivo = Chivo({
  subsets: ['latin'],
  variable: '--font-chivo',
  display: 'swap',
});

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
  display: 'swap',
});

const barlow = Barlow({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
});

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin-sans',
  display: 'swap',
});

export const FONT_VAR_MAP: Record<string, string> = {
  'Sora': 'var(--font-sora)',
  'Inter': 'var(--font-inter)',
  'Playfair Display': 'var(--font-playfair-display)',
  'DM Serif Display': 'var(--font-dm-serif-display)',
  'Fraunces': 'var(--font-fraunces)',
  'Plus Jakarta Sans': 'var(--font-plus-jakarta-sans)',
  'DM Sans': 'var(--font-dm-sans)',
  'Outfit': 'var(--font-outfit)',
  'Unbounded': 'var(--font-unbounded)',
  'Bricolage Grotesque': 'var(--font-bricolage-grotesque)',
  'Lexend': 'var(--font-lexend)',
  'Space Grotesk': 'var(--font-space-grotesk)',
  'Archivo': 'var(--font-archivo)',
  'Manrope': 'var(--font-manrope)',
  'Syne': 'var(--font-syne)',
  'Chivo': 'var(--font-chivo)',
  'Epilogue': 'var(--font-epilogue)',
  'Barlow': 'var(--font-barlow)',
  'Josefin Sans': 'var(--font-josefin-sans)',
};

export const FONT_PAIRINGS = [
  { display: 'Playfair Display', body: 'Inter' },
  { display: 'DM Serif Display', body: 'DM Sans' },
  { display: 'Fraunces', body: 'Outfit' },
  { display: 'Unbounded', body: 'Plus Jakarta Sans' },
  { display: 'Bricolage Grotesque', body: 'Inter' },
  { display: 'Sora', body: 'Lexend' },
  { display: 'Space Grotesk', body: 'Archivo' },
  { display: 'Syne', body: 'Manrope' },
  { display: 'Chivo', body: 'Epilogue' },
  { display: 'Barlow', body: 'Josefin Sans' },
  { display: 'Playfair Display', body: 'Barlow' },
  { display: 'DM Serif Display', body: 'Space Grotesk' },
  { display: 'Fraunces', body: 'DM Sans' },
  { display: 'Plus Jakarta Sans', body: 'Outfit' },
  { display: 'Lexend', body: 'Chivo' },
  { display: 'Unbounded', body: 'Manrope' },
  { display: 'Sora', body: 'Inter' },
  { display: 'Archivo', body: 'Epilogue' },
  { display: 'Syne', body: 'Josefin Sans' },
];

const allFonts = [
  sora,
  inter,
  playfairDisplay,
  dmSerifDisplay,
  fraunces,
  plusJakartaSans,
  dmSans,
  outfit,
  unbounded,
  bricolageGrotesque,
  lexend,
  spaceGrotesk,
  archivo,
  manrope,
  syne,
  chivo,
  epilogue,
  barlow,
  josefinSans,
];

export const brandKitFontVariables = allFonts.map((f) => f.variable).join(' ');
