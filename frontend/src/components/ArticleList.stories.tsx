import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';

const mockArticles = [
  {
    title: 'Quantum Computing',
    content: 'Quantum computing harnesses quantum mechanical phenomena.',
  },
  {
    title: 'Aurora Borealis',
    content: 'An aurora is a natural light display in Earth\'s sky.',
    image: 'https://via.placeholder.com/600x400/0d1b2a/ffffff?text=Aurora',
  },
  {
    title: 'Japanese Tea Ceremony',
    content: 'The Japanese tea ceremony involves the ceremonial preparation of matcha.',
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
    const list = canvas.getByRole('list');
    await expect(list).toBeVisible();
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(3);
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
};

export const WithSelectHandler: Story = {
  args: {
    articles: mockArticles,
    onArticleSelect: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    const items = canvas.getAllByRole('listitem');
    await userEvent.click(items[0]);
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
