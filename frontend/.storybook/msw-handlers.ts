import { http, HttpResponse } from 'msw';

const makeThumbnail = (color: string) => ({
  source: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='${encodeURIComponent(color)}'/%3E%3C/svg%3E`,
  width: 800,
  height: 600,
});

const mockArticles = [
  {
    pageid: 101,
    title: 'Monarch Butterfly',
    extract:
      'The monarch butterfly (Danaus plexippus) is a milkweed butterfly in the family Nymphalidae. It is perhaps the best known of all North American butterflies and is considered an iconic pollinator species.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Monarch_butterfly',
    thumbnail: makeThumbnail('#1e3a5f'),
  },
  {
    pageid: 102,
    title: 'Great Wall of China',
    extract:
      'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups from the Eurasian Steppe.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Great_Wall_of_China',
    thumbnail: makeThumbnail('#1e5f3a'),
  },
  {
    pageid: 103,
    title: 'Nikola Tesla',
    extract:
      'Nikola Tesla was a Serbian-American inventor, electrical engineer, mechanical engineer, and futurist best known for his contributions to the design of the modern alternating current electricity supply system.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Nikola_Tesla',
    thumbnail: makeThumbnail('#3a1e5f'),
  },
  {
    pageid: 104,
    title: 'Aurora Borealis',
    extract:
      "An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth's sky, predominantly seen in high-latitude regions around the Arctic and Antarctic.",
    canonicalurl: 'https://en.wikipedia.org/wiki/Aurora',
    thumbnail: makeThumbnail('#5f1e1e'),
  },
  {
    pageid: 105,
    title: 'Mount Everest',
    extract:
      "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China-Nepal border runs across its summit point.",
    canonicalurl: 'https://en.wikipedia.org/wiki/Mount_Everest',
    thumbnail: makeThumbnail('#1e5f5f'),
  },
];

export const mswHandlers = {
  wikipedia: [
    http.get(
      /https:\/\/[\w-]+\.wikipedia\.org\/w\/api\.php/,
      ({ request }) => {
        const url = new URL(request.url);
        const variant = url.searchParams.get('variant') || 'en';

        const pages: Record<string, unknown> = {};
        for (const article of mockArticles) {
          pages[String(article.pageid)] = {
            ...article,
            varianttitles: { [variant]: article.title },
          };
        }

        return HttpResponse.json({ query: { pages } });
      }
    ),
  ],
};
