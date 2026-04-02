import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import App from './App';
import type { WikiArticle } from './components/WikiCard';

type AppStoryParameters = {
  appFeed?: WikiArticle[];
};

const feedArticle = createArticle({
  pageid: 101,
  title: 'Glacier lake overlook',
  extract:
    'Visitors gathered along the overlook after sunrise as cloud cover broke apart and the lake reflected the surrounding peaks.',
  colors: ['#1d4ed8', '#0f172a', '#1e3a8a'],
});

const likedArticle = createArticle({
  pageid: 202,
  title: 'Night market',
  extract:
    'The riverside night market expanded this year, adding more food stalls, late performances, and a sheltered dining area.',
  colors: ['#ea580c', '#7c2d12', '#1f2937'],
});

const meta = {
  title: 'AI Generated/Complex/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
    language: 'en',
    appFeed: [feedArticle],
  },
  decorators: [
    (Story, context) => {
      const { appFeed } = context.parameters as AppStoryParameters;

      return (
        <AppStoryEnvironment appFeed={appFeed ?? [feedArticle]}>
          <Story />
        </AppStoryEnvironment>
      );
    },
  ],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFeed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByRole('heading', { name: 'Glacier lake overlook' }),
    ).toBeInTheDocument();
  },
};

export const LikesPanelOpen: Story = {
  parameters: {
    likedArticles: [likedArticle],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByRole('heading', { name: 'Glacier lake overlook' });
    await userEvent.click(canvas.getByRole('button', { name: 'Likes' }));

    await expect(canvas.getByRole('heading', { name: 'Liked Articles' })).toBeInTheDocument();
    await expect(canvas.getByText('Night market')).toBeInTheDocument();
  },
};

function AppStoryEnvironment({
  children,
  appFeed,
}: {
  children: ReactNode;
  appFeed: WikiArticle[];
}) {
  const originalFetchRef = useRef(globalThis.fetch);
  const originalObserverRef = useRef(globalThis.IntersectionObserver);

  globalThis.fetch = createFetchMock(appFeed);
  globalThis.IntersectionObserver = MockIntersectionObserver as typeof IntersectionObserver;

  useEffect(() => {
    return () => {
      globalThis.fetch = originalFetchRef.current;
      globalThis.IntersectionObserver = originalObserverRef.current;
    };
  }, []);

  return <div className="h-screen w-full overflow-hidden">{children}</div>;
}

function createFetchMock(appFeed: WikiArticle[]): typeof fetch {
  const payload = {
    query: {
      pages: Object.fromEntries(
        appFeed.map((article) => [
          article.pageid,
          {
            title: article.title,
            pageid: article.pageid,
            thumbnail: article.thumbnail,
            canonicalurl: article.url,
            extract: article.extract,
            varianttitles: {
              en: article.displaytitle,
            },
          },
        ]),
      ),
    },
  };

  return (async () =>
    new Response(JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      },
    })) as typeof fetch;
}

function createArticle({
  pageid,
  title,
  extract,
  colors,
}: {
  pageid: number;
  title: string;
  extract: string;
  colors: [string, string, string];
}): WikiArticle {
  return {
    title,
    displaytitle: title,
    extract,
    pageid,
    url: `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(' ', '_'))}`,
    thumbnail: {
      source: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${colors[0]}" />
              <stop offset="45%" stop-color="${colors[1]}" />
              <stop offset="100%" stop-color="${colors[2]}" />
            </linearGradient>
          </defs>
          <rect width="800" height="1200" fill="url(#bg)" />
          <path d="M0 930 C130 840 240 980 400 900 C550 820 640 980 800 890 L800 1200 L0 1200 Z" fill="#020617" fill-opacity="0.85" />
          <circle cx="620" cy="220" r="70" fill="#f8fafc" fill-opacity="0.75" />
        </svg>`,
      )}`,
      width: 800,
      height: 1200,
    },
  };
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '0px';
  readonly thresholds = [0];

  constructor(
    _callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit,
  ) {}

  disconnect() {}

  observe(_target: Element) {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve(_target: Element) {}
}
