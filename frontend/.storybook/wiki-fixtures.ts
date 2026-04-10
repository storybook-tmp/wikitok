import type { WikiArticle } from '../src/components/WikiCard';

export const defaultMockDate = '2024-04-10T12:00:00.000Z';

export const primaryArticle = createArticle({
  pageid: 101,
  title: 'Aurora over Alaska',
  displaytitle: 'Aurora over Alaska',
  extract:
    'A ribbon of green light bends over Denali National Park while winter clouds lift off the mountain range.',
  accent: '#3b82f6',
});

export const secondaryArticle = createArticle({
  pageid: 102,
  title: 'Mars Rover Workshop',
  displaytitle: 'Mars Rover Workshop',
  extract:
    'A volunteer-built robotics lab uses open-source rover designs to teach navigation, mapping, and planetary geology.',
  accent: '#f97316',
});

export const tertiaryArticle = createArticle({
  pageid: 103,
  title: 'Deep Sea Vent',
  displaytitle: 'Deep Sea Vent',
  extract:
    'Hydrothermal vents on the ocean floor support dense ecosystems that thrive without sunlight and reshape nearby minerals.',
  accent: '#14b8a6',
});

export const quaternaryArticle = createArticle({
  pageid: 104,
  title: 'Historic Tram Network',
  displaytitle: 'Historic Tram Network',
  extract:
    'A century-old tram system still anchors daily commutes, linking hillside neighborhoods with the downtown station district.',
  accent: '#a855f7',
});

export const quinaryArticle = createArticle({
  pageid: 105,
  title: 'Monsoon Garden',
  displaytitle: 'Monsoon Garden',
  extract:
    'The garden combines elevated walkways, flood-tolerant plants, and stone cisterns to manage seasonal downpours.',
  accent: '#22c55e',
});

export const senaryArticle = createArticle({
  pageid: 106,
  title: 'Night Market Orchestra',
  displaytitle: 'Night Market Orchestra',
  extract:
    'Street musicians rehearse among food stalls, layering folk melodies with improvised percussion from market vendors.',
  accent: '#eab308',
});

export const wikiArticleBatches: WikiArticle[][] = [
  [primaryArticle, secondaryArticle, tertiaryArticle],
  [quaternaryArticle, quinaryArticle, senaryArticle],
];

export const likedArticleFixtures: WikiArticle[] = [
  secondaryArticle,
  tertiaryArticle,
];

export function serializeLikedArticles(articles: WikiArticle[]) {
  return JSON.stringify(articles);
}

export function buildWikipediaPayload(batchIndex: number) {
  const articles = wikiArticleBatches[batchIndex % wikiArticleBatches.length];

  return {
    batchcomplete: true,
    query: {
      pages: Object.fromEntries(
        articles.map((article) => [
          String(article.pageid + batchIndex * 1000),
          {
            title: article.title,
            extract: article.extract,
            pageid: article.pageid + batchIndex * 1000,
            thumbnail: article.thumbnail,
            canonicalurl: article.url,
            varianttitles: {
              en: article.displaytitle,
            },
          },
        ]),
      ),
    },
  };
}

function createArticle({
  pageid,
  title,
  displaytitle,
  extract,
  accent,
}: {
  pageid: number;
  title: string;
  displaytitle: string;
  extract: string;
  accent: string;
}): WikiArticle {
  return {
    title,
    displaytitle,
    extract,
    pageid,
    url: `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(' ', '_'))}`,
    thumbnail: {
      source: createThumbnailDataUrl(displaytitle, accent),
      width: 800,
      height: 1200,
    },
  };
}

function createThumbnailDataUrl(label: string, accent: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
      </defs>
      <rect width="800" height="1200" fill="url(#bg)" />
      <circle cx="640" cy="190" r="120" fill="rgba(255,255,255,0.14)" />
      <circle cx="140" cy="980" r="160" fill="rgba(255,255,255,0.12)" />
      <text
        x="64"
        y="1050"
        fill="white"
        font-family="Arial, sans-serif"
        font-size="56"
        font-weight="700"
      >
        ${escapeSvgText(label)}
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeSvgText(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
