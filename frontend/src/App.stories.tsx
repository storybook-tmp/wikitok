import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <App />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /wikitok/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /about/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /likes/i })).toBeVisible();
    await waitFor(
      () => expect(canvas.getByRole('heading', { name: /mount everest/i })).toBeVisible(),
      { timeout: 5000 }
    );
  },
};

export const AboutModal: Story = {
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    const aboutButton = canvas.getByRole('button', { name: /about/i });
    await userEvent.click(aboutButton);
    await expect(canvas.getByRole('heading', { name: /about wikitok/i })).toBeVisible();
    await expect(canvas.getByText(/tiktok-style interface/i)).toBeVisible();
  },
};

export const LikesModal: Story = {
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    const likesButton = canvas.getByRole('button', { name: /likes/i });
    await userEvent.click(likesButton);
    await expect(canvas.getByRole('heading', { name: /liked articles/i })).toBeVisible();
    await expect(canvas.getByPlaceholderText(/search liked articles/i)).toBeVisible();
  },
};
