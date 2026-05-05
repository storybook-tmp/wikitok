import { http, HttpResponse } from 'msw';

const mockWikiResponse = {
  query: {
    pages: {
      '12345': {
        title: 'Mount Everest',
        varianttitles: { en: 'Mount Everest' },
        extract:
          'Mount Everest is the highest mountain in the world, located in the Himalayas on the border between Nepal and Tibet. It stands at 8,849 metres above sea level.',
        pageid: 12345,
        thumbnail: {
          source: 'https://placehold.co/800x600/222/white?text=Mount+Everest',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Mount_Everest',
      },
      '67890': {
        title: 'Ada Lovelace',
        varianttitles: { en: 'Ada Lovelace' },
        extract:
          'Augusta Ada King, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage\'s proposed mechanical general-purpose computer, the Analytical Engine.',
        pageid: 67890,
        thumbnail: {
          source: 'https://placehold.co/800x600/333/white?text=Ada+Lovelace',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
      },
      '11111': {
        title: 'Aurora Borealis',
        varianttitles: { en: 'Aurora Borealis' },
        extract:
          'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
        pageid: 11111,
        thumbnail: {
          source: 'https://placehold.co/800x600/114/white?text=Aurora+Borealis',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora',
      },
    },
  },
};

export const mswHandlers = {
  wiki: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json(mockWikiResponse)
    ),
    // Handle all other language Wikipedia APIs
    http.get('https://*.wikipedia.org/w/api.php', () =>
      HttpResponse.json(mockWikiResponse)
    ),
  ],
};
