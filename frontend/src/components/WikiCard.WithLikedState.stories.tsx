import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const likedArticle: WikiArticle = {
  title: 'Theory of Relativity',
  displaytitle: 'Theory of Relativity',
  extract:
    'The theory of relativity usually encompasses two interrelated physics theories by Albert Einstein: special relativity and general relativity, proposed and published in 1905 and 1915, respectively.',
  pageid: 5001,
  url: 'https://en.wikipedia.org/wiki/Theory_of_relativity',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg',
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
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    // When pre-liked, the button should have bg-red-500 class
    await waitFor(() => {
      expect(likeButton.className).toMatch(/bg-red-500/);
    });
  },
};

export const UnlikeArticle: Story = {
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
    await waitFor(() => {
      expect(likeButton.className).toMatch(/bg-red-500/);
    });
    await userEvent.click(likeButton);
    await waitFor(() => {
      expect(likeButton.className).not.toMatch(/bg-red-500/);
    });
  },
};

export const DoubleTapToLike: Story = {
  args: {
    article: {
      ...likedArticle,
      pageid: 6001,
    },
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    // Initially not liked
    await expect(likeButton.className).not.toMatch(/bg-red-500/);
    // Double click the card area to like
    const heading = canvas.getByRole('heading', {
      name: /theory of relativity/i,
    });
    await userEvent.dblClick(heading);
    await waitFor(() => {
      expect(likeButton.className).toMatch(/bg-red-500/);
    });
  },
};
