import type { WikiArticle } from '../components/WikiCard';

const baseArticles = [
  {
    pageid: 101,
    title: 'Aurora',
    extract:
      'Auroras are natural light displays caused by charged particles interacting with the upper atmosphere.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Aurora',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 512,
      height: 512,
    },
  },
  {
    pageid: 102,
    title: 'Volcano',
    extract:
      'Volcanoes form where magma reaches the surface and can build mountains, islands, and fertile plains.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Volcano',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 512,
      height: 512,
    },
  },
  {
    pageid: 103,
    title: 'Mangrove',
    extract:
      'Mangroves are salt-tolerant coastal forests that stabilize shorelines and support diverse ecosystems.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Mangrove',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 512,
      height: 512,
    },
  },
] as const;

const localizedNames: Record<string, string[]> = {
  en: ['Aurora', 'Volcano', 'Mangrove'],
  es: ['Aurora', 'Volcan', 'Manglar'],
  fr: ['Aurore', 'Volcan', 'Mangrove'],
  ja: ['オーロラ', '火山', 'マングローブ'],
};

export function createMockWikiArticles(variant = 'en'): WikiArticle[] {
  const labels = localizedNames[variant] ?? localizedNames.en;

  return baseArticles.map((article, index) => ({
    title: article.title,
    displaytitle: labels[index] ?? article.title,
    extract: article.extract,
    pageid: article.pageid,
    thumbnail: article.thumbnail,
    url: article.canonicalurl,
  }));
}

export function buildWikipediaQueryResponse({
  language,
  variant,
  requestIndex = 0,
}: {
  language: string;
  variant: string;
  requestIndex?: number;
}) {
  const normalizedVariant = localizedNames[variant] ? variant : language;
  const articles = createMockWikiArticles(normalizedVariant);

  return {
    batchcomplete: '',
    query: {
      pages: Object.fromEntries(
        articles.map((article) => [
          String(article.pageid + requestIndex * 1000),
          {
            pageid: article.pageid + requestIndex * 1000,
            title: article.title,
            extract: article.extract,
            canonicalurl: article.url.replace('en.wikipedia.org', `${language}.wikipedia.org`),
            thumbnail: article.thumbnail,
            varianttitles: {
              [variant]: article.displaytitle,
              [normalizedVariant]: article.displaytitle,
            },
          },
        ]),
      ),
    },
  };
}
