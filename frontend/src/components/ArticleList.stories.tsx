import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const mockArticles = [
  { id: 1, title: 'Quantum Computing', content: 'A new paradigm in computation.' },
  { id: 2, title: 'Neural Networks', content: 'Inspired by biological brains.' },
  {
    id: 3,
    title: 'Space Exploration',
    content: 'Humanity reaches for the stars.',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Space',
  },
];

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
  args: {
    articles: mockArticles,
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const list = canvas.getByRole('list');
    await expect(list).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [{ id: 1, title: 'Solo Article', content: 'Just one entry.' }],
  },
};

export const WithSelection: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await userEvent.click(firstItem);
    await expect(args.onArticleSelect).toHaveBeenCalledWith(mockArticles[0]);
  },
};
