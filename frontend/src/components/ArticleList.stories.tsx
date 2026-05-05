import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticles = [
  { title: 'First Article', content: 'Content of the first article.' },
  { title: 'Second Article', content: 'Content of the second article.' },
  { title: 'Third Article', content: 'Content of the third article.' },
];

export const Default: Story = {
  args: { articles: mockArticles },
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation', {
      name: /articles navigation/i,
    });
    await expect(nav).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
  },
};

export const WithImages: Story = {
  args: {
    articles: [
      {
        title: 'Photo Article',
        content: 'An article with an image.',
        image: 'https://via.placeholder.com/300x200',
      },
      {
        title: 'Another Photo',
        content: 'Another article with an image.',
        image: 'https://via.placeholder.com/300x200',
      },
    ],
  },
};

export const Empty: Story = {
  args: { articles: [] },
};

export const SelectionCallback: Story = {
  args: { articles: mockArticles, onArticleSelect: () => {} },
  play: async ({ canvas, userEvent }) => {
    const items = canvas.getAllByRole('listitem');
    await userEvent.click(items[0]);
    await expect(items[0]).toHaveAttribute(
      'aria-label',
      'Article: First Article'
    );
  },
};
