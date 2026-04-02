import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import type { WikiArticle } from '../components/WikiCard';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';

const sampleArticle: WikiArticle = {
  title: 'Moonbow',
  displaytitle: 'Moonbow',
  extract:
    'A moonbow is a rainbow created by moonlight instead of direct sunlight and is usually visible in misty nighttime conditions.',
  pageid: 77,
  url: 'https://en.wikipedia.org/wiki/Moonbow',
  thumbnail: {
    source:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    width: 1200,
    height: 800,
  },
};

function ProviderProbe() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();

  return (
    <div className="flex max-w-md flex-col gap-4 rounded-lg bg-gray-950 p-6 text-white">
      <p>Liked count: {likedArticles.length}</p>
      <button
        className="rounded bg-white px-3 py-2 text-black"
        onClick={() => toggleLike(sampleArticle)}
      >
        {isLiked(sampleArticle.pageid) ? 'Remove from likes' : 'Add to likes'}
      </button>
      <ul className="list-disc pl-5">
        {likedArticles.map((article) => (
          <li key={article.pageid}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
}

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <LikedArticlesProvider>
      <ProviderProbe />
    </LikedArticlesProvider>
  ),
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {};

export const ToggleFlow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Add to likes' }));

    await expect(canvas.getByText('Liked count: 1')).toBeInTheDocument();
    await expect(canvas.getByText('Moonbow')).toBeInTheDocument();
  },
};
