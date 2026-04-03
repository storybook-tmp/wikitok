import { HttpResponse, http } from 'msw';

export const mswHandlers = [
  http.get(/https:\/\/([a-z-]+)\.wikipedia\.org\/w\/api\.php/, ({ request }) => {
    const url = new URL(request.url);
    const languageId = url.searchParams.get('variant') ?? url.hostname.split('.')[0];
    const batchIndex = wikipediaRequestCount++;

    return HttpResponse.json(buildWikipediaPayload(languageId, batchIndex));
  }),
  http.get('https://hatscripts.github.io/circle-flags/flags/:flag', ({ params }) =>
    HttpResponse.text(buildFlagSvg(String(params.flag)), {
      headers: { 'Content-Type': 'image/svg+xml' },
    }),
  ),
  http.get(
    'https://upload.wikimedia.org/wikipedia/commons/2/20/Verda_stelo_%28unukolora%29.svg',
    () =>
      HttpResponse.text(buildFlagSvg('eo'), {
        headers: { 'Content-Type': 'image/svg+xml' },
      }),
  ),
  http.post(/https:\/\/vitals\.vercel-insights\.com\/.*/, () => new HttpResponse(null, { status: 204 })),
  http.get(/https:\/\/va\.vercel-scripts\.com\/.*/, () =>
    HttpResponse.text('', {
      headers: { 'Content-Type': 'application/javascript' },
    }),
  ),
];

export function resetStorybookMocks() {
  wikipediaRequestCount = 0;
}

let wikipediaRequestCount = 0;

function buildWikipediaPayload(languageId: string, batchIndex: number) {
  const batchLabel = batchIndex === 0 ? '' : ` ${batchIndex + 1}`;
  const pages = Object.fromEntries(
    buildArticleTemplates().map((template, index) => {
      const pageid = batchIndex * 100 + index + 1;
      const title = `${template.title}${batchLabel}`;
      const displaytitle = title;

      return [
        pageid,
        {
          pageid,
          title,
          varianttitles: {
            [languageId]: displaytitle,
          },
          extract: template.extract,
          thumbnail: {
            source: buildArticleImage(title, template.accent),
            width: 960,
            height: 1440,
          },
          canonicalurl: `https://${languageId}.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(' ', '_'))}`,
        },
      ];
    }),
  );

  return {
    batchIndex,
    query: { pages },
  };
}

function buildArticleTemplates() {
  return [
    {
      title: 'Aurora Gardens',
      extract:
        'Aurora Gardens is a fictional botanical landmark known for glass canopies, tidal walkways, and a rotating collection of night-blooming plants gathered from coastal climates around the world.',
      accent: '#0f766e',
    },
    {
      title: 'Mirror Dunes',
      extract:
        'Mirror Dunes is a desert region described for its reflective mineral crust, low wind terraces, and a long history of artists documenting the horizon at sunrise.',
      accent: '#b45309',
    },
    {
      title: 'Lantern River',
      extract:
        'Lantern River is an imagined waterway that threads through several market towns, where floating lights and restored stone bridges became symbols of the regional festival calendar.',
      accent: '#7c3aed',
    },
    {
      title: 'Cloud Archive',
      extract:
        'Cloud Archive is a speculative hilltop library preserved for its spiral reading rooms, multilingual map collection, and unusually detailed records of local weather traditions.',
      accent: '#1d4ed8',
    },
  ];
}

function buildArticleImage(title: string, accent: string) {
  return toSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 1440">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
      </defs>
      <rect width="960" height="1440" fill="url(#bg)" />
      <circle cx="730" cy="280" r="180" fill="rgba(255,255,255,0.18)" />
      <circle cx="220" cy="1130" r="240" fill="rgba(255,255,255,0.08)" />
      <text x="76" y="1180" fill="white" font-size="96" font-family="system-ui, sans-serif" font-weight="700">${escapeSvgText(
        title,
      )}</text>
    </svg>
  `);
}

function buildFlagSvg(flag: string) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="flag" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#e2e8f0" />
          <stop offset="100%" stop-color="#94a3b8" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill="url(#flag)" />
      <text
        x="32"
        y="38"
        text-anchor="middle"
        fill="#0f172a"
        font-size="18"
        font-family="system-ui, sans-serif"
        font-weight="700"
      >
        ${escapeSvgText(flag.replace('.svg', '').slice(0, 2).toUpperCase())}
      </text>
    </svg>
  `;
}

function toSvgDataUri(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace(/\s+/g, ' ').trim())}`;
}

function escapeSvgText(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
