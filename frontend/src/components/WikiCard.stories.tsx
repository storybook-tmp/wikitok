import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import {
  alanTuringArticle,
  graceHopperArticle,
  likedArticle,
} from '../../.storybook/mock-data';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['ai-generated'],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: alanTuringArticle,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /Alan Turing/i }),
    ).toBeVisible();
    await expect(canvas.getByRole('link', { name: /Read more/i })).toHaveAttribute(
      'href',
      alanTuringArticle.url,
    );
    await expect(
      canvas.getByRole('button', { name: /Like article/i }),
    ).toBeEnabled();
  },
};

export const LikedFromStorage: Story = {
  args: {
    article: likedArticle,
  },
  play: async ({ canvas }) => {
    const likeButton = canvas.getByRole('button', { name: /Like article/i });

    await expect(
      canvas.getByRole('heading', { name: /Ada Lovelace/i }),
    ).toBeVisible();
    await waitFor(() => expect(likeButton).toHaveClass('bg-red-500'));
  },
};

export const LikeInteraction: Story = {
  args: {
    article: graceHopperArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /Like article/i });

    await expect(likeButton).not.toHaveClass('bg-red-500');
    await userEvent.click(likeButton);
    await waitFor(() => expect(likeButton).toHaveClass('bg-red-500'));
  },
};

export const CssCheck: Story = {
  args: {
    article: likedArticle,
  },
  play: async ({ canvas }) => {
    const likeButton = canvas.getByRole('button', { name: /Like article/i });

    await expect(getComputedStyle(likeButton).backgroundColor).toBe(
      'oklch(0.637 0.237 25.331)',
    );
  },
};
