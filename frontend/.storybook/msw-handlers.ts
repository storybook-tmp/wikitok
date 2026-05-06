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
          source: 'https://placehold.co/800x600/0e2433/ffffff?text=Deep+Sea',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Deep-sea_creature',
      },
      '11111': {
        pageid: 11111,
        title: 'Quantum Computing',
        varianttitles: { en: 'Quantum Computing' },
        extract:
          'Quantum computing is a type of computation whose operations can harness the phenomena of quantum mechanics, such as superposition, interference, and entanglement. A quantum computer uses qubits which can be in superpositions of states.',
        thumbnail: {
          source: 'https://placehold.co/800x600/1b1b3a/ffffff?text=Quantum',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Quantum_computing',
      },
    },
  },
};

export const mswHandlers = {
  wiki: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json(wikiApiResponse)
    ),
    http.get('https://*.wikipedia.org/w/api.php', () =>
      HttpResponse.json(wikiApiResponse)
    ),
  ],
};
