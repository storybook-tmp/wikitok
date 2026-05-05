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
    await expect(canvas.getByText('WikiTok')).toBeVisible();
    await expect(canvas.getByText('About')).toBeVisible();
    await expect(canvas.getByText('Likes')).toBeVisible();
    await waitFor(
      () => {
        expect(canvas.getByText('Aurora Borealis')).toBeVisible();
      },
      { timeout: 5000 }
    );
  },
};

export const AboutDialog: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('WikiTok')).toBeVisible();
    const aboutButton = canvas.getByText('About');
    await userEvent.click(aboutButton);
    await waitFor(() => {
      expect(canvas.getByText('About WikiTok')).toBeVisible();
    });
    await expect(
      canvas.getByText(
        /a tiktok-style interface for exploring random wikipedia articles/i
      )
    ).toBeVisible();
  },
};

export const LikesPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('WikiTok')).toBeVisible();
    const likesButton = canvas.getByText('Likes');
    await userEvent.click(likesButton);
    await waitFor(() => {
      expect(canvas.getByText('Liked Articles')).toBeVisible();
    });
    await expect(canvas.getByText(/no liked articles yet/i)).toBeVisible();
  },
};
