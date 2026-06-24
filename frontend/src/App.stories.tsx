import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import App from './App';
import type { WikiArticle } from './components/WikiCard';

const sampleArticles: WikiArticle[] = [
  {
    title: 'Moon',
    displaytitle: 'Moon',
    extract: 'Earth’s only natural satellite and the brightest object in the night sky after the Sun.',
    pageid: 11,
    url: 'https://en.wikipedia.org/wiki/Moon',
    thumbnail: {
      source: 'https://picsum.photos/seed/moon/1280/1920',
      width: 1280,
      height: 1920,
    },
  },
  {
    title: 'Forest',
    displaytitle: 'Forest',
    extract: 'A large area dominated by trees, undergrowth, wildlife, and rich ecological systems.',
    pageid: 12,
    url: 'https://en.wikipedia.org/wiki/Forest',
    thumbnail: {
      source: 'https://picsum.photos/seed/forest/1280/1920',
      width: 1280,
      height: 1920,
    },
  },
];

const likedArticle: WikiArticle = {
  title: 'Aurora',
  displaytitle: 'Aurora',
  extract: 'A glow in polar skies produced by energetic particles colliding with the atmosphere.',
  pageid: 99,
  url: 'https://en.wikipedia.org/wiki/Aurora',
  thumbnail: {
    source: 'https://picsum.photos/seed/aurora-liked/1280/1920',
    width: 1280,
    height: 1920,
  },
};

const meta = {
  title: 'AI Generated/Complex/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
    mockArticles: sampleArticles,
  },
  decorators: [
    (Story, context) => {
      installAppMocks(context.parameters.mockArticles ?? sampleArticles);
      return <Story />;
    },
  ],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FeedLoaded: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.findByRole('heading', { name: 'Moon' })).resolves.toBeInTheDocument();
    await expect(canvas.getAllByRole('button', { name: 'Like article' })).toHaveLength(2);
  },
};

export const LikesPanel: Story = {
  parameters: {
    initialLikedArticles: [likedArticle],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Likes' }));
    await expect(canvas.getByRole('heading', { name: 'Liked Articles' })).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: 'Aurora' })).toBeInTheDocument();
  },
};

function installAppMocks(articles: WikiArticle[]) {
  window.fetch = async () =>
    new Response(JSON.stringify(createWikipediaResponse(articles)), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as typeof IntersectionObserver;

  window.Image = class {
    onload: null | (() => void) = null;
    onerror: null | (() => void) = null;

    set src(_value: string) {
      queueMicrotask(() => this.onload?.());
    }
  } as typeof Image;
}

function createWikipediaResponse(articles: WikiArticle[]) {
  return {
    query: {
      pages: Object.fromEntries(
        articles.map((article) => [
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
}
