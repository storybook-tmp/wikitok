import { http, HttpResponse } from 'msw';

const mockWikiResponse = {
  query: {
    pages: {
      '12345': {
        pageid: 12345,
        title: 'Albert Einstein',
        varianttitles: {
          en: 'Albert Einstein',
          ar: 'أنشتاين',
          de: 'Albert Einstein',
        },
        extract:
          'Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time. Best known for developing the theory of relativity, he also made important contributions to quantum mechanics.',
        canonicalurl: 'https://en.wikipedia.org/wiki/Albert_Einstein',
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg',
          width: 800,
          height: 1000,
        },
      },
      '67890': {
        pageid: 67890,
        title: 'Marie Curie',
        varianttitles: {
          en: 'Marie Curie',
          ar: 'ماري كوري',
          de: 'Marie Curie',
        },
        extract:
          'Marie Curie was a Polish and naturalised-French physicist and chemist who conducted pioneering research on radioactivity. She was the first woman to win a Nobel Prize, and the only person to win the Nobel Prize in two different sciences.',
        canonicalurl: 'https://en.wikipedia.org/wiki/Marie_Curie',
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/800px-Marie_Curie_c1920.jpg',
          width: 800,
          height: 1000,
        },
      },
      '11111': {
        pageid: 11111,
        title: 'Mount Everest',
        varianttitles: {
          en: 'Mount Everest',
          ar: 'جبل إيفرست',
          de: 'Mount Everest',
        },
        extract:
          "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China–Nepal border runs across its summit point.",
        canonicalurl: 'https://en.wikipedia.org/wiki/Mount_Everest',
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
          width: 800,
          height: 600,
        },
      },
    },
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get('https://*.wikipedia.org/w/api.php', () =>
      HttpResponse.json(mockWikiResponse)
    ),
  ],
};
