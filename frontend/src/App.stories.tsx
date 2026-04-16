import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Feed: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() =>
      expect(canvas.getByRole('heading', { name: /aurora lake/i })).toBeVisible(),
    );
    await waitFor(() =>
      expect(canvas.queryByText(/^loading\.\.\.$/i)).not.toBeInTheDocument(),
    );
    await expect(canvas.getByRole('button', { name: /likes/i })).toBeVisible();
  },
};

export const AboutOverlay: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await waitFor(() =>
      expect(canvas.getByRole('heading', { name: /aurora lake/i })).toBeVisible(),
    );
    await user.click(canvas.getByRole('button', { name: /about/i }));
    await expect(canvas.getByRole('heading', { name: /about wikitok/i })).toBeVisible();
    await expect(
      canvas.getByText(/a tiktok-style interface for exploring random wikipedia articles\./i),
    ).toBeVisible();
  },
};

export const LikesOverlay: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await waitFor(() =>
      expect(canvas.getByRole('heading', { name: /aurora lake/i })).toBeVisible(),
    );
    await user.click(canvas.getByRole('button', { name: /likes/i }));
    const likedPanel = getLikedPanel(canvasElement);

    await expect(likedPanel.getByRole('heading', { name: /liked articles/i })).toBeVisible();
    await expect(likedPanel.getByRole('button', { name: /export/i })).toBeVisible();
    await expect(likedPanel.getByRole('link', { name: /aurora lake/i })).toBeVisible();
    await expect(likedPanel.getByRole('link', { name: /ember falls/i })).toBeVisible();
  },
};

export const LikesSearch: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await waitFor(() =>
      expect(canvas.getByRole('heading', { name: /aurora lake/i })).toBeVisible(),
    );
    await user.click(canvas.getByRole('button', { name: /likes/i }));
    const likedPanel = getLikedPanel(canvasElement);

    await user.type(likedPanel.getByPlaceholderText(/search liked articles/i), 'ember');
    await expect(likedPanel.getByRole('link', { name: /ember falls/i })).toBeVisible();
    await expect(
      likedPanel.queryByRole('link', { name: /aurora lake/i }),
    ).not.toBeInTheDocument();
  },
};

function getLikedPanel(canvasElement: HTMLElement) {
  const likedHeading = within(canvasElement).getByRole('heading', { name: /liked articles/i });
  const panel = likedHeading.closest('.bg-gray-900');

  if (!panel) {
    throw new Error('Unable to find the liked articles panel.');
  }

  return within(panel);
}
