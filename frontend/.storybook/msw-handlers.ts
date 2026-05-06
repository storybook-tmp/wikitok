import { http, HttpResponse } from 'msw';

const mockWikiPages = {
  '12345': {
    pageid: 12345,
    title: 'Aurora Borealis',
    varianttitles: { en: 'Aurora Borealis' },
    extract:
      'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
      width: 800,
      height: 600,
    },
  },
  '67890': {
    pageid: 67890,
    title: 'Great Wall of China',
    varianttitles: { en: 'Great Wall of China' },
    extract:
      'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups from the Eurasian Steppe.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Great_Wall_of_China',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
      width: 800,
      height: 533,
    },
  },
  '11111': {
    pageid: 11111,
    title: 'Monarch Butterfly',
    varianttitles: { en: 'Monarch Butterfly' },
    extract:
      'The monarch butterfly or simply monarch is a milkweed butterfly in the family Nymphalidae. Other common names, depending on region, include milkweed, common tiger, wanderer, and black veined brown. It is amongst the most familiar of North American butterflies.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Monarch_butterfly',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Monarch_Butterfly_Danaus_plexippus_on_Milkweed_Hybrid_2800px.jpg/800px-Monarch_Butterfly_Danaus_plexippus_on_Milkweed_Hybrid_2800px.jpg',
      width: 800,
      height: 600,
    },
  },
};

export const mswHandlers = [
  http.get('https://*.wikipedia.org/w/api.php', () => {
    return HttpResponse.json({
      query: {
        pages: mockWikiPages,
      },
    });
  }),
];
