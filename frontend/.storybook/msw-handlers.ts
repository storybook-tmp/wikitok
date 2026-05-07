import { http, HttpResponse } from 'msw';

const thumbnail =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22%3E%3Crect width=%2216%22 height=%2216%22 fill=%22black%22/%3E%3C/svg%3E';

const wikiPages = {
  101: {
    pageid: 101,
    title: 'Storybook',
    varianttitles: { en: 'Storybook' },
    extract:
      'Storybook is a frontend workshop for building UI components and pages in isolation.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Storybook',
    thumbnail: {
      source: thumbnail,
      width: 800,
      height: 800,
    },
  },
  102: {
    pageid: 102,
    title: 'Wikipedia',
    varianttitles: { en: 'Wikipedia' },
    extract:
      'Wikipedia is a free online encyclopedia written and maintained by a community of volunteers.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Wikipedia',
    thumbnail: {
      source: thumbnail,
      width: 192,
      height: 192,
    },
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json({
        query: {
          pages: wikiPages,
        },
      })
    ),
  ],
};
