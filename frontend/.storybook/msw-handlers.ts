import { http, HttpResponse } from 'msw';

const mockArticles = {
  query: {
    pages: {
      '12345': {
        title: 'Quantum Computing',
        varianttitles: {
          en: 'Quantum Computing',
          ar: 'Quantum Computing',
          bn: 'Quantum Computing',
          de: 'Quantum Computing',
          es: 'Quantum Computing',
          fr: 'Quantum Computing',
          ja: 'Quantum Computing',
          ko: 'Quantum Computing',
          'zh-cn': 'Quantum Computing',
          'zh-tw': 'Quantum Computing',
        },
        extract:
          'Quantum computing is an area of computing focused on developing computer technology based on the principles of quantum theory. A quantum computer uses quantum bits or qubits, which can represent both 0 and 1 simultaneously through superposition.',
        pageid: 12345,
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Bloch_sphere.svg/800px-Bloch_sphere.svg.png',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Quantum_computing',
      },
      '67890': {
        title: 'Aurora Borealis',
        varianttitles: {
          en: 'Aurora Borealis',
          ar: 'Aurora Borealis',
          bn: 'Aurora Borealis',
          de: 'Aurora Borealis',
          es: 'Aurora Borealis',
          fr: 'Aurora Borealis',
          ja: 'Aurora Borealis',
          ko: 'Aurora Borealis',
          'zh-cn': 'Aurora Borealis',
          'zh-tw': 'Aurora Borealis',
        },
        extract:
          'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers.',
        pageid: 67890,
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
          width: 800,
          height: 533,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
      },
      '11111': {
        title: 'Deep Ocean Exploration',
        varianttitles: {
          en: 'Deep Ocean Exploration',
          ar: 'Deep Ocean Exploration',
          bn: 'Deep Ocean Exploration',
          de: 'Deep Ocean Exploration',
          es: 'Deep Ocean Exploration',
          fr: 'Deep Ocean Exploration',
          ja: 'Deep Ocean Exploration',
          ko: 'Deep Ocean Exploration',
          'zh-cn': 'Deep Ocean Exploration',
          'zh-tw': 'Deep Ocean Exploration',
        },
        extract:
          'Deep-sea exploration is the investigation of physical, chemical, and biological conditions on the sea bed for scientific or commercial purposes. It involves diving to depths beyond 200 meters.',
        pageid: 11111,
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Deep_sea_exploration.jpg/800px-Deep_sea_exploration.jpg',
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
    http.get('https://*.wikipedia.org/w/api.php', () => {
      return HttpResponse.json(mockArticles);
    }),
  ],
};
