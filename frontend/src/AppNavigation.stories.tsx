import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';

const meta: Meta<typeof App> = {
  component: App,
  tags: ['ai-generated'],
};

export default meta;
type Story = StoryObj<typeof App>;

export const HeaderElements: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('WikiTok')).toBeVisible();
    await expect(canvas.getByText('About')).toBeVisible();
    await expect(canvas.getByText('Likes')).toBeVisible();
    await expect(canvas.getByText('Language')).toBeVisible();
  },
};

export const OpenAndCloseAbout: Story = {
  play: async ({ canvas, userEvent }) => {
    const aboutButton = canvas.getByText('About');
    await userEvent.click(aboutButton);
    await expect(canvas.getByText('About WikiTok')).toBeVisible();
    // Close by clicking the ✕ button
    const closeButton = canvas.getByText('✕');
    await userEvent.click(closeButton);
    await expect(canvas.queryByText('About WikiTok')).not.toBeInTheDocument();
  },
};

export const ArticlesLoadFromApi: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Theory of relativity')).toBeVisible();
      },
      { timeout: 5000 },
    );
    await expect(canvas.getByText('Great Barrier Reef')).toBeVisible();
    await expect(canvas.getByText('Apollo 11')).toBeVisible();
  },
};
