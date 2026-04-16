import type { Meta, StoryObj } from '@storybook/react-vite';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';
import { Heart } from 'lucide-react';

const sampleArticle: WikiArticle = {
  title: 'Sample Article',
  displaytitle: 'Sample Article',
  extract: 'This is a sample article used to demonstrate the LikedArticlesProvider.',
  pageid: 99999,
  url: 'https://en.wikipedia.org/wiki/Sample',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
    width: 800,
    height: 600,
  },
};

function LikeDemo() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();
  const liked = isLiked(sampleArticle.pageid);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '1rem' }}>Like Demo</h2>
      <button
        onClick={() => toggleLike(sampleArticle)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: liked ? '#ef4444' : '#e5e7eb',
          color: liked ? 'white' : 'black',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        <Heart size={20} fill={liked ? 'white' : 'none'} />
        {liked ? 'Liked' : 'Like'}
      </button>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        Liked articles: {likedArticles.length}
      </p>
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

export const WithPreLikedArticle: Story = {
  render: () => (
    <LikedArticlesProvider>
      <LikeDemo />
    </LikedArticlesProvider>
  ),
};
