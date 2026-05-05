import { http, HttpResponse } from 'msw';

const mockArticles = {
  query: {
    pages: {
      '12345': {
        title: 'Quantum Computing',
        varianttitles: { en: 'Quantum Computing' },
        extract:
          'Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition and entanglement to process information.',
        pageid: 12345,
        thumbnail: {
          source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Quantum',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Quantum_computing',
      },
      '67890': {
        title: 'Aurora Borealis',
        varianttitles: { en: 'Aurora Borealis' },
        extract:
          'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights.',
        pageid: 67890,
        thumbnail: {
          source: 'https://placehold.co/800x600/0f3460/ffffff?text=Aurora',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
      },
      '11111': {
        title: 'Deep Sea Exploration',
        varianttitles: { en: 'Deep Sea Exploration' },
        extract:
          'Deep-sea exploration is the investigation of physical, chemical, and biological conditions on the sea bed for scientific or commercial purposes.',
        pageid: 11111,
        thumbnail: {
          source: 'https://placehold.co/800x600/16213e/ffffff?text=DeepSea',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Deep-sea_exploration',
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
