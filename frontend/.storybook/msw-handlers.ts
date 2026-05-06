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
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Solvay_conference_1927.jpg/800px-Solvay_conference_1927.jpg',
          width: 800,
          height: 573,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
      },
      '67890': {
        pageid: 67890,
        title: 'Great Wall of China',
        varianttitles: { en: 'Great Wall of China' },
        extract:
          'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups from the Eurasian Steppe.',
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
          width: 800,
          height: 533,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Great_Wall_of_China',
      },
      '11111': {
        pageid: 11111,
        title: 'Aurora Borealis',
        varianttitles: { en: 'Aurora Borealis' },
        extract:
          'An aurora, also commonly known as the polar lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers.',
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
      },
    },
  },
};

export const mswHandlers = [
  http.get('https://*.wikipedia.org/w/api.php', () => {
    return HttpResponse.json(mockWikiResponse);
  }),
];
