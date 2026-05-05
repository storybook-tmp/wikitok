import { http, HttpResponse } from 'msw';

const mockArticles = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Quantum Computing',
        varianttitles: { en: 'Quantum Computing' },
        extract:
          'Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition and entanglement. A quantum computer uses quantum bits or qubits.',
        thumbnail: {
          source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Quantum',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Quantum_computing',
      },
      '67890': {
        pageid: 67890,
        title: 'Aurora Borealis',
        varianttitles: { en: 'Aurora Borealis' },
        extract:
          'An aurora is a natural light display in the sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers.',
        thumbnail: {
          source: 'https://placehold.co/800x600/0f3460/ffffff?text=Aurora',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
      },
      '11111': {
        pageid: 11111,
        title: 'Jazz Music',
        varianttitles: { en: 'Jazz Music' },
        extract:
          'Jazz is a music genre that originated in the African-American communities of New Orleans in the late 19th and early 20th centuries. It has been recognized as a major form of musical expression.',
        thumbnail: {
          source: 'https://placehold.co/800x600/2d4059/ffffff?text=Jazz',
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
