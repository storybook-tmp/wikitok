import type { Meta, StoryObj } from '@storybook/react-vite';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Test Article',
  displaytitle: 'Test Article',
  extract: 'A test article for demonstrating the liked articles context.',
  pageid: 99999,
  url: 'https://en.wikipedia.org/wiki/Test',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/220px-Wikipedia-logo-v2.svg.png',
    width: 220,
    height: 220,
  },
};

function LikeDemo() {
  const { toggleLike, isLiked, likedArticles } = useLikedArticles();

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>Liked Articles Demo</h2>
      <p>Total liked: {likedArticles.length}</p>
      <button
        onClick={() => toggleLike(sampleArticle)}
        style={{
          padding: '8px 16px',
          backgroundColor: isLiked(sampleArticle.pageid) ? '#ef4444' : '#374151',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        {isLiked(sampleArticle.pageid) ? 'Unlike' : 'Like'} Article
      </button>
    </div>
  );
}

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#000', minWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
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
  render: () => (
    <LikedArticlesProvider>
      <LikeDemo />
      <p style={{ color: 'white', padding: '0 20px', fontSize: '14px' }}>
        Click the button to toggle likes and see the heart animation.
      </p>
    </LikedArticlesProvider>
  ),
};
