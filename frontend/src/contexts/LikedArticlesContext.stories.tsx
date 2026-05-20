import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticle: WikiArticle = {
  title: 'Mount_Everest',
  displaytitle: 'Mount Everest',
  extract: 'The highest mountain above sea level.',
  pageid: 26844,
  url: 'https://en.wikipedia.org/wiki/Mount_Everest',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/100px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
    width: 100,
    height: 75,
  },
};

const LikeControls = () => {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white space-y-4">
      <p className="text-lg">Liked articles: {likedArticles.length}</p>
      <button
        onClick={() => toggleLike(mockArticle)}
        className={`px-4 py-2 rounded font-medium ${
          isLiked(mockArticle.pageid)
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-gray-700 hover:bg-gray-600'
        }`}
      >
        {isLiked(mockArticle.pageid) ? 'Unlike Mount Everest' : 'Like Mount Everest'}
      </button>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <LikedArticlesProvider>
      <LikeControls />
    </LikedArticlesProvider>
  ),
};

export const WithPreexistingLikes: Story = {
  render: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('likedArticles', JSON.stringify([mockArticle]));
    }
    return (
      <LikedArticlesProvider>
        <LikeControls />
      </LikedArticlesProvider>
    );
  },
};
