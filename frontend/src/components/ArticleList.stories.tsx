import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  { id: 1, title: 'Quantum Computing', content: 'A type of computation using quantum mechanics.' },
  { id: 2, title: 'Aurora Borealis', content: 'A natural light display in Earth\'s sky.' },
  { id: 3, title: 'Tardigrade', content: 'Micro-animals that survive extreme conditions.' },
];

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
  args: {
    articles: sampleArticles,
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(3);
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [sampleArticles[0]],
  },
};

export const WithInteraction: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await userEvent.click(firstItem);
    await expect(args.onArticleSelect).toHaveBeenCalledWith(sampleArticles[0]);
  },
};
