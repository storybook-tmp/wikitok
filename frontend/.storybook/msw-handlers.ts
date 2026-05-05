import { http, HttpResponse } from 'msw';

const mockWikiResponse = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Quantum Computing',
        varianttitles: { en: 'Quantum Computing' },
        extract:
          'Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition and entanglement. A quantum computer uses quantum bits or qubits.',
        thumbnail: {
          source: 'https://via.placeholder.com/800x600/1a1a2e/ffffff?text=Quantum',
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
          'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers.',
        thumbnail: {
          source: 'https://via.placeholder.com/800x600/0d1b2a/ffffff?text=Aurora',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
      },
      '11111': {
        pageid: 11111,
        title: 'Japanese Tea Ceremony',
        varianttitles: { en: 'Japanese Tea Ceremony' },
        extract:
          'The Japanese tea ceremony, also called the Way of Tea, is a Japanese cultural activity involving the ceremonial preparation and presentation of matcha, powdered green tea.',
        thumbnail: {
          source: 'https://via.placeholder.com/800x600/2d3436/ffffff?text=Tea',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Japanese_tea_ceremony',
      },
    },
  },
};

export const mswHandlers = {
  wiki: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json(mockWikiResponse)
    ),
    // Handle all language variants
    http.get('https://*.wikipedia.org/w/api.php', () =>
      HttpResponse.json(mockWikiResponse)
    ),
  ],
};
