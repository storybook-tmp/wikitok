import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import App from './App';
import type { WikiArticle } from './components/WikiCard';

const presetLikedArticles: WikiArticle[] = [
  {
    title: 'Aurora Borealis',
    displaytitle: 'Aurora Borealis',
    extract: 'An aurora, also commonly known as the northern lights.',
    pageid: 12345,
    url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
    thumbnail: {
      source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Aurora',
      width: 800,
      height: 600,
    },
  },
  {
    title: 'Deep Sea Creatures',
    displaytitle: 'Deep Sea Creatures',
    extract: 'Deep-sea creatures are organisms that live below the photic zone.',
    pageid: 67890,
    url: 'https://en.wikipedia.org/wiki/Deep_sea_creature',
    thumbnail: {
      source: 'https://placehold.co/800x600/0d1b2a/ffffff?text=Deep+Sea',
      width: 800,
      height: 600,
    },
  },
];

const meta = {
  component: App,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPresetLikes: Story = {
  async beforeEach() {
    localStorage.setItem('likedArticles', JSON.stringify(presetLikedArticles));
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('WikiTok')).toBeVisible();
    const likesButton = canvas.getByRole('button', { name: /likes/i });
    await userEvent.click(likesButton);
    await expect(canvas.getByRole('heading', { name: /liked articles/i })).toBeVisible();
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(canvas.getByText('Deep Sea Creatures')).toBeVisible();
  },
};

export const SearchLikedArticles: Story = {
  async beforeEach() {
    localStorage.setItem('likedArticles', JSON.stringify(presetLikedArticles));
  },
  play: async ({ canvas, userEvent }) => {
    const likesButton = canvas.getByRole('button', { name: /likes/i });
    await userEvent.click(likesButton);
    const searchInput = canvas.getByPlaceholderText(/search liked articles/i);
    await userEvent.type(searchInput, 'Aurora');
    // Verify search input has the typed value
    await expect(searchInput).toHaveValue('Aurora');
    // Verify the heading is still visible (modal didn't close)
    await expect(canvas.getByRole('heading', { name: /liked articles/i })).toBeVisible();
  },
};

export const ExportButton: Story = {
  async beforeEach() {
    localStorage.setItem('likedArticles', JSON.stringify(presetLikedArticles));
  },
  play: async ({ canvas, userEvent }) => {
    const likesButton = canvas.getByRole('button', { name: /likes/i });
    await userEvent.click(likesButton);
    const exportButton = canvas.getByRole('button', { name: /export/i });
    await expect(exportButton).toBeVisible();
  },
};
