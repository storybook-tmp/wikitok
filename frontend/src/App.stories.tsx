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

export const Feed: Story = {
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByRole('heading', { name: /ada lovelace/i }),
    ).toBeVisible();
    await expect(
      canvas.getByText(/english mathematician and writer/i),
    ).toBeVisible();
  },
};

export const AboutPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /about/i }));

    await expect(
      canvas.getByRole('heading', { name: /about wikitok/i }),
    ).toBeVisible();
    await expect(
      canvas.getByText(/tiktok-style interface/i),
    ).toBeVisible();
  },
};

export const LikedArticlesPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));

    await expect(
      canvas.getByRole('heading', { name: /liked articles/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: /grace hopper/i }),
    ).toBeVisible();

    await userEvent.type(
      canvas.getByPlaceholderText(/search liked articles/i),
      'not in favorites',
    );
    await expect(canvas.getByText(/no matches found/i)).toBeVisible();
  },
};

