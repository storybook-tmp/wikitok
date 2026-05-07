import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const articles: ArticleProps[] = [
  {
    id: 'apollo',
    title: 'Apollo Guidance Computer',
    content:
      'A digital computer produced for the Apollo program and installed on command and lunar modules.',
  },
  {
    id: 'voyager',
    title: 'Voyager program',
    content:
      'A NASA program that launched two robotic interstellar probes in 1977.',
  },
];

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Populated: Story = {
  args: {
    articles,
  },
};

export const Selectable: Story = {
  args: {
    articles,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByLabelText(/article: apollo guidance/i));
    await expect(args.onArticleSelect).toHaveBeenCalledWith(articles[0]);
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
