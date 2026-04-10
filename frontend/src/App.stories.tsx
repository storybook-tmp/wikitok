import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import App from './App';
import { featuredWikiArticle, forestWikiArticle, likedWikiArticle } from '../.storybook/mock-wiki-data';

const meta = {
  component: App,
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingFeed: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(await canvas.findByText(/loading/i)).toBeVisible();
    await expect(
      await canvas.findByRole('heading', { name: featuredWikiArticle.displaytitle }),
    ).toBeVisible();
    await waitFor(() => {
      expect(canvas.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  },
};

export const AboutDialog: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'About' }));

    await expect(
      canvas.getByRole('heading', { name: /about wikitok/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: /github/i }),
    ).toHaveAttribute('href', 'https://github.com/IsaacGemal/wikitok');
  },
};

export const LikesDialog: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Likes' }));

    await expect(
      canvas.getByRole('heading', { name: /liked articles/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: likedWikiArticle.title }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /export/i }),
    ).toBeVisible();
  },
};

export const LikesSearch: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Likes' }));
    await userEvent.type(
      canvas.getByPlaceholderText(/search liked articles/i),
      'cedar',
    );

    await expect(
      canvas.getByRole('link', { name: forestWikiArticle.title }),
    ).toBeVisible();
    await waitFor(() => {
      expect(
        canvas.queryByRole('link', { name: likedWikiArticle.title }),
      ).not.toBeInTheDocument();
    });
  },
};
