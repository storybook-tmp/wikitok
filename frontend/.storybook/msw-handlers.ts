import { http, HttpResponse } from 'msw';

const wikiArticles = {
  query: {
    pages: {
      '12345': {
        title: 'Aurora Borealis',
        varianttitles: { en: 'Aurora Borealis' },
        extract: 'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
        pageid: 12345,
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Aurora_borealis.jpg/800px-Aurora_borealis.jpg',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
      },
      '67890': {
        title: 'Great Barrier Reef',
        varianttitles: { en: 'Great Barrier Reef' },
        extract: 'The Great Barrier Reef is the world\'s largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometres.',
        pageid: 67890,
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Reef.jpg/800px-Reef.jpg',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Great_Barrier_Reef',
      },
      '11111': {
        title: 'Space Exploration',
        varianttitles: { en: 'Space Exploration' },
        extract: 'Space exploration is the use of astronomy and space technology to explore outer space. Physical exploration of space is conducted both by human spaceflights and by robotic spacecraft.',
        pageid: 11111,
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Space.jpg/800px-Space.jpg',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Space_exploration',
      },
    },
  },
};

export const mswHandlers = [
  http.get('https://en.wikipedia.org/w/api.php', () =>
    HttpResponse.json(wikiArticles)
  ),
  http.get('https://*.wikipedia.org/w/api.php', () =>
    HttpResponse.json(wikiArticles)
  ),
];
