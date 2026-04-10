import type { WikiArticle } from '../src/components/WikiCard';

export const featuredWikiArticle = createWikiArticle({
  displaytitle: 'Aurora over the Archive',
  extract:
    'A restored observatory now doubles as a public reading room with rotating exhibits on Arctic light.',
  pageid: 101,
  title: 'Aurora over the Archive',
  url: 'https://en.wikipedia.org/wiki/Aurora_over_the_Archive',
});

export const likedWikiArticle = createWikiArticle({
  displaytitle: 'Lanterns of Kyoto',
  extract:
    'A neighborhood tradition of paper lantern festivals inspired a wave of preservation work across the city.',
  pageid: 102,
  title: 'Lanterns of Kyoto',
  url: 'https://en.wikipedia.org/wiki/Lanterns_of_Kyoto',
});

export const interactiveWikiArticle = createWikiArticle({
  displaytitle: 'Volcanic Glass',
  extract:
    'Volcanic glass forms when lava cools so quickly that crystals do not have time to grow into place.',
  pageid: 103,
  title: 'Volcanic Glass',
  url: 'https://en.wikipedia.org/wiki/Volcanic_Glass',
});

export const flywayWikiArticle = createWikiArticle({
  displaytitle: 'Pacific Flyway',
  extract:
    'The Pacific Flyway links coastal wetlands and inland marshes that migratory birds revisit every year.',
  pageid: 104,
  title: 'Pacific Flyway',
  url: 'https://en.wikipedia.org/wiki/Pacific_Flyway',
});

export const forestWikiArticle = createWikiArticle({
  displaytitle: 'Cedar Forest Trails',
  extract:
    'Cedar Forest Trails is a trail network known for mossy boardwalks, quiet overlooks, and dense evergreen canopies.',
  pageid: 105,
  title: 'Cedar Forest Trails',
  url: 'https://en.wikipedia.org/wiki/Cedar_Forest_Trails',
});

export const observatoryWikiArticle = createWikiArticle({
  displaytitle: 'Observatory Nights',
  extract:
    'Observatory Nights became a regional event series after local astronomers opened their telescope domes to visitors.',
  pageid: 106,
  title: 'Observatory Nights',
  url: 'https://en.wikipedia.org/wiki/Observatory_Nights',
});

export const deltaWikiArticle = createWikiArticle({
  displaytitle: 'River Delta Markets',
  extract:
    'River Delta Markets document the trade routes that shaped seasonal commerce along the estuary.',
  pageid: 107,
  title: 'River Delta Markets',
  url: 'https://en.wikipedia.org/wiki/River_Delta_Markets',
});

export const seededLikedArticles = [likedWikiArticle, forestWikiArticle];

export const mockWikiArticles = [
  featuredWikiArticle,
  likedWikiArticle,
  interactiveWikiArticle,
  flywayWikiArticle,
  forestWikiArticle,
  observatoryWikiArticle,
  deltaWikiArticle,
];

export function resetMockWikipediaState() {
  wikiBatchIndex = 0;
}

export function createWikipediaResponse(languageId: string) {
  const batch = getNextBatch();

  return {
    batchcomplete: true,
    query: {
      pages: Object.fromEntries(
        batch.map((article) => [String(article.pageid), toWikipediaPage(article, languageId)]),
      ),
    },
  };
}

let wikiBatchIndex = 0;

function getNextBatch() {
  const startIndex = (wikiBatchIndex * 3) % mockWikiArticles.length;
  wikiBatchIndex += 1;

  return Array.from({ length: 3 }, (_, index) => {
    return mockWikiArticles[(startIndex + index) % mockWikiArticles.length];
  });
}

function createWikiArticle(article: Partial<WikiArticle> & Pick<WikiArticle, 'displaytitle' | 'extract' | 'pageid' | 'title' | 'url'>): WikiArticle {
  return {
    thumbnail: {
      height: 512,
      source: '/wiki-logo.svg',
      width: 512,
    },
    ...article,
  };
}

function toWikipediaPage(article: WikiArticle, languageId: string) {
  return {
    canonicalurl: article.url,
    extract: article.extract,
    pageid: article.pageid,
    thumbnail: article.thumbnail,
    title: article.title,
    varianttitles: {
      [languageId]: article.displaytitle,
    },
  };
}
