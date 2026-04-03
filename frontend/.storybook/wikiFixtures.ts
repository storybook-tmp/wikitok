import type { WikiArticle } from '../src/components/WikiCard';

export const defaultLanguageId = 'en';

export const featuredArticle = createArticle({
  pageid: 101,
  title: 'Solar eclipse over the Atacama',
  extract:
    'An ultra-clear total solar eclipse over the Atacama Desert revealed the Moon’s shadow against a deep cobalt sky and a horizon lit by sunset colors in every direction.',
  accent: '#0f172a',
});

export const likedArticles = [
  createArticle({
    pageid: 202,
    title: 'Bioluminescent bay',
    extract:
      'A protected lagoon filled with dinoflagellates glows electric blue at night, creating a shoreline that looks illuminated from beneath the water.',
    accent: '#0ea5e9',
  }),
  createArticle({
    pageid: 303,
    title: 'Mountain tea house',
    extract:
      'A remote tea house on a high-altitude trail became a landmark rest stop for hikers because of its hand-built stone terrace and panoramic alpine views.',
    accent: '#b45309',
  }),
];

const articleBatches = [
  [
    featuredArticle,
    likedArticles[0],
    likedArticles[1],
    createArticle({
      pageid: 404,
      title: 'Night train to Lisbon',
      extract:
        'An overnight rail route linking Iberian cities became known for its art-deco dining car, soft-lit sleepers, and sunrise arrival along the Tagus River.',
      accent: '#7c3aed',
    }),
  ],
  [
    createArticle({
      pageid: 505,
      title: 'Arctic research station',
      extract:
        'Scientists at an Arctic research station measured seasonal sea-ice changes while living in modular labs designed to withstand months of polar darkness.',
      accent: '#1d4ed8',
    }),
    createArticle({
      pageid: 606,
      title: 'Floating market',
      extract:
        'A floating market built around narrow canals is famous for wooden boats carrying flowers, spices, and fresh fruit before sunrise.',
      accent: '#059669',
    }),
    createArticle({
      pageid: 707,
      title: 'Volcanic glass beach',
      extract:
        'This shoreline is layered with polished fragments of black volcanic glass created when lava met the sea and cooled into smooth reflective pebbles.',
      accent: '#111827',
    }),
  ],
];

export function createWikipediaResponse(languageId: string, batchIndex = 0) {
  const batch = articleBatches[batchIndex % articleBatches.length];

  return {
    query: {
      pages: Object.fromEntries(
        batch.map((article) => [
          article.pageid.toString(),
          createWikipediaPage(article, languageId),
        ]),
      ),
    },
  };
}

function createWikipediaPage(article: WikiArticle, languageId: string) {
  return {
    title: article.title,
    varianttitles: {
      [languageId]: article.displaytitle,
    },
    extract: article.extract,
    pageid: article.pageid,
    thumbnail: article.thumbnail,
    canonicalurl: createArticleUrl(languageId, article.title),
  };
}

function createArticle({
  pageid,
  title,
  extract,
  accent,
}: {
  pageid: number;
  title: string;
  extract: string;
  accent: string;
}): WikiArticle {
  return {
    title,
    displaytitle: title,
    extract,
    pageid,
    url: createArticleUrl(defaultLanguageId, title),
    thumbnail: createThumbnail(title, accent),
  };
}

function createArticleUrl(languageId: string, title: string) {
  return `https://${languageId}.wikipedia.org/wiki/${encodeURIComponent(
    title.replace(/\s+/g, '_'),
  )}`;
}

function createThumbnail(title: string, accent: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" role="img" aria-label="${escapeAttribute(
      title,
    )}">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
      </defs>
      <rect width="800" height="1200" fill="url(#g)" />
      <circle cx="620" cy="220" r="140" fill="rgba(255,255,255,0.18)" />
      <rect x="80" y="760" width="640" height="240" rx="36" fill="rgba(15,23,42,0.45)" />
      <text x="80" y="860" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="56" font-weight="700">
        ${escapeText(title)}
      </text>
    </svg>
  `.trim();

  return {
    source: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    width: 800,
    height: 1200,
  };
}

function escapeAttribute(value: string) {
  return value.replace(/"/g, '&quot;');
}

function escapeText(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
