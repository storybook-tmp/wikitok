import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import ArticleList from './ArticleList';

const mockArticles = [
  {
    id: 1,
    title: 'The Great Barrier Reef',
    content:
      "The Great Barrier Reef is the world's largest coral reef system composed of over 2,900 individual reefs.",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23269' width='400' height='300'/%3E%3C/svg%3E",
  },
  {
    id: 2,
    title: 'The Theory of Relativity',
    content:
      "The theory of relativity usually encompasses two interrelated physics theories by Albert Einstein: special relativity and general relativity.",
  },
  {
    id: 3,
    title: 'Ancient Egyptian Civilization',
    content:
      'Ancient Egypt was a civilization of ancient Northeast Africa, concentrated along the lower reaches of the Nile River.',
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23963' width='400' height='300'/%3E%3C/svg%3E",
  },
];

const meta = {
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ArticleList articles={mockArticles} />,
};

export const WithSelection: Story = {
  render: () => <ArticleList articles={mockArticles} onArticleSelect={fn()} />,
};

export const SingleArticle: Story = {
  render: () => <ArticleList articles={[mockArticles[0]]} />,
};
