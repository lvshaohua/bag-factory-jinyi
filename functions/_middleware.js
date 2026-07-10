// Cloudflare Pages Middleware: Inject country-based language suggestion into root page
// Runs on every request but only modifies the root "/" path

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

export function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // Only intercept root path "/"
  if (path !== '/') {
    return context.next();
  }

  // Skip if visitor already has a preference cookie
  const cookieHeader = context.request.headers.get('Cookie') || '';
  if (cookieHeader.includes('preferred_lang=') || cookieHeader.includes('lang_dismissed=')) {
    return context.next();
  }

  // Check country from Cloudflare
  const country = (context.request.headers.get('CF-IPCountry') || '').toUpperCase();
  const lang = COUNTRY_LANG_MAP[country];

  if (!lang) {
    return context.next();
  }

  // We have a matching language — modify the response to inject suggestion script
  // Use env.ASSETS to fetch the root index.html manually, inject, and return
  return context.next().then(response => {
    // Only modify HTML responses
    const contentType = response.headers.get('Content-Type') || '';
    if (!contentType.includes('text/html')) {
      return response;
    }

    const countryName = COUNTRY_NAMES[country] || country;
    const injectScript = `<script>window.SUGGESTED_LANG='${lang}';window.SUGGESTED_COUNTRY='${countryName}';</script>`;

    return response.text().then(html => {
      // Insert before </head>
      const modified = html.replace('</head>', `${injectScript}</head>`);
      return new Response(modified, {
        status: response.status,
        headers: response.headers,
      });
    });
  });
}
