import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  {
    title: 'Solar System',
    content: 'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it.',
  },
  {
    title: 'Deep Sea',
    content: 'The deep sea is the lowest layer in the ocean, existing below the thermocline.',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    title: 'Rainforest',
    content: 'Rainforests are characterized by a closed and continuous tree canopy, moisture-dependent vegetation.',
  },
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

export const WithSelectHandler: Story = {
  args: {
    onArticleSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    await canvas.getByText('Solar System').click();
    await expect(args.onArticleSelect).toHaveBeenCalledWith(sampleArticles[0]);
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
