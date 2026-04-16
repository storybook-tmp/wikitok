import type { Meta, StoryObj } from '@storybook/react';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleArticles: ArticleProps[] = [
  {
    title: 'Getting Started with React',
    content: 'React is a JavaScript library for building user interfaces...',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    title: 'Understanding Hooks',
    content: 'Hooks let you use state and other React features without classes...',
  },
  {
    title: 'Building Components',
    content: 'Components are the basic building blocks of any React application...',
  },
];

export const Default: Story = {
  args: {
    articles: sampleArticles,
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [sampleArticles[0]],
  },
};

export const WithCallback: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: (article) => console.log('Selected:', article),
  },
};
