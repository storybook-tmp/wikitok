import { http, HttpResponse } from 'msw';
import { createWikipediaResponse, placeholderFlagSvg } from './wiki-fixtures';

let wikipediaRequestCount = 0;

function createSvgResponse() {
  return new HttpResponse(placeholderFlagSvg, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
}

export const mswHandlers = [
  http.get(/https:\/\/[^/]+\.wikipedia\.org\/w\/api\.php(?:\?.*)?$/, ({ request }) => {
    const url = new URL(request.url);
    const variant = url.searchParams.get('variant') ?? 'en';
    const pageIdOffset = wikipediaRequestCount * 1000;

    wikipediaRequestCount += 1;

    return HttpResponse.json(createWikipediaResponse(variant, pageIdOffset));
  }),
  http.get('https://hatscripts.github.io/:path*', () => createSvgResponse()),
  http.get('https://upload.wikimedia.org/:path*', () => createSvgResponse()),
];
