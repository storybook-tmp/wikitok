import type { WikiArticle } from '../src/components/WikiCard';

export const mockWikiArticles: WikiArticle[] = [
  {
    title: 'Ada Lovelace',
    displaytitle: 'Ada Lovelace',
    extract:
      'Ada Lovelace was an English mathematician and writer chiefly known for her work on the Analytical Engine.',
    pageid: 101,
    url: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 800,
      height: 800,
    },
  },
  {
    title: 'Analytical Engine',
    displaytitle: 'Analytical Engine',
    extract:
      'The Analytical Engine was a proposed mechanical general-purpose computer designed by Charles Babbage.',
    pageid: 102,
    url: 'https://en.wikipedia.org/wiki/Analytical_Engine',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 800,
      height: 800,
    },
  },
  {
    title: 'Computing Machinery',
    displaytitle: 'Computing Machinery',
    extract:
      'Computing machinery includes devices and systems designed to process information using repeatable instructions.',
    pageid: 103,
    url: 'https://en.wikipedia.org/wiki/Computing',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 800,
      height: 800,
    },
  },
];

export const savedLikedArticles: WikiArticle[] = [
  {
    title: 'Grace Hopper',
    displaytitle: 'Grace Hopper',
    extract:
      'Grace Hopper was an American computer scientist and naval officer who helped popularize machine-independent programming languages.',
    pageid: 9001,
    url: 'https://en.wikipedia.org/wiki/Grace_Hopper',
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 800,
      height: 800,
    },
  },
];

