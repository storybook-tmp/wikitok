import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import type { ArticleProps } from '../types/ArticleProps';
import ArticleList from './ArticleList';

const articles = [
  {
    content:
      'Aurora Forest protects bright winter wetlands and old-growth pine canopies.',
    title: 'Aurora Forest',
  },
  {
    content:
      'City After Rain follows a dense urban district known for reflective streets and neon transit lines.',
    title: 'City After Rain',
  },
  {
    content:
      'Desert Library preserves oral histories, translated field notes, and climate records from nearby trade routes.',
    title: 'Desert Library',
  },
] satisfies ArticleProps[];

const meta = {
  component: ArticleList,
  parameters: {
    layout: 'padded',
  },
  args: {
    articles,
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ArticleList {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('navigation', { name: /articles navigation/i }),
    ).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
  },
};

export const SelectsWithMouse: Story = {
  args: {
    onArticleSelect: fn(),
  },
  render: (args) => <ArticleList {...args} />,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole('listitem', { name: /article: city after rain/i }),
    );

    await expect(args.onArticleSelect).toHaveBeenCalledWith(articles[1]);
  },
};

export const SelectsWithKeyboard: Story = {
  args: {
    onArticleSelect: fn(),
  },
  render: (args) => <ArticleList {...args} />,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const thirdArticle = canvas.getByRole('listitem', {
      name: /article: desert library/i,
    });

    thirdArticle.focus();
    await userEvent.keyboard('{Enter}');

    await expect(args.onArticleSelect).toHaveBeenCalledWith(articles[2]);
  },
};
