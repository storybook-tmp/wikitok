import type { WikiArticle } from '../src/components/WikiCard';

export const mockWikiArticles: WikiArticle[] = [
  {
    title: 'Aurora Forest',
    displaytitle: 'Aurora Forest',
    extract:
      'Aurora Forest is a fictional protected woodland known for bright winter skies and old-growth pine canopies.',
    pageid: 101,
    url: 'https://en.wikipedia.org/wiki/Aurora_Forest',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 800,
      height: 800,
    },
  },
  {
    title: 'City After Rain',
    displaytitle: 'City After Rain',
    extract:
      'City After Rain describes a dense urban district whose public squares, transit routes, and night lighting became widely photographed.',
    pageid: 102,
    url: 'https://en.wikipedia.org/wiki/City_After_Rain',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 800,
      height: 800,
    },
  },
  {
    title: 'Orbital Garden',
    displaytitle: 'Orbital Garden',
    extract:
      'Orbital Garden is a conceptual greenhouse project that studies compact agriculture systems for long-duration space travel.',
    pageid: 103,
    url: 'https://en.wikipedia.org/wiki/Orbital_Garden',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 800,
      height: 800,
    },
  },
  {
    title: 'Desert Library',
    displaytitle: 'Desert Library',
    extract:
      'Desert Library is a fictional archive built into sandstone cliffs, collecting migration stories and oral histories from the surrounding region.',
    pageid: 104,
    url: 'https://en.wikipedia.org/wiki/Desert_Library',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 800,
      height: 800,
    },
  },
  {
    title: 'Night Market Atlas',
    displaytitle: 'Night Market Atlas',
    extract:
      'Night Market Atlas catalogs food stalls, neon signage, and trading traditions across a network of coastal marketplaces.',
    pageid: 105,
    url: 'https://en.wikipedia.org/wiki/Night_Market_Atlas',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 800,
      height: 800,
    },
  },
  {
    title: 'Glacier Echo',
    displaytitle: 'Glacier Echo',
    extract:
      'Glacier Echo is a documentary-style article about acoustic measurements taken beneath a rapidly shifting polar ice shelf.',
    pageid: 106,
    url: 'https://en.wikipedia.org/wiki/Glacier_Echo',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 800,
      height: 800,
    },
  },
];

export const mockLikedArticles = [mockWikiArticles[2], mockWikiArticles[5]];

export const placeholderFlagSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <rect width="24" height="24" rx="12" fill="#1f2937" />
  <path d="M6 8h12L15 12l3 4H6z" fill="#f9fafb" />
</svg>
`.trim();

export function createWikipediaResponse(variant: string, pageIdOffset = 0) {
  const pages = Object.fromEntries(
    mockWikiArticles.map((article) => [
      String(article.pageid + pageIdOffset),
      {
        title: article.title,
        pageid: article.pageid + pageIdOffset,
        extract: article.extract,
        thumbnail: article.thumbnail,
        canonicalurl: article.url,
        varianttitles: {
          [variant]: article.displaytitle,
        },
      },
    ]),
  );

  return {
    batchcomplete: true,
    query: {
      pages,
    },
  };
}
