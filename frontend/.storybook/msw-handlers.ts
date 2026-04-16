import { HttpResponse, http } from 'msw';
import type { WikiArticle } from '../src/components/WikiCard';
import { wikiArticleBatches } from './story-fixtures';

let wikiRequestIndex = 0;

export function resetStorybookMocks() {
  wikiRequestIndex = 0;
}

export const mswHandlers = [
  http.get(/https:\/\/[^/]+\.wikipedia\.org\/w\/api\.php/, ({ request }) => {
    const batch = wikiArticleBatches[wikiRequestIndex % wikiArticleBatches.length];

    wikiRequestIndex += 1;

    return HttpResponse.json(buildWikipediaResponse(request, batch));
  }),
];

function buildWikipediaResponse(request: Request, batch: WikiArticle[]) {
  const url = new URL(request.url);
  const variant = url.searchParams.get('variant') ?? 'en';
  const pages = Object.fromEntries(
    batch.map((article) => [
      article.pageid,
      {
        title: article.title,
        pageid: article.pageid,
        extract: article.extract,
        canonicalurl: article.url,
        thumbnail: article.thumbnail,
        varianttitles: {
          [variant]: article.displaytitle,
        },
      },
    ]),
  );

  return {
    batchcomplete: true,
    query: {
      pages,
    },
  };
}
