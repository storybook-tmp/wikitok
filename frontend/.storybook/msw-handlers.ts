import { http, HttpResponse } from 'msw';

const mockWikiPages = {
  "12345": {
    pageid: 12345,
    title: "Aurora Borealis",
    extract: "An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth's sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.",
    canonicalurl: "https://en.wikipedia.org/wiki/Aurora_Borealis",
    varianttitles: { en: "Aurora Borealis" },
    thumbnail: {
      source: "https://upload.wikimedia.org/wikipedia/commons/thumb/aurora.jpg/800px-aurora.jpg",
      width: 800,
      height: 600,
    },
  },
  "67890": {
    pageid: 67890,
    title: "Great Wall of China",
    extract: "The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups from the Eurasian Steppe. The total length of all sections ever built is over 21,000 kilometers.",
    canonicalurl: "https://en.wikipedia.org/wiki/Great_Wall_of_China",
    varianttitles: { en: "Great Wall of China" },
    thumbnail: {
      source: "https://upload.wikimedia.org/wikipedia/commons/thumb/wall.jpg/800px-wall.jpg",
      width: 800,
      height: 533,
    },
  },
  "11111": {
    pageid: 11111,
    title: "Jazz",
    extract: "Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana, in the late 19th and early 20th centuries, with its roots in blues and ragtime. Since the 1920s Jazz Age, it has been recognized as a major form of musical expression in traditional and popular music.",
    canonicalurl: "https://en.wikipedia.org/wiki/Jazz",
    varianttitles: { en: "Jazz" },
    thumbnail: {
      source: "https://upload.wikimedia.org/wikipedia/commons/thumb/jazz.jpg/800px-jazz.jpg",
      width: 800,
      height: 600,
    },
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get("https://*.wikipedia.org/w/api.php", () => {
      return HttpResponse.json({
        query: {
          pages: mockWikiPages,
        },
      });
    }),
  ],
};
