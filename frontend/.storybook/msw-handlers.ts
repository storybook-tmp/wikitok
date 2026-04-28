import { http, HttpResponse } from "msw";

const mockArticles = {
  query: {
    pages: {
      "12345": {
        pageid: 12345,
        title: "Theory of relativity",
        varianttitles: { en: "Theory of relativity" },
        extract:
          "The theory of relativity usually encompasses two interrelated physics theories by Albert Einstein: special relativity and general relativity, proposed and published in 1905 and 1915, respectively.",
        canonicalurl: "https://en.wikipedia.org/wiki/Theory_of_relativity",
        thumbnail: {
          source: "https://placehold.co/800x600/333/white?text=Relativity",
          width: 800,
          height: 600,
        },
      },
      "67890": {
        pageid: 67890,
        title: "Great Barrier Reef",
        varianttitles: { en: "Great Barrier Reef" },
        extract:
          "The Great Barrier Reef is the world's largest coral reef system composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometres.",
        canonicalurl: "https://en.wikipedia.org/wiki/Great_Barrier_Reef",
        thumbnail: {
          source: "https://placehold.co/800x600/0077be/white?text=Reef",
          width: 800,
          height: 600,
        },
      },
      "11111": {
        pageid: 11111,
        title: "Apollo 11",
        varianttitles: { en: "Apollo 11" },
        extract:
          "Apollo 11 was the American spaceflight that first landed humans on the Moon. Commander Neil Armstrong and lunar module pilot Buzz Aldrin landed the Apollo Lunar Module Eagle on July 20, 1969.",
        canonicalurl: "https://en.wikipedia.org/wiki/Apollo_11",
        thumbnail: {
          source: "https://placehold.co/800x600/1a1a2e/white?text=Apollo+11",
          width: 800,
          height: 600,
        },
      },
    },
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get("https://*.wikipedia.org/w/api.php", () => {
      return HttpResponse.json(mockArticles);
    }),
  ],
};
