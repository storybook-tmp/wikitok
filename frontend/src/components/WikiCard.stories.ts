import type { Meta, StoryObj } from '@storybook/react-vite';

import React from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { LikedArticlesProvider } from '../contexts/LikedArticlesContext';
import { WikiCard } from './WikiCard';

const article = {
  title: 'Storybook',
  displaytitle: 'Storybook',
  extract:
    'Storybook is an open source tool for building UI components and pages in isolation across frameworks.',
  pageid: 1001,
  thumbnail: {
    source:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    width: 1200,
    height: 800,
  },
  url: 'https://example.com/wiki/storybook',
};

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    article,
  },
  render: (args) =>
    React.createElement(
      LikedArticlesProvider,
      null,
      React.createElement(WikiCard, args),
    ),
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Liked: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await userEvent.click(likeButton);
    await expect(likeButton.className).toContain('bg-red-500');
  },
};
