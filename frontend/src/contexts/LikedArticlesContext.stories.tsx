import type { Meta, StoryObj } from '@storybook/react';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const testArticle: WikiArticle = {
  title: 'Test Article',
  displaytitle: 'Test Article',
  extract: 'A sample article to demonstrate the like functionality.',
  pageid: 42,
  url: 'https://en.wikipedia.org/wiki/Test',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/320px-Polarlicht_2.jpg',
    width: 320,
    height: 240,
  },
};

function LikeDemo() {
  const { toggleLike, isLiked, likedArticles } = useLikedArticles();
  return (
    <div style={{ padding: 20, color: 'white', background: '#111' }}>
      <h3>Liked Articles: {likedArticles.length}</h3>
      <button
        onClick={() => toggleLike(testArticle)}
        style={{
          padding: '8px 16px',
          marginTop: 8,
          background: isLiked(42) ? '#ef4444' : '#333',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        {isLiked(42) ? 'Unlike' : 'Like'} Test Article
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

export const WithMultipleArticles: Story = {
  render: () => {
    function MultiDemo() {
      const { toggleLike, likedArticles } = useLikedArticles();
      const articles: WikiArticle[] = [
        { ...testArticle, pageid: 1, title: 'Physics', displaytitle: 'Physics' },
        { ...testArticle, pageid: 2, title: 'Chemistry', displaytitle: 'Chemistry' },
        { ...testArticle, pageid: 3, title: 'Biology', displaytitle: 'Biology' },
      ];
      return (
        <div style={{ padding: 20, color: 'white', background: '#111' }}>
          <h3>Liked: {likedArticles.length}</h3>
          {articles.map((a) => (
            <button
              key={a.pageid}
              onClick={() => toggleLike(a)}
              style={{ display: 'block', margin: '4px 0', padding: '6px 12px', background: '#333', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            >
              {a.title}
            </button>
          ))}
        </div>
      );
    }
    return (
      <LikedArticlesProvider>
        <MultiDemo />
      </LikedArticlesProvider>
    );
  },
};
