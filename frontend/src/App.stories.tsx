import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import App from './App';
import { mockWikiArticles } from '../.storybook/wikiMockData';

const meta = {
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="min-h-screen w-full bg-black text-white">
      <App />
    </div>
  ),
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Feed: Story = {
  render: () => (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="px-4 py-3 text-2xl font-bold">WikiTok</div>
      <div style={{ height: 'calc(100vh - 4.5rem)' }}>
        <App />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() =>
      expect(
        canvas.getAllByRole('heading', { name: mockWikiArticles[0].displaytitle })[0],
      ).toBeVisible(),
    );
    expect(canvas.getAllByLabelText(/like article/i).length).toBeGreaterThan(0);
    await expect(
      canvas.getAllByRole('link', { name: /read more/i })[0],
    ).toHaveAttribute('href', mockWikiArticles[0].url);
  },
};

export const LoadingState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => expect(canvas.getByText(/loading/i)).toBeVisible());
    await waitFor(() =>
      expect(
        canvas.getAllByRole('heading', { name: mockWikiArticles[0].displaytitle })[0],
      ).toBeVisible(),
    );
  },
};

export const AboutPanel: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() =>
      expect(
        canvas.getAllByRole('heading', { name: mockWikiArticles[0].displaytitle })[0],
      ).toBeVisible(),
    );
    await userEvent.click(canvas.getByRole('button', { name: /about/i }));
    await expect(
      canvas.getByRole('heading', { name: /about wikitok/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: /github/i }),
    ).toHaveAttribute('href', 'https://github.com/IsaacGemal/wikitok');
  },
};

export const LikesWorkflow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() =>
      expect(
        canvas.getAllByRole('heading', { name: mockWikiArticles[0].displaytitle })[0],
      ).toBeVisible(),
    );
    await userEvent.click(canvas.getAllByLabelText(/like article/i)[0]);
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));

    const likesPanel = getLikesPanel(canvas);
    await expect(
      within(likesPanel).getByRole('heading', { name: /liked articles/i }),
    ).toBeVisible();
    await expect(
      within(likesPanel).getByRole('link', { name: mockWikiArticles[0].title }),
    ).toBeVisible();
    await expect(
      within(likesPanel).getByRole('button', { name: /export/i }),
    ).toBeVisible();
  },
};

export const LikesSearch: Story = {
  render: () => (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="px-4 py-3 text-2xl font-bold">WikiTok</div>
      <div style={{ height: 'calc(100vh - 4.5rem)' }}>
        <App />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() =>
      expect(
        canvas.getAllByRole('heading', { name: mockWikiArticles[0].displaytitle })[0],
      ).toBeVisible(),
    );
    const likeButtons = canvas.getAllByLabelText(/like article/i);
    await userEvent.click(likeButtons[0]);
    await userEvent.click(likeButtons[1]);
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));

    const likesPanel = getLikesPanel(canvas);
    const likes = within(likesPanel);
    const search = likes.getByPlaceholderText(/search liked articles/i);
    await userEvent.type(search, 'Voyager');

    await expect(likes.getByRole('link', { name: mockWikiArticles[1].title })).toBeVisible();
    await expect(
      likes.queryByRole('link', { name: mockWikiArticles[0].title }),
    ).not.toBeInTheDocument();
  },
};

function getLikesPanel(canvas: ReturnType<typeof within>) {
  const search = canvas.getByPlaceholderText(/search liked articles/i);
  const panel = search.closest('.bg-gray-900');

  if (!panel) {
    throw new Error('Expected the likes panel container to be present.');
  }

  return panel;
}
