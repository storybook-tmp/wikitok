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
    await waitFor(
      () => {
        expect(canvas.getByText('Aurora Borealis')).toBeVisible();
      },
      { timeout: 5000 },
    );
  },
};

export const AboutModal: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('WikiTok')).toBeVisible();
    const aboutButton = canvas.getByRole('button', { name: /about/i });
    await userEvent.click(aboutButton);
    await expect(canvas.getByRole('heading', { name: /about wikitok/i })).toBeVisible();
    await expect(canvas.getByText(/tiktok-style interface/i)).toBeVisible();
  },
};

export const LikesModal: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('WikiTok')).toBeVisible();
    const likesButton = canvas.getByRole('button', { name: /likes/i });
    await userEvent.click(likesButton);
    await expect(canvas.getByRole('heading', { name: /liked articles/i })).toBeVisible();
    await expect(canvas.getByText(/no liked articles yet/i)).toBeVisible();
  },
};
