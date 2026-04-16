import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  render: () => <App />,
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FeedReady: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(
        canvas.getByRole('heading', { name: /aurora/i }),
      ).toBeVisible();
    });

    await expect(canvas.getByText(/wikitok/i)).toBeVisible();
    await expect(canvas.getByRole('button', { name: /language/i })).toBeVisible();
  },
};

export const AboutOverlay: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => {
      expect(
        canvas.getByRole('heading', { name: /aurora/i }),
      ).toBeVisible();
    });

    await userEvent.click(canvas.getByRole('button', { name: /about/i }));

    await expect(
      canvas.getByRole('heading', { name: /about wikitok/i }),
    ).toBeVisible();
    await expect(
      canvas.getByText(/tiktok-style interface for exploring random wikipedia articles/i),
    ).toBeVisible();
  },
};

export const LikesOverlay: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => {
      expect(
        canvas.getByRole('heading', { name: /aurora/i }),
      ).toBeVisible();
    });

    await userEvent.click(canvas.getAllByRole('button', { name: /like article/i })[0]);
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));

    await expect(
      canvas.getByRole('heading', { name: /liked articles/i }),
    ).toBeVisible();
    await expect(canvas.getByPlaceholderText(/search liked articles/i)).toBeVisible();
    await expect(canvas.getAllByText(/aurora/i)[0]).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /remove from likes/i }),
    ).toBeVisible();
  },
};
