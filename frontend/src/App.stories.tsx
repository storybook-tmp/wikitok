import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import type { WikiArticle } from './components/WikiCard';
import App from './App';

const createThumbnail = (label: string, background: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200">
      <rect width="800" height="1200" fill="${background}" />
      <text x="400" y="600" fill="white" font-size="56" text-anchor="middle" font-family="Arial, sans-serif">
        ${label}
      </text>
    </svg>`,
  )}`;

const appArticles: WikiArticle[] = [
  {
    title: 'Cloud Forest',
    displaytitle: 'Cloud Forest',
    extract:
      'Cloud forests are montane ecosystems where frequent low-level cloud cover supports exceptional biodiversity.',
    pageid: 501,
    url: 'https://en.wikipedia.org/wiki/Cloud_forest',
    thumbnail: {
      source: createThumbnail('Cloud Forest', '#1d4ed8'),
      width: 800,
      height: 1200,
    },
  },
  {
    title: 'Solar Updraft Tower',
    displaytitle: 'Solar Updraft Tower',
    extract:
      'A solar updraft tower uses solar-heated air to drive turbines and generate electricity.',
    pageid: 502,
    url: 'https://en.wikipedia.org/wiki/Solar_updraft_tower',
    thumbnail: {
      source: createThumbnail('Solar Tower', '#b45309'),
      width: 800,
      height: 1200,
    },
  },
];

const likedArticles: WikiArticle[] = [appArticles[1]];

const wikiResponse = {
  query: {
    pages: Object.fromEntries(
      appArticles.map((article) => [
        article.pageid,
        {
          title: article.title,
          varianttitles: {
            en: article.displaytitle,
          },
          extract: article.extract,
          pageid: article.pageid,
          thumbnail: article.thumbnail,
          canonicalurl: article.url,
        },
      ]),
    ),
  },
};

function createJsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '0px';
  readonly thresholds = [0];

  disconnect() {}

  observe() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve() {}
}

const meta = {
  title: 'AI Generated/Complex/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      globalThis.fetch = async () => createJsonResponse(wikiResponse);
      window.IntersectionObserver = MockIntersectionObserver;

      return <Story />;
    },
  ],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FeedLoaded: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(await canvas.findByRole('link', { name: 'Cloud Forest' })).toBeInTheDocument();
    await expect(
      await canvas.findByRole('link', { name: 'Solar Updraft Tower' }),
    ).toBeInTheDocument();
  },
};

export const LikesPanelOpen: Story = {
  parameters: {
    initialLikedArticles: likedArticles,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Likes' }));

    await expect(canvas.getByRole('heading', { name: 'Liked Articles' })).toBeInTheDocument();
    await expect(canvas.getAllByRole('link', { name: 'Solar Updraft Tower' }).length).toBeGreaterThan(
      0,
    );
  },
};
