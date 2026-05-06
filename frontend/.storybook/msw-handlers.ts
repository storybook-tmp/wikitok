import { http, HttpResponse } from 'msw';

const wikiResponse = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Example Article',
        varianttitles: { en: 'Example Article' },
        extract:
          'This is an example Wikipedia article used for testing. It contains enough text to simulate a real article extract that would appear in the WikiTok feed.',
        canonicalurl: 'https://en.wikipedia.org/wiki/Example_Article',
        thumbnail: {
          source: 'https://via.placeholder.com/800x600',
          width: 800,
          height: 600,
        },
      },
      '67890': {
        pageid: 67890,
        title: 'Second Article',
        varianttitles: { en: 'Second Article' },
        extract:
          'A second article for testing purposes. This demonstrates that the feed can display multiple articles in succession.',
        canonicalurl: 'https://en.wikipedia.org/wiki/Second_Article',
        thumbnail: {
          source: 'https://via.placeholder.com/800x600',
          width: 800,
          height: 600,
        },
      },
    },
  },
};

export const mswHandlers = {
  wiki: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json(wikiResponse)
    ),
  ],
};
