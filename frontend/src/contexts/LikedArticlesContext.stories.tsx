import type { Meta, StoryObj } from '@storybook/react-vite';

import type { WikiArticle } from '../components/WikiCard';

import {
  LikedArticlesProvider,
  useLikedArticles,
} from './LikedArticlesContext';

const sampleArticle: WikiArticle = {
  title: 'Tidal Energy',
  displaytitle: 'Tidal Energy',
  extract:
    'Tidal energy converts the movement of ocean tides into electricity with predictable output patterns.',
  pageid: 301,
  url: 'https://en.wikipedia.org/wiki/Tidal_power',
  thumbnail: {
    source:
      'data:image/svg+xml;charset=utf-8,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="100%" height="100%" fill="#0f172a"/><text x="50%" y="50%" fill="white" font-size="28" text-anchor="middle" dominant-baseline="middle">Tidal Energy</text></svg>',
      ),
    width: 320,
    height: 180,
  },
};

const preloadedArticles: WikiArticle[] = [
  sampleArticle,
  {
    title: 'Mangrove',
    displaytitle: 'Mangrove',
    extract:
      'Mangroves are salt-tolerant trees that stabilize coastlines and provide habitat for diverse marine life.',
    pageid: 302,
    url: 'https://en.wikipedia.org/wiki/Mangrove',
    thumbnail: {
      source:
        'data:image/svg+xml;charset=utf-8,' +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="100%" height="100%" fill="#14532d"/><text x="50%" y="50%" fill="white" font-size="28" text-anchor="middle" dominant-baseline="middle">Mangrove</text></svg>',
        ),
      width: 320,
      height: 180,
    },
  },
];

function LikedArticlesProbe() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-xl space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold">Liked articles store</h2>
        <p className="text-sm text-white/70">
          Saved count: <strong>{likedArticles.length}</strong>
        </p>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-400"
          onClick={() => toggleLike(sampleArticle)}
          type="button"
        >
          {isLiked(sampleArticle.pageid) ? 'Remove sample article' : 'Save sample article'}
        </button>
        <ul className="space-y-2 text-sm text-white/80">
          {likedArticles.map((article) => (
            <li key={article.pageid}>{article.displaytitle}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <LikedArticlesProvider>
      <LikedArticlesProbe />
    </LikedArticlesProvider>
  ),
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {
  parameters: {
    initialLikedArticles: [],
  },
};

export const PreloadedFavorites: Story = {
  parameters: {
    initialLikedArticles: preloadedArticles,
  },
};
