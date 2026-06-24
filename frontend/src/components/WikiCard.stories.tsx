import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { WikiCard, type WikiArticle } from './WikiCard';

const article: WikiArticle = {
  title: 'Aurora',
  displaytitle: 'Aurora',
  extract:
    'Auroras are natural light displays that appear in the night sky near the polar regions.',
  pageid: 1001,
  url: 'https://en.wikipedia.org/wiki/Aurora',
  thumbnail: {
    source:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    width: 1200,
    height: 800,
  },
};

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    article,
  },
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  loaders: [
    async () => {
      localStorage.setItem('likedArticles', JSON.stringify([]));
      return {};
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('heading', { name: 'Aurora' })).toBeInTheDocument();
    await expect(canvas.getByText(/natural light displays/i)).toBeInTheDocument();
  },
};

export const Liked: Story = {
  loaders: [
    async () => {
      localStorage.setItem('likedArticles', JSON.stringify([article]));
      return {};
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likeButton = canvas.getByLabelText('Like article');

    await expect(likeButton).toHaveClass('bg-red-500');
  },
};
