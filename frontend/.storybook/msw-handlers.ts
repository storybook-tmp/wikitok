import { http, HttpResponse } from 'msw';

const mockWikiResponse = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Theory of relativity',
        varianttitles: {
          en: 'Theory of relativity',
        },
        extract:
          'The theory of relativity usually encompasses two interrelated physics theories by Albert Einstein: special relativity and general relativity, proposed and published in 1905 and 1915, respectively.',
        thumbnail: {
          source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Relativity',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Theory_of_relativity',
      },
      '67890': {
        pageid: 67890,
        title: 'Great Wall of China',
        varianttitles: {
          en: 'Great Wall of China',
        },
        extract:
          'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups from the Eurasian Steppe.',
        thumbnail: {
          source: 'https://placehold.co/800x600/2d2d44/ffffff?text=Great+Wall',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Great_Wall_of_China',
      },
      '11111': {
        pageid: 11111,
        title: 'Aurora borealis',
        varianttitles: {
          en: 'Aurora borealis',
        },
        extract:
          'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions around the Arctic and Antarctic.',
        thumbnail: {
          source: 'https://placehold.co/800x600/0d1b2a/ffffff?text=Aurora',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
      },
    },
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get('https://en.wikipedia.org/w/api.php', () => {
      return HttpResponse.json(mockWikiResponse);
    }),
    // Catch all other language Wikipedia APIs
    http.get('https://*.wikipedia.org/w/api.php', () => {
      return HttpResponse.json(mockWikiResponse);
    }),
  ],
};
