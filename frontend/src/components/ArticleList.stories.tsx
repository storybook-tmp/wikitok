import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleArticles = [
  { id: 1, title: 'Quantum Physics', content: 'Quantum mechanics is a fundamental theory in physics.' },
  { id: 2, title: 'Deep Sea', content: 'The deep sea is the lowest layer in the ocean.' },
  { id: 3, title: 'Botany', content: 'Botany is the scientific study of plants.' },
];

export const Default: Story = {
  args: {
    articles: sampleArticles,
  },
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(3);
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [{ id: 1, title: 'Lone Article', content: 'Only one article in the list.' }],
  },
};

export const WithSelection: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await userEvent.click(firstItem);
    await expect(firstItem).toBeVisible();
  },
};
