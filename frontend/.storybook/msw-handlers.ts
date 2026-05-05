import { http, HttpResponse } from 'msw';

const mockWikiResponse = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Mock Article One',
        varianttitles: { en: 'Mock Article One' },
        extract: 'This is a mock Wikipedia article about a fascinating topic. It contains several sentences of interesting content that would normally come from the Wikipedia API.',
        thumbnail: {
          source: 'https://picsum.photos/seed/wiki1/800/600',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Mock_Article_One',
      },
      '67890': {
        pageid: 67890,
        title: 'Mock Article Two',
        varianttitles: { en: 'Mock Article Two' },
        extract: 'Another interesting Wikipedia article with plenty of content to display. This mock data simulates what the Wikipedia API would return for random articles.',
        thumbnail: {
          source: 'https://picsum.photos/seed/wiki2/800/600',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Mock_Article_Two',
      },
      '11111': {
        pageid: 11111,
        title: 'Mock Article Three',
        varianttitles: { en: 'Mock Article Three' },
        extract: 'A third mock article providing diverse content for the WikiTok feed. Wikipedia has millions of articles covering every topic imaginable.',
        thumbnail: {
          source: 'https://picsum.photos/seed/wiki3/800/600',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Mock_Article_Three',
      },
    },
  },
};

export const mswHandlers = [
  http.get('https://*.wikipedia.org/w/api.php', () => {
    return HttpResponse.json(mockWikiResponse);
  }),
];
