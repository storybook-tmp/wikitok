import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import { likedArticleFixtures, primaryArticle, serializeLikedArticles } from '../.storybook/wiki-fixtures';
import App from './App';

const meta = {
  component: App,
  render: () => <App />,
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BrowsingFeed: Story = {
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: primaryArticle.displaytitle })).toBeVisible();
    });

    await expect(canvas.getByRole('button', { name: /wikitok/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /about/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /likes/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /language/i })).toBeVisible();
  },
};

export const AboutDialog: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /about/i }));

    await expect(canvas.getByRole('heading', { name: /about wikitok/i })).toBeVisible();
    await expect(canvas.getByText(/a tiktok-style interface for exploring random wikipedia articles/i)).toBeVisible();
    await expect(canvas.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/IsaacGemal/wikitok',
    );
  },
};

export const LikesDialogWithSearch: Story = {
  parameters: {
    runtime: {
      localStorage: {
        likedArticles: serializeLikedArticles(likedArticleFixtures),
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));

    const panel = canvas.getByRole('heading', { name: /liked articles/i }).closest('.bg-gray-900');

    if (!panel) {
      throw new Error('Liked articles panel was not rendered.');
    }

    const dialog = within(panel);

    await expect(dialog.getByRole('heading', { name: /liked articles/i })).toBeVisible();
    await expect(dialog.getByRole('button', { name: /export/i })).toBeVisible();
    await expect(dialog.getByRole('link', { name: /mars rover workshop/i })).toBeVisible();

    await userEvent.type(dialog.getByPlaceholderText(/search liked articles/i), 'deep');

    await expect(dialog.getByRole('link', { name: /deep sea vent/i })).toBeVisible();
    await expect(dialog.queryByRole('link', { name: /mars rover workshop/i })).not.toBeInTheDocument();
  },
};
