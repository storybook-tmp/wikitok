import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import App from './App';
import type { WikiArticle } from './components/WikiCard';

const feedArticles: WikiArticle[] = [
  {
    title: 'Storybook basics',
    displaytitle: 'Storybook basics',
    extract:
      'Storybook helps teams build and review interface states without booting the whole app.',
    pageid: 101,
    url: 'https://storybook.js.org/docs',
    thumbnail: {
      source:
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200"><rect width="100%25" height="100%25" fill="%230f172a"/><text x="50%25" y="48%25" fill="%23fff" font-family="Arial" font-size="52" text-anchor="middle">Storybook basics</text></svg>',
      width: 800,
      height: 1200,
    },
  },
  {
    title: 'Component-driven design',
    displaytitle: 'Component-driven design',
    extract:
      'Component-driven workflows make it easier to reason about states, interactions, and regressions.',
    pageid: 102,
    url: 'https://componentdriven.org/',
    thumbnail: {
      source:
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200"><rect width="100%25" height="100%25" fill="%231e293b"/><text x="50%25" y="48%25" fill="%23fff" font-family="Arial" font-size="46" text-anchor="middle">Component-driven design</text></svg>',
      width: 800,
      height: 1200,
    },
  },
];

function createFetchResponse(articles: WikiArticle[]) {
  return {
    query: {
      pages: Object.fromEntries(
        articles.map((article) => [
          String(article.pageid),
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
}

function installFetchMock(articles: WikiArticle[]) {
  const originalFetch = globalThis.fetch;
  const body = JSON.stringify(createFetchResponse(articles));

  const mockFetch: typeof fetch = async () =>
    new Response(body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

  globalThis.fetch = mockFetch;

  return () => {
    globalThis.fetch = originalFetch;
  };
}

const meta = {
  title: 'AI Generated/Complex/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFeed: Story = {
  beforeEach: () => installFetchMock(feedArticles),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      await canvas.findByRole('heading', { name: /Storybook basics/i }),
    ).toBeVisible();
  },
};

export const LikesPanel: Story = {
  beforeEach: () => {
    localStorage.setItem('likedArticles', JSON.stringify([feedArticles[0]]));
    return installFetchMock(feedArticles);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likesButton = await canvas.findByRole('button', { name: 'Likes' });

    await userEvent.click(likesButton);

    await expect(
      await canvas.findByRole('heading', { name: 'Liked Articles' }),
    ).toBeVisible();
    await expect(
      await canvas.findByPlaceholderText('Search liked articles...'),
    ).toBeVisible();
    await expect(
      await canvas.findByRole('button', { name: 'Remove from likes' }),
    ).toBeVisible();
    await expect(
      await canvas.findByRole('button', { name: /Export/i }),
    ).toBeVisible();
  },
};
