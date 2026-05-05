import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleArticle = {
  title: 'Quantum Computing',
  displaytitle: 'Quantum Computing',
  extract:
    'Quantum computing is an area of computing focused on developing computer technology based on the principles of quantum theory. A quantum computer uses quantum bits or qubits.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Quantum_computing',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Bloch_sphere.svg/800px-Bloch_sphere.svg.png',
    width: 800,
    height: 600,
  },
};

export const Default: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum Computing')).toBeVisible();
    await expect(canvas.getByText(/Quantum computing is an area/)).toBeVisible();
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
    await waitFor(() => {
      expect(likeButton.className).toMatch(/bg-red-500/);
    });
  },
};

export const WithShareButton: Story = {
  args: {
    article: {
      ...sampleArticle,
      title: 'Aurora Borealis',
      displaytitle: 'Aurora Borealis',
      extract:
        'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
      pageid: 67890,
      url: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
    },
  },
  play: async ({ canvas }) => {
    const shareButton = canvas.getByRole('button', { name: /share article/i });
    await expect(shareButton).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas }) => {
    const extract = canvas.getByText(/Quantum computing is an area/);
    // Tailwind base sets line-height: 1.5 → resolves to 24px at 16px font size.
    // Without Tailwind loaded, the default would be "normal" (~19.2px).
    await expect(getComputedStyle(extract).lineHeight).toBe('24px');
  },
};
