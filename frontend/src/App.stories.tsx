import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import App from './App';
import type { WikiArticle } from './components/WikiCard';

const meta = {
  component: App,
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

const likedEinstein: WikiArticle = {
  pageid: 736,
  title: 'Albert Einstein',
  displaytitle: 'Albert Einstein',
  extract:
    'Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time.',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg',
    width: 800,
    height: 1000,
  },
  url: 'https://en.wikipedia.org/wiki/Albert_Einstein',
};

export const Default: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: /wikitok/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /about/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /likes/i })).toBeVisible();
    await waitFor(
      async () => {
        await expect(canvas.getByText('Albert Einstein')).toBeVisible();
      },
      { timeout: 5000 }
    );
  },
};

export const AboutModalOpen: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const aboutButton = canvas.getByRole('button', { name: /about/i });
    await userEvent.click(aboutButton);
    await expect(canvas.getByText('About WikiTok')).toBeVisible();
    await expect(
      canvas.getByText(/TikTok-style interface for exploring random Wikipedia articles/i)
    ).toBeVisible();
  },
};

export const LikesModalOpen: Story = {
  render: () => <App />,
  async beforeEach() {
    localStorage.setItem('likedArticles', JSON.stringify([likedEinstein]));
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likesButton = canvas.getByRole('button', { name: /likes/i });
    await userEvent.click(likesButton);
    await expect(canvas.getByText('Liked Articles')).toBeVisible();
    await expect(canvas.getByPlaceholderText(/search liked articles/i)).toBeVisible();
    await expect(canvas.getByText('Albert Einstein')).toBeVisible();
  },
};

export const EmptyLikesModal: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likesButton = canvas.getByRole('button', { name: /likes/i });
    await userEvent.click(likesButton);
    await expect(canvas.getByText('Liked Articles')).toBeVisible();
    await expect(canvas.getByText(/no liked articles yet/i)).toBeVisible();
  },
};
