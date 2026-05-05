import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/aurora.jpg/800px-aurora.jpg',
    width: 800,
    height: 600,
  },
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  args: {
    article: mockArticle,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /aurora borealis/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/read more/i)).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /like article/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /share article/i }),
    ).toBeVisible();
  },
};

export const Liked: Story = {
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    await waitFor(() => {
      expect(likeButton.className).toMatch(/bg-red-500/);
    });
  },
};

export const CssCheck: Story = {
  play: async ({ canvasElement }) => {
    // The app root div uses bg-black (Tailwind) on the h-screen wrapper
    // Check the WikiCard wrapper has snap-start — the scroll-snap-align proves Tailwind loaded
    const card = canvasElement.querySelector('.snap-start') as HTMLElement;
    await expect(card).not.toBeNull();
    const style = getComputedStyle(card);
    await expect(style.position).toBe('relative');
  },
};
