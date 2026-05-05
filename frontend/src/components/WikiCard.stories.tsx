import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Quantum Mechanics',
  displaytitle: 'Quantum Mechanics',
  extract:
    'Quantum mechanics is a fundamental theory in physics that describes the behavior of nature at and below the scale of atoms. It is the foundation of all quantum physics.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Solvay_conference_1927.jpg/800px-Solvay_conference_1927.jpg',
    width: 800,
    height: 573,
  },
};

const mockArticleNoImage: WikiArticle = {
  title: 'Abstract Algebra',
  displaytitle: 'Abstract Algebra',
  extract:
    'In mathematics, more specifically algebra, abstract algebra or modern algebra is the study of algebraic structures.',
  pageid: 99999,
  url: 'https://en.wikipedia.org/wiki/Abstract_algebra',
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
    await expect(
      canvas.getByRole('heading', { name: /quantum mechanics/i }),
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

export const WithLikeInteraction: Story = {
  args: {
    article: mockArticle,
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

export const NoThumbnail: Story = {
  args: {
    article: mockArticleNoImage,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /abstract algebra/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/read more/i)).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvasElement }) => {
    // The WikiCard root div uses flex — fails if Tailwind CSS did not load.
    const root = canvasElement.querySelector('.flex.items-center');
    await expect(root).not.toBeNull();
    await expect(getComputedStyle(root!).display).toBe('flex');
  },
};
