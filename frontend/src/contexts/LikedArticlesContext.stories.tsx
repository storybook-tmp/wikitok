import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Sample_Article',
  displaytitle: 'Sample Article',
  extract: 'A sample Wikipedia article used to demonstrate the liked articles context.',
  pageid: 9999,
  url: 'https://en.wikipedia.org/wiki/Sample',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg',
    width: 320,
    height: 213,
  },
};

function LikedArticlesDemo() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();
  const liked = isLiked(sampleArticle.pageid);

  return (
    <div
      style={{
        padding: '24px',
        background: '#111827',
        color: 'white',
        borderRadius: '8px',
        maxWidth: '400px',
      }}
    >
      <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: 'bold' }}>
        Liked Articles Context
      </h3>
      <p style={{ marginBottom: '16px', color: '#9ca3af' }}>
        Total liked: {likedArticles.length}
      </p>
      <button
        onClick={() => toggleLike(sampleArticle)}
        style={{
          padding: '8px 20px',
          background: liked ? '#ef4444' : '#374151',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '12px',
        }}
      >
        {liked ? '❤️ Liked' : '♡ Like'} Sample Article
      </button>
      {likedArticles.length > 0 && (
        <ul style={{ marginTop: '16px', listStyle: 'none', padding: 0 }}>
          {likedArticles.map((a) => (
            <li key={a.pageid} style={{ color: '#d1d5db', fontSize: '14px', padding: '4px 0' }}>
              • {a.displaytitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const meta = {
  title: 'AI Generated/Complex/LikedArticlesContext',
  component: LikedArticlesDemo,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LikedArticlesDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPreloadedData: Story = {
  decorators: [
    (Story) => {
      // Preload localStorage with a liked article before rendering
      localStorage.setItem('likedArticles', JSON.stringify([sampleArticle]));
      return <Story />;
    },
  ],
};
