import { http, HttpResponse } from 'msw';

const wikiArticles = {
  query: {
    pages: {
      '12345': {
        title: 'Aurora Borealis',
        varianttitles: { en: 'Aurora Borealis' },
        extract:
          'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
        pageid: 12345,
        thumbnail: {
          source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Aurora',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
      },
      '67890': {
        title: 'Deep Sea Creatures',
        varianttitles: { en: 'Deep Sea Creatures' },
        extract:
          'Deep-sea creatures are organisms that live below the photic zone of the ocean. These creatures must survive in extremely harsh conditions, such as hundreds of bars of pressure, small amounts of oxygen, very little food, no sunlight, and constant extreme cold.',
        pageid: 67890,
        thumbnail: {
          source: 'https://placehold.co/800x600/0e1a2e/ffffff?text=Deep+Sea',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Deep_Sea_Creatures',
      },
      '11111': {
        title: 'Quantum Computing',
        varianttitles: { en: 'Quantum Computing' },
        extract:
          'Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition, interference, and entanglement. A quantum computer uses qubits to perform calculations exponentially faster than classical computers for certain problems.',
        pageid: 11111,
        thumbnail: {
          source: 'https://placehold.co/800x600/1e1a2e/ffffff?text=Quantum',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Quantum_Computing',
      },
    },
  },
};

export const mswHandlers = {
  wiki: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json(wikiArticles)
    ),
    http.get('https://*.wikipedia.org/w/api.php', () =>
      HttpResponse.json(wikiArticles)
    ),
  ],
};
