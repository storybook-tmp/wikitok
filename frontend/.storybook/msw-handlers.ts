import { http, HttpResponse } from 'msw';

const mockWikiResponse = {
  query: {
    pages: {
      '12345': {
        title: 'Aurora Borealis',
        varianttitles: { en: 'Aurora Borealis' },
        extract:
          'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers.',
        pageid: 12345,
        thumbnail: {
          source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Aurora',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
      },
      '67890': {
        title: 'Deep Sea Creatures',
        varianttitles: { en: 'Deep Sea Creatures' },
        extract:
          'Deep-sea creatures are organisms that live below the photic zone of the ocean. These creatures must survive in extremely harsh conditions, such as hundreds of bars of pressure, small amounts of oxygen, very little food, no sunlight, and constant extreme cold.',
        pageid: 67890,
        thumbnail: {
          source: 'https://placehold.co/800x600/0a2a3a/ffffff?text=Deep+Sea',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Deep-sea_creature',
      },
      '11111': {
        title: 'Space Exploration',
        varianttitles: { en: 'Space Exploration' },
        extract:
          'Space exploration is the use of astronomy and space technology to explore outer space. While the exploration of space is currently carried out mainly by astronomers with telescopes, its physical exploration is conducted both by uncrewed robotic space probes and human spaceflight.',
        pageid: 11111,
        thumbnail: {
          source: 'https://placehold.co/800x600/0d1b2a/ffffff?text=Space',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Space_exploration',
      },
    },
  },
};

export const mswHandlers = [
  http.get('https://en.wikipedia.org/w/api.php', () => {
    return HttpResponse.json(mockWikiResponse);
  }),
];
