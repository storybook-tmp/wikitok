import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import ArticleList from './ArticleList';
import { sampleArticles } from '../storybook/fixtures';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'centered',
  },
  args: {
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CuratedFeed: Story = {
  args: {
    articles: sampleArticles.slice(0, 2),
  },
};

export const ExtendedFeed: Story = {
  args: {
    articles: sampleArticles,
  },
};
