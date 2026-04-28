import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';
import '../styles/Article.css';

const singleArticle = [
  {
    id: 1,
    title: 'Single Article',
    content: 'This is the only article in the list.',
  },
];

const manyArticles = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Article ${i + 1}`,
  content: `Content for article number ${i + 1}. This is a description.`,
}));

const meta: Meta<typeof ArticleList> = {
  component: ArticleList,
  tags: ['ai-generated'],
};

export default meta;
type Story = StoryObj<typeof ArticleList>;

export const SingleItem: Story = {
  args: {
    articles: singleArticle,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Single Article')).toBeVisible();
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(1);
  },
};

export const ManyItems: Story = {
  args: {
    articles: manyArticles,
  },
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(10);
    await expect(canvas.getByText('Article 1')).toBeVisible();
    await expect(canvas.getByText('Article 10')).toBeVisible();
  },
};

export const KeyboardNavigation: Story = {
  args: {
    articles: singleArticle,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, userEvent }) => {
    const item = canvas.getByRole('listitem');
    item.focus();
    await expect(item).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    // Note: onKeyPress fires on Enter
  },
};
