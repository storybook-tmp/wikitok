import { http, HttpResponse } from 'msw';

const mockArticles = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Quantum Mechanics',
        varianttitles: { en: 'Quantum Mechanics' },
        extract:
          'Quantum mechanics is a fundamental theory in physics that describes the behavior of nature at and below the scale of atoms. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.',
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Solvay_conference_1927.jpg/800px-Solvay_conference_1927.jpg',
          width: 800,
          height: 573,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
      },
      '67890': {
        pageid: 67890,
        title: 'Great Barrier Reef',
        varianttitles: { en: 'Great Barrier Reef' },
        extract:
          'The Great Barrier Reef is the world\'s largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometres. The reef is located in the Coral Sea, off the coast of Queensland, Australia.',
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/GreatBarrierReef-EO.JPG/800px-GreatBarrierReef-EO.JPG',
          width: 800,
          height: 599,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Great_Barrier_Reef',
      },
      '11111': {
        pageid: 11111,
        title: 'Ada Lovelace',
        varianttitles: { en: 'Ada Lovelace' },
        extract:
          'Augusta Ada King, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage\'s proposed mechanical general-purpose computer, the Analytical Engine. She is often regarded as the first computer programmer.',
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg',
          width: 800,
          height: 1073,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
      },
    },
  },
};

export const mswHandlers = [
  http.get('https://*.wikipedia.org/w/api.php', () => {
    return HttpResponse.json(mockArticles);
  }),
];
