import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';

function LikedArticlesSummary() {
  const { likedArticles } = useLikedArticles();

  return (
    <div className="rounded-lg bg-neutral-900 p-4 text-sm text-white">
      <p>{likedArticles.length} liked article(s)</p>
      {likedArticles[0] ? <p>{likedArticles[0].title}</p> : <p>No saved favorites yet.</p>}
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
    children: <LikedArticlesSummary />,
  },
  render: (args) => <LikedArticlesProvider>{args.children}</LikedArticlesProvider>,
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {
  loaders: [
    async () => {
      localStorage.setItem('likedArticles', JSON.stringify([]));
      return {};
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('0 liked article(s)')).toBeInTheDocument();
    await expect(canvas.getByText('No saved favorites yet.')).toBeInTheDocument();
  },
};

export const RestoredFromStorage: Story = {
  loaders: [
    async () => {
      localStorage.setItem(
        'likedArticles',
        JSON.stringify([
          {
            title: 'Aurora',
            displaytitle: 'Aurora',
            extract: 'Auroras are natural light displays.',
            pageid: 1001,
            url: 'https://en.wikipedia.org/wiki/Aurora',
            thumbnail: {
              source:
                'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
              width: 1200,
              height: 800,
            },
          },
        ]),
      );
      return {};
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('1 liked article(s)')).toBeInTheDocument();
    await expect(canvas.getByText('Aurora')).toBeInTheDocument();
  },
};
