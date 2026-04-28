import { http, HttpResponse } from 'msw';

const mockWikiResponse = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Aurora Borealis',
        varianttitles: { en: 'Aurora Borealis' },
        extract:
          'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers.',
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
          source: 'https://placehold.co/800x600/0d1b2a/ffffff?text=Deep+Sea',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Deep_sea_creature',
      },
      '11111': {
        pageid: 11111,
        title: 'Mount Everest',
        varianttitles: { en: 'Mount Everest' },
        extract:
          "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China-Nepal border runs across its summit point. Its elevation of 8,848.86 m was most recently established in 2020.",
        thumbnail: {
          source: 'https://placehold.co/800x600/2d3436/ffffff?text=Everest',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Mount_Everest',
      },
    },
  },
};

export const mswHandlers = [
  http.get('https://*.wikipedia.org/w/api.php', () => {
    return HttpResponse.json(mockWikiResponse);
  }),
];
