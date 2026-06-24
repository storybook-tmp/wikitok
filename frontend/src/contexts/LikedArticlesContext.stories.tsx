import type { Meta, StoryObj } from '@storybook/react-vite';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Sample',
  displaytitle: 'Sample Article',
  extract: 'A sample article for demonstrating the like functionality.',
  pageid: 999,
  url: 'https://en.wikipedia.org/wiki/Sample',
  thumbnail: { source: '', width: 100, height: 100 },
};

function LikeDemo() {
  const { toggleLike, isLiked, likedArticles } = useLikedArticles();
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h3>Liked Articles Provider Demo</h3>
      <p>Liked articles count: {likedArticles.length}</p>
      <button
        onClick={() => toggleLike(sampleArticle)}
        style={{
          padding: '0.5rem 1rem',
          marginTop: '0.5rem',
          cursor: 'pointer',
          background: isLiked(999) ? '#ef4444' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
        }}
      >
        {isLiked(999) ? 'Unlike' : 'Like'} Sample Article
      </button>
    </div>
  );
}

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <LikedArticlesProvider>
      <LikeDemo />
    </LikedArticlesProvider>
  ),
};

export const WithContent: Story = {
  render: () => (
    <LikedArticlesProvider>
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <p>The LikedArticlesProvider wraps children and manages like state via Context and localStorage.</p>
        <p>It also renders a heart animation when an article is liked.</p>
      </div>
    </LikedArticlesProvider>
  ),
};
