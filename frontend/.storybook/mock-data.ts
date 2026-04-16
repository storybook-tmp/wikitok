import type { WikiArticle } from '../src/components/WikiCard';

export const wikiArticles: WikiArticle[] = [
  createArticle({
    pageid: 101,
    title: 'Aurora Basin',
    extract:
      'Aurora Basin is a glacial valley known for ice-lit fog, reflective water, and a long history of field astronomy.',
    thumbnailLabel: 'Aurora',
    colors: ['#0f172a', '#2563eb'],
  }),
  createArticle({
    pageid: 102,
    title: 'Basalt Garden',
    extract:
      'Basalt Garden is a volcanic landscape where dark stone terraces trap rainwater and support rare flowering moss.',
    thumbnailLabel: 'Basalt',
    colors: ['#1f2937', '#f97316'],
  }),
  createArticle({
    pageid: 103,
    title: 'Citadel of Glass',
    extract:
      'The Citadel of Glass is a restored hilltop archive whose mirrored towers were designed to signal weather changes.',
    thumbnailLabel: 'Citadel',
    colors: ['#1e3a8a', '#06b6d4'],
  }),
  createArticle({
    pageid: 104,
    title: 'Delta Archive',
    extract:
      'Delta Archive preserves shipping records, oral histories, and flood maps from the river settlements along the south coast.',
    thumbnailLabel: 'Delta',
    colors: ['#164e63', '#14b8a6'],
  }),
  createArticle({
    pageid: 105,
    title: 'Ember Coast',
    extract:
      'Ember Coast refers to a red-sand shoreline whose cliffs glow at sunset because of iron-rich sediment layers.',
    thumbnailLabel: 'Ember',
    colors: ['#7c2d12', '#ef4444'],
  }),
  createArticle({
    pageid: 106,
    title: 'Forest Observatory',
    extract:
      'Forest Observatory is an educational nature reserve where researchers map nocturnal bird routes from elevated timber decks.',
    thumbnailLabel: 'Forest',
    colors: ['#14532d', '#84cc16'],
  }),
];

export const likedArticlesSeed: WikiArticle[] = [
  wikiArticles[0],
  wikiArticles[2],
  wikiArticles[4],
];

export const featuredArticle = wikiArticles[1];

export const likedArticle = wikiArticles[2];

export const longReadArticle: WikiArticle = {
  ...wikiArticles[5],
  pageid: 206,
  extract:
    'Forest Observatory is an educational nature reserve where researchers map nocturnal bird routes from elevated timber decks. The site combines public boardwalks, archival exhibits, and a weather station that publishes nightly migration summaries. Visitors typically arrive for the long dusk window, when the canopy shifts from green to blue and the reserve lights reflect across the marsh channels below.',
};

function createArticle({
  pageid,
  title,
  extract,
  thumbnailLabel,
  colors,
}: {
  pageid: number;
  title: string;
  extract: string;
  thumbnailLabel: string;
  colors: [string, string];
}): WikiArticle {
  return {
    title,
    displaytitle: title,
    extract,
    pageid,
    url: `https://en.wikipedia.org/wiki/${title.replace(/\s+/g, '_')}`,
    thumbnail: {
      source: createThumbnailDataUrl(thumbnailLabel, colors),
      width: 1200,
      height: 1600,
    },
  };
}

function createThumbnailDataUrl(
  label: string,
  [startColor, endColor]: [string, string],
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${startColor}" />
          <stop offset="100%" stop-color="${endColor}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="1600" fill="url(#g)" />
      <circle cx="980" cy="220" r="180" fill="rgba(255,255,255,0.12)" />
      <rect x="84" y="1140" width="1032" height="292" rx="44" fill="rgba(15,23,42,0.45)" />
      <text
        x="120"
        y="1280"
        fill="white"
        font-size="108"
        font-family="ui-sans-serif, system-ui, sans-serif"
        font-weight="700"
      >
        ${label}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
