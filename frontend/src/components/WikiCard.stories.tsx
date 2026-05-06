import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const sampleArticle = {
  title: 'Quantum Computing',
  displaytitle: 'Quantum Computing',
  extract:
    'Quantum computing is a type of computation that uses quantum-mechanical phenomena such as superposition and entanglement to perform operations on data. Quantum computers are different from traditional computers.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Quantum_computing',
  thumbnail: {
    source: 'https://via.placeholder.com/800x600',
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
    article: sampleArticle,
  },
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading', { name: /quantum computing/i });
    await expect(heading).toBeVisible();
    await expect(canvas.getByRole('button', { name: /like article/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /share article/i })).toBeVisible();
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...sampleArticle,
      pageid: 99999,
      title: 'History of the Roman Empire',
      displaytitle: 'History of the Roman Empire',
      extract:
        'The Roman Empire was the post-Republican state of ancient Rome. It included territory around the Mediterranean in Europe, North Africa, and Western Asia, and was ruled by emperors. The empire was one of the largest in history, with an estimated 55 to 70 million inhabitants, roughly 21% of the world population at the time. It covered around 5 million square kilometres at its height in AD 117.',
    },
  },
};

export const NoThumbnail: Story = {
  args: {
    article: {
      ...sampleArticle,
      pageid: 11111,
      thumbnail: undefined as unknown as typeof sampleArticle.thumbnail,
    },
  },
};

export const LikeInteraction: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    // After clicking, the button should have the red background class (liked state)
    await expect(likeButton.className).toMatch(/bg-red-500/);
  },
};

export const CssCheck: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvasElement }) => {
    // WikiCard root div has "relative" from Tailwind — position: relative proves Tailwind loaded.
    const rootDiv = canvasElement.firstElementChild as HTMLElement;
    await expect(getComputedStyle(rootDiv).position).toBe('relative');
  },
};
