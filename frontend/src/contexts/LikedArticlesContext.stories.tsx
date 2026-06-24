import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { sampleWikiArticle, sampleWikiArticles } from '../storybook/fixtures';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Liked count: 0')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: /like sample article/i }));
    await expect(canvas.getByText('Liked count: 1')).toBeInTheDocument();
  },
};

export const PreloadedLikes: Story = {
  render: () => renderProviderStory(sampleWikiArticles.slice(0, 2)),
};

function renderProviderStory(likedArticles: typeof sampleWikiArticles) {
  localStorage.setItem('likedArticles', JSON.stringify(likedArticles));

  return (
    <LikedArticlesProvider>
      <LikedArticlesPreview />
    </LikedArticlesProvider>
  );
}

function LikedArticlesPreview() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();
  const liked = isLiked(sampleWikiArticle.pageid);

  return (
    <div className="w-80 rounded-xl bg-gray-950 p-6 text-white shadow-lg">
      <p className="text-sm text-white/70">Saved for later</p>
      <p className="mt-2 text-2xl font-semibold">Liked count: {likedArticles.length}</p>
      <button
        className="mt-4 rounded-lg bg-white px-4 py-2 font-medium text-black"
        onClick={() => toggleLike(sampleWikiArticle)}
      >
        {liked ? 'Unlike sample article' : 'Like sample article'}
      </button>
      <ul className="mt-4 space-y-2 text-sm text-white/80">
        {likedArticles.map((article) => (
          <li key={article.pageid}>{article.displaytitle}</li>
        ))}
      </ul>
    </div>
  );
}
