import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const likedArticle: WikiArticle = {
  title: 'Great Barrier Reef',
  displaytitle: 'Great Barrier Reef',
  extract:
    'The Great Barrier Reef is the world\'s largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometres.',
  pageid: 99999,
  url: 'https://en.wikipedia.org/wiki/Great_Barrier_Reef',
  thumbnail: {
    source: 'https://placehold.co/800x600/006994/ffffff?text=Reef',
    width: 800,
    height: 600,
  },
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PreLikedArticle: Story = {
  args: {
    article: likedArticle,
  },
  async beforeEach() {
    localStorage.setItem(
      'likedArticles',
      JSON.stringify([likedArticle]),
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /great barrier reef/i })).toBeVisible();
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
    // The like button should have a red background since article is pre-liked
    await expect(likeButton.className).toContain('bg-red-500');
  },
};

export const ToggleLikeOff: Story = {
  args: {
    article: likedArticle,
  },
  async beforeEach() {
    localStorage.setItem(
      'likedArticles',
      JSON.stringify([likedArticle]),
    );
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    // Initially liked (red bg)
    await expect(likeButton.className).toContain('bg-red-500');
    await userEvent.click(likeButton);
    // After toggle, should no longer be red
    await waitFor(() => {
      expect(likeButton.className).not.toContain('bg-red-500');
    });
  },
};

export const DoubleTapToLike: Story = {
  args: {
    article: likedArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const heading = canvas.getByRole('heading', { name: /great barrier reef/i });
    await expect(heading).toBeVisible();
    // Double click to like
    const card = heading.closest('[class*="snap-start"]');
    if (card) {
      await userEvent.dblClick(card);
    }
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton.className).toContain('bg-red-500');
  },
};
