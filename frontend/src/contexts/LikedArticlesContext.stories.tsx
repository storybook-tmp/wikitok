import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const mockArticles: WikiArticle[] = [
  {
    title: 'React',
    displaytitle: 'React (JavaScript library)',
    extract: 'React is a free and open-source front-end JavaScript library for building user interfaces.',
    pageid: 1001,
    url: 'https://en.wikipedia.org/wiki/React_(JavaScript_library)',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png',
      width: 512,
      height: 456,
    },
  },
  {
    title: 'TypeScript',
    displaytitle: 'TypeScript',
    extract: 'TypeScript is a strongly typed programming language that builds on JavaScript.',
    pageid: 1002,
    url: 'https://en.wikipedia.org/wiki/TypeScript',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png',
      width: 512,
      height: 512,
    },
  },
];

function LikeDemo() {
  const { toggleLike, likedArticles, isLiked } = useLikedArticles();

  return (
    <div style={{ padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
      <h3 style={{ marginBottom: '16px' }}>Liked Articles: {likedArticles.length}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {mockArticles.map((article) => (
          <div
            key={article.pageid}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: '#1f2937',
              borderRadius: '8px',
            }}
          >
            <span style={{ flex: 1 }}>{article.displaytitle}</span>
            <button
              onClick={() => toggleLike(article)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: isLiked(article.pageid) ? '#ef4444' : '#374151',
                color: 'white',
              }}
            >
              {isLiked(article.pageid) ? 'Unlike' : 'Like'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
  decorators: [
    (Story) => (
      <div style={{ background: '#111827', minHeight: '300px' }}>
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

export const Empty: Story = {
  render: () => (
    <LikedArticlesProvider>
      <div style={{ padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
        <h3>No liked articles yet</h3>
        <p style={{ color: '#9ca3af' }}>Click the like button on articles to save them here.</p>
      </div>
    </LikedArticlesProvider>
  ),
};
