import { http, HttpResponse } from 'msw';

const wikiResponse = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Example Article',
        varianttitles: { en: 'Example Article' },
        extract: 'This is an example Wikipedia article about something interesting. It contains several sentences of content for testing purposes.',
        canonicalurl: 'https://en.wikipedia.org/wiki/Example_Article',
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/800px-Camponotus_flavomarginatus_ant.jpg',
          width: 800,
          height: 600,
        },
      },
      '67890': {
        pageid: 67890,
        title: 'Another Article',
        varianttitles: { en: 'Another Article' },
        extract: 'Another fascinating article from Wikipedia with interesting facts and useful information for readers.',
        canonicalurl: 'https://en.wikipedia.org/wiki/Another_Article',
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
          width: 800,
          height: 533,
        },
      },
    },
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json(wikiResponse)
    ),
    http.get('https://*.wikipedia.org/w/api.php', () =>
      HttpResponse.json(wikiResponse)
    ),
  ],
};
