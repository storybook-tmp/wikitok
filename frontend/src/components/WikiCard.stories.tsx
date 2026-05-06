import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    "An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth's sky, predominantly seen in high-latitude regions.",
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
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
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /aurora borealis/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/northern lights/i)).toBeVisible();
    await expect(canvas.getByText('Read more →')).toBeVisible();
  },
};

export const WithLikeButton: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
    await userEvent.click(likeButton);
    await expect(likeButton).toBeVisible();
  },
};

export const WithShareButton: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    const shareButton = canvas.getByRole('button', { name: /share article/i });
    await expect(shareButton).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    // WikiCard root uses flex items-center — fails if Tailwind / global CSS did not load.
    const card = canvas.getByText(/aurora borealis/i).closest('[class*="flex"]')!;
    await expect(getComputedStyle(card).display).toBe('flex');
  },
};
