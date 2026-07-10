// Cloudflare Pages Function: Auto-redirect root "/" to language-specific page based on IP country
// Uses CF-IPCountry header (provided automatically by Cloudflare)
// Matches: Spanish-speaking → /es/, French-speaking → /fr/, German-speaking → /de/
// All others → default English (no redirect, serve root index.html)

const COUNTRY_LANG_MAP = {
  // Spanish (es)
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'CL': 'es', 'PE': 'es',
  'VE': 'es', 'EC': 'es', 'GT': 'es', 'CU': 'es', 'BO': 'es', 'DO': 'es',
  'HN': 'es', 'PY': 'es', 'SV': 'es', 'NI': 'es', 'CR': 'es', 'PA': 'es',
  'UY': 'es', 'GQ': 'es',
  // French (fr)
  'FR': 'fr', 'BE': 'fr', 'LU': 'fr', 'MC': 'fr', 'SN': 'fr', 'CI': 'fr',
  'ML': 'fr', 'BF': 'fr', 'NE': 'fr', 'TD': 'fr', 'GN': 'fr', 'BI': 'fr',
  'DJ': 'fr', 'RW': 'fr', 'MG': 'fr', 'KM': 'fr', 'CG': 'fr', 'CD': 'fr',
  // German (de)
  'DE': 'de', 'AT': 'de', 'CH': 'de', 'LI': 'de', 'LU': 'de',
};

export function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // Only handle root path "/" — do not interfere with other routes
  if (path !== '/') {
    return context.next();
  }

  // If visitor has a lang cookie (already chose a language), respect it
  const cookieHeader = context.request.headers.get('Cookie') || '';
  const langMatch = cookieHeader.match(/(?:^|;\s*)preferred_lang=(es|fr|de)/);
  if (langMatch) {
    const lang = langMatch[1];
    return Response.redirect(`${url.origin}/${lang}/`, 302);
  }

  // Get country from Cloudflare CF-IPCountry header
  const country = context.request.headers.get('CF-IPCountry') || '';

  // Map country code to language
  const lang = COUNTRY_LANG_MAP[country.toUpperCase()];

  if (lang) {
    // Set cookie so returning visitors keep their language preference
    const response = Response.redirect(`${url.origin}/${lang}/`, 302);
    response.headers.append('Set-Cookie', `preferred_lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`);
    return response;
  }

  // Default: serve English root page (no redirect)
  return context.next();
}
