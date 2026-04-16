import { http, HttpResponse } from 'msw';

const mockWikiPages = {
  '101': {
    pageid: 101,
    title: 'Aurora Borealis',
    varianttitles: { en: 'Aurora Borealis' },
    extract:
      'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
    thumbnail: {
      source: 'https://picsum.photos/seed/aurora/800/600',
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
  },
  '202': {
    pageid: 202,
    title: 'Great Wall of China',
    varianttitles: { en: 'Great Wall of China' },
    extract:
      'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups. Several walls were being built from as early as the 7th century BC by ancient Chinese states.',
    thumbnail: {
      source: 'https://picsum.photos/seed/wall/800/600',
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Great_Wall_of_China',
  },
  '303': {
    pageid: 303,
    title: 'Octopus',
    varianttitles: { en: 'Octopus' },
    extract:
      'An octopus is a soft-bodied, eight-limbed mollusc of the order Octopoda. The order consists of some 300 species and is grouped within the class Cephalopoda with squids, cuttlefish, and nautiloids. Like other cephalopods, an octopus is bilaterally symmetric with two eyes and a beaked mouth at the center point of the eight limbs.',
    thumbnail: {
      source: 'https://picsum.photos/seed/octopus/800/600',
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Octopus',
  },
  '404': {
    pageid: 404,
    title: 'Jazz',
    varianttitles: { en: 'Jazz' },
    extract:
      'Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana, in the late 19th and early 20th centuries, with its roots in blues and ragtime. Since the 1920s Jazz Age, it has been recognized as a major form of musical expression in traditional and popular music.',
    thumbnail: {
      source: 'https://picsum.photos/seed/jazz/800/600',
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Jazz',
  },
  '505': {
    pageid: 505,
    title: 'Mount Everest',
    varianttitles: { en: 'Mount Everest' },
    extract:
      "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China–Nepal border runs across its summit point. Its elevation of 8,848.86 m was most recently established in 2020 by the Chinese and Nepali authorities.",
    thumbnail: {
      source: 'https://picsum.photos/seed/everest/800/600',
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Mount_Everest',
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get('https://*.wikipedia.org/w/api.php', ({ request }) => {
      const url = new URL(request.url);
      const variant = url.searchParams.get('variant') || 'en';

      const pages = Object.fromEntries(
        Object.entries(mockWikiPages).map(([key, page]) => [
          key,
          {
            ...page,
            varianttitles: { [variant]: page.title },
          },
        ])
      );

      return HttpResponse.json({
        query: { pages },
      });
    }),
  ],
};
