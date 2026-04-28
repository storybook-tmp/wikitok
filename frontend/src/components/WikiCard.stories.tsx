import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    "An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth's sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.",
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
    width: 800,
    height: 600,
  },
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /aurora borealis/i })
    ).toBeVisible();
    await expect(canvas.getByText(/natural light display/i)).toBeVisible();
    await expect(canvas.getByText('Read more →')).toBeVisible();
  },
};

export const LikedState: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
    await userEvent.click(likeButton);
    await waitFor(() => {
      expect(likeButton.className).toMatch(/bg-red-500/);
    });
  },
};

export const ShareButton: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas }) => {
    const shareButton = canvas.getByRole('button', { name: /share article/i });
    await expect(shareButton).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /aurora borealis/i })
    ).toBeVisible();
  },
};
