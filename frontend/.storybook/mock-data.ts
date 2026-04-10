import type { WikiArticle } from '../src/components/WikiCard';
import type { ArticleProps } from '../src/types/ArticleProps';

export const seededLanguageId = 'en';

export const seededLikedArticles: WikiArticle[] = [
  createWikiArticle({
    pageid: 9001,
    title: 'Aurora Forest',
    displaytitle: 'Aurora Forest',
    extract:
      'Aurora Forest is a mock encyclopedia entry about a pine valley known for mirror-still lakes, long winter light, and community observatories built on the tree line.',
    url: 'https://en.wikipedia.org/wiki/Aurora_Forest',
    thumbnail: '/wiki-logo.svg',
  }),
  createWikiArticle({
    pageid: 9002,
    title: 'Ocean Current Clock',
    displaytitle: 'Ocean Current Clock',
    extract:
      'Ocean Current Clock is a mock encyclopedia entry describing an experimental harbor sculpture that visualizes tides, currents, and wind with layered mechanical rings.',
    url: 'https://en.wikipedia.org/wiki/Ocean_Current_Clock',
    thumbnail: '/favicon-96x96.png',
  }),
];

export const storyWikiArticles: WikiArticle[] = [
  createWikiArticle({
    pageid: 101,
    title: 'Midnight Sun Archive',
    displaytitle: 'Midnight Sun Archive',
    extract:
      'Midnight Sun Archive is a mock encyclopedia entry about a northern museum that preserves diaries, maps, and weather sketches from polar expeditions.',
    url: 'https://en.wikipedia.org/wiki/Midnight_Sun_Archive',
    thumbnail: '/wiki-logo.svg',
  }),
  createWikiArticle({
    pageid: 102,
    title: 'Basalt Garden',
    displaytitle: 'Basalt Garden',
    extract:
      'Basalt Garden is a mock encyclopedia entry describing a volcanic park with geometric stone columns, reflective pools, and a hillside tramway.',
    url: 'https://en.wikipedia.org/wiki/Basalt_Garden',
    thumbnail: '/favicon-96x96.png',
  }),
  createWikiArticle({
    pageid: 103,
    title: 'Glass Signal Tower',
    displaytitle: 'Glass Signal Tower',
    extract:
      'Glass Signal Tower is a mock encyclopedia entry about a coastal landmark that once coordinated ships with mirrored shutters and colored beacons.',
    url: 'https://en.wikipedia.org/wiki/Glass_Signal_Tower',
    thumbnail: '/favicon-96x96.png',
  }),
  createWikiArticle({
    pageid: 104,
    title: 'River Tram',
    displaytitle: 'River Tram',
    extract:
      'River Tram is a mock encyclopedia entry about a suspended transit line that follows an urban canal and links markets, studios, and ferry docks.',
    url: 'https://en.wikipedia.org/wiki/River_Tram',
    thumbnail: '/wiki-logo.svg',
  }),
  createWikiArticle({
    pageid: 105,
    title: 'Lantern District',
    displaytitle: 'Lantern District',
    extract:
      'Lantern District is a mock encyclopedia entry covering a neighborhood where workshops, tea houses, and alleys are illuminated by hand-painted lights.',
    url: 'https://en.wikipedia.org/wiki/Lantern_District',
    thumbnail: '/favicon-96x96.png',
  }),
  createWikiArticle({
    pageid: 106,
    title: 'Cloud Stair',
    displaytitle: 'Cloud Stair',
    extract:
      'Cloud Stair is a mock encyclopedia entry about a mountainside route built from terraces, switchbacks, and lookout bridges that rise into seasonal mist.',
    url: 'https://en.wikipedia.org/wiki/Cloud_Stair',
    thumbnail: '/favicon-96x96.png',
  }),
];

export const articleStoryEntries: ArticleProps[] = storyWikiArticles.slice(0, 3).map((article) => ({
  id: article.pageid,
  title: article.displaytitle,
  content: article.extract,
  image: article.thumbnail.source,
}));

export const longExtractArticle: WikiArticle = createWikiArticle({
  pageid: 107,
  title: 'Tidal Observatory',
  displaytitle: 'Tidal Observatory',
  extract:
    'Tidal Observatory is a mock encyclopedia entry about a research station built where a river delta meets the sea. The observatory combines public walkways, classrooms, and instrument towers so visitors can watch data collection in real time while learning how the coastline changes through the seasons. Its open archive is known for pairing scientific notes with hand-drawn charts, oral histories, and photography from neighboring fishing communities.',
  url: 'https://en.wikipedia.org/wiki/Tidal_Observatory',
  thumbnail: '/wiki-logo.svg',
});

function createWikiArticle({
  pageid,
  title,
  displaytitle,
  extract,
  url,
  thumbnail,
}: {
  pageid: number;
  title: string;
  displaytitle: string;
  extract: string;
  url: string;
  thumbnail: string;
}): WikiArticle {
  return {
    pageid,
    title,
    displaytitle,
    extract,
    url,
    thumbnail: {
      source: thumbnail,
      width: 800,
      height: 1200,
    },
  };
}
