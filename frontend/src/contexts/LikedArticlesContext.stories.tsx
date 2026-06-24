import type { Meta, StoryObj } from '@storybook/react-vite';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Test Article',
  displaytitle: 'Test Article',
  extract: 'This is a test article to demonstrate the like functionality.',
  pageid: 99999,
  url: 'https://en.wikipedia.org/wiki/Test',
  thumbnail: {
    source: 'https://placehold.co/800x600',
    width: 800,
    height: 600,
  },
};

function LikeDemo() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();
  return (
    <div style={{ padding: '20px', color: 'white', background: '#111', minHeight: '200px' }}>
      <h3 style={{ marginBottom: '12px' }}>Liked Articles: {likedArticles.length}</h3>
      <button
        onClick={() => toggleLike(sampleArticle)}
        style={{
          padding: '8px 16px',
          background: isLiked(sampleArticle.pageid) ? '#ef4444' : '#374151',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        {isLiked(sampleArticle.pageid) ? 'Unlike' : 'Like'} "{sampleArticle.title}"
      </button>
      {likedArticles.length > 0 && (
        <ul style={{ marginTop: '12px' }}>
          {likedArticles.map((a) => (
            <li key={a.pageid}>{a.title}</li>
          ))}
        </ul>
      )}
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

export const WithInteraction: Story = {
  render: () => (
    <LikedArticlesProvider>
      <LikeDemo />
    </LikedArticlesProvider>
  ),
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    button?.click();
  },
};
