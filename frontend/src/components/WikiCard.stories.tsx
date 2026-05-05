import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Albert Einstein',
  displaytitle: 'Albert Einstein',
  extract:
    'Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time. He is best known for developing the theory of relativity.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Albert_Einstein',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921.jpg/800px-Einstein_1921.jpg',
    width: 800,
    height: 600,
  },
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  args: {
    article: sampleArticle,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: /albert einstein/i });
    await expect(link).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Albert_Einstein');
  },
};

export const WithLongExtract: Story = {
  args: {
    article: {
      ...sampleArticle,
      displaytitle: 'History of Mathematics',
      extract:
        'Mathematics has a long and rich history spanning thousands of years across many civilizations. From the earliest counting systems to modern abstract algebra, the development of mathematical thought has been a fundamental part of human intellectual achievement. The ancient Egyptians and Babylonians made significant contributions to geometry and arithmetic.',
    },
  },
};

export const NoThumbnail: Story = {
  args: {
    article: {
      ...sampleArticle,
      displaytitle: 'Article Without Image',
      thumbnail: undefined as unknown as WikiArticle['thumbnail'],
    },
  },
};

export const LikeButton: Story = {
  play: async ({ canvas, userEvent }) => {
    const likeBtn = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeBtn);
    await expect(likeBtn).toHaveClass(/bg-red-500/);
  },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading', { name: /albert einstein/i });
    // Tailwind preflight resets h2 font-weight from browser default (bold/700) to inherit (400).
    // Getting 400 proves Tailwind CSS loaded; without it, browser default would be 700.
    await expect(getComputedStyle(heading).fontWeight).toBe('400');
  },
};
