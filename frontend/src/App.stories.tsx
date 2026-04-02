import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import App from './App';
import type { WikiArticle } from './components/WikiCard';

const observerStub = class {
  disconnect() {}
  observe() {}
  unobserve() {}
};

const feedArticles = [
  {
    pageid: 501,
    title: 'Bioluminescence',
    extract:
      'Bioluminescence is the production and emission of light by living organisms, often used for camouflage, attraction, or warning.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Bioluminescence',
    thumbnail: {
      source:
        'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
      width: 1200,
      height: 800,
    },
    varianttitles: {
      en: 'Bioluminescence',
    },
  },
  {
    pageid: 502,
    title: 'Rainforest',
    extract:
      'Rainforests are dense forests characterized by high rainfall, layered canopies, and extraordinary biodiversity.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Rainforest',
    thumbnail: {
      source:
        'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      width: 1200,
      height: 800,
    },
    varianttitles: {
      en: 'Rainforest',
    },
  },
];

const likedArticle: WikiArticle = {
  title: 'Moonbow',
  displaytitle: 'Moonbow',
  extract:
    'A moonbow is a rainbow produced by moonlight rather than direct sunlight and is often visible near waterfalls or misty valleys.',
  pageid: 9001,
  url: 'https://en.wikipedia.org/wiki/Moonbow',
  thumbnail: {
    source:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    width: 1200,
    height: 800,
  },
};

const mockFetch: typeof fetch = async () =>
  new Response(
    JSON.stringify({
      query: {
        pages: Object.fromEntries(feedArticles.map((article) => [article.pageid, article])),
      },
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

const meta = {
  title: 'AI Generated/Complex/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
    mockFetch,
    mockIntersectionObserver: observerStub,
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BrowsingFeed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('button', { name: 'About' })).toBeInTheDocument();
    await expect(await canvas.findByText('Bioluminescence')).toBeInTheDocument();
  },
};

export const LikesPanelOpen: Story = {
  parameters: {
    likedArticles: [likedArticle],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Likes' }));

    await expect(canvas.getByRole('heading', { name: 'Liked Articles' })).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: 'Moonbow' })).toBeInTheDocument();
  },
};
