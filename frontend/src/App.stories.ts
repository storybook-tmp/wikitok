import { createElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import App from './App';
import { LikedArticlesProvider } from './contexts/LikedArticlesContext';
import type { WikiArticle } from './components/WikiCard';

const feedArticles: WikiArticle[] = [
  {
    title: 'Solar Garden',
    displaytitle: 'Solar Garden',
    extract:
      'A solar garden is a shared photovoltaic installation that lets multiple people benefit from the same renewable energy project.',
    pageid: 301,
    url: 'https://en.wikipedia.org/wiki/Solar_power',
    thumbnail: {
      source: createThumbnailDataUrl('Solar Garden'),
      width: 1200,
      height: 800,
    },
  },
  {
    title: 'Wind Atlas',
    displaytitle: 'Wind Atlas',
    extract:
      'A wind atlas visualizes regional wind patterns to help researchers and planners choose promising sites.',
    pageid: 302,
    url: 'https://en.wikipedia.org/wiki/Wind_power',
    thumbnail: {
      source: createThumbnailDataUrl('Wind Atlas'),
      width: 1200,
      height: 800,
    },
  },
];

const meta = {
  title: 'AI Generated/Complex/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FeedLoaded: Story = {
  render: () => renderApp([]),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole('heading', { name: /Solar Garden/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /likes/i })).toBeVisible();
  },
};

export const LikesPanel: Story = {
  render: () => renderApp([feedArticles[1]]),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));
    await expect(await canvas.findByRole('heading', { name: /liked articles/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /remove from likes/i })).toBeVisible();
  },
};

function renderApp(likedArticles: WikiArticle[]) {
  installAppBrowserMocks(feedArticles);
  localStorage.setItem('lang', 'en');
  localStorage.setItem('likedArticles', JSON.stringify(likedArticles));

  return createElement(
    LikedArticlesProvider,
    null,
    createElement(App),
  );
}

function installAppBrowserMocks(articles: WikiArticle[]) {
  const fetchMock = async () =>
    new Response(JSON.stringify(createWikiResponse(articles)), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  Object.defineProperty(globalThis, 'fetch', {
    configurable: true,
    writable: true,
    value: fetchMock,
  });

  Object.defineProperty(window, 'fetch', {
    configurable: true,
    writable: true,
    value: fetchMock,
  });

  Object.defineProperty(window, 'IntersectionObserver', {
    configurable: true,
    writable: true,
    value: MockIntersectionObserver,
  });
}

function createWikiResponse(articles: WikiArticle[]) {
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

function createThumbnailDataUrl(label: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#111827" />
          <stop offset="100%" stop-color="#2563eb" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg)" />
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="white"
        font-family="sans-serif"
        font-size="84"
      >
        ${label}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
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
