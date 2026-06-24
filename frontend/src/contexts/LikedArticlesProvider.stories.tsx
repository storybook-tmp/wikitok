import type { Meta, StoryObj } from '@storybook/react-vite';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const mockArticle: WikiArticle = {
  title: 'Test Article',
  displaytitle: 'Test Article',
  extract: 'A test article used to demonstrate the liked articles provider.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Test',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/250px-Camponotus_flavomarginatus_ant.jpg',
    width: 250,
    height: 188,
  },
};

function LikeDemo() {
  const { toggleLike, likedArticles, isLiked } = useLikedArticles();

  return (
    <div style={{ padding: '20px', color: 'white', backgroundColor: '#1a1a1a', minHeight: 200 }}>
      <h2>Liked Articles: {likedArticles.length}</h2>
      <p>
        Article &quot;{mockArticle.title}&quot; liked:{' '}
        {isLiked(mockArticle.pageid) ? 'Yes' : 'No'}
      </p>
      <button
        onClick={() => toggleLike(mockArticle)}
        style={{ padding: '8px 16px', cursor: 'pointer', marginTop: 8 }}
      >
        Toggle Like
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

export const WithSimpleChildren: Story = {
  render: () => (
    <LikedArticlesProvider>
      <div style={{ padding: '20px', color: 'white', backgroundColor: '#1a1a1a' }}>
        <h2>Provider with simple children</h2>
        <p>The provider renders its children and provides context.</p>
      </div>
    </LikedArticlesProvider>
  ),
};
