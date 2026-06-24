import type { Meta, StoryObj } from '@storybook/react';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';
import { useState } from 'react';

const meta = {
  title: 'AI Generated/Complex/ArticleListInteractive',
  component: ArticleList,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticles: ArticleProps[] = [
  {
    title: 'Machine Learning Fundamentals',
    content: 'Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.',
    image: 'https://images.unsplash.com/photo-1677442d019cecf374f495f4a21ad489dcb5cc0d?w=400&h=300&fit=crop',
  },
  {
    title: 'Neural Networks Explained',
    content: 'Neural networks are computing systems inspired by biological neural networks. They learn to perform tasks by considering examples without being programmed.',
    image: 'https://images.unsplash.com/photo-1633356713697-2dc6b87b72d9?w=400&h=300&fit=crop',
  },
  {
    title: 'Deep Learning Architectures',
    content: 'Deep learning uses artificial neural networks with multiple layers to learn complex patterns in large amounts of data.',
  },
  {
    title: 'Computer Vision Applications',
    content: 'Computer vision enables machines to interpret visual information from the world using algorithms and deep learning models.',
    image: 'https://images.unsplash.com/photo-1606925342529-694ba94d5ad7?w=400&h=300&fit=crop',
  },
];

function ArticleListWithSelection() {
  const [selected, setSelected] = useState<ArticleProps | null>(null);

  return (
    <div>
      <ArticleList
        articles={mockArticles}
        onArticleSelect={setSelected}
      />
      {selected && (
        <div style={{ padding: '20px', background: '#f5f5f5', marginTop: '20px', borderRadius: '4px' }}>
          <h3>Selected: {selected.title}</h3>
          <p>{selected.content}</p>
        </div>
      )}
    </div>
  );
}

export const Interactive: Story = {
  render: () => <ArticleListWithSelection />,
};

export const LargeList: Story = {
  args: {
    articles: mockArticles,
  },
};
