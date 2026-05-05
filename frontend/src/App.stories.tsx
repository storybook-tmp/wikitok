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
    // Wait for articles to load from MSW mock
    await waitFor(
      () => {
        expect(canvas.getByText('Aurora Borealis')).toBeVisible();
      },
      { timeout: 5000 },
    );
    await expect(canvas.getByText('WikiTok')).toBeVisible();
    await expect(canvas.getByText('About')).toBeVisible();
    await expect(canvas.getByText('Likes')).toBeVisible();
  },
};

export const AboutModal: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('About')).toBeVisible();
      },
      { timeout: 5000 },
    );
    await userEvent.click(canvas.getByText('About'));
    await waitFor(() => {
      expect(canvas.getByText('About WikiTok')).toBeVisible();
    });
    await expect(
      canvas.getByText(/TikTok-style interface/),
    ).toBeVisible();
  },
};

export const LikesPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Likes')).toBeVisible();
      },
      { timeout: 5000 },
    );
    await userEvent.click(canvas.getByText('Likes'));
    await waitFor(() => {
      expect(canvas.getByText('Liked Articles')).toBeVisible();
    });
    await expect(canvas.getByText('No liked articles yet.')).toBeVisible();
    await expect(
      canvas.getByPlaceholderText('Search liked articles...'),
    ).toBeVisible();
  },
};
