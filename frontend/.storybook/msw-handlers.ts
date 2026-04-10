import { http, HttpResponse } from 'msw';

const mockWikipediaPage1 = {
  pageid: 736,
  title: 'Albert Einstein',
  varianttitles: { en: 'Albert Einstein' },
  extract:
    'Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time. Best known for developing the theory of relativity, he also made important contributions to quantum mechanics.',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg',
    width: 800,
    height: 1000,
  },
  canonicalurl: 'https://en.wikipedia.org/wiki/Albert_Einstein',
};

const mockWikipediaPage2 = {
  pageid: 18599,
  title: 'Mount Everest',
  varianttitles: { en: 'Mount Everest' },
  extract:
    "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China–Nepal border runs across its summit point.",
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
    width: 800,
    height: 600,
  },
  canonicalurl: 'https://en.wikipedia.org/wiki/Mount_Everest',
};

const mockWikipediaPage3 = {
  pageid: 5042916,
  title: 'The Eiffel Tower',
  varianttitles: { en: 'Eiffel Tower' },
  extract:
    'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower from 1887 to 1889.',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/800px-Tour_Eiffel_Wikimedia_Commons.jpg',
    width: 800,
    height: 1200,
  },
  canonicalurl: 'https://en.wikipedia.org/wiki/Eiffel_Tower',
};

export const mswHandlers = {
  wikipedia: [
    http.get(/wikipedia\.org\/w\/api\.php/, () =>
      HttpResponse.json({
        query: {
          pages: {
            '736': mockWikipediaPage1,
            '18599': mockWikipediaPage2,
            '5042916': mockWikipediaPage3,
          },
        },
      })
    ),
  ],
};
