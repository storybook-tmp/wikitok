import { http, HttpResponse } from 'msw';

const mockWikiPages = {
  "12345": {
    pageid: 12345,
    title: "Mount Everest",
    varianttitles: {
      en: "Mount Everest",
      fr: "Mont Everest",
      de: "Mount Everest",
      es: "Monte Everest",
    },
    extract:
      "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China–Nepal border runs across its summit point. Its elevation of 8,848.86 m was most recently established in 2020 by the Chinese and Nepali authorities.",
    thumbnail: {
      source:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg",
      width: 800,
      height: 600,
    },
    canonicalurl: "https://en.wikipedia.org/wiki/Mount_Everest",
  },
  "67890": {
    pageid: 67890,
    title: "Great Barrier Reef",
    varianttitles: {
      en: "Great Barrier Reef",
      fr: "Grande Barrière de corail",
      de: "Great Barrier Reef",
      es: "Gran Barrera de Coral",
    },
    extract:
      "The Great Barrier Reef is the world's largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometres over an area of approximately 344,400 square kilometres.",
    thumbnail: {
      source:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Coral_reef_at_palmyra.jpg/800px-Coral_reef_at_palmyra.jpg",
      width: 800,
      height: 600,
    },
    canonicalurl: "https://en.wikipedia.org/wiki/Great_Barrier_Reef",
  },
  "11111": {
    pageid: 11111,
    title: "Amazon River",
    varianttitles: {
      en: "Amazon River",
      fr: "Amazone",
      de: "Amazonas",
      es: "Río Amazonas",
    },
    extract:
      "The Amazon River is the largest river in the world by discharge volume of water. It is the largest drainage basin in the world, and accounts for approximately one-fifth of the world's total river flow.",
    thumbnail: {
      source:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Amazon_river.jpg/800px-Amazon_river.jpg",
      width: 800,
      height: 600,
    },
    canonicalurl: "https://en.wikipedia.org/wiki/Amazon_River",
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get(/https:\/\/\w[\w-]*\.wikipedia\.org\/w\/api\.php/, () =>
      HttpResponse.json({
        query: {
          pages: mockWikiPages,
        },
      })
    ),
  ],
};
