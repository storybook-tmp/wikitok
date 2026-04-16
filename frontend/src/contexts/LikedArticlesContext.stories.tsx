import type { Meta, StoryObj } from '@storybook/react-vite';

import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Component-driven development',
  displaytitle: 'Component-driven development',
  extract: 'Building components in isolation makes it easier to iterate on behavior and presentation.',
  pageid: 42,
  thumbnail: {
    source:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    width: 1200,
    height: 800,
  },
  url: 'https://example.com/articles/component-driven-development',
};

type ProviderStoryArgs = {
  article: WikiArticle;
  preloadedArticles: WikiArticle[];
};

function ProviderHarness({ article }: { article: WikiArticle }) {
  const { isLiked, likedArticles, toggleLike } = useLikedArticles();

  return (
    <div className="flex min-h-56 w-full max-w-md flex-col gap-4 rounded-xl bg-gray-950 p-6 text-white">
      <p className="text-sm text-white/70">Liked articles: {likedArticles.length}</p>
      <p className="text-lg font-semibold">{article.displaytitle}</p>
      <p className="text-sm text-white/80">{article.extract}</p>
      <button
        className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
        onClick={() => toggleLike(article)}
        type="button"
      >
        {isLiked(article.pageid) ? 'Remove from likes' : 'Add to likes'}
      </button>
    </div>
  );
}

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
  parameters: {
    layout: 'centered',
  },
  args: {
    article: sampleArticle,
    preloadedArticles: [],
  },
  render: ({ article, preloadedArticles }) => {
    localStorage.setItem('likedArticles', JSON.stringify(preloadedArticles));

    return (
      <LikedArticlesProvider>
        <ProviderHarness article={article} />
      </LikedArticlesProvider>
    );
  },
} satisfies Meta<ProviderStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {};

export const WithSavedArticle: Story = {
  args: {
    preloadedArticles: [sampleArticle],
  },
};
