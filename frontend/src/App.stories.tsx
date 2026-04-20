import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FeedLoadsArticles: Story = {
  play: async ({ canvas }) => {
    await waitFor(() =>
      expect(canvas.getByRole('heading', { name: /ada lovelace/i })).toBeVisible()
    );
    await expect(canvas.getByRole('heading', { name: /apollo 11/i })).toBeVisible();
    await expect(canvas.queryByText(/loading/i)).not.toBeInTheDocument();
  },
};

export const AboutDialog: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /about/i }));

    await expect(canvas.getByRole('heading', { name: /about wikitok/i })).toBeVisible();
    await expect(
      canvas.getByText(/tiktok-style interface for exploring random wikipedia articles/i)
    ).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: /✕/i }));

    await expect(canvas.queryByRole('heading', { name: /about wikitok/i })).not.toBeInTheDocument();
  },
};

export const LikeAndSearchFavorites: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(() =>
      expect(canvas.getByRole('heading', { name: /ada lovelace/i })).toBeVisible()
    );

    await userEvent.click(canvas.getAllByRole('button', { name: /like article/i })[0]);
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));

    await expect(canvas.getByRole('heading', { name: /liked articles/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /export/i })).toBeVisible();

    await userEvent.type(canvas.getByPlaceholderText(/search liked articles/i), 'Apollo');

    await expect(canvas.getByText(/no matches found/i)).toBeVisible();
  },
};
