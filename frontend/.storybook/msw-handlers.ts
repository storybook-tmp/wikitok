import { http, HttpResponse } from 'msw';
import { nextWikipediaResponse } from './wiki-fixtures';

export const mswHandlers = [
  http.get(/https:\/\/[a-z-]+\.wikipedia\.org\/w\/api\.php/, ({ request }) =>
    HttpResponse.json(nextWikipediaResponse(new URL(request.url))),
  ),
];
