import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/aurora.jpg/800px-aurora.jpg',
    width: 800,
    height: 600,
  },
};

const mockArticleNoImage: WikiArticle = {
  title: 'Jazz',
  displaytitle: 'Jazz',
  extract:
    'Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana, in the late 19th and early 20th centuries, with its roots in blues and ragtime.',
  pageid: 11111,
  url: 'https://en.wikipedia.org/wiki/Jazz',
  thumbnail: undefined as unknown as WikiArticle['thumbnail'],
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
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(canvas.getByText(/northern lights/i)).toBeVisible();
    await expect(canvas.getByText('Read more →')).toBeVisible();
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: mockArticleNoImage,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Jazz')).toBeVisible();
    await expect(canvas.getByText(/music genre/i)).toBeVisible();
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
    await waitFor(() => {
      // WikiCard outer div uses Tailwind's "flex" class — proves CSS loaded
      const container = canvas.getByText('Read more →').closest('div[class*="flex"]')!;
      expect(getComputedStyle(container).display).toBe('flex');
    });
  },
};
