import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { articleStoryEntries } from '../../.storybook/mock-data';
import ArticleList from './ArticleList';

const meta = {
  component: ArticleList,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ArticleList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: articleStoryEntries,
  },
};

export const Selectable: Story = {
  args: {
    articles: articleStoryEntries,
    onArticleSelect: fn(),
  },
};

export const WithRepeatedCards: Story = {
  args: {
    articles: [...articleStoryEntries, ...articleStoryEntries.slice(0, 1)],
    onArticleSelect: fn(),
  },
};
