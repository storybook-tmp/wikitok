import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Quantum Mechanics',
  displaytitle: 'Quantum Mechanics',
  extract:
    'Quantum mechanics is a fundamental theory in physics that describes the behavior of nature at and below the scale of atoms. It is the foundation of all quantum physics.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
  thumbnail: {
    source: 'https://placehold.co/800x600/1a1a2e/white?text=Quantum+Mechanics',
    width: 800,
    height: 600,
  },
};

const articleNoThumbnail: WikiArticle = {
  title: 'Dark Matter',
  displaytitle: 'Dark Matter',
  extract:
    'Dark matter is a hypothetical form of matter thought to account for approximately 85% of the matter in the universe.',
  pageid: 99999,
  url: 'https://en.wikipedia.org/wiki/Dark_matter',
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
    await expect(canvas.getByText('Quantum Mechanics')).toBeVisible();
    await expect(
      canvas.getByText(/Quantum mechanics is a fundamental theory/),
    ).toBeVisible();
    await expect(canvas.getByText('Read more →')).toBeVisible();
  },
};

export const WithLikeButton: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
    await userEvent.click(likeButton);
    // After clicking, the heart should have filled style (bg-red-500)
    await waitFor(() => {
      expect(likeButton.className).toContain('bg-red-500');
    });
  },
};

export const WithShareButton: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas }) => {
    const shareButton = canvas.getByRole('button', { name: /share article/i });
    await expect(shareButton).toBeVisible();
  },
};

export const NoThumbnail: Story = {
  args: {
    article: articleNoThumbnail,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Dark Matter')).toBeVisible();
    await expect(
      canvas.getByText(/Dark matter is a hypothetical form/),
    ).toBeVisible();
  },
};
