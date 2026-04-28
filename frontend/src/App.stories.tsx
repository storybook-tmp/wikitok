import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';

const meta: Meta<typeof App> = {
  component: App,
  tags: ['ai-generated'],
};

export default meta;
type Story = StoryObj<typeof App>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('WikiTok')).toBeVisible();
    await expect(canvas.getByText('About')).toBeVisible();
    await expect(canvas.getByText('Likes')).toBeVisible();
    await expect(canvas.getByText('Language')).toBeVisible();
    await waitFor(
      () => {
        expect(canvas.getByText('Theory of relativity')).toBeVisible();
      },
      { timeout: 5000 },
    );
  },
};

export const AboutModal: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('WikiTok')).toBeVisible();
    const aboutButton = canvas.getByText('About');
    await userEvent.click(aboutButton);
    await expect(canvas.getByText('About WikiTok')).toBeVisible();
    await expect(
      canvas.getByText(
        /TikTok-style interface for exploring random Wikipedia articles/,
      ),
    ).toBeVisible();
  },
};

export const LikesModal: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Theory of relativity')).toBeVisible();
      },
      { timeout: 5000 },
    );
    const likesButton = canvas.getByText('Likes');
    await userEvent.click(likesButton);
    await expect(canvas.getByText('Liked Articles')).toBeVisible();
    await expect(
      canvas.getByPlaceholderText('Search liked articles...'),
    ).toBeVisible();
  },
};
