import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import App from './App';

const meta = {
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['ai-generated'],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FeedFromWikipediaMock: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /WikiTok/i }),
    ).toBeVisible();
    const adaHeadings = await canvas.findAllByRole('heading', {
      name: /^Ada Lovelace$/i,
    });

    await expect(
      adaHeadings[0],
    ).toBeVisible();
    await expect(canvas.getByText(/English mathematician/i)).toBeVisible();
  },
};

export const AboutModal: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /About/i }));

    await expect(
      canvas.getByRole('heading', { name: /About WikiTok/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/TikTok-style interface/i)).toBeVisible();
  },
};

export const LikedArticlesPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Likes/i }));

    await expect(
      canvas.getByRole('heading', { name: /Liked Articles/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /Export/i }),
    ).toBeVisible();

    const searchInput = canvas.getByPlaceholderText(/Search liked articles/i);
    await userEvent.type(searchInput, 'no matching article');
    await expect(canvas.getByText('No matches found.')).toBeVisible();
  },
};
