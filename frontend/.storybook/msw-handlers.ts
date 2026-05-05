import { http, HttpResponse } from 'msw';

const mockArticles = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Quantum Mechanics',
        varianttitles: { en: 'Quantum Mechanics' },
        extract:
          'Quantum mechanics is a fundamental theory that describes the behavior of nature at and below the scale of atoms. It is the foundation of all quantum physics, including quantum chemistry, quantum field theory, quantum technology, and quantum information science.',
        canonicalurl: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
        thumbnail: {
          source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Quantum+Mechanics',
          width: 800,
          height: 600,
        },
      },
      '67890': {
        pageid: 67890,
        title: 'Aurora Borealis',
        varianttitles: { en: 'Aurora Borealis' },
        extract:
          'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
        thumbnail: {
          source: 'https://placehold.co/800x600/0d1b2a/ffffff?text=Aurora+Borealis',
          width: 800,
          height: 600,
        },
      },
      '11111': {
        pageid: 11111,
        title: 'Great Barrier Reef',
        varianttitles: { en: 'Great Barrier Reef' },
        extract:
          'The Great Barrier Reef is the world\'s largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometres. The reef is located in the Coral Sea, off the coast of Queensland, Australia.',
        canonicalurl: 'https://en.wikipedia.org/wiki/Great_Barrier_Reef',
        thumbnail: {
          source: 'https://placehold.co/800x600/006994/ffffff?text=Great+Barrier+Reef',
          width: 800,
          height: 600,
        },
      },
    },
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get('https://en.wikipedia.org/w/api.php', () => {
      return HttpResponse.json(mockArticles);
    }),
    http.get('https://*.wikipedia.org/w/api.php', () => {
      return HttpResponse.json(mockArticles);
    }),
  ],
};
