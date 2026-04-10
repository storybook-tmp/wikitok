import { HttpResponse, http } from 'msw';
import { storyWikiArticles } from './mock-data';

let wikiRequestCount = 0;

export function resetMswState() {
  wikiRequestCount = 0;
}

export const mswHandlers = [
  http.get(/https:\/\/[a-z-]+\.wikipedia\.org\/w\/api\.php/, ({ request }) => {
    const url = new URL(request.url);
    const languageId = url.searchParams.get('variant') ?? 'en';
    const pages = createWikipediaPages(languageId, wikiRequestCount);

    wikiRequestCount += 1;

    return HttpResponse.json({
      batchcomplete: '',
      query: {
        pages,
      },
    });
  }),
  http.get('https://hatscripts.github.io/circle-flags/flags/:flagId', ({ params }) =>
    HttpResponse.text(createFlagSvg(String(params.flagId)), {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    }),
  ),
  http.get(/https:\/\/upload\.wikimedia\.org\/.+/, () =>
    HttpResponse.text(createFlagSvg('eo'), {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    }),
  ),
];

function createWikipediaPages(languageId: string, requestIndex: number) {
  const primaryArticle = storyWikiArticles[0];
  const rotatingArticles = storyWikiArticles
    .slice(1)
    .map((article, index) => storyWikiArticles[(requestIndex + index + 1) % storyWikiArticles.length] ?? article)
    .slice(0, 3);
  const batch = [primaryArticle, ...rotatingArticles];

  return Object.fromEntries(
    batch.map((article, index) => {
      const pageid = article.pageid + requestIndex * 100 + index;
      const localizedTitle = index === 0 ? article.displaytitle : `${article.displaytitle} ${requestIndex + 1}`;

      return [
        String(pageid),
        {
          pageid,
          title: article.title,
          extract: article.extract,
          thumbnail: article.thumbnail,
          canonicalurl: createArticleUrl(languageId, article.title),
          varianttitles: {
            [languageId]: localizedTitle,
          },
        },
      ];
    }),
  );
}

function createArticleUrl(languageId: string, title: string) {
  return `https://${languageId}.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(' ', '_'))}`;
}

function createFlagSvg(flagId: string) {
  const label = flagId.replace('.svg', '').slice(0, 6).toUpperCase();

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="32" fill="#111827" />
      <circle cx="32" cy="32" r="26" fill="#2563eb" />
      <text
        x="32"
        y="37"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="16"
        fill="#ffffff"
      >
        ${label}
      </text>
    </svg>
  `.trim();
}
