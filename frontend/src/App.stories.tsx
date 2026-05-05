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
        expect(canvas.getByText('Mock Article One')).toBeVisible();
      },
      { timeout: 5000 }
    );
  },
};

export const AboutModal: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('About'));
    await waitFor(() => {
      expect(canvas.getByText('About WikiTok')).toBeVisible();
    });
    await expect(
      canvas.getByText(/tiktok-style interface/i)
    ).toBeVisible();
  },
};

export const LikesPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('Likes'));
    await waitFor(() => {
      expect(canvas.getByText('Liked Articles')).toBeVisible();
    });
    await expect(canvas.getByText(/no liked articles yet/i)).toBeVisible();
  },
};
