import type { Meta, StoryObj } from '@storybook/react-vite';

import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Moonbow',
  displaytitle: 'Moonbow',
  extract:
    'A moonbow is a rainbow produced by moonlight instead of direct sunlight, and it often appears pale to the human eye.',
  pageid: 301,
  url: 'https://example.com/articles/moonbow',
  thumbnail: {
    source:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%230b1120'/%3E%3Cpath d='M0 260 Q180 200 300 250 T600 220 V400 H0 Z' fill='%231e293b'/%3E%3Cpath d='M120 220 Q300 120 480 220' stroke='%23c4b5fd' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='300' cy='120' r='44' fill='%23f8fafc' fill-opacity='0.9'/%3E%3C/svg%3E",
    width: 600,
    height: 400,
  },
};

function ProviderStateDemo() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();
  const liked = isLiked(sampleArticle.pageid);

  return (
    <div className="max-w-md space-y-4 rounded-xl bg-slate-950 p-6 text-white">
      <div>
        <h2 className="text-lg font-semibold">Liked Articles Provider</h2>
        <p className="text-sm text-white/70">
          Favorites stored in context: {likedArticles.length}
        </p>
      </div>
      <button
        type="button"
        onClick={() => toggleLike(sampleArticle)}
        className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-950"
      >
        {liked ? 'Remove favorite' : 'Save favorite'}
      </button>
      <div className="rounded-lg border border-white/10 p-4 text-sm text-white/80">
        {liked ? (
          <span>{sampleArticle.displaytitle} is currently in favorites.</span>
        ) : (
          <span>No saved favorites yet.</span>
        )}
      </div>
    </div>
  );
}

function renderProviderStory(initialLikedArticles: WikiArticle[]) {
  localStorage.setItem('likedArticles', JSON.stringify(initialLikedArticles));

  return (
    <LikedArticlesProvider>
      <ProviderStateDemo />
    </LikedArticlesProvider>
  );
}

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {
  render: () => renderProviderStory([]),
};

export const WithSavedFavorite: Story = {
  render: () => renderProviderStory([sampleArticle]),
};
