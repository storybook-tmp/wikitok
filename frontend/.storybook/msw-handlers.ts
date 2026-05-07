import { http, HttpResponse } from 'msw';

import { mockWikiArticles } from './wiki-fixtures';

const wikiPages = Object.fromEntries(
  mockWikiArticles.map((article) => [
    article.pageid,
    {
      pageid: article.pageid,
      title: article.title,
      extract: article.extract,
      canonicalurl: article.url,
      thumbnail: article.thumbnail,
      varianttitles: {
        en: article.displaytitle,
      },
    },
  ]),
);

export const mswHandlers = [
  http.get('https://en.wikipedia.org/w/api.php', () =>
    HttpResponse.json({
      batchcomplete: '',
      query: {
        pages: wikiPages,
      },
    }),
  ),
];

