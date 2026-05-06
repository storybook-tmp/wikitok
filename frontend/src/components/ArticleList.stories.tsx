import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  {
    title: 'The History of Computing',
    content: 'The history of computing covers developments from early devices to modern computers.',
  },
  {
    title: 'Space Exploration',
    content: 'Space exploration uses astronomy and space technology to explore outer space.',
    image: 'https://placehold.co/600x400/1a1a2e/ffffff?text=Space',
  },
  {
    title: 'Quantum Physics',
    content: 'Quantum physics describes the behavior of nature at the scale of atoms.',
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

export const SingleArticle: Story = {
  args: {
    articles: [sampleArticles[0]],
  },
};

export const WithSelection: Story = {
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
