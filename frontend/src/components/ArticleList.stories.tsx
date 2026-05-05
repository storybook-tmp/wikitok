import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  { id: 1, title: 'Quantum Physics', content: 'The study of matter and energy at the most fundamental level.' },
  { id: 2, title: 'Machine Learning', content: 'A subset of artificial intelligence focused on building systems that learn from data.' },
  { id: 3, title: 'Marine Biology', content: 'The scientific study of organisms in the ocean or other marine bodies of water.' },
];

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
  args: {
    articles: sampleArticles,
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

export const WithSelectHandler: Story = {
  args: {
    onArticleSelect: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await userEvent.click(firstItem);
  },
};
