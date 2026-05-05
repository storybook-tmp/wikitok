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
      () => {
        expect(canvas.getByText('WikiTok')).toBeVisible();
      },
      { timeout: 5000 },
    );
  },
};

export const WithAboutModal: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('WikiTok')).toBeVisible();
      },
      { timeout: 5000 },
    );
    const aboutButton = canvas.getByText('About');
    await userEvent.click(aboutButton);
    await expect(canvas.getByText('About WikiTok')).toBeVisible();
  },
};

export const WithLikesPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('WikiTok')).toBeVisible();
      },
      { timeout: 5000 },
    );
    const likesButton = canvas.getByText('Likes');
    await userEvent.click(likesButton);
    await expect(canvas.getByText('Liked Articles')).toBeVisible();
    await expect(canvas.getByPlaceholderText('Search liked articles...')).toBeVisible();
  },
};
