import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import type { WikiArticle } from './WikiCard';
import { WikiCard } from './WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Aurora',
  displaytitle: 'Aurora over the Fjord',
  extract:
    'Auroras appear when charged solar particles collide with atmospheric gases, painting moving curtains of light across the night sky.',
  pageid: 1001,
  url: 'https://en.wikipedia.org/wiki/Aurora',
  thumbnail: {
    source:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1200,
  },
};

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  args: {
    article: sampleArticle,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LikedState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Like article/i }));
    await expect(canvas.getByRole('button', { name: /Like article/i })).toHaveClass(
      'bg-red-500',
    );
  },
};
