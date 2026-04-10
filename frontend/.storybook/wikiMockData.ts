import type { WikiArticle } from '../src/components/WikiCard';

export const mockWikiArticles: WikiArticle[] = [
  {
    title: 'Aurora',
    displaytitle: 'Aurora',
    extract:
      'Auroras are luminous atmospheric displays caused by charged particles colliding with gases in the upper atmosphere.',
    pageid: 1001,
    url: 'https://en.wikipedia.org/wiki/Aurora',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 800,
      height: 800,
    },
  },
  {
    title: 'Voyager 1',
    displaytitle: 'Voyager 1',
    extract:
      'Voyager 1 is a space probe launched by NASA in 1977 to study the outer Solar System and interstellar space.',
    pageid: 1002,
    url: 'https://en.wikipedia.org/wiki/Voyager_1',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 800,
      height: 800,
    },
  },
  {
    title: 'Library of Alexandria',
    displaytitle: 'Library of Alexandria',
    extract:
      'The Library of Alexandria was one of the largest and most significant libraries of the ancient world.',
    pageid: 1003,
    url: 'https://en.wikipedia.org/wiki/Library_of_Alexandria',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 800,
      height: 800,
    },
  },
];

export function createWikipediaResponse(languageId: string, requestNumber = 0) {
  return {
    batchcomplete: '',
    query: {
      pages: Object.fromEntries(
        mockWikiArticles.map((article) => [
          (article.pageid + requestNumber * 1000).toString(),
          {
            pageid: article.pageid + requestNumber * 1000,
            title: article.title,
            extract: article.extract,
            canonicalurl: article.url,
            thumbnail: article.thumbnail,
            varianttitles: {
              [languageId]: article.displaytitle,
            },
          },
        ]),
      ),
    },
  };
}
