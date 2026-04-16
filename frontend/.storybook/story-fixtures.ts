import type { WikiArticle } from '../src/components/WikiCard';
import type { ArticleProps } from '../src/types/ArticleProps';

export const wikiArticleBatches: WikiArticle[][] = [
  [
    createWikiArticle({
      title: 'Aurora Forest',
      displaytitle: 'Aurora Forest',
      extract:
        'Aurora Forest is a mock encyclopedia entry about a biome where the tree canopy glows at dusk.',
      pageid: 101,
      url: 'https://en.wikipedia.org/wiki/Aurora_Forest',
    }),
    createWikiArticle({
      title: 'Clockwork Tides',
      displaytitle: 'Clockwork Tides',
      extract:
        'Clockwork Tides describes a fictional shoreline whose mechanical reefs regulate dramatic daily tides.',
      pageid: 102,
      url: 'https://en.wikipedia.org/wiki/Clockwork_Tides',
    }),
    createWikiArticle({
      title: 'Solar Garden',
      displaytitle: 'Solar Garden',
      extract:
        'Solar Garden follows the history of a public conservatory built around mirrored heliostat sculptures.',
      pageid: 103,
      url: 'https://en.wikipedia.org/wiki/Solar_Garden',
    }),
  ],
  [
    createWikiArticle({
      title: 'Glass Archipelago',
      displaytitle: 'Glass Archipelago',
      extract:
        'Glass Archipelago covers an invented chain of islands known for translucent cliffs and ferry routes.',
      pageid: 201,
      url: 'https://en.wikipedia.org/wiki/Glass_Archipelago',
    }),
    createWikiArticle({
      title: 'Lantern Atlas',
      displaytitle: 'Lantern Atlas',
      extract:
        'Lantern Atlas chronicles a collaborative mapping project that lit remote trade paths with signal towers.',
      pageid: 202,
      url: 'https://en.wikipedia.org/wiki/Lantern_Atlas',
    }),
    createWikiArticle({
      title: 'Moonlit Gardens',
      displaytitle: 'Moonlit Gardens',
      extract:
        'Moonlit Gardens documents a collection of botanical terraces designed for nighttime pollinators.',
      pageid: 203,
      url: 'https://en.wikipedia.org/wiki/Moonlit_Gardens',
    }),
  ],
];

export const likedArticlesSeed: WikiArticle[] = [wikiArticleBatches[0][0]];

export const wikiCardStories = {
  default: wikiArticleBatches[0][1],
  liked: wikiArticleBatches[0][0],
  interactive: wikiArticleBatches[0][2],
} as const;

export const articleStories: ArticleProps[] = [
  {
    id: 'aurora-essay',
    title: 'Aurora Forest',
    content:
      'Aurora Forest collects concise encyclopedia-style entries and supports optional imagery for each article.',
  },
  {
    id: 'glass-essay',
    title: 'Glass Archipelago',
    content:
      'Glass Archipelago demonstrates the list view with longer descriptive text and a clear article title.',
    image: '/wiki-logo.svg',
  },
  {
    id: 'moonlit-essay',
    title: 'Moonlit Gardens',
    content:
      'Moonlit Gardens adds a little more body copy so we can confirm the content area remains readable in longer states.',
  },
];

function createWikiArticle({
  title,
  displaytitle,
  extract,
  pageid,
  url,
}: {
  title: string;
  displaytitle: string;
  extract: string;
  pageid: number;
  url: string;
}): WikiArticle {
  return {
    title,
    displaytitle,
    extract,
    pageid,
    url,
    thumbnail: {
      source: '/wiki-logo.svg',
      width: 800,
      height: 800,
    },
  };
}
