// Cloudflare Pages Function: Inject country info into root page for language suggestion popup
// Uses CF-IPCountry header (provided automatically by Cloudflare)
// Does NOT auto-redirect — frontend JS handles user confirmation

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

const COUNTRY_NAMES = {
  'ES': 'Spain', 'MX': 'Mexico', 'AR': 'Argentina', 'CO': 'Colombia', 'CL': 'Chile', 'PE': 'Peru',
  'VE': 'Venezuela', 'EC': 'Ecuador', 'GT': 'Guatemala', 'CU': 'Cuba', 'BO': 'Bolivia', 'DO': 'Dominican Republic',
  'HN': 'Honduras', 'PY': 'Paraguay', 'SV': 'El Salvador', 'NI': 'Nicaragua', 'CR': 'Costa Rica', 'PA': 'Panama',
  'UY': 'Uruguay', 'GQ': 'Equatorial Guinea',
  'FR': 'France', 'BE': 'Belgium', 'LU': 'Luxembourg', 'MC': 'Monaco', 'SN': 'Senegal', 'CI': 'Ivory Coast',
  'ML': 'Mali', 'BF': 'Burkina Faso', 'NE': 'Niger', 'TD': 'Chad', 'GN': 'Guinea', 'BI': 'Burundi',
  'DJ': 'Djibouti', 'RW': 'Rwanda', 'MG': 'Madagascar', 'KM': 'Comoros', 'CG': 'Congo', 'CD': 'DR Congo',
  'DE': 'Germany', 'AT': 'Austria', 'CH': 'Switzerland', 'LI': 'Liechtenstein',
};

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // Only handle root path "/" — do not interfere with other routes
  if (path !== '/') {
    return context.next();
  }

  // If visitor already has a preference cookie, skip injection
  const cookieHeader = context.request.headers.get('Cookie') || '';
  if (cookieHeader.includes('preferred_lang=') || cookieHeader.includes('lang_dismissed=')) {
    return context.next();
  }

  // Get country from Cloudflare CF-IPCountry header
  const country = context.request.headers.get('CF-IPCountry') || '';
  const lang = COUNTRY_LANG_MAP[country.toUpperCase()];

  if (!lang) {
    return context.next();
  }

  // Inject suggested language info into HTML so frontend can show confirmation popup
  const response = await context.next();
  let html = await response.text();

  const countryName = COUNTRY_NAMES[country.toUpperCase()] || country.toUpperCase();
  const script = `<script>window.SUGGESTED_LANG='${lang}';window.SUGGESTED_COUNTRY='${countryName}';</script>`;

  // Insert before closing </head>
  if (html.includes('</head>')) {
    html = html.replace('</head>', `${script}</head>`);
  }

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
