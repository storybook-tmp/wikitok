import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Sample Article',
  displaytitle: 'Sample Article',
  extract: 'This is a sample article used to demonstrate the like functionality.',
  pageid: 99999,
  url: 'https://en.wikipedia.org/wiki/Sample',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/640px-Polarlicht_2.jpg',
    width: 640,
    height: 480,
  },
};

function LikeDemo() {
  const { toggleLike, isLiked, likedArticles } = useLikedArticles();
  const liked = isLiked(sampleArticle.pageid);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '1rem' }}>LikedArticlesProvider Demo</h2>
      <p style={{ marginBottom: '1rem' }}>
        Liked articles count: <strong>{likedArticles.length}</strong>
      </p>
      <button
        onClick={() => toggleLike(sampleArticle)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: liked ? '#ef4444' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        {liked ? '♥ Unlike' : '♡ Like'} &quot;{sampleArticle.title}&quot;
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

export const WithMultipleArticles: Story = {
  render: () => {
    function MultiLikeDemo() {
      const { toggleLike, isLiked, likedArticles } = useLikedArticles();
      const articles: WikiArticle[] = [
        { ...sampleArticle, pageid: 1, title: 'Quantum Physics', displaytitle: 'Quantum Physics' },
        { ...sampleArticle, pageid: 2, title: 'Deep Sea Biology', displaytitle: 'Deep Sea Biology' },
        { ...sampleArticle, pageid: 3, title: 'Space Exploration', displaytitle: 'Space Exploration' },
      ];

      return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
          <h2 style={{ marginBottom: '1rem' }}>Multiple Articles</h2>
          <p style={{ marginBottom: '1rem' }}>
            Liked: <strong>{likedArticles.length}</strong> / {articles.length}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {articles.map((article) => (
              <button
                key={article.pageid}
                onClick={() => toggleLike(article)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: isLiked(article.pageid) ? '#ef4444' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                }}
              >
                {isLiked(article.pageid) ? '♥' : '♡'} {article.title}
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <LikedArticlesProvider>
        <MultiLikeDemo />
      </LikedArticlesProvider>
    );
  },
};
