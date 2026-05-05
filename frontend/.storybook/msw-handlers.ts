import { http, HttpResponse } from 'msw';

const mockWikiPages = {
  '1001': {
    pageid: 1001,
    title: 'Aurora Borealis',
    extract:
      'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
    varianttitles: { en: 'Aurora Borealis' },
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
      width: 800,
      height: 600,
    },
  },
  '1002': {
    pageid: 1002,
    title: 'Great Wall of China',
    extract:
      'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups from the Eurasian Steppe.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Great_Wall_of_China',
    varianttitles: { en: 'Great Wall of China' },
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
      width: 800,
      height: 533,
    },
  },
  '1003': {
    pageid: 1003,
    title: 'Octopus',
    extract:
      'An octopus is a soft-bodied, eight-limbed mollusc of the order Octopoda. The order consists of some 300 species and is grouped within the class Cephalopoda with squids, cuttlefish, and nautiloids. Like other cephalopods, an octopus is bilaterally symmetric with two eyes and a beaked mouth at the center point of the eight limbs.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Octopus',
    varianttitles: { en: 'Octopus' },
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Octopus2.jpg/800px-Octopus2.jpg',
      width: 800,
      height: 600,
    },
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get('https://*.wikipedia.org/w/api.php', () => {
      return HttpResponse.json({
        query: {
          pages: mockWikiPages,
        },
      });
    }),
  ],
};
