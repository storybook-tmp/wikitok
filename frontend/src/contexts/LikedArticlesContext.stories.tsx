import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Eiffel_Tower',
  displaytitle: 'Eiffel Tower',
  extract: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris.',
  pageid: 9202,
  url: 'https://en.wikipedia.org/wiki/Eiffel_Tower',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/400px-Tour_Eiffel_Wikimedia_Commons.jpg',
    width: 400,
    height: 600,
  },
};

function LikedArticlesDemo() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <p>Liked articles: <strong>{likedArticles.length}</strong></p>
      <button
        onClick={() => toggleLike(sampleArticle)}
        style={{
          padding: '0.5rem 1rem',
          background: isLiked(sampleArticle.pageid) ? '#ef4444' : '#6b7280',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {isLiked(sampleArticle.pageid) ? 'Unlike Eiffel Tower' : 'Like Eiffel Tower'}
      </button>
    </div>
  );
}

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
  decorators: [
    () => (
      <LikedArticlesProvider>
        <LikedArticlesDemo />
      </LikedArticlesProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ToggleLike: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likeButton = canvas.getByRole('button', { name: /like eiffel tower/i });
    await expect(likeButton).toBeInTheDocument();
    await userEvent.click(likeButton);
    await expect(canvas.getByRole('button', { name: /unlike eiffel tower/i })).toBeInTheDocument();
  },
};
