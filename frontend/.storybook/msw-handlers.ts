import { http, HttpResponse } from 'msw';

import { wikipediaFeedArticles } from './mock-data';

export const mswHandlers = {
  wikipedia: [
    http.get('https://en.wikipedia.org/w/api.php', ({ request }) => {
      const variant = new URL(request.url).searchParams.get('variant') ?? 'en';

      return HttpResponse.json({
        batchcomplete: '',
        query: {
          pages: Object.fromEntries(
            wikipediaFeedArticles.map((article) => [
              article.pageid,
              {
                pageid: article.pageid,
                title: article.title,
                extract: article.extract,
                canonicalurl: article.url,
                thumbnail: article.thumbnail,
                varianttitles: {
                  [variant]: article.displaytitle,
                },
              },
            ]),
          ),
        },
      });
    }),
  ],
};

