import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';
import '../styles/Article.css';

const mockArticles: ArticleProps[] = [
  {
    id: 1,
    title: 'Quantum Physics',
    content: 'Quantum physics is the study of matter and energy at the most fundamental level.',
  },
  {
    id: 2,
    title: 'Marine Biology',
    content: 'Marine biology is the scientific study of the biology of marine life.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/GreatBarrierReef-EO.JPG/800px-GreatBarrierReef-EO.JPG',
  },
  {
    id: 3,
    title: 'Computer Science',
    content: 'Computer science is the study of computation, information, and automation.',
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
    await expect(
      canvas.getByRole('navigation', { name: /articles navigation/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /quantum physics/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /marine biology/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /computer science/i }),
    ).toBeVisible();
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /quantum physics/i }),
    ).toBeVisible();
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(1);
  },
};

export const EmptyList: Story = {
  args: {
    articles: [],
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('navigation', { name: /articles navigation/i }),
    ).toBeVisible();
    const list = canvas.getByRole('list');
    await expect(list.children).toHaveLength(0);
  },
};

export const WithSelection: Story = {
  args: {
    articles: mockArticles,
    onArticleSelect: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await expect(firstItem).toBeVisible();
    await userEvent.click(firstItem);
    await expect(
      canvas.getByRole('heading', { name: /quantum physics/i }),
    ).toBeVisible();
  },
};
