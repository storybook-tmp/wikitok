import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import type { WikiArticle } from '../components/WikiCard';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';

const sampleArticle: WikiArticle = {
  title: 'Aurora',
  displaytitle: 'Aurora',
  extract: 'A natural light display usually seen in high-latitude regions.',
  pageid: 42,
  url: 'https://en.wikipedia.org/wiki/Aurora',
  thumbnail: {
    source: 'https://picsum.photos/seed/aurora/900/600',
    width: 900,
    height: 600,
  },
};

function ProviderDemo() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();

  return (
    <div className="space-y-4 rounded-lg bg-neutral-950 p-6 text-white">
      <h2 className="text-xl font-semibold">Liked Articles Provider</h2>
      <p>{likedArticles.length} liked article(s)</p>
      <p>{isLiked(sampleArticle.pageid) ? 'Aurora is liked' : 'Aurora is not liked'}</p>
      <button
        type="button"
        className="rounded-md bg-white px-4 py-2 text-black"
        onClick={() => toggleLike(sampleArticle)}
      >
        Toggle Aurora
      </button>
      <ul className="list-disc pl-6">
        {likedArticles.map((article) => (
          <li key={article.pageid}>{article.displaytitle}</li>
        ))}
      </ul>
    </div>
  );
}

const meta = {
  title: 'AI Generated/Medium/LikedArticlesProvider',
  component: LikedArticlesProvider,
  parameters: {
    layout: 'padded',
    skipLikedArticlesProvider: true,
  },
  render: () => (
    <LikedArticlesProvider>
      <ProviderDemo />
    </LikedArticlesProvider>
  ),
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('0 liked article(s)')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle Aurora' }));
    await expect(canvas.getByText('1 liked article(s)')).toBeInTheDocument();
  },
};

export const PreloadedFavorites: Story = {
  parameters: {
    initialLikedArticles: [sampleArticle],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('1 liked article(s)')).toBeInTheDocument();
    await expect(canvas.getByText('Aurora')).toBeInTheDocument();
  },
};
