import { http, HttpResponse } from 'msw';

const mockWikiResponse = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Aurora Borealis',
        varianttitles: { en: 'Aurora Borealis' },
        extract:
          'An aurora is a natural light display in the sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
        thumbnail: {
          source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Aurora',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
      },
      '67890': {
        pageid: 67890,
        title: 'Coral Reef',
        varianttitles: { en: 'Coral Reef' },
        extract:
          'A coral reef is an underwater ecosystem characterized by reef-building corals. Reefs are formed of colonies of coral polyps held together by calcium carbonate.',
        thumbnail: {
          source: 'https://placehold.co/800x600/0e4429/ffffff?text=Coral+Reef',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Coral_reef',
      },
      '11111': {
        pageid: 11111,
        title: 'Jazz',
        varianttitles: { en: 'Jazz' },
        extract:
          'Jazz is a music genre that originated in the African-American communities of New Orleans in the late 19th and early 20th centuries. It has been recognized as a major form of musical expression in traditional and popular music.',
        thumbnail: {
          source: 'https://placehold.co/800x600/2d1b69/ffffff?text=Jazz',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Jazz',
      },
    },
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json(mockWikiResponse)
    ),
    http.get('https://*.wikipedia.org/w/api.php', () =>
      HttpResponse.json(mockWikiResponse)
    ),
  ],
};
