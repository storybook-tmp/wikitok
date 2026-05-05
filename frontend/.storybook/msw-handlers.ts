import { http, HttpResponse } from 'msw';

const mockArticles = {
  query: {
    pages: {
      '12345': {
        title: 'Example Article',
        varianttitles: { en: 'Example Article' },
        extract: 'This is a fascinating article about something interesting. It contains multiple sentences to simulate a real Wikipedia article extract.',
        pageid: 12345,
        thumbnail: {
          source: 'https://via.placeholder.com/800x600',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Example_Article',
      },
      '67890': {
        title: 'Second Article',
        varianttitles: { en: 'Second Article' },
        extract: 'Another interesting article with plenty of content to display in the card format.',
        pageid: 67890,
        thumbnail: {
          source: 'https://via.placeholder.com/800x600',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Second_Article',
      },
      '11111': {
        title: 'Third Article',
        varianttitles: { en: 'Third Article' },
        extract: 'A third article demonstrating the variety of content available on Wikipedia.',
        pageid: 11111,
        thumbnail: {
          source: 'https://via.placeholder.com/800x600',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Third_Article',
      },
    },
  },
};

export const mswHandlers = [
  http.get('https://en.wikipedia.org/w/api.php', () =>
    HttpResponse.json(mockArticles)
  ),
  http.get('https://*.wikipedia.org/w/api.php', () =>
    HttpResponse.json(mockArticles)
  ),
];
