import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Mount_Everest',
  displaytitle: 'Mount Everest',
  extract: 'Mount Everest is Earth\'s highest mountain above sea level.',
  pageid: 26758,
  url: 'https://en.wikipedia.org/wiki/Mount_Everest',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/640px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
    width: 640,
    height: 480,
  },
};

function LikeDemo() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();
  return (
    <div style={{ padding: '2rem', color: 'white', background: '#111', minHeight: '200px' }}>
      <p>Liked articles: {likedArticles.length}</p>
      <button
        onClick={() => toggleLike(sampleArticle)}
        style={{ padding: '0.5rem 1rem', marginTop: '1rem', cursor: 'pointer' }}
      >
        {isLiked(sampleArticle.pageid) ? 'Unlike' : 'Like'} Mount Everest
      </button>
    </div>
  );
}

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
  decorators: [
    (Story) => (
      <LikedArticlesProvider>
        <Story />
      </LikedArticlesProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <LikeDemo />,
};

export const WithPrelikedArticle: Story = {
  render: () => {
    return (
      <LikedArticlesProvider>
        <LikeDemo />
      </LikedArticlesProvider>
    );
  },
};
