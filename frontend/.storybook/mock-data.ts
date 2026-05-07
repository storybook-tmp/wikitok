import type { WikiArticle } from '../src/components/WikiCard';

export const likedArticle: WikiArticle = {
  title: 'Ada Lovelace',
  displaytitle: 'Ada Lovelace',
  extract:
    "Ada Lovelace was an English mathematician and writer known for her work on Charles Babbage's Analytical Engine.",
  pageid: 9001,
  url: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
  thumbnail: {
    source: '/wiki-logo.svg',
    width: 512,
    height: 512,
  },
};

export const alanTuringArticle: WikiArticle = {
  title: 'Alan Turing',
  displaytitle: 'Alan Turing',
  extract:
    'Alan Turing was a mathematician and computer scientist whose work shaped modern computing.',
  pageid: 9002,
  url: 'https://en.wikipedia.org/wiki/Alan_Turing',
  thumbnail: {
    source: '/wiki-logo.svg',
    width: 512,
    height: 512,
  },
};

export const graceHopperArticle: WikiArticle = {
  title: 'Grace Hopper',
  displaytitle: 'Grace Hopper',
  extract:
    'Grace Hopper was a computer scientist and naval officer who helped develop early programming languages.',
  pageid: 9003,
  url: 'https://en.wikipedia.org/wiki/Grace_Hopper',
  thumbnail: {
    source: '/wiki-logo.svg',
    width: 512,
    height: 512,
  },
};

export const wikipediaFeedArticles = [
  likedArticle,
  alanTuringArticle,
  graceHopperArticle,
];

export const articleListItems = [
  {
    id: 'storybook-runtime',
    title: 'Storybook Runtime',
    content:
      'Storybook renders components in isolation while preserving the providers and styles they need.',
    image: '/wiki-logo.svg',
  },
  {
    id: 'browser-testing',
    title: 'Browser Testing',
    content:
      'Interaction tests verify the component state in the same browser environment used by stories.',
    image: '/wiki-logo.svg',
  },
];
