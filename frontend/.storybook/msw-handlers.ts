import { http, HttpResponse } from 'msw';

const wikiApiResponse = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Example Article',
        varianttitles: { en: 'Example Article' },
        extract: 'This is an example Wikipedia article used for testing purposes. It contains some interesting information about a fictional topic.',
        thumbnail: {
          source: 'https://via.placeholder.com/800x600',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Example_Article',
      },
      '67890': {
        pageid: 67890,
        title: 'Another Article',
        varianttitles: { en: 'Another Article' },
        extract: 'Another fascinating article about a different topic. This one covers various aspects of science and technology.',
        thumbnail: {
          source: 'https://via.placeholder.com/800x600',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Another_Article',
      },
    },
  },
};

export const mswHandlers = {
  wiki: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json(wikiApiResponse)
    ),
    http.get('https://*.wikipedia.org/w/api.php', () =>
      HttpResponse.json(wikiApiResponse)
    ),
  ],
};
