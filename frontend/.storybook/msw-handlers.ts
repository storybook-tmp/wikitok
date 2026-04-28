import { http, HttpResponse } from 'msw';

const mockArticles = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
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
        title: 'Jazz',
        varianttitles: { en: 'Jazz' },
        extract:
          'Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana, in the late 19th and early 20th centuries. Since the 1920s Jazz Age, it has been recognized as a major form of musical expression in traditional and popular music.',
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/JazzTrombone.jpg/800px-JazzTrombone.jpg',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Jazz',
      },
    },
  },
};

export const mswHandlers = [
  http.get('https://en.wikipedia.org/w/api.php', () => {
    return HttpResponse.json(mockArticles);
  }),
  // Catch all other Wikipedia language APIs
  http.get('https://*.wikipedia.org/w/api.php', () => {
    return HttpResponse.json(mockArticles);
  }),
  // Allow Wikipedia images to pass through (handled by bypass)
];
