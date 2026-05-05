import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  tags: ['ai-generated'],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('WikiTok')).toBeVisible();
    await waitFor(() => {
      expect(canvas.getByText('Quantum Computing')).toBeVisible();
    });
    await expect(canvas.getByText('About')).toBeVisible();
    await expect(canvas.getByText('Likes')).toBeVisible();
    await expect(canvas.getByText('Language')).toBeVisible();
  },
};

export const ShowAboutDialog: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('About'));
    await waitFor(() => {
      expect(canvas.getByText('About WikiTok')).toBeVisible();
    });
    await expect(
      canvas.getByText(/TikTok-style interface/),
    ).toBeVisible();
  },
};

export const ShowLikesPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByText('Quantum Computing')).toBeVisible();
    });
    await userEvent.click(canvas.getByText('Likes'));
    await waitFor(() => {
      expect(canvas.getByText('Liked Articles')).toBeVisible();
    });
    await expect(
      canvas.getByText('No liked articles yet.'),
    ).toBeVisible();
  },
};
