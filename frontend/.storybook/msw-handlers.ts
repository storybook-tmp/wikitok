import { http, HttpResponse } from 'msw';

const mockArticles = [
  {
    pageid: 1001,
    title: 'Quantum mechanics',
    varianttitles: { en: 'Quantum mechanics' },
    extract:
      'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles.',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Solvay_conference_1927.jpg/800px-Solvay_conference_1927.jpg',
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
  },
  {
    pageid: 1002,
    title: 'Great Wall of China',
    varianttitles: { en: 'Great Wall of China' },
    extract:
      'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China.',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
      width: 800,
      height: 534,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Great_Wall_of_China',
  },
  {
    pageid: 1003,
    title: 'Mount Everest',
    varianttitles: { en: 'Mount Everest' },
    extract:
      'Mount Everest is Earth\'s highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas.',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
      width: 800,
      height: 574,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Mount_Everest',
  },
];

export const mswHandlers = {
  wikipedia: [
    http.get('https://*.wikipedia.org/w/api.php', () =>
      HttpResponse.json({
        query: {
          pages: Object.fromEntries(
            mockArticles.map((article) => [article.pageid, article])
          ),
        },
      })
    ),
  ],
};
