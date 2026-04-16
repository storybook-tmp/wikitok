import type { WikiArticle } from '../src/components/WikiCard';

const svgDataUrl = (label: string, start: string, end: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="1600" fill="url(#bg)" />
      <text
        x="50%"
        y="50%"
        fill="white"
        font-family="Arial, sans-serif"
        font-size="86"
        font-weight="700"
        text-anchor="middle"
      >
        ${label}
      </text>
    </svg>
  `)}`;

const auroraLake = {
  title: 'Aurora Lake',
  displaytitle: 'Aurora Lake',
  extract:
    'Aurora Lake is a glacial lake known for bioluminescent algae and unusually clear winter skies.',
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Aurora_Lake',
  thumbnail: {
    source: svgDataUrl('Aurora Lake', '#2563eb', '#0f172a'),
    width: 800,
    height: 1200,
  },
} satisfies WikiArticle;

const basaltSpire = {
  title: 'Basalt Spire',
  displaytitle: 'Basalt Spire',
  extract:
    'Basalt Spire is a coastal rock formation studied for its columnar patterns and seabird nesting sites.',
  pageid: 102,
  url: 'https://en.wikipedia.org/wiki/Basalt_Spire',
  thumbnail: {
    source: svgDataUrl('Basalt Spire', '#475569', '#111827'),
    width: 800,
    height: 1200,
  },
} satisfies WikiArticle;

const cedarLibrary = {
  title: 'Cedar Library',
  displaytitle: 'Cedar Library',
  extract:
    'Cedar Library is a modern public archive built around a historic reading room and community workshop spaces.',
  pageid: 103,
  url: 'https://en.wikipedia.org/wiki/Cedar_Library',
  thumbnail: {
    source: svgDataUrl('Cedar Library', '#a16207', '#3f3f46'),
    width: 800,
    height: 1200,
  },
} satisfies WikiArticle;

const driftGarden = {
  title: 'Drift Garden',
  displaytitle: 'Drift Garden',
  extract:
    'Drift Garden is an urban botanical garden that specializes in salt-tolerant plants and sculpture walks.',
  pageid: 104,
  url: 'https://en.wikipedia.org/wiki/Drift_Garden',
  thumbnail: {
    source: svgDataUrl('Drift Garden', '#15803d', '#064e3b'),
    width: 800,
    height: 1200,
  },
} satisfies WikiArticle;

const emberFalls = {
  title: 'Ember Falls',
  displaytitle: 'Ember Falls',
  extract:
    'Ember Falls is a waterfall and nature preserve that became known for volcanic minerals in its spray.',
  pageid: 105,
  url: 'https://en.wikipedia.org/wiki/Ember_Falls',
  thumbnail: {
    source: svgDataUrl('Ember Falls', '#dc2626', '#431407'),
    width: 800,
    height: 1200,
  },
} satisfies WikiArticle;

const glassHarbor = {
  title: 'Glass Harbor',
  displaytitle: 'Glass Harbor',
  extract:
    'Glass Harbor is a former shipbuilding district that now hosts maritime museums, studios, and ferry docks.',
  pageid: 106,
  url: 'https://en.wikipedia.org/wiki/Glass_Harbor',
  thumbnail: {
    source: svgDataUrl('Glass Harbor', '#0ea5e9', '#082f49'),
    width: 800,
    height: 1200,
  },
} satisfies WikiArticle;

export const wikiArticleBatches = [
  [auroraLake, basaltSpire],
  [cedarLibrary, driftGarden],
  [emberFalls, glassHarbor],
] satisfies WikiArticle[][];

export const defaultLikedArticles = [auroraLake, emberFalls] satisfies WikiArticle[];

let wikiRequestIndex = 0;

export function resetWikiFixtureState() {
  wikiRequestIndex = 0;
}

export function nextWikipediaResponse(requestUrl: URL) {
  const languageId = requestUrl.searchParams.get('variant') ?? 'en';
  const requestNumber = wikiRequestIndex;
  const batch = wikiArticleBatches[requestNumber % wikiArticleBatches.length];

  wikiRequestIndex += 1;

  return {
    batchcomplete: true,
    query: {
      pages: Object.fromEntries(
        batch.map((article) => {
          const responsePageId = article.pageid + requestNumber * 1000;

          return [
            responsePageId,
          {
            canonicalurl: article.url,
            extract: article.extract,
            pageid: responsePageId,
            thumbnail: article.thumbnail,
            title: article.title,
            varianttitles: {
              [languageId]: article.displaytitle,
            },
          },
          ];
        }),
      ),
    },
  };
}
