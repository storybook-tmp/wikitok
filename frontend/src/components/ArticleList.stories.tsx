import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const mockArticles: ArticleProps[] = [
  {
    id: 1,
    title: 'Artificial Intelligence',
    content:
      'Artificial intelligence is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans.',
  },
  {
    id: 2,
    title: 'Climate Change',
    content:
      'Climate change includes both human-driven global warming and its impacts on weather patterns.',
    image: 'https://picsum.photos/seed/climate/400/300',
  },
  {
    id: 3,
    title: 'Deep Ocean',
    content:
      'The deep ocean is the lowest layer of the ocean, existing below the thermocline and above the seabed.',
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
    await expect(canvas.getByText('Artificial Intelligence')).toBeVisible();
    await expect(canvas.getByText('Climate Change')).toBeVisible();
    await expect(canvas.getByText('Deep Ocean')).toBeVisible();
  },
};

export const WithSelectHandler: Story = {
  args: {
    articles: mockArticles,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const firstArticle = canvas.getByText('Artificial Intelligence');
    await userEvent.click(firstArticle);
    await expect(args.onArticleSelect).toHaveBeenCalled();
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(1);
    await expect(canvas.getByText('Artificial Intelligence')).toBeVisible();
  },
};
