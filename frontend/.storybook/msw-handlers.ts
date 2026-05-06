import { http, HttpResponse } from 'msw';

const mockArticles = {
  "12345": {
    pageid: 12345,
    title: "Aurora Borealis",
    varianttitles: { en: "Aurora Borealis" },
    extract: "An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth's sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.",
    thumbnail: {
      source: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg",
      width: 800,
      height: 533,
    },
    canonicalurl: "https://en.wikipedia.org/wiki/Aurora_(astronomy)",
  },
  "67890": {
    pageid: 67890,
    title: "Great Wall of China",
    varianttitles: { en: "Great Wall of China" },
    extract: "The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups from the Eurasian Steppe. The total length of all sections ever built is over 21,000 kilometers.",
    thumbnail: {
      source: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
      width: 800,
      height: 533,
    },
    canonicalurl: "https://en.wikipedia.org/wiki/Great_Wall_of_China",
  },
  "11111": {
    pageid: 11111,
    title: "Jazz",
    varianttitles: { en: "Jazz" },
    extract: "Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana, in the late 19th and early 20th centuries, with its roots in blues and ragtime. Since the 1920s Jazz Age, it has been recognized as a major form of musical expression in traditional and popular music.",
    thumbnail: {
      source: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Jazz_Musicians.jpg/800px-Jazz_Musicians.jpg",
      width: 800,
      height: 600,
    },
    canonicalurl: "https://en.wikipedia.org/wiki/Jazz",
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get('https://*.wikipedia.org/w/api.php', ({ request }) => {
      const url = new URL(request.url);
      const action = url.searchParams.get('action');
      const variant = url.searchParams.get('variant') || 'en';

      if (action === 'query') {
        const pages = Object.fromEntries(
          Object.entries(mockArticles).map(([key, article]) => [
            key,
            {
              ...article,
              varianttitles: { [variant]: article.title },
            },
          ])
        );

        return HttpResponse.json({
          query: { pages },
        });
      }

      return HttpResponse.json({ error: 'Unknown action' }, { status: 400 });
    }),
  ],
};
