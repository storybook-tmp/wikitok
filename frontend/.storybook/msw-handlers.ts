import { delay, HttpResponse, http } from 'msw';
import { createWikipediaResponse } from './mock-wiki-data';

export const mswHandlers = {
  images: [
    http.get(/https?:\/\/.+\.svg(?:\?.*)?$/, async () => {
      return new HttpResponse(createPlaceholderFlagSvg(), {
        headers: {
          'Content-Type': 'image/svg+xml',
        },
      });
    }),
  ],
  wikipedia: [
    http.get(/https:\/\/.+\.wikipedia\.org\/w\/api\.php/, async ({ request }) => {
      await delay(150);

      const url = new URL(request.url);
      const languageId = url.hostname.split('.')[0] ?? 'en';

      return HttpResponse.json(createWikipediaResponse(languageId));
    }),
  ],
};

function createPlaceholderFlagSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Mock image">
      <rect width="96" height="96" fill="#111827" />
      <circle cx="48" cy="48" r="28" fill="#f9fafb" opacity="0.9" />
      <path d="M48 24v48M24 48h48" stroke="#111827" stroke-width="8" stroke-linecap="round" />
    </svg>
  `.trim();
}
