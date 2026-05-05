import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';
import type { WikiArticle } from './components/WikiCard';

const savedArticles: WikiArticle[] = [
  {
    title: 'Quantum Mechanics',
    displaytitle: 'Quantum Mechanics',
    extract: 'Quantum mechanics is a fundamental theory in physics.',
    pageid: 1001,
    url: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Hydrogen_Density_Plots.png/800px-Hydrogen_Density_Plots.png',
      width: 800,
      height: 600,
    },
  },
  {
    title: 'Aurora Borealis',
    displaytitle: 'Aurora Borealis',
    extract: 'An aurora is a natural light display in Earth\'s sky.',
    pageid: 1002,
    url: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
      width: 800,
      height: 533,
    },
  },
];

const meta = {
  component: App,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
  async beforeEach() {
    localStorage.setItem('likedArticles', JSON.stringify(savedArticles));
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LikesModalWithSavedArticles: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('WikiTok')).toBeVisible();
      },
      { timeout: 5000 },
    );
    await userEvent.click(canvas.getByText('Likes'));
    await waitFor(() => {
      expect(canvas.getByText('Liked Articles')).toBeVisible();
    });
    // Saved articles should appear in the likes modal
    await expect(canvas.getAllByText('Quantum Mechanics').length).toBeGreaterThanOrEqual(1);
    await expect(canvas.getAllByText('Aurora Borealis').length).toBeGreaterThanOrEqual(1);
    // Export button should be visible when there are liked articles
    await expect(canvas.getByText('Export')).toBeVisible();
  },
};

export const SearchLikedArticles: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('WikiTok')).toBeVisible();
      },
      { timeout: 5000 },
    );
    await userEvent.click(canvas.getByText('Likes'));
    await waitFor(() => {
      expect(canvas.getByText('Liked Articles')).toBeVisible();
    });
    const searchInput = canvas.getByPlaceholderText('Search liked articles...');
    await userEvent.type(searchInput, 'Aurora');
    // Only Aurora should remain visible in the filtered list
    await waitFor(() => {
      expect(canvas.queryByText('No matches found.')).not.toBeInTheDocument();
    });
  },
};

export const SearchNoResults: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('WikiTok')).toBeVisible();
      },
      { timeout: 5000 },
    );
    await userEvent.click(canvas.getByText('Likes'));
    await waitFor(() => {
      expect(canvas.getByText('Liked Articles')).toBeVisible();
    });
    const searchInput = canvas.getByPlaceholderText('Search liked articles...');
    await userEvent.type(searchInput, 'nonexistenttopic');
    await waitFor(() => {
      expect(canvas.getByText('No matches found.')).toBeVisible();
    });
  },
};
