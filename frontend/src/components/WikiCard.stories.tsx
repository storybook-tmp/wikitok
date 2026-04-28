import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Theory of relativity',
  displaytitle: 'Theory of relativity',
  extract:
    'The theory of relativity usually encompasses two interrelated physics theories by Albert Einstein: special relativity and general relativity, proposed and published in 1905 and 1915, respectively.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Theory_of_relativity',
  thumbnail: {
    source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Relativity',
    width: 800,
    height: 600,
  },
};

const articleNoImage: WikiArticle = {
  title: 'Quantum mechanics',
  displaytitle: 'Quantum mechanics',
  extract:
    'Quantum mechanics is a fundamental theory in physics that describes the behavior of nature at and below the scale of atoms. It is the foundation of all quantum physics.',
  pageid: 99999,
  url: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
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
    article: sampleArticle,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Theory of relativity')).toBeVisible();
    await expect(canvas.getByText(/Albert Einstein/)).toBeVisible();
    await expect(canvas.getByText('Read more →')).toBeVisible();
  },
};

export const WithLikeButton: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
    const shareButton = canvas.getByRole('button', { name: /share article/i });
    await expect(shareButton).toBeVisible();
  },
};

export const NoThumbnail: Story = {
  args: {
    article: articleNoImage,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum mechanics')).toBeVisible();
    await expect(canvas.getByText(/fundamental theory in physics/)).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvasElement }) => {
    // index.css sets overflow: hidden on body — proves the global CSS loaded
    const body = canvasElement.ownerDocument.body;
    await expect(getComputedStyle(body).overflow).toBe('hidden');
  },
};
