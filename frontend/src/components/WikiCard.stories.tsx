import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
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
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Solvay_conference_1927.jpg/800px-Solvay_conference_1927.jpg',
    width: 800,
    height: 573,
  },
};

const noThumbnailArticle: WikiArticle = {
  title: 'Abstract Concept',
  displaytitle: 'Abstract Concept',
  extract:
    'This is an article without a thumbnail image, showing the fallback gray background.',
  pageid: 99999,
  url: 'https://en.wikipedia.org/wiki/Abstract_concept',
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

export const WithoutThumbnail: Story = {
  args: {
    article: noThumbnailArticle,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /abstract concept/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/read more/i)).toBeVisible();
  },
};

export const LikeInteraction: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
    await userEvent.click(likeButton);
    await expect(likeButton.className).toContain('bg-red-500');
  },
};
