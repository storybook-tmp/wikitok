import { http, HttpResponse } from 'msw';

const mockWikiPages = {
  '101': {
    pageid: 101,
    title: 'Aurora Borealis',
    varianttitles: { en: 'Aurora Borealis' },
    extract:
      'An aurora borealis, also known as the northern lights, is a natural light display in the sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers.',
    thumbnail: {
      source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Aurora',
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
  },
  '102': {
    pageid: 102,
    title: 'Cephalopod Intelligence',
    varianttitles: { en: 'Cephalopod Intelligence' },
    extract:
      'Cephalopod intelligence is a measure of the cognitive ability of the cephalopod class of molluscs. They are considered the most intelligent invertebrates and an important example of advanced cognitive evolution in animals.',
    thumbnail: {
      source: 'https://placehold.co/800x600/2e1a2e/ffffff?text=Octopus',
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Cephalopod_intelligence',
  },
  '103': {
    pageid: 103,
    title: 'Voyager Golden Record',
    varianttitles: { en: 'Voyager Golden Record' },
    extract:
      'The Voyager Golden Records are two phonograph records that were included aboard both Voyager spacecraft launched in 1977. The records contain sounds and images selected to portray the diversity of life and culture on Earth.',
    thumbnail: {
      source: 'https://placehold.co/800x600/1a2e1a/ffffff?text=Voyager',
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Voyager_Golden_Record',
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
    // Catch all other language Wikipedia APIs
    http.get('https://*.wikipedia.org/w/api.php', () => {
      return HttpResponse.json({
        query: {
          pages: mockWikiPages,
        },
      });
    }),
  ],
};
