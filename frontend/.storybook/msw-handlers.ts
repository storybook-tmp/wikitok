import { http, HttpResponse } from 'msw';

const articleImage =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20x2%3D%221%22%20y1%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%230f766e%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23111827%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22url(%23g)%22%2F%3E%3Ctext%20x%3D%22400%22%20y%3D%22308%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%22%20font-size%3D%2248%22%20fill%3D%22white%22%3EWikipedia%3C%2Ftext%3E%3C%2Fsvg%3E';

const pages = [
  {
    pageid: 1001,
    title: 'Apollo program',
    extract:
      'The Apollo program was a human spaceflight program carried out by NASA, known for landing the first humans on the Moon.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Apollo_program',
  },
  {
    pageid: 1002,
    title: 'Library of Alexandria',
    extract:
      'The Library of Alexandria was one of the largest and most significant libraries of the ancient world.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Library_of_Alexandria',
  },
  {
    pageid: 1003,
    title: 'Mount Fuji',
    extract:
      'Mount Fuji is an active stratovolcano in Japan and one of the country’s most recognizable cultural landmarks.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Mount_Fuji',
  },
];

export const mswHandlers = [
  http.get(/https:\/\/[a-z-]+\.wikipedia\.org\/w\/api\.php/, ({ request }) => {
    const url = new URL(request.url);
    const variant = url.searchParams.get('variant') || 'en';

    return HttpResponse.json({
      batchcomplete: '',
      query: {
        pages: Object.fromEntries(
          pages.map((page) => [
            page.pageid,
            {
              ...page,
              varianttitles: {
                [variant]: page.title,
              },
              thumbnail: {
                source: articleImage,
                width: 800,
                height: 600,
              },
            },
          ]),
        ),
      },
    });
  }),
];
