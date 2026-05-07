import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard, type WikiArticle } from './WikiCard';

const articleImage =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%230f766e%22%2F%3E%3Ctext%20x%3D%22400%22%20y%3D%22308%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%22%20font-size%3D%2248%22%20fill%3D%22white%22%3EWikipedia%3C%2Ftext%3E%3C%2Fsvg%3E';

const defaultArticle: WikiArticle = {
  title: 'Apollo program',
  displaytitle: 'Apollo program',
  extract:
    'The Apollo program was a human spaceflight program carried out by NASA, known for landing the first humans on the Moon.',
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Apollo_program',
  thumbnail: {
    source: articleImage,
    width: 800,
    height: 600,
  },
};

const likedArticle: WikiArticle = {
  title: 'Seeded Storybook Favorite',
  displaytitle: 'Seeded Storybook Favorite',
  extract:
    'A deterministic liked article used by Storybook to mirror the app favorites state.',
  pageid: 404,
  url: 'https://en.wikipedia.org/wiki/Storybook',
  thumbnail: {
    source: articleImage,
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

export const Default: Story = {
  args: {
    article: defaultArticle,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /apollo program/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /like article/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: /read more/i }),
    ).toHaveAttribute('href', defaultArticle.url);
  },
};

export const AlreadyLiked: Story = {
  args: {
    article: likedArticle,
  },
  play: async ({ canvas }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await expect(
      canvas.getByRole('heading', { name: /seeded storybook favorite/i }),
    ).toBeVisible();
    await expect(likeButton).toHaveClass(/bg-red-500/);
  },
};

export const LikeInteraction: Story = {
  args: {
    article: defaultArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await expect(likeButton).not.toHaveClass(/bg-red-500/);
    await userEvent.click(likeButton);

    await expect(likeButton).toHaveClass(/bg-red-500/);
  },
};
