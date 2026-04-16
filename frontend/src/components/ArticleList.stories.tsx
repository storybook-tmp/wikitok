import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import '../styles/Article.css';
import ArticleList from './ArticleList';

const sampleArticles = [
  {
    title: 'Aurora',
    content: 'Auroras shimmer near the poles when solar particles reach Earth.',
    image: '/wiki-logo.svg',
  },
  {
    title: 'Volcano',
    content: 'Volcanoes release lava, ash, and gases from beneath the crust.',
  },
];

const meta = {
  component: ArticleList,
  render: (args) => <ArticleList {...args} />,
} satisfies Meta<typeof ArticleList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: sampleArticles,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('navigation', { name: /articles navigation/i }),
    ).toBeVisible();
    await expect(canvas.getAllByRole('article')).toHaveLength(2);
  },
};

export const ClickSelection: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('listitem', { name: /article: aurora/i }));

    await expect(args.onArticleSelect).toHaveBeenCalledWith(sampleArticles[0]);
  },
};

export const KeyboardSelection: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, args, userEvent }) => {
    const secondArticle = canvas.getByRole('listitem', {
      name: /article: volcano/i,
    });

    secondArticle.focus();
    await userEvent.keyboard('{Enter}');

    await expect(args.onArticleSelect).toHaveBeenCalledWith(sampleArticles[1]);
  },
};
