import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultFeed: Story = {
  render: () => <App />,
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /wikitok/i }),
    ).toBeVisible();

    const heading = await canvas.findByRole('heading', {
      name: /aurora forest/i,
    });

    await expect(heading).toBeVisible();

    await waitFor(() => {
      expect(canvas.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  },
};

export const AboutOverlay: Story = {
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /about/i }));

    await expect(
      canvas.getByRole('heading', { name: /about wikitok/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: /github/i }),
    ).toHaveAttribute('href', 'https://github.com/IsaacGemal/wikitok');

    await userEvent.click(canvas.getByRole('button', { name: '✕' }));

    await waitFor(() => {
      expect(
        canvas.queryByRole('heading', { name: /about wikitok/i }),
      ).not.toBeInTheDocument();
    });
  },
};

export const LikesOverlay: Story = {
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));

    const searchInput = canvas.getByPlaceholderText(/search liked articles/i);

    await expect(searchInput).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: /aurora forest/i }),
    ).toBeVisible();

    await userEvent.type(searchInput, 'clockwork');

    await expect(canvas.getByText(/no matches found/i)).toBeVisible();
  },
};
