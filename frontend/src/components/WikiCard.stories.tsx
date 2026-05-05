import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const sampleArticle = {
  title: 'Solar System',
  displaytitle: 'Solar System',
  extract:
    'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it. It formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Solar_System',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Solar_sys8.jpg/800px-Solar_sys8.jpg',
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
    await expect(
      canvas.getByRole('button', { name: /like article/i })
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /share article/i })
    ).toBeVisible();
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...sampleArticle,
      extract:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  },
};

export const LikeInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    await expect(likeButton).toHaveClass(/bg-red-500/);
  },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const card = canvas.getByText('Solar System').closest('div');
    // WikiCard uses bg-black on the outer container via Tailwind — fails if Tailwind CSS did not load
    const container = canvas.getByText('Solar System').closest('.h-screen');
    await expect(getComputedStyle(container!).position).toBe('relative');
  },
};
