import type { WikiArticle } from '../src/components/WikiCard';
import { LANGUAGES } from '../src/languages';

export const fixedNow = new Date('2024-04-01T12:00:00.000Z').valueOf();
export const mockLikedArticle = createMockArticle(501);
export const mockArticles = [1, 2, 3, 4, 5, 6].map((id) => createMockArticle(id));

export function buildWikipediaResponse(languageId: string, batchNumber: number) {
  const pages = createMockBatch(languageId, batchNumber).reduce<Record<string, WikipediaPage>>(
    (accumulator, article) => {
      accumulator[String(article.pageid)] = articleToPage(article);
      return accumulator;
    },
    {},
  );

  return {
    batchcomplete: '',
    query: {
      pages,
    },
  };
}

function createMockBatch(languageId: string, batchNumber: number) {
  return mockArticles.map((article, index) =>
    createMockArticle(batchNumber * 100 + index + 1, languageId, article.pageid),
  );
}

function createMockArticle(
  id: number,
  languageId = 'en',
  imageSeed = id,
): WikiArticle {
  const title = `Storybook Article ${id}`;

  return {
    title,
    displaytitle: `${title} (${languageId.toUpperCase()})`,
    extract:
      'A short Wikipedia-style summary used to keep Storybook deterministic while matching the real card layout and interactions.',
    pageid: id,
    url: `https://en.wikipedia.org/wiki/Storybook_Article_${id}`,
    thumbnail: {
      source: createThumbnailDataUri(imageSeed),
      width: 800,
      height: 1200,
    },
  };
}

function articleToPage(article: WikiArticle): WikipediaPage {
  return {
    title: article.title,
    pageid: article.pageid,
    extract: article.extract,
    canonicalurl: article.url,
    thumbnail: article.thumbnail,
    varianttitles: createVariantTitles(article.displaytitle),
  };
}

function createVariantTitles(displaytitle: string) {
  return Object.fromEntries(LANGUAGES.map(({ id }) => [id, displaytitle]));
}

function createThumbnailDataUri(seed: number) {
  const hue = (seed * 47) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="hsl(${hue} 70% 58%)" />
      <stop offset="100%" stop-color="hsl(${(hue + 80) % 360} 65% 22%)" />
    </linearGradient>
  </defs>
  <rect width="800" height="1200" fill="url(#g)" />
  <circle cx="640" cy="220" r="140" fill="rgba(255,255,255,0.18)" />
  <circle cx="180" cy="980" r="180" fill="rgba(255,255,255,0.12)" />
  <text x="72" y="1040" fill="white" font-family="Arial, sans-serif" font-size="88" font-weight="700">
    WikiTok ${seed}
  </text>
</svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

interface WikipediaPage {
  title: string;
  pageid: number;
  extract: string;
  canonicalurl: string;
  thumbnail: WikiArticle['thumbnail'];
  varianttitles: Record<string, string>;
}
