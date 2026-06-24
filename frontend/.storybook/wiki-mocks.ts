import type { WikiArticle } from '../src/components/WikiCard';

export const mockFeedArticles: WikiArticle[] = [
  {
    title: 'Solar sail',
    displaytitle: 'Solar sail',
    extract:
      'Solar sails use radiation pressure from sunlight to propel spacecraft without burning fuel.',
    pageid: 101,
    url: 'https://en.wikipedia.org/wiki/Solar_sail',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 512,
      height: 512,
    },
  },
  {
    title: 'Kelp forest',
    displaytitle: 'Kelp forest',
    extract:
      'Kelp forests are underwater areas with dense kelp growth that support diverse marine ecosystems.',
    pageid: 102,
    url: 'https://en.wikipedia.org/wiki/Kelp_forest',
    thumbnail: {
      source: '/favicon.svg',
      width: 512,
      height: 512,
    },
  },
  {
    title: 'Low Earth orbit',
    displaytitle: 'Low Earth orbit',
    extract:
      'Low Earth orbit is the region of space up to about 2,000 kilometers above Earth’s surface.',
    pageid: 103,
    url: 'https://en.wikipedia.org/wiki/Low_Earth_orbit',
    thumbnail: {
      source: '/apple-touch-icon.png',
      width: 180,
      height: 180,
    },
  },
  {
    title: 'Bioluminescence',
    displaytitle: 'Bioluminescence',
    extract:
      'Bioluminescence is the production of light by living organisms through chemical reactions.',
    pageid: 104,
    url: 'https://en.wikipedia.org/wiki/Bioluminescence',
    thumbnail: {
      source: '/web-app-manifest-192x192.png',
      width: 192,
      height: 192,
    },
  },
];

export const mockLikedArticles = [mockFeedArticles[2]];

export function buildMockWikipediaResponse(requestUrl: string, requestCount: number) {
  const url = new URL(requestUrl);
  const variantId = url.searchParams.get('variant') ?? 'en';
  const batch = mockArticleBatches[requestCount] ?? mockArticleBatches.at(-1)!;

  return {
    batchcomplete: true,
    query: {
      pages: Object.fromEntries(
        batch.map((article) => [
          String(article.pageid),
          {
            title: article.title,
            varianttitles: {
              [variantId]: article.displaytitle,
            },
            extract: article.extract,
            pageid: article.pageid,
            thumbnail: article.thumbnail,
            canonicalurl: article.url,
          },
        ]),
      ),
    },
  };
}

const mockArticleBatches = [
  [mockFeedArticles[0], mockFeedArticles[1]],
  [mockFeedArticles[2], mockFeedArticles[3]],
];
