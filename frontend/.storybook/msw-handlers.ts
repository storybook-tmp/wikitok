import { http, HttpResponse } from 'msw';

const thumbnail = '/wiki-logo.svg';

export const mswHandlers = {
  wikipedia: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json({
        query: {
          pages: {
            '1001': {
              pageid: 1001,
              title: 'Ada Lovelace',
              varianttitles: { en: 'Ada Lovelace' },
              extract:
                'Ada Lovelace was an English mathematician and writer known for her work on the Analytical Engine.',
              canonicalurl: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
              thumbnail: {
                source: thumbnail,
                width: 800,
                height: 800,
              },
            },
            '1002': {
              pageid: 1002,
              title: 'Grace Hopper',
              varianttitles: { en: 'Grace Hopper' },
              extract:
                'Grace Hopper was a computer scientist and United States Navy officer who helped develop early programming languages.',
              canonicalurl: 'https://en.wikipedia.org/wiki/Grace_Hopper',
              thumbnail: {
                source: thumbnail,
                width: 800,
                height: 800,
              },
            },
          },
        },
      })
    ),
  ],
};
