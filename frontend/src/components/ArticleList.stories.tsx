import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';

const mockArticles = [
  { id: '1', title: 'Quantum Physics', content: 'The study of matter and energy at the molecular level.' },
  { id: '2', title: 'Deep Sea Exploration', content: 'Exploring the depths of the ocean reveals new species.' },
  { id: '3', title: 'Space Travel', content: 'Humanity has long dreamed of traveling beyond Earth.' },
];

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { articles: mockArticles },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('navigation', { name: /articles navigation/i })).toBeVisible();
  },
};

export const SingleArticle: Story = {
  args: { articles: [mockArticles[0]] },
};

export const WithSelection: Story = {
  args: {
    articles: mockArticles,
    onArticleSelect: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    const firstArticle = canvas.getByLabelText(/article: quantum physics/i);
    await userEvent.click(firstArticle);
    await expect(firstArticle).toBeVisible();
  },
};

export const Empty: Story = {
  args: { articles: [] },
};
