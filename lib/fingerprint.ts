/**
 * Generates a lightweight browser fingerprint to identify the same device
 * across incognito / private browsing sessions. Used solely to enforce
 * fair usage limits on the free tier — not for tracking users.
 */
export function getClientFingerprint(): string {
  if (typeof window === 'undefined') return '';

  const components = [
    screen.width,
    screen.height,
    screen.colorDepth,
    navigator.language,
    navigator.hardwareConcurrency || 0,
    new Date().getTimezoneOffset(),
    navigator.platform || '',
    getCanvasToken(),
  ];

  return simpleHash(components.join('|'));
}

/** Tiny canvas-based token — varies by GPU / font rendering engine. */
function getCanvasToken(): string {
  try {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 16;
    const ctx = c.getContext('2d');
    if (!ctx) return '';
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('BK\u00B7fp', 2, 2);
    return c.toDataURL().slice(-32);
  } catch {
    return '';
  }
}

function simpleHash(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36).padStart(7, '0');
}
