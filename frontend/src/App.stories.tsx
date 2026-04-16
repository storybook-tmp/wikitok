import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FeedLoaded: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expectFeedToRender(canvas);
    await expect(canvas.getByRole('button', { name: 'WikiTok' })).toBeVisible();
  },
};

export const AboutModal: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expectFeedToRender(canvas);
    await userEvent.click(canvas.getByRole('button', { name: /about/i }));

    await expect(
      canvas.getByRole('heading', { name: /about wikitok/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: /github/i }),
    ).toHaveAttribute('href', 'https://github.com/IsaacGemal/wikitok');
  },
};

export const FiltersLikedArticles: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expectFeedToRender(canvas);
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));

    const searchInput = canvas.getByPlaceholderText(/search liked articles/i);
    const likesPanelElement = searchInput.closest('.bg-gray-900');

    if (!likesPanelElement) {
      throw new Error('Unable to find the liked articles panel.');
    }

    const likesPanel = within(likesPanelElement);

    await expect(likesPanel.getByRole('button', { name: /export/i })).toBeVisible();
    await expect(
      likesPanel.getByRole('link', { name: /orbital garden/i }),
    ).toBeVisible();

    await userEvent.type(searchInput, 'glacier');

    await waitFor(() => {
      expect(
        likesPanel.getByRole('link', { name: /glacier echo/i }),
      ).toBeVisible();
      expect(
        likesPanel.queryByRole('link', { name: /orbital garden/i }),
      ).not.toBeInTheDocument();
    });
  },
};

async function expectFeedToRender(canvas: ReturnType<typeof within>) {
  await waitFor(() => {
    expect(canvas.getAllByRole('heading', { name: /aurora forest/i })[0]).toBeVisible();
    expect(canvas.getAllByRole('heading', { name: /city after rain/i })[0]).toBeVisible();
  });
}
