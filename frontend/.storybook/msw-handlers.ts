import { http, HttpResponse } from 'msw';

// 1x1 transparent PNG to avoid real network image loads during tests
const placeholderImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const mockArticles = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Solar System',
        varianttitles: { en: 'Solar System' },
        extract:
          'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it. The largest of such objects are the eight planets. The Solar System formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud.',
        thumbnail: {
          source: placeholderImage,
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Solar_System',
      },
      '67890': {
        pageid: 67890,
        title: 'Great Wall of China',
        varianttitles: { en: 'Great Wall of China' },
        extract:
          'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states. The best-known sections were built by the Ming dynasty. The wall spans from Liaodong in the east to Lop Lake in the west.',
        thumbnail: {
          source: placeholderImage,
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
          source: placeholderImage,
          width: 800,
          height: 450,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Jazz',
      },
    },
  },
};

const handler = () => {
  return HttpResponse.json(mockArticles);
};

export const mswHandlers = [
  http.get('https://en.wikipedia.org/w/api.php', handler),
  http.get('https://de.wikipedia.org/w/api.php', handler),
  http.get('https://fr.wikipedia.org/w/api.php', handler),
  http.get('https://es.wikipedia.org/w/api.php', handler),
  http.get('https://ja.wikipedia.org/w/api.php', handler),
  http.get('https://zh.wikipedia.org/w/api.php', handler),
  http.get('https://ru.wikipedia.org/w/api.php', handler),
  http.get('https://pt.wikipedia.org/w/api.php', handler),
  http.get('https://it.wikipedia.org/w/api.php', handler),
  http.get('https://ar.wikipedia.org/w/api.php', handler),
  http.get('https://ko.wikipedia.org/w/api.php', handler),
  http.get('https://nl.wikipedia.org/w/api.php', handler),
  http.get('https://pl.wikipedia.org/w/api.php', handler),
];
