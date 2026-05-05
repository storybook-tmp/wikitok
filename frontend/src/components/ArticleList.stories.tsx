import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  {
    title: 'The History of Computing',
    content: 'Computing has evolved from mechanical calculators to powerful microprocessors.',
  },
  {
    title: 'Marine Biology',
    content: 'Marine biology is the scientific study of the biology of marine life.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Reef.jpg/800px-Reef.jpg',
  },
  {
    title: 'Quantum Physics',
    content: 'Quantum mechanics is a fundamental theory in physics.',
  },
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

export const SelectArticle: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await userEvent.click(firstItem);
    await expect(args.onArticleSelect).toHaveBeenCalledWith(sampleArticles[0]);
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
