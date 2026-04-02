import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import App from './App';
import { LikedArticlesProvider } from './contexts/LikedArticlesContext';
import {
  createWikipediaResponse,
  sampleWikiArticle,
  sampleWikiArticles,
} from './storybook/fixtures';

const appStoryArticles = sampleWikiArticles.map((article) => ({
  ...article,
  thumbnail: {
    ...article.thumbnail,
    source: createSvgDataUri(article.displaytitle),
  },
}));

const meta = {
  title: 'AI Generated/Complex/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadedFeed: Story = {
  render: () => renderAppStory([]),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText(sampleWikiArticle.displaytitle)).toBeInTheDocument();
  },
};

export const LikesPanelOpen: Story = {
  render: () => renderAppStory(sampleWikiArticles.slice(0, 2)),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));
    await expect(canvas.getByRole('heading', { name: /liked articles/i })).toBeInTheDocument();
    await expect(canvas.getByPlaceholderText(/search liked articles/i)).toBeInTheDocument();
    await expect(canvas.getAllByRole('button', { name: /remove from likes/i })).toHaveLength(2);
  },
};

function renderAppStory(likedArticles: typeof sampleWikiArticles) {
  installFetchMock();
  installIntersectionObserverMock();
  localStorage.setItem('lang', 'en');
  localStorage.setItem('likedArticles', JSON.stringify(likedArticles));

  return (
    <LikedArticlesProvider>
      <App />
    </LikedArticlesProvider>
  );
}

function installFetchMock() {
  globalThis.fetch = (async (input) => {
    if (typeof input === 'string' && input.includes('/w/api.php')) {
      return new Response(JSON.stringify(createWikipediaResponse(appStoryArticles)), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    }

    return new Response('{}', {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  }) as typeof fetch;
}

function installIntersectionObserverMock() {
  globalThis.IntersectionObserver = class IntersectionObserverMock implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds = [];

    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
    unobserve() {}
  };
}

function createSvgDataUri(label: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <rect width="1200" height="800" fill="#111827" />
      <text x="50%" y="50%" fill="#f9fafb" font-family="Arial, sans-serif" font-size="72" text-anchor="middle">${label}</text>
    </svg>`,
  )}`;
}
