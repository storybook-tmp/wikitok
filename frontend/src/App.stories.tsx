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
    await expect(canvas.getByRole('button', { name: /WikiTok/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /About/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /Likes/i })).toBeVisible();
  },
};

export const AboutModalOpen: Story = {
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('button', { name: /About/i })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: /About/i }));
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /About WikiTok/i })).toBeVisible();
    });
    await expect(canvas.getByText(/TikTok-style interface/)).toBeVisible();
  },
};

export const LikesModalOpen: Story = {
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('button', { name: /Likes/i })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: /Likes/i }));
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /Liked Articles/i })).toBeVisible();
    });
    await expect(canvas.getByPlaceholderText(/Search liked articles/i)).toBeVisible();
  },
};

export const WithArticlesLoaded: Story = {
  render: () => <App />,
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        const headings = canvas.getAllByRole('heading', { level: 2 });
        expect(headings.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
    await expect(canvas.getAllByRole('button', { name: /like article/i })[0]).toBeVisible();
  },
};
