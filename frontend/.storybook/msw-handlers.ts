import { http, HttpResponse } from 'msw';

const wikiApiResponse = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Quantum Computing',
        varianttitles: { en: 'Quantum Computing' },
        extract:
          'Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition and entanglement. A quantum computer uses quantum bits or qubits.',
        thumbnail: {
          source: 'https://placehold.co/800x600/333/white?text=Quantum+Computing',
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
          'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights.',
        thumbnail: {
          source: 'https://placehold.co/800x600/226/white?text=Aurora+Borealis',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_borealis',
      },
      '11111': {
        pageid: 11111,
        title: 'Tardigrade',
        varianttitles: { en: 'Tardigrade' },
        extract:
          'Tardigrades are a phylum of eight-legged segmented micro-animals. They are among the most resilient animals known, capable of surviving extreme conditions.',
        thumbnail: {
          source: 'https://placehold.co/800x600/363/white?text=Tardigrade',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Tardigrade',
      },
    },
  },
};

export const mswHandlers = {
  wiki: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json(wikiApiResponse)
    ),
    // Catch all Wikipedia language variants
    http.get('https://*.wikipedia.org/w/api.php', () =>
      HttpResponse.json(wikiApiResponse)
    ),
  ],
};
