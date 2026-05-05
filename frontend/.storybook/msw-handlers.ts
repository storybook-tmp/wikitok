import { http, HttpResponse } from 'msw';

const mockPages = {
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
      height: 533,
    },
  },
  '67890': {
    pageid: 67890,
    title: 'Great Barrier Reef',
    varianttitles: { en: 'Great Barrier Reef' },
    extract:
      'The Great Barrier Reef is the world\'s largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometres. The reef is located in the Coral Sea, off the coast of Queensland, Australia.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Great_Barrier_Reef',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/GreatBarrierReef-EO.JPG/800px-GreatBarrierReef-EO.JPG',
      width: 800,
      height: 600,
    },
  },
  '11111': {
    pageid: 11111,
    title: 'Fibonacci Number',
    varianttitles: { en: 'Fibonacci Number' },
    extract:
      'In mathematics, the Fibonacci sequence is a sequence in which each number is the sum of the two preceding ones. Numbers that are part of the Fibonacci sequence are known as Fibonacci numbers. The sequence commonly starts from 0 and 1.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Fibonacci_number',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Fibonacci_Spiral.svg/800px-Fibonacci_Spiral.svg.png',
      width: 800,
      height: 528,
    },
  },
  '22222': {
    pageid: 22222,
    title: 'Mount Everest',
    varianttitles: { en: 'Mount Everest' },
    extract:
      'Mount Everest is Earth\'s highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China-Nepal border runs across its summit point. Its elevation of 8,848.86 m was most recently established in 2020.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Mount_Everest',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
      width: 800,
      height: 534,
    },
  },
  '33333': {
    pageid: 33333,
    title: 'Jazz',
    varianttitles: { en: 'Jazz' },
    extract:
      'Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana, in the late 19th and early 20th centuries. Since the 1920s Jazz Age, it has been recognized as a major form of musical expression in traditional and popular music.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Jazz',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/JazzstylesSVGmap.svg/800px-JazzstylesSVGmap.svg.png',
      width: 800,
      height: 400,
    },
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get('https://*.wikipedia.org/w/api.php', () => {
      return HttpResponse.json({
        query: {
          pages: mockPages,
        },
      });
    }),
  ],
};
