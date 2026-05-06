import { http, HttpResponse } from 'msw';

const mockWikiResponse = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Aurora Borealis',
        varianttitles: {
          en: 'Aurora Borealis',
          ar: 'Aurora Borealis',
          fr: 'Aurora Borealis',
        },
        extract:
          'An aurora, also commonly known as the polar lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
          width: 800,
          height: 600,
        },
      },
      '67890': {
        pageid: 67890,
        title: 'Great Barrier Reef',
        varianttitles: {
          en: 'Great Barrier Reef',
          ar: 'Great Barrier Reef',
          fr: 'Great Barrier Reef',
        },
        extract:
          'The Great Barrier Reef is the world\'s largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometres. The reef is located in the Coral Sea, off the coast of Queensland, Australia.',
        canonicalurl: 'https://en.wikipedia.org/wiki/Great_Barrier_Reef',
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Coral_reef_at_palmyra.jpg/800px-Coral_reef_at_palmyra.jpg',
          width: 800,
          height: 533,
        },
      },
      '11111': {
        pageid: 11111,
        title: 'Nikola Tesla',
        varianttitles: {
          en: 'Nikola Tesla',
          ar: 'Nikola Tesla',
          fr: 'Nikola Tesla',
        },
        extract:
          'Nikola Tesla was a Serbian-American inventor, electrical engineer, mechanical engineer, and futurist best known for his contributions to the design of the modern alternating current electricity supply system.',
        canonicalurl: 'https://en.wikipedia.org/wiki/Nikola_Tesla',
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Tesla_circa_1890.jpeg/800px-Tesla_circa_1890.jpeg',
          width: 800,
          height: 1000,
        },
      },
    },
  },
};

export const mswHandlers = [
  http.get('https://*.wikipedia.org/w/api.php', () => {
    return HttpResponse.json(mockWikiResponse);
  }),
];
