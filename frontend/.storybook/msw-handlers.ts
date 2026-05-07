import { http, HttpResponse } from 'msw';

const thumbnail =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%221000%22 viewBox=%220 0 800 1000%22%3E%3Crect width=%22800%22 height=%221000%22 fill=%22%23111827%22/%3E%3Ccircle cx=%22400%22 cy=%22370%22 r=%22180%22 fill=%22%233b82f6%22/%3E%3Cpath d=%22M190 760c85-150 330-150 420 0%22 fill=%22%2310b981%22/%3E%3C/svg%3E';

export const mswHandlers = {
  wikipedia: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json({
        query: {
          pages: {
            1001: {
              pageid: 1001,
              title: 'Ada Lovelace',
              varianttitles: { en: 'Ada Lovelace' },
              extract:
                'Ada Lovelace was an English mathematician and writer, chiefly known for her work on the Analytical Engine.',
              canonicalurl: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
              thumbnail: { source: thumbnail, width: 800, height: 1000 },
            },
            1002: {
              pageid: 1002,
              title: 'Antikythera mechanism',
              varianttitles: { en: 'Antikythera mechanism' },
              extract:
                'The Antikythera mechanism is an ancient Greek hand-powered orrery, described as the oldest known analogue computer.',
              canonicalurl:
                'https://en.wikipedia.org/wiki/Antikythera_mechanism',
              thumbnail: { source: thumbnail, width: 800, height: 1000 },
            },
          },
        },
      })
    ),
  ],
};
