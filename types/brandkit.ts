export interface BrandFormInput {
  businessName: string;
  industry: string;
  audience: string;
  personality: string;
  inspiration: string;
}

export interface PaletteColor {
  name: string;
  hex: string;
  usage: string;
}

export interface TypographySpec {
  display: string;
  body: string;
}

export interface VoiceSpec {
  tone: string;
  doExample: string;
  dontExample: string;
}

export interface LogoConceptSpec {
  style: string;
  description: string;
}

export interface BrandKit {
  brandName: string;
  taglines: string[];
  palette: PaletteColor[];
  typography: TypographySpec;
  voice: VoiceSpec[];
  logoConcept: LogoConceptSpec;
  remainingUses?: number;
}

export interface ApiErrorResponse {
  error: string;
  code?: string;
  remainingUses?: number;
}

