import { HttpResponse, http } from 'msw';
import { buildWikipediaPayload } from './wiki-fixtures';

let wikipediaRequestCount = 0;

export const mswHandlers = {
  wikipedia: [
    http.get(/^https:\/\/[^/]+\.wikipedia\.org\/w\/api\.php(?:\?.*)?$/, () => {
      const payload = buildWikipediaPayload(wikipediaRequestCount);
      wikipediaRequestCount += 1;

      return HttpResponse.json(payload);
    }),
  ],
  analytics: [
    http.get(/_vercel\/insights/, () => new HttpResponse(null, { status: 204 })),
    http.post(/vercel-insights|web-vitals|vitals/, () => new HttpResponse(null, { status: 204 })),
  ],
};

export function resetMswState() {
  wikipediaRequestCount = 0;
}
