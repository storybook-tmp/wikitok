import { http, HttpResponse } from 'msw';
import { buildWikipediaQueryResponse } from '../src/storybook/mockWikiArticles';

let responseSequence = 0;

export function resetMswHandlerState() {
  responseSequence = 0;
}

const wikipediaHandler = http.get(
  'https://:language.wikipedia.org/w/api.php',
  ({ params, request }) => {
    const language = String(params.language);
    const url = new URL(request.url);
    const variant = url.searchParams.get('variant') ?? 'en';

    return HttpResponse.json(
      buildWikipediaQueryResponse({
        language,
        variant,
        requestIndex: responseSequence++,
      }),
    );
  },
);

export const globalMswHandlers = [wikipediaHandler];
