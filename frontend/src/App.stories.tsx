import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => expect(canvas.getByText('WikiTok')).toBeVisible(),
      { timeout: 5000 },
    );
    await expect(canvas.getByText('About')).toBeVisible();
    await expect(canvas.getByText('Likes')).toBeVisible();
  },
};

export const ShowAboutModal: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => expect(canvas.getByText('WikiTok')).toBeVisible(),
      { timeout: 5000 },
    );
    const aboutButton = canvas.getByText('About');
    await userEvent.click(aboutButton);
    await expect(canvas.getByText('About WikiTok')).toBeVisible();
    await expect(
      canvas.getByText(/TikTok-style interface for exploring random Wikipedia/),
    ).toBeVisible();
  },
};

export const ShowLikesModal: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => expect(canvas.getByText('WikiTok')).toBeVisible(),
      { timeout: 5000 },
    );
    const likesButton = canvas.getByText('Likes');
    await userEvent.click(likesButton);
    await expect(canvas.getByText('Liked Articles')).toBeVisible();
    await expect(canvas.getByText('No liked articles yet.')).toBeVisible();
  },
};

export const ArticlesLoaded: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => expect(canvas.getByText('Theory of relativity')).toBeVisible(),
      { timeout: 10000 },
    );
    await expect(canvas.getByText(/Albert Einstein/)).toBeVisible();
  },
};
