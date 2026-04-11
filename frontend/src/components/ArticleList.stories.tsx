import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';

const meta = {
  component: ArticleList,
  args: {
    articles: [],
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticles = [
  {
    id: 1,
    title: 'The Theory of Relativity',
    content:
      'The theory of relativity usually encompasses two interrelated physics theories by Albert Einstein: special relativity and general relativity.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg',
  },
  {
    id: 2,
    title: 'Quantum Mechanics',
    content:
      'Quantum mechanics is a fundamental theory that describes the behavior of nature at and below the scale of atoms.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/800px-Marie_Curie_c1920.jpg',
  },
  {
    id: 3,
    title: 'The Big Bang Theory',
    content:
      'The Big Bang is a physical theory that describes how the universe expanded from an initial state of high density and temperature.',
  },
];

export const Default: Story = {
  render: () => <ArticleList articles={mockArticles} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('navigation', { name: /articles navigation/i })).toBeVisible();
    await expect(canvas.getAllByRole('listitem').length).toBe(3);
    await expect(canvas.getByText('The Theory of Relativity')).toBeVisible();
  },
};

export const Empty: Story = {
  render: () => <ArticleList articles={[]} />,
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation', { name: /articles navigation/i });
    await expect(nav).toBeVisible();
    await expect(canvas.queryAllByRole('listitem').length).toBe(0);
  },
};

export const WithSelectionHandler: Story = {
  render: () => (
    <ArticleList
      articles={mockArticles}
      onArticleSelect={(article) => console.log('Selected:', article.title)}
    />
  ),
  play: async ({ canvas, userEvent }) => {
    const items = canvas.getAllByRole('listitem');
    await expect(items.length).toBe(3);
    await userEvent.click(items[0]);
    await expect(canvas.getByText('The Theory of Relativity')).toBeVisible();
  },
};
