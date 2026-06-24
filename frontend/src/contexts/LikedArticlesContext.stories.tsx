import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import type { WikiArticle } from '../components/WikiCard';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';

const sampleArticle: WikiArticle = {
  title: 'Glacier',
  displaytitle: 'Retreating Glacier',
  extract:
    'Glaciers archive climate history in compressed ice, but many are shrinking rapidly as global temperatures rise.',
  pageid: 2002,
  url: 'https://en.wikipedia.org/wiki/Glacier',
  thumbnail: {
    source:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
    width: 900,
    height: 1200,
  },
};

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
  loaders: [
    async () => {
      localStorage.setItem('likedArticles', '[]');
      localStorage.removeItem('lang');
      return {};
    },
  ],
  render: () => <LikedArticlesHarness />,
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('0 liked articles')).toBeInTheDocument();
  },
};

export const ToggleArticle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Toggle glacier/i }));
    await expect(canvas.getByText('1 liked articles')).toBeInTheDocument();
  },
};

function LikedArticlesHarness() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();

  return (
    <div className="flex min-h-40 flex-col items-start gap-4 rounded-xl bg-slate-950 p-6 text-white">
      <p>{likedArticles.length} liked articles</p>
      <p>{isLiked(sampleArticle.pageid) ? 'This article is liked.' : 'Nothing liked yet.'}</p>
      <button
        className="rounded-md bg-white px-3 py-2 text-slate-950"
        onClick={() => toggleLike(sampleArticle)}
      >
        Toggle {sampleArticle.title}
      </button>
    </div>
  );
}
