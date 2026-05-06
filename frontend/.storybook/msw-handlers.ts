import { http, HttpResponse } from 'msw';

const wikiApiResponse = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Aurora Borealis',
        varianttitles: { en: 'Aurora Borealis' },
        extract:
          'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
        thumbnail: {
          source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Aurora+Borealis',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
      },
      '67890': {
        pageid: 67890,
        title: 'Deep Sea Creatures',
        varianttitles: { en: 'Deep Sea Creatures' },
        extract:
          'Deep-sea creatures are organisms that live below the photic zone of the ocean. These creatures must survive in extremely harsh conditions, such as hundreds of bars of pressure, small amounts of oxygen, very little food, no sunlight, and constant extreme cold.',
        thumbnail: {
          source: 'https://placehold.co/800x600/0d1b2a/ffffff?text=Deep+Sea',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Deep-sea_creature',
      },
      '11111': {
        pageid: 11111,
        title: 'Fibonacci Number',
        varianttitles: { en: 'Fibonacci Number' },
        extract:
          'In mathematics, the Fibonacci sequence is a sequence in which each number is the sum of the two preceding ones. Numbers that are part of the Fibonacci sequence are known as Fibonacci numbers.',
        thumbnail: {
          source: 'https://placehold.co/800x600/2d3436/ffffff?text=Fibonacci',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Fibonacci_number',
      },
    },
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json(wikiApiResponse)
    ),
    http.get('https://*.wikipedia.org/w/api.php', () =>
      HttpResponse.json(wikiApiResponse)
    ),
  ],
};
