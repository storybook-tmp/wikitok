import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import ArticleList from './ArticleList';
import { articleListItems } from '../storybook/fixtures';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'padded',
  },
  args: {
    articles: articleListItems,
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleItem: Story = {
  args: {
    articles: articleListItems.slice(0, 1),
  },
};
