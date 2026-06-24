import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import App from './App';
import { LikedArticlesProvider } from './contexts/LikedArticlesContext';
import type { WikiArticle } from './components/WikiCard';

const feedArticles: WikiArticle[] = [
  {
    title: 'Storybook',
    displaytitle: 'Storybook',
    extract:
      'Storybook helps teams build UI components in isolation and review them in a shared visual workspace.',
    pageid: 1001,
    thumbnail: {
      source:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      width: 1200,
      height: 800,
    },
    url: 'https://example.com/wiki/storybook',
  },
  {
    title: 'Accessibility',
    displaytitle: 'Accessibility',
    extract:
      'Accessibility work improves the usability of products for people using a wide range of devices and assistive technologies.',
    pageid: 1002,
    thumbnail: {
      source:
        'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
      width: 1200,
      height: 800,
    },
    url: 'https://example.com/wiki/accessibility',
  },
];

type AppStoryArgs = {
  articles: WikiArticle[];
  likedArticles: WikiArticle[];
};

type MockWikiPage = {
  canonicalurl: string;
  extract: string;
  pageid: number;
  thumbnail: WikiArticle['thumbnail'];
  title: string;
  varianttitles: Record<string, string>;
};

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

class MockImage {
  onerror: ((this: GlobalEventHandlers, ev: Event | string) => unknown) | null = null;
  onload: ((this: GlobalEventHandlers, ev: Event) => unknown) | null = null;

  set src(_value: string) {
    queueMicrotask(() => {
      this.onload?.call(window, new Event('load'));
    });
  }
}

function buildPages(articles: WikiArticle[]) {
  return Object.fromEntries(
    articles.map((article) => [
      String(article.pageid),
      {
        canonicalurl: article.url,
        extract: article.extract,
        pageid: article.pageid,
        thumbnail: article.thumbnail,
        title: article.title,
        varianttitles: {
          en: article.displaytitle,
        },
      } satisfies MockWikiPage,
    ]),
  );
}

function primeAppEnvironment({
  articles,
  likedArticles,
}: AppStoryArgs) {
  localStorage.setItem('lang', 'en');
  localStorage.setItem('likedArticles', JSON.stringify(likedArticles));

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        query: {
          pages: buildPages(articles),
        },
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      },
    );

  window.IntersectionObserver = MockIntersectionObserver;
  window.Image = MockImage as unknown as typeof Image;
}

const meta = {
  title: 'AI Generated/Complex/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    articles: feedArticles,
    likedArticles: [],
  },
  render: ({ articles, likedArticles }) => {
    primeAppEnvironment({ articles, likedArticles });

    return (
      <LikedArticlesProvider>
        <App />
      </LikedArticlesProvider>
    );
  },
} satisfies Meta<AppStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Feed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.findByText('Storybook')).resolves.toBeInTheDocument();
    await expect(canvas.findByText(/Storybook helps teams build UI components/i)).resolves.toBeInTheDocument();
  },
};

export const LikesPanelOpen: Story = {
  args: {
    likedArticles: [feedArticles[0]],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));
    await expect(canvas.getByText('Liked Articles')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /remove from likes/i })).toBeInTheDocument();
  },
};
