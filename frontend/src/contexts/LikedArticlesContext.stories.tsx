import type { Meta, StoryObj } from '@storybook/react-vite';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Example Article',
  displaytitle: 'Example Article',
  extract: 'This is a sample article used to demonstrate the LikedArticlesProvider.',
  pageid: 99999,
  url: 'https://en.wikipedia.org/wiki/Example',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg',
    width: 320,
    height: 240,
  },
};

function LikeDemo() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();
  return (
    <div style={{ padding: 20, color: 'white', backgroundColor: '#111', borderRadius: 8 }}>
      <h3 style={{ marginBottom: 12 }}>Liked Articles: {likedArticles.length}</h3>
      <button
        onClick={() => toggleLike(sampleArticle)}
        style={{
          padding: '8px 16px',
          borderRadius: 6,
          border: 'none',
          cursor: 'pointer',
          backgroundColor: isLiked(sampleArticle.pageid) ? '#ef4444' : '#3b82f6',
          color: 'white',
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
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Content wrapped by LikedArticlesProvider',
  },
};

export const Interactive: Story = {
  render: () => (
    <LikedArticlesProvider>
      <LikeDemo />
    </LikedArticlesProvider>
  ),
};
