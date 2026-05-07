import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const articles = [
  {
    id: 'apollo',
    title: 'Apollo program',
    content:
      'The Apollo program was a human spaceflight program carried out by NASA.',
  },
  {
    id: 'alexandria',
    title: 'Library of Alexandria',
    content:
      'The Library of Alexandria was a major library and scholarly center in Egypt.',
  },
  {
    id: 'fuji',
    title: 'Mount Fuji',
    content: 'Mount Fuji is an active stratovolcano in Japan.',
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

export const MultipleArticles: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('navigation')).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
    await expect(
      canvas.getByRole('heading', { name: /apollo program/i }),
    ).toBeVisible();
  },
};

export const SelectsWithClick: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(
      canvas.getByRole('listitem', { name: /article: library of alexandria/i }),
    );

    await expect(args.onArticleSelect).toHaveBeenCalledWith(articles[1]);
  },
};

export const SelectsWithKeyboard: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const item = canvas.getByRole('listitem', {
      name: /article: mount fuji/i,
    });

    item.focus();
    await expect(item).toHaveFocus();
    await userEvent.keyboard('{Enter}');

    await expect(args.onArticleSelect).toHaveBeenCalledWith(articles[2]);
  },
};
