import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { mockWikiArticles } from '../../.storybook/wiki-fixtures';
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
    article: mockWikiArticles[0],
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /ada lovelace/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: /read more/i }),
    ).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Ada_Lovelace');
  },
};

export const Liked: Story = {
  args: {
    article: mockWikiArticles[1],
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await userEvent.click(likeButton);

    await waitFor(() =>
      expect(getComputedStyle(likeButton).backgroundColor).toBe(
        'oklch(0.637 0.237 25.331)',
      ),
    );
  },
};

export const CssCheck: Story = {
  args: {
    article: mockWikiArticles[2],
  },
  play: async ({ canvas }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await expect(getComputedStyle(likeButton).paddingTop).toBe('8px');
  },
};
