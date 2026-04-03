import type { WikiArticle } from '../src/components/WikiCard';

const createThumbnail = (label: string, accent: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
      </defs>
      <rect width="800" height="1200" fill="url(#bg)" />
      <circle cx="640" cy="200" r="180" fill="rgba(255,255,255,0.12)" />
      <circle cx="180" cy="980" r="240" fill="rgba(255,255,255,0.08)" />
      <text
        x="72"
        y="1030"
        fill="white"
        font-family="Arial, sans-serif"
        font-size="72"
        font-weight="700"
      >
        ${label}
      </text>
    </svg>
  `)}`;

const wikiArticleDefinitions = [
  {
    accent: '#0ea5e9',
    extract:
      'Auroras are luminous atmospheric phenomena caused by charged particles colliding with gases in the upper atmosphere.',
    title: 'Aurora',
    url: 'https://en.wikipedia.org/wiki/Aurora',
  },
  {
    accent: '#14b8a6',
    extract:
      'Mangroves are salt-tolerant coastal forests that protect shorelines, shelter wildlife, and store significant amounts of carbon.',
    title: 'Mangrove',
    url: 'https://en.wikipedia.org/wiki/Mangrove',
  },
  {
    accent: '#f97316',
    extract:
      'A solar sail is a spacecraft propulsion method that uses radiation pressure from sunlight to accelerate a reflective sail.',
    title: 'Solar sail',
    url: 'https://en.wikipedia.org/wiki/Solar_sail',
  },
  {
    accent: '#8b5cf6',
    extract:
      'Bioluminescence is the production of light by living organisms through chemical reactions that release visible energy.',
    title: 'Bioluminescence',
    url: 'https://en.wikipedia.org/wiki/Bioluminescence',
  },
  {
    accent: '#ef4444',
    extract:
      'The Atacama Desert is one of the driest places on Earth and a valuable site for astronomy because of its clear skies.',
    title: 'Atacama Desert',
    url: 'https://en.wikipedia.org/wiki/Atacama_Desert',
  },
  {
    accent: '#22c55e',
    extract:
      'Vertical farming grows crops in stacked indoor systems with controlled light, temperature, and water usage.',
    title: 'Vertical farming',
    url: 'https://en.wikipedia.org/wiki/Vertical_farming',
  },
  {
    accent: '#06b6d4',
    extract:
      'Underwater archaeology studies submerged cultural heritage such as shipwrecks, harbors, and drowned settlements.',
    title: 'Underwater archaeology',
    url: 'https://en.wikipedia.org/wiki/Underwater_archaeology',
  },
  {
    accent: '#f59e0b',
    extract:
      'Cloud forests are moist mountain ecosystems shaped by persistent low-level cloud cover and rich biodiversity.',
    title: 'Cloud forest',
    url: 'https://en.wikipedia.org/wiki/Cloud_forest',
  },
  {
    accent: '#ec4899',
    extract:
      'Cyanotypes are photographic prints produced with iron salts, known for their distinct deep blue color.',
    title: 'Cyanotype',
    url: 'https://en.wikipedia.org/wiki/Cyanotype',
  },
  {
    accent: '#6366f1',
    extract:
      'Ocean thermal energy conversion generates power from the temperature difference between warm surface water and colder deep water.',
    title: 'Ocean thermal energy conversion',
    url: 'https://en.wikipedia.org/wiki/Ocean_thermal_energy_conversion',
  },
  {
    accent: '#10b981',
    extract:
      'Kintsugi is the Japanese practice of repairing broken pottery with lacquer mixed with powdered precious metals.',
    title: 'Kintsugi',
    url: 'https://en.wikipedia.org/wiki/Kintsugi',
  },
  {
    accent: '#fb7185',
    extract:
      'Night markets are open-air evening markets known for street food, small goods, and dense pedestrian energy.',
    title: 'Night market',
    url: 'https://en.wikipedia.org/wiki/Night_market',
  },
] satisfies Array<{
  accent: string;
  extract: string;
  title: string;
  url: string;
}>;

const wikiArticleCatalog: WikiArticle[] = wikiArticleDefinitions.map(
  ({ accent, extract, title, url }, index) => ({
    title,
    displaytitle: title,
    extract,
    pageid: 101 + index,
    url,
    thumbnail: {
      source: createThumbnail(title, accent),
      width: 800,
      height: 1200,
    },
  }),
);

export const mockWikiArticles = wikiArticleCatalog.slice(0, 3);

export const likedArticlesSeed = mockWikiArticles.slice(0, 2);

export const createWikipediaResponse = (requestUrl: string, requestCount = 0) => {
  const url = new URL(requestUrl);
  const variant = url.searchParams.get('variant') ?? 'en';
  const batchSize = 3;
  const batchStart = (requestCount * batchSize) % wikiArticleCatalog.length;
  const batch = Array.from({ length: batchSize }, (_, index) => {
    return wikiArticleCatalog[(batchStart + index) % wikiArticleCatalog.length];
  });

  return {
    batchcomplete: '',
    query: {
      pages: Object.fromEntries(
        batch.map((article) => [
          String(article.pageid),
          {
            pageid: article.pageid,
            title: article.title,
            extract: article.extract,
            thumbnail: article.thumbnail,
            canonicalurl: article.url,
            varianttitles: {
              [variant]: article.displaytitle,
            },
          },
        ]),
      ),
    },
  };
};
