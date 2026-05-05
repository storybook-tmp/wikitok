import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import ArticleList from './ArticleList';
import '../styles/Article.css';

const articles = [
  {
    id: 1,
    title: 'Article One',
    content: 'A compact summary that previews the first article in the list.',
    image:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="100%25" height="100%25" fill="%230f172a"/><text x="50%25" y="50%25" fill="%23fff" font-family="Arial" font-size="20" text-anchor="middle">Article One</text></svg>',
  },
  {
    id: 2,
    title: 'Article Two',
    content: 'Another article teaser that demonstrates multiple items in the navigation.',
  },
] as const;

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    articles: [...articles],
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleArticle: Story = {
  args: {
    articles: [articles[0]],
  },
};
