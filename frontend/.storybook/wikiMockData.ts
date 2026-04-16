import type { WikiArticle } from '../src/components/WikiCard';

export const fixedTimestamp = Date.parse('2024-04-01T12:00:00.000Z');

export const defaultWikiArticles: WikiArticle[] = [
  createArticle({
    displaytitle: 'Northern lights',
    extract:
      'The northern lights are a natural light display caused by charged solar particles interacting with Earth’s atmosphere near the poles.',
    pageid: 101,
    title: 'Northern lights',
  }),
];

export const defaultLikedArticles: WikiArticle[] = [
  defaultWikiArticles[0],
  createArticle({
    displaytitle: 'Deep sea',
    extract:
      'The deep sea begins below the sunlit surface waters and contains ecosystems shaped by pressure, cold temperatures, and limited light.',
    pageid: 202,
    title: 'Deep sea',
  }),
];

export function createWikiResponse({
  languageId,
  origin,
}: {
  languageId: string;
  origin: string;
}) {
  const article = defaultWikiArticles[0];

  return {
    batchcomplete: '',
    query: {
      pages: {
        [article.pageid]: {
          canonicalurl: `${origin}/wiki/${encodeURIComponent(article.title.replaceAll(' ', '_'))}`,
          extract: article.extract,
          pageid: article.pageid,
          thumbnail: article.thumbnail,
          title: article.title,
          varianttitles: {
            [languageId]: article.displaytitle,
          },
        },
      },
    },
  };
}

function createArticle({
  displaytitle,
  extract,
  pageid,
  title,
}: {
  displaytitle: string;
  extract: string;
  pageid: number;
  title: string;
}): WikiArticle {
  return {
    displaytitle,
    extract,
    pageid,
    thumbnail: {
      height: 900,
      source: createPosterDataUrl(displaytitle),
      width: 700,
    },
    title,
    url: `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(' ', '_'))}`,
  };
}

function createPosterDataUrl(label: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 900">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="55%" stop-color="#1d4ed8" />
          <stop offset="100%" stop-color="#22c55e" />
        </linearGradient>
      </defs>
      <rect width="700" height="900" fill="url(#bg)" />
      <circle cx="560" cy="150" r="120" fill="rgba(255,255,255,0.18)" />
      <circle cx="180" cy="760" r="160" fill="rgba(255,255,255,0.1)" />
      <text
        x="60"
        y="760"
        fill="#ffffff"
        font-family="Arial, sans-serif"
        font-size="64"
        font-weight="700"
      >
        ${escapeXml(label)}
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
