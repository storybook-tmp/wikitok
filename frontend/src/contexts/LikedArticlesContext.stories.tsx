import type { Meta, StoryObj } from '@storybook/react-vite';

import type { WikiArticle } from '../components/WikiCard';
import {
  LikedArticlesProvider,
  useLikedArticles,
} from './LikedArticlesContext';
import {
  likedWikiArticles,
  sampleWikiArticle,
} from '../storybook/fixtures';

function ContextInspector({ article }: { article: WikiArticle }) {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();

  return (
    <div className="w-96 space-y-4 rounded-xl bg-neutral-950 p-6 text-white shadow-2xl">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-white/50">
          Liked articles
        </p>
        <p className="mt-2 text-3xl font-semibold">{likedArticles.length}</p>
      </div>
      <div className="space-y-3">
        <p className="text-sm text-white/70">
          {isLiked(article.pageid) ? 'Already liked' : 'Not liked yet'}
        </p>
        <button
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
          onClick={() => toggleLike(article)}
          type="button"
        >
          {isLiked(article.pageid) ? 'Remove from likes' : 'Add to likes'}
        </button>
      </div>
      <ul className="space-y-2 text-sm text-white/80">
        {likedArticles.map((likedArticle) => (
          <li key={likedArticle.pageid}>{likedArticle.displaytitle}</li>
        ))}
      </ul>
    </div>
  );
}

function SeededProviderStory({ likedArticles }: { likedArticles: WikiArticle[] }) {
  localStorage.setItem('likedArticles', JSON.stringify(likedArticles));

  return (
    <LikedArticlesProvider>
      <ContextInspector article={sampleWikiArticle} />
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
  render: () => <SeededProviderStory likedArticles={[]} />,
};

export const SeededFromStorage: Story = {
  render: () => <SeededProviderStory likedArticles={likedWikiArticles} />,
};
