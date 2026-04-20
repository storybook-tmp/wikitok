import { http, HttpResponse } from 'msw';

let wikipediaRequestIndex = 0;

export const mswHandlers = {
  wikipedia: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json({
        batchcomplete: '',
        query: {
          pages: getNextWikipediaPages(),
        },
      })
    ),
  ],
};

export function resetMswData() {
  wikipediaRequestIndex = 0;
}

const wikipediaArticleSets = [
  [
    {
      pageid: 101,
      title: 'Ada Lovelace',
      extract:
        "Ada Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage's analytical engine.",
      canonicalurl: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
      thumbnail: '/wiki-logo.svg',
    },
    {
      pageid: 102,
      title: 'Apollo 11',
      extract:
        'Apollo 11 was the American spaceflight that first landed humans on the Moon in July 1969.',
      canonicalurl: 'https://en.wikipedia.org/wiki/Apollo_11',
      thumbnail: '/web-app-manifest-192x192.png',
    },
    {
      pageid: 103,
      title: 'Great Barrier Reef',
      extract:
        "The Great Barrier Reef is the world's largest coral reef system, located off the coast of Queensland, Australia.",
      canonicalurl: 'https://en.wikipedia.org/wiki/Great_Barrier_Reef',
      thumbnail: '/web-app-manifest-512x512.png',
    },
  ],
  [
    {
      pageid: 201,
      title: 'Rosalind Franklin',
      extract:
        'Rosalind Franklin was a chemist whose X-ray diffraction work was central to understanding DNA structure.',
      canonicalurl: 'https://en.wikipedia.org/wiki/Rosalind_Franklin',
      thumbnail: '/wiki-logo.svg',
    },
    {
      pageid: 202,
      title: 'Hubble Space Telescope',
      extract:
        'The Hubble Space Telescope observes the universe from low Earth orbit and has transformed modern astronomy.',
      canonicalurl: 'https://en.wikipedia.org/wiki/Hubble_Space_Telescope',
      thumbnail: '/web-app-manifest-192x192.png',
    },
    {
      pageid: 203,
      title: 'Mount Fuji',
      extract:
        "Mount Fuji is the highest mountain in Japan and one of the country's most recognizable natural landmarks.",
      canonicalurl: 'https://en.wikipedia.org/wiki/Mount_Fuji',
      thumbnail: '/web-app-manifest-512x512.png',
    },
  ],
  [
    {
      pageid: 301,
      title: 'Alan Turing',
      extract:
        'Alan Turing was a mathematician and computer scientist whose work helped shape theoretical computation.',
      canonicalurl: 'https://en.wikipedia.org/wiki/Alan_Turing',
      thumbnail: '/wiki-logo.svg',
    },
    {
      pageid: 302,
      title: 'Deep-sea Exploration',
      extract:
        'Deep-sea exploration studies the ocean depths using submersibles, sensors, and remotely operated vehicles.',
      canonicalurl: 'https://en.wikipedia.org/wiki/Deep-sea_exploration',
      thumbnail: '/web-app-manifest-192x192.png',
    },
    {
      pageid: 303,
      title: 'Northern Lights',
      extract:
        'Auroras are natural light displays produced when charged solar particles interact with planetary atmospheres.',
      canonicalurl: 'https://en.wikipedia.org/wiki/Aurora',
      thumbnail: '/web-app-manifest-512x512.png',
    },
  ],
];

function getNextWikipediaPages() {
  const articleSet = wikipediaArticleSets[wikipediaRequestIndex % wikipediaArticleSets.length];
  wikipediaRequestIndex += 1;

  return Object.fromEntries(
    articleSet.map((article) => [
      article.pageid,
      {
        pageid: article.pageid,
        title: article.title,
        varianttitles: {
          en: article.title,
        },
        extract: article.extract,
        canonicalurl: article.canonicalurl,
        thumbnail: {
          source: article.thumbnail,
          width: 800,
          height: 800,
        },
      },
    ])
  );
}
