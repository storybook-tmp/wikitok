import type { WikiArticle } from '../src/components/WikiCard';

export const mockArticles: WikiArticle[] = [
  {
    title: 'Aurora over Basalt Cliffs',
    displaytitle: 'Aurora over Basalt Cliffs',
    extract:
      'A landmark article about aurora bands drifting over volcanic sea cliffs, often cited for its dramatic night-sky photography and geology notes.',
    pageid: 101,
    url: 'https://en.wikipedia.org/wiki/Aurora_over_Basalt_Cliffs',
    thumbnail: {
      source: createThumbnailDataUrl('Aurora over Basalt Cliffs', '#1d4ed8'),
      width: 800,
      height: 1200,
    },
  },
  {
    title: 'Saffron Tea Ceremony',
    displaytitle: 'Saffron Tea Ceremony',
    extract:
      'This article follows a ceremonial tea tradition known for dyed textiles, hand-beaten copper kettles, and long-form communal storytelling.',
    pageid: 102,
    url: 'https://en.wikipedia.org/wiki/Saffron_Tea_Ceremony',
    thumbnail: {
      source: createThumbnailDataUrl('Saffron Tea Ceremony', '#c2410c'),
      width: 800,
      height: 1200,
    },
  },
  {
    title: 'Glasshouse Rainforest',
    displaytitle: 'Glasshouse Rainforest',
    extract:
      'A horticulture article describing a domed conservatory that recreates rainforest humidity, canopy layering, and night-blooming plant collections.',
    pageid: 103,
    url: 'https://en.wikipedia.org/wiki/Glasshouse_Rainforest',
    thumbnail: {
      source: createThumbnailDataUrl('Glasshouse Rainforest', '#166534'),
      width: 800,
      height: 1200,
    },
  },
];

export const mockLikedArticles: WikiArticle[] = [mockArticles[0], mockArticles[2]];

export function buildWikiQueryResponse(languageId: string, host: string) {
  return {
    query: {
      pages: Object.fromEntries(
        mockArticles.map((article) => [
          article.pageid,
          {
            title: article.title,
            pageid: article.pageid,
            thumbnail: article.thumbnail,
            extract: article.extract,
            canonicalurl: buildArticleUrl(host, article.title),
            varianttitles: {
              [languageId]: localizeDisplayTitle(article.displaytitle, languageId),
            },
          },
        ]),
      ),
    },
  };
}

function buildArticleUrl(host: string, title: string) {
  return `https://${host}/wiki/${encodeURIComponent(title.split(' ').join('_'))}`;
}

function localizeDisplayTitle(displayTitle: string, languageId: string) {
  return languageId === 'en'
    ? displayTitle
    : `${displayTitle} (${languageId.toUpperCase()})`;
}

function createThumbnailDataUrl(title: string, accent: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
      </defs>
      <rect width="800" height="1200" fill="url(#bg)" />
      <circle cx="640" cy="220" r="180" fill="rgba(255,255,255,0.12)" />
      <circle cx="140" cy="960" r="220" fill="rgba(255,255,255,0.08)" />
      <text
        x="72"
        y="980"
        fill="white"
        font-family="Arial, sans-serif"
        font-size="64"
        font-weight="700"
      >
        ${escapeXml(title)}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
