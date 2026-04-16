import { delay, http, HttpResponse } from 'msw';
import { createWikipediaResponse } from './wikiMockData';

let wikipediaRequestCount = 0;

export const mswHandlers = [
  http.get('https://:language.wikipedia.org/w/api.php', async ({ request, params }) => {
    const url = new URL(request.url);
    const languageId =
      url.searchParams.get('variant') ?? String(params.language ?? 'en');

    await delay(75);

    const response = createWikipediaResponse(languageId, wikipediaRequestCount);

    wikipediaRequestCount += 1;

    return HttpResponse.json(response);
  }),
];
