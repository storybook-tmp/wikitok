import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const mockArticles = [
  {
    id: 1,
    title: 'The History of Computing',
    content: 'Computing has a rich history dating back to ancient abacuses.',
  },
  {
    id: 2,
    title: 'Ocean Exploration',
    content: "The ocean covers more than 70% of Earth's surface.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Clouds_over_the_Atlantic_Ocean.jpg/800px-Clouds_over_the_Atlantic_Ocean.jpg',
  },
  {
    id: 3,
    title: 'Quantum Physics',
    content: 'Quantum mechanics is a fundamental theory in physics.',
  },
];

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: mockArticles,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('The History of Computing')).toBeVisible();
    await expect(canvas.getByText('Ocean Exploration')).toBeVisible();
    await expect(canvas.getByText('Quantum Physics')).toBeVisible();
  },
};

export const WithSelectHandler: Story = {
  args: {
    articles: mockArticles,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const firstArticle = canvas.getByText('The History of Computing');
    await userEvent.click(firstArticle);
    await expect(args.onArticleSelect).toHaveBeenCalled();
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('The History of Computing')).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(1);
  },
};
