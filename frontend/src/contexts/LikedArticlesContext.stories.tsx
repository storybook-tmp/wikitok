import type { Meta, StoryObj } from '@storybook/react-vite';
import { useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';
import { Heart } from 'lucide-react';

const sampleArticle: WikiArticle = {
  title: 'Sample Article',
  displaytitle: 'Sample Article',
  extract: 'This is a sample article used to demonstrate the liked articles context.',
  pageid: 99999,
  url: 'https://en.wikipedia.org/wiki/Sample',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/800px-Camponotus_flavomarginatus_ant.jpg',
    width: 800,
    height: 600,
  },
};

function LikedArticlesDemo() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();
  const liked = isLiked(sampleArticle.pageid);

  return (
    <div className="bg-gray-900 p-6 rounded-lg max-w-md text-white">
      <h2 className="text-xl font-bold mb-4">Liked Articles Demo</h2>
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => toggleLike(sampleArticle)}
          className={`p-2 rounded-full transition-colors ${
            liked ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-white' : ''}`} />
        </button>
        <span>{liked ? 'Liked!' : 'Click to like'}</span>
      </div>
      <p className="text-white/70 text-sm">
        Total liked articles: {likedArticles.length}
      </p>
    </div>
  );
}

const meta = {
  title: 'AI Generated/Medium/LikedArticlesContext',
  component: LikedArticlesDemo,
} satisfies Meta<typeof LikedArticlesDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactive: Story = {
  render: () => (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <LikedArticlesDemo />
    </div>
  ),
};
