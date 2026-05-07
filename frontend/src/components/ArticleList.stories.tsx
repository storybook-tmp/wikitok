import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const articles = [
  {
    id: 'moon',
    title: 'Moon exploration',
    content: 'A summary of missions, geology, and notable lunar discoveries.',
    image: '/wiki-logo.svg',
  },
  {
    id: 'ocean',
    title: 'Ocean currents',
    content: 'A short overview of currents and their role in global climate.',
  },
];

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
  args: {
    articles,
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SelectsWithKeyboard: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const item = canvas.getByRole('listitem', { name: /moon exploration/i });
    item.focus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onArticleSelect).toHaveBeenCalledWith(articles[0]);
  },
};
