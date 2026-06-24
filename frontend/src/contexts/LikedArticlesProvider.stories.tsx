import type { Meta, StoryObj } from '@storybook/react-vite';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

function LikeDemo() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();

  const sampleArticle: WikiArticle = {
    title: 'Sample Article',
    displaytitle: 'Sample Article',
    extract: 'This is a sample article to demonstrate the like functionality.',
    pageid: 99999,
    url: 'https://en.wikipedia.org/wiki/Sample',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/440px-Ada_Lovelace_portrait.jpg',
      width: 440,
      height: 600,
    },
  };

  return (
    <div style={{ padding: '2rem', background: '#111', color: 'white', minHeight: '200px' }}>
      <h2 style={{ marginBottom: '1rem' }}>Like Demo</h2>
      <p>Liked articles: {likedArticles.length}</p>
      <button
        onClick={() => toggleLike(sampleArticle)}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: isLiked(sampleArticle.pageid) ? '#ef4444' : '#374151',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
        }}
      >
        {isLiked(sampleArticle.pageid) ? 'Unlike' : 'Like'} Sample Article
      </button>
    </div>
  );
}

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
  parameters: {
    layout: 'fullscreen',
  },
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
      <div style={{ padding: '2rem', background: '#111', color: 'white' }}>
        <h2>Provider wrapping content</h2>
        <p>The LikedArticlesProvider manages liked articles state with localStorage persistence and shows a heart animation on like.</p>
      </div>
    </LikedArticlesProvider>
  ),
};
