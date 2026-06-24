import type { Meta, StoryObj } from '@storybook/react-vite';

import { useLikedArticles, LikedArticlesProvider } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const demoArticle: WikiArticle = {
  title: 'Cedar trail',
  displaytitle: 'Cedar trail reopening',
  extract:
    'Rangers reopened the cedar trail after replacing damaged sections of the boardwalk and clearing debris from the overlook.',
  pageid: 7,
  url: 'https://en.wikipedia.org/wiki/Trail',
  thumbnail: {
    source: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
        <rect width="600" height="400" fill="#14532d" />
        <path d="M0 280 C120 230 240 330 360 260 C450 210 520 300 600 250 L600 400 L0 400 Z" fill="#166534" />
        <path d="M220 40 L290 220 L150 220 Z" fill="#86efac" fill-opacity="0.35" />
      </svg>`,
    )}`,
    width: 600,
    height: 400,
  },
};

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
  parameters: {
    layout: 'centered',
  },
  render: () => <LikedArticlesPreview />,
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {};

export const PreloadedLikes: Story = {
  parameters: {
    likedArticles: [demoArticle],
  },
};

function LikedArticlesPreview() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();

  return (
    <div className="w-80 rounded-xl border border-gray-200 bg-white p-6 text-gray-900 shadow-sm">
      <h2 className="text-lg font-semibold">Liked articles</h2>
      <p className="mt-2 text-sm text-gray-600">
        {likedArticles.length} saved {likedArticles.length === 1 ? 'article' : 'articles'}
      </p>
      <button
        type="button"
        className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        onClick={() => toggleLike(demoArticle)}
      >
        {isLiked(demoArticle.pageid) ? 'Remove sample article' : 'Save sample article'}
      </button>
      <ul className="mt-4 space-y-2 text-sm">
        {likedArticles.map((article) => (
          <li key={article.pageid} className="rounded-md bg-gray-100 px-3 py-2">
            {article.displaytitle}
          </li>
        ))}
      </ul>
    </div>
  );
}
