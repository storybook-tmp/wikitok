import { http, HttpResponse } from 'msw';

const mockArticles = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Mount Everest',
        varianttitles: { en: 'Mount Everest' },
        extract:
          'Mount Everest is the highest mountain in the world, located in the Mahalangur Himal sub-range of the Himalayas. The China-Nepal border runs across its summit point.',
        thumbnail: {
          source: 'https://placehold.co/800x600/333/white?text=Mount+Everest',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Mount_Everest',
      },
      '67890': {
        pageid: 67890,
        title: 'Ada Lovelace',
        varianttitles: { en: 'Ada Lovelace' },
        extract:
          'Augusta Ada King, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage\'s proposed mechanical general-purpose computer.',
        thumbnail: {
          source: 'https://placehold.co/800x600/333/white?text=Ada+Lovelace',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
      },
      '11111': {
        pageid: 11111,
        title: 'Jazz',
        varianttitles: { en: 'Jazz' },
        extract:
          'Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana in the late 19th and early 20th centuries.',
        thumbnail: {
          source: 'https://placehold.co/800x600/333/white?text=Jazz',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Jazz',
      },
    },
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json(mockArticles)
    ),
    http.get('https://*.wikipedia.org/w/api.php', () =>
      HttpResponse.json(mockArticles)
    ),
  ],
};
