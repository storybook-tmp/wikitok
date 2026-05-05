import { http, HttpResponse } from 'msw';

const mockWikiResponse = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Quantum Mechanics',
        varianttitles: { en: 'Quantum Mechanics' },
        extract:
          'Quantum mechanics is a fundamental theory in physics that describes the behavior of nature at and below the scale of atoms. It is the foundation of all quantum physics, including quantum chemistry, quantum field theory, quantum technology, and quantum information science.',
        thumbnail: {
          source: 'https://placehold.co/800x600/1a1a2e/white?text=Quantum+Mechanics',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
      },
      '67890': {
        pageid: 67890,
        title: 'Aurora Borealis',
        varianttitles: { en: 'Aurora Borealis' },
        extract:
          'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
        thumbnail: {
          source: 'https://placehold.co/800x600/0f3460/white?text=Aurora+Borealis',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_borealis',
      },
      '11111': {
        pageid: 11111,
        title: 'Great Wall of China',
        varianttitles: { en: 'Great Wall of China' },
        extract:
          'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups from the Eurasian Steppe.',
        thumbnail: {
          source: 'https://placehold.co/800x600/533483/white?text=Great+Wall',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Great_Wall_of_China',
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
