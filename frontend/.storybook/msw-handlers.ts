import { http, HttpResponse } from 'msw';
import { wikiArticles } from './mock-data';

let wikipediaBatchIndex = 0;

export function resetMswState() {
  wikipediaBatchIndex = 0;
}

export const mswHandlers = [
  http.get(/https:\/\/[a-z-]+\.wikipedia\.org\/w\/api\.php/, ({ request }) => {
    const url = new URL(request.url);
    const variant = url.searchParams.get('variant') ?? 'en';
    const batch = buildWikipediaBatch(wikipediaBatchIndex);

    wikipediaBatchIndex += 1;

    return HttpResponse.json(buildWikipediaResponse(batch, variant));
  }),
  http.get(/https:\/\/hatscripts\.github\.io\/circle-flags\/flags\/.*/, ({ request }) => {
    const url = new URL(request.url);

    return new HttpResponse(buildFlagSvg(readAssetLabel(url.pathname)), {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  }),
  http.get(/https:\/\/upload\.wikimedia\.org\/.*/, ({ request }) => {
    const url = new URL(request.url);

    return new HttpResponse(buildFlagSvg(readAssetLabel(url.pathname)), {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  }),
];

function buildWikipediaResponse(
  articles: typeof wikiArticles,
  variant: string,
) {
  return {
    query: {
      pages: Object.fromEntries(
        articles.map((article) => [
          String(article.pageid),
          {
            title: article.title,
            extract: article.extract,
            pageid: article.pageid,
            thumbnail: article.thumbnail,
            canonicalurl: article.url,
            varianttitles: {
              [variant]: article.displaytitle,
            },
          },
        ]),
      ),
    },
  };
}

function buildWikipediaBatch(index: number) {
  const batchSuffixes = ['', ' Field Notes', ' Atlas'];
  const batchLabels = ['', ' Notes', ' Atlas'];
  const suffix = batchSuffixes[index] ?? ` Batch ${index + 1}`;
  const labelSuffix = batchLabels[index] ?? ` ${index + 1}`;

  return wikiArticles.map((article, articleIndex) => {
    if (index === 0) {
      return article;
    }

    const adjustedTitle = `${article.title}${suffix}`;

    return {
      ...article,
      title: adjustedTitle,
      displaytitle: adjustedTitle,
      pageid: article.pageid + index * 1000 + articleIndex,
      url: `https://en.wikipedia.org/wiki/${adjustedTitle.replace(/\s+/g, '_')}`,
      thumbnail: {
        ...article.thumbnail,
        source: article.thumbnail.source.replace(
          /([A-Za-z]+)%0A%20%20%20%20%20%20%3C%2Ftext%3E/,
          `$1${encodeURIComponent(labelSuffix)}%0A%20%20%20%20%20%20%3C%2Ftext%3E`,
        ),
      },
    };
  });
}

function buildFlagSvg(label: string) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="flag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#111827" />
          <stop offset="100%" stop-color="#4b5563" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill="url(#flag)" />
      <text
        x="32"
        y="38"
        text-anchor="middle"
        fill="white"
        font-size="20"
        font-family="ui-sans-serif, system-ui, sans-serif"
        font-weight="700"
      >
        ${label}
      </text>
    </svg>
  `;
}

function readAssetLabel(pathname: string) {
  const filename = pathname.split('/').pop() ?? 'flag.svg';
  const stem = filename.replace(/\..+$/, '');

  return stem.slice(0, 2).toUpperCase();
}
