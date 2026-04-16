import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor } from 'storybook/test';
import App from './App';
import type { WikiArticle } from './components/WikiCard';

const mockLikedArticle: WikiArticle = {
  pageid: 1003,
  title: 'Mount Everest',
  displaytitle: 'Mount Everest',
  extract:
    "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas.",
  url: 'https://en.wikipedia.org/wiki/Mount_Everest',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
    width: 800,
    height: 574,
  },
};

const meta = {
  component: App,
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <App />,
  play: async ({ canvas }) => {
    // The WikiTok logo button should be visible
    await expect(canvas.getByRole('button', { name: /wikitok/i })).toBeVisible();
    // Navigation buttons should be present
    await expect(canvas.getByRole('button', { name: /about/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /likes/i })).toBeVisible();
  },
};

export const AboutModalOpen: Story = {
  render: () => <App />,
  play: async ({ canvas }) => {
    const aboutButton = canvas.getByRole('button', { name: /about/i });
    await userEvent.click(aboutButton);
    await expect(canvas.getByRole('heading', { name: /about wikitok/i })).toBeVisible();
    await expect(canvas.getByText(/tiktok-style interface/i)).toBeVisible();
  },
};

export const LikesModalOpen: Story = {
  render: () => <App />,
  play: async ({ canvas }) => {
    const likesButton = canvas.getByRole('button', { name: /likes/i });
    await userEvent.click(likesButton);
    await expect(canvas.getByRole('heading', { name: /liked articles/i })).toBeVisible();
    await expect(canvas.getByPlaceholderText(/search liked articles/i)).toBeVisible();
  },
};

export const LikesModalWithArticles: Story = {
  render: () => <App />,
  async beforeEach() {
    localStorage.setItem('likedArticles', JSON.stringify([mockLikedArticle]));
  },
  play: async ({ canvas }) => {
    const likesButton = canvas.getByRole('button', { name: /likes/i });
    await userEvent.click(likesButton);
    await expect(canvas.getByRole('heading', { name: /liked articles/i })).toBeVisible();
    await waitFor(() => expect(canvas.getByText('Mount Everest')).toBeVisible());
    // Export button should appear when there are liked articles
    await expect(canvas.getByRole('button', { name: /export/i })).toBeVisible();
  },
};

export const LoadingState: Story = {
  render: () => <App />,
  play: async ({ canvas }) => {
    // The app should show content after loading from MSW
    await waitFor(
      () => expect(canvas.getByRole('button', { name: /wikitok/i })).toBeVisible(),
      { timeout: 5000 }
    );
  },
};
