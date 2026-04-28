import { http, HttpResponse } from 'msw';

const mockWikiPages = {
  '101': {
    pageid: 101,
    title: 'Aurora Borealis',
    varianttitles: { en: 'Aurora Borealis' },
    extract:
      'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
  },
  '102': {
    pageid: 102,
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
  '103': {
    pageid: 103,
    title: 'Octopus',
    varianttitles: { en: 'Octopus' },
    extract:
      'An octopus is a soft-bodied, eight-limbed mollusc of the order Octopoda. The order consists of some 300 species and is grouped within the class Cephalopoda with squids, cuttlefish, and nautiloids.',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Octopus2.jpg/800px-Octopus2.jpg',
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Octopus',
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get('https://en.wikipedia.org/w/api.php', () => {
      return HttpResponse.json({
        query: {
          pages: mockWikiPages,
        },
      });
    }),
    // Handle all other language Wikipedia APIs
    http.get('https://*.wikipedia.org/w/api.php', () => {
      return HttpResponse.json({
        query: {
          pages: mockWikiPages,
        },
      });
    }),
  ],
};
